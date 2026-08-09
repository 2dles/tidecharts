# Species Images — sourcing guide

The species cards are wired to show a photo/illustration when one exists. The
site works fine without them; add them when convenient.

## Why we can't just grab photos

Same rule as product photos: images on fishing websites are copyrighted. The
safe sources for fish are **U.S. government works (public domain)** and
**openly-licensed Wikimedia files**.

## Best sources, in order

1. **NOAA Fisheries** (fisheries.noaa.gov, search the species) — U.S. federal
   images are public domain. Their species profiles have clean illustrations.
2. **USFWS National Digital Library** (digitalmedia.fws.gov) — public domain;
   home of the classic Duane Raver fish illustrations, which would look
   fantastic and consistent as a set.
3. **CDFW** (wildlife.ca.gov) — California species pages; check the credit
   line, state images are usually fine with attribution.
4. **Wikimedia Commons** (commons.wikimedia.org) — filter by license; prefer
   "Public domain" or CC0; CC-BY requires a visible credit (put it in the
   image alt or a credits page).

## How to install

1. Save each image as `public/species/<key>.jpg` in the repo, using these keys:
   `striped-bass, halibut, rockfish, lingcod, surfperch, salmon,
   white-seabass, yellowtail, calico-bass, corbina, spotted-bay-bass,
   leopard-shark, cabezon`
2. In `src/lib/species.ts`, add to each species entry:
   `image: "/species/<key>.jpg",`
3. Commit and push. Cards pick them up automatically.

Landscape images (~4:3 or wider) crop best — cards display them 128px tall,
full card width. Keep files under ~150 KB each (resize to ~800px wide).

Alternative: a future Claude session with image-generation tools can produce a
consistent illustrated set in the brand style — just make sure generated fish
are anatomically checked against reference photos before shipping; anglers
notice wrong fin counts.
