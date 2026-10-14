import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { pageMetadata } from "@/lib/seo";
import { STORE_FACTS } from "@/lib/store-facts";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "Fortrydelsesret og returnering",
  description: `${STORE_FACTS.withdrawal}, returnering og ${STORE_FACTS.complaint} hos Nooni.`,
  path: "/returnering",
});

export default function Page() {
  return <PolicyPage kind="refundPolicy" title="Fortrydelsesret og returnering" />;
}
