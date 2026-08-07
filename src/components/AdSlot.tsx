"use client";

// Google AdSense unit — renders NOTHING until the env vars are configured,
// so the site is identical to today until an AdSense account is approved.
//
// Setup (see README): set NEXT_PUBLIC_ADSENSE_CLIENT (ca-pub-…) and the
// per-placement slot IDs in Vercel env vars, then redeploy.

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

const SLOTS: Record<string, string | undefined> = {
  location: process.env.NEXT_PUBLIC_ADSENSE_SLOT_LOCATION,
  guide: process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE,
};

export default function AdSlot({ placement }: { placement: "location" | "guide" }) {
  const slot = SLOTS[placement];
  const pushed = useRef(false);

  useEffect(() => {
    if (!CLIENT || !slot || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // ad blocker or script not loaded — fail silently
    }
  }, [slot]);

  if (!CLIENT || !slot) return null;

  return (
    <div className="my-10">
      <p className="mb-1 text-center text-[10px] uppercase tracking-widest text-ink-faint">
        Advertisement
      </p>
      <ins
        className="adsbygoogle block"
        style={{ display: "block", minHeight: 90 }}
        data-ad-client={CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
