import { PageHeader, CTABanner } from "@/lib/ui";
import { getFaqs, getContactInfo } from "@/lib/data";
import FaqsClient from "@/components/FaqsClient";

export const metadata = { title: "FAQs | EMMANADIM Nigeria Limited" };

export default async function FAQsPage() {
  const [faqs, contact] = await Promise.all([getFaqs(), getContactInfo()]);
  return (
    <>
      <PageHeader eyebrow="FAQs" title="Answers before you ask." subtitle="Everything clients most often ask us about ordering, delivery and payment." />
      <FaqsClient faqs={faqs} />
      <CTABanner whatsapp={contact.whatsapp} />
    </>
  );
}
