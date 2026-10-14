import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { pageMetadata } from "@/lib/seo";
import { STORE_FACTS } from "@/lib/store-facts";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "Levering og fragt",
  description: `${STORE_FACTS.delivery} med ${STORE_FACTS.carriers}. ${STORE_FACTS.shippingPrice} ${STORE_FACTS.dispatch}.`,
  path: "/levering",
});

export default function Page() {
  return <PolicyPage kind="shippingPolicy" title="Levering og fragt" />;
}
