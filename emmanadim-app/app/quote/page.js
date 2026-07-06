import { PageHeader } from "@/lib/ui";
import { getProducts, getContactInfo } from "@/lib/data";
import QuoteForm from "@/components/QuoteForm";

export const metadata = { title: "Request a Quote | EMMANADIM Nigeria Limited" };

export default async function QuotePage() {
  const [products, contact] = await Promise.all([getProducts(), getContactInfo()]);
  const categories = ["Not Sure Yet", ...Array.from(new Set(products.map((p) => p.category)))];
  return (
    <>
      <PageHeader eyebrow="Request Quote" title="Tell us about your project." subtitle="Share a few details and we'll come back with a tailored quotation — usually within 24 hours." />
      <QuoteForm categories={categories} contact={contact} />
    </>
  );
}
