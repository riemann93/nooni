import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Privatlivspolitik",
  description: "Sådan indsamler og behandler Nooni dine personoplysninger.",
  alternates: { canonical: "/privatlivspolitik" },
};

export default function Page() {
  return <PolicyPage kind="privacyPolicy" title="Privatlivspolitik" />;
}
