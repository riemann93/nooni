import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Fortrydelsesret og returnering",
  description: "14 dages fortrydelsesret, returnering og 24 måneders reklamationsret hos Nooni.",
  alternates: { canonical: "/returnering" },
};

export default function Page() {
  return <PolicyPage kind="refundPolicy" title="Fortrydelsesret og returnering" />;
}
