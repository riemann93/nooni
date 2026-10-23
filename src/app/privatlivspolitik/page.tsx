import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "Privatlivspolitik",
  description: "Sådan indsamler og behandler Nooni dine personoplysninger.",
  path: "/privatlivspolitik",
});

export default function Page() {
  return <PolicyPage kind="privacyPolicy" title="Privatlivspolitik" />;
}
