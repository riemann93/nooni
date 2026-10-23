import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "Handelsbetingelser",
  description: "Noonis handelsbetingelser: priser, betaling, aftaleindgåelse og firmaoplysninger.",
  path: "/handelsbetingelser",
});

export default function Page() {
  return <PolicyPage kind="termsOfService" title="Handelsbetingelser" />;
}
