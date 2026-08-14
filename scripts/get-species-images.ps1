# Downloads a lead photo for every species from Wikipedia/Wikimedia Commons,
# converts to JPEG (max 900px wide), and saves to public/species/<key>.jpg.
# Also writes public/species/ATTRIBUTIONS.md (most Commons images are CC-licensed
# and require attribution; NOAA/USFWS ones are public domain).
#
# Run from the repo root:  powershell -ExecutionPolicy Bypass -File scripts\get-species-images.ps1

$ErrorActionPreference = "Continue"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Add-Type -AssemblyName System.Drawing

$ua = @{ "User-Agent" = "USTideCharts/1.0 (ustidecharts.com; ajbmuse@gmail.com)" }
$outDir = Join-Path (Get-Location) "public\species"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

# key = filename expected by the site; value = Wikipedia article (scientific
# names redirect to the right page and avoid ambiguity)
$species = [ordered]@{
  "striped-bass"     = "Morone saxatilis"
  "halibut"          = "Paralichthys californicus"
  "rockfish"         = "Sebastes"
  "lingcod"          = "Ophiodon elongatus"
  "surfperch"        = "Amphistichus argenteus"
  "salmon"           = "Oncorhynchus tshawytscha"
  "white-seabass"    = "Atractoscion nobilis"
  "yellowtail"       = "Seriola dorsalis"
  "calico-bass"      = "Paralabrax clathratus"
  "corbina"          = "Menticirrhus undulatus"
  "spotted-bay-bass" = "Paralabrax maculatofasciatus"
  "leopard-shark"    = "Triakis semifasciata"
  "cabezon"          = "Scorpaenichthys marmoratus"
  "snook"            = "Centropomus undecimalis"
  "redfish"          = "Sciaenops ocellatus"
  "speckled-trout"   = "Cynoscion nebulosus"
  "tarpon"           = "Megalops atlanticus"
  "mangrove-snapper" = "Lutjanus griseus"
  "pompano"          = "Trachinotus carolinus"
  "sheepshead"       = "Archosargus probatocephalus"
  "spanish-mackerel" = "Scomberomorus maculatus"
  "flounder-gulf"    = "Paralichthys albigutta"
  "bonefish-fl"      = "Albula vulpes"
  "permit"           = "Trachinotus falcatus"
}

$attribution = @("# Species image attributions", "",
  "Images sourced from Wikipedia / Wikimedia Commons via the script in",
  "``scripts/get-species-images.ps1``. See each file page for its license",
  "(NOAA/USFWS images are public domain; others are typically CC BY or CC BY-SA).", "")
$ok = 0; $failed = @()

foreach ($key in $species.Keys) {
  $title = $species[$key]
  $dest = Join-Path $outDir "$key.jpg"
  try {
    $enc = [Uri]::EscapeDataString($title)
    $j = Invoke-RestMethod -Headers $ua -Uri "https://en.wikipedia.org/api/rest_v1/page/summary/$enc"
    $imgUrl = $null
    if ($j.originalimage -and $j.originalimage.source) { $imgUrl = $j.originalimage.source }
    elseif ($j.thumbnail -and $j.thumbnail.source) { $imgUrl = $j.thumbnail.source }
    if (-not $imgUrl) { throw "no image on article" }

    $tmp = Join-Path $env:TEMP "sp-$key.bin"
    Invoke-WebRequest -Headers $ua -Uri $imgUrl -OutFile $tmp

    # Re-encode as JPEG, max 900px wide (keeps repo + page weight sane)
    try {
      $img = [System.Drawing.Image]::FromFile($tmp)
      $w = [Math]::Min(900, $img.Width)
      $h = [int]($img.Height * ($w / $img.Width))
      $bmp = New-Object System.Drawing.Bitmap($w, $h)
      $g = [System.Drawing.Graphics]::FromImage($bmp)
      $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $g.FillRectangle([System.Drawing.Brushes]::White, 0, 0, $w, $h)  # flatten PNG transparency
      $g.DrawImage($img, 0, 0, $w, $h)
      $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
      $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
      $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]82)
      $bmp.Save($dest, $codec, $params)
      $g.Dispose(); $bmp.Dispose(); $img.Dispose()
    } catch {
      Copy-Item $tmp $dest -Force  # fallback: raw copy
    }
    Remove-Item $tmp -ErrorAction SilentlyContinue

    $fileName = [Uri]::UnescapeDataString(($imgUrl -split "/")[-1]) -replace "^\d+px-", ""
    $attribution += "- **$key.jpg** — $($j.title) — https://commons.wikimedia.org/wiki/File:$fileName"
    $ok++
    Write-Host "OK    $key  <-  $title"
  } catch {
    $failed += $key
    Write-Host "FAIL  $key  ($title): $($_.Exception.Message)" -ForegroundColor Yellow
  }
  Start-Sleep -Milliseconds 300
}

$attribution | Set-Content (Join-Path $outDir "ATTRIBUTIONS.md") -Encoding UTF8
Write-Host ""
Write-Host "$ok of $($species.Count) images saved to public\species\" -ForegroundColor Green
if ($failed.Count) { Write-Host ("Missing (cards just show no photo): " + ($failed -join ", ")) -ForegroundColor Yellow }
