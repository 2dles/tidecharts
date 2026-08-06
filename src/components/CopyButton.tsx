"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // clipboard unavailable — user can select the code manually
        }
      }}
      className="rounded-lg bg-sky-400/15 px-3 py-1.5 text-xs font-medium text-sky-300 transition-colors hover:bg-sky-400/25"
    >
      {copied ? "Copied ✓" : "Copy code"}
    </button>
  );
}
