import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "Levering og fragt",
  description: "Levering i Danmark med DAO, GLS eller PostNord. Fast fragt 55 kr. og 1 til 3 hverdages leveringstid.",
  path: "/levering",
});

export default function Page() {
  return <PolicyPage kind="shippingPolicy" title="Levering og fragt" />;
}
