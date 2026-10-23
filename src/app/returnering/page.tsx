import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "Fortrydelsesret og returnering",
  description: "14 dages fortrydelsesret, returnering og 24 måneders reklamationsret hos Nooni.",
  path: "/returnering",
});

export default function Page() {
  return <PolicyPage kind="refundPolicy" title="Fortrydelsesret og returnering" />;
}
