"use client";

// Species card image with graceful fallback: renders nothing (no broken-image
// icon, no layout jump) until the file actually exists and loads. This lets
// species.ts point at /species/<key>.jpg before the files are added — cards
// upgrade automatically the moment images land in public/species/.

import { useState } from "react";

export default function SpeciesImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [state, setState] = useState<"loading" | "ok" | "missing">("loading");
  if (state === "missing") return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setState("ok")}
      onError={() => setState("missing")}
      className={`w-full object-cover transition-[height,opacity] ${
        state === "ok" ? "h-32 opacity-100" : "h-0 opacity-0"
      }`}
    />
  );
}
