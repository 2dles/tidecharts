import { notFound } from "next/navigation";
import { findLocation } from "@/lib/stations";
import { getState } from "@/lib/states";

/**
 * Exists for one reason: a real 404 status.
 *
 * loading.tsx in this segment puts the page behind a Suspense boundary, so
 * Next flushes the shell with a 200 before the page runs. By the time the
 * page (or generateMetadata) calls notFound(), the status is already sent;
 * the visitor sees the not-found UI but Google sees a 200 with "not found"
 * in the body, which is a soft 404. A layout at the same segment is part of
 * the shell, so a notFound() thrown here is thrown before anything flushes.
 *
 * findLocation() is module-cached, so the page's own call is free.
 */
export default async function StationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ state: string; slug: string }>;
}) {
  const { state, slug } = await params;
  const loc = await findLocation(slug);
  if (!getState(state) || !loc || loc.state !== state) notFound();
  return children;
}
