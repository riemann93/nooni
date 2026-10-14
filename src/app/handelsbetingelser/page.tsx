import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Handelsbetingelser",
  description: "Noonis handelsbetingelser: priser, betaling, aftaleindgåelse og firmaoplysninger.",
  alternates: { canonical: "/handelsbetingelser" },
};

export default function Page() {
  return <PolicyPage kind="termsOfService" title="Handelsbetingelser" />;
}
