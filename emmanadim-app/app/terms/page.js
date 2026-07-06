import LegalLayout from "@/components/LegalLayout";

export const metadata = { title: "Terms & Conditions | EMMANADIM Nigeria Limited" };

const TERMS_SECTIONS = [
  { heading: "About This Website", body: ["This website is operated by EMMANADIM Nigeria Limited to showcase our products and projects and to enable prospective clients to request quotations. It is not an e-commerce platform, and no purchase can be completed directly on this site."] },
  { heading: "Quotations & Orders", body: ["Prices communicated in response to a quote request are estimates based on the information provided and are subject to confirmation after a full assessment of your requirements.", "An order is only considered confirmed once a quotation has been formally accepted and any required deposit has been received."] },
  { heading: "Pricing & Payment", body: ["All pricing is quoted in Nigerian Naira (₦) unless otherwise stated. Accepted payment methods will be confirmed at the point of quotation, and a deposit is typically required before sourcing, fabrication or installation begins."] },
  { heading: "Delivery & Installation", body: ["Delivery and installation timelines communicated during quotation are estimates. While we work to meet agreed timelines, factors such as customization, sourcing and logistics may affect the final schedule; we will communicate any changes promptly."] },
  { heading: "Product Representation", body: ["Product images used across this website, aside from those in our project Gallery, may include representative stock photography. Actual finished products may vary slightly in color, texture or finish from images shown."] },
  { heading: "Intellectual Property", body: ["All content on this website — including text, logos, photography and design — is the property of EMMANADIM Nigeria Limited or its licensors and may not be reproduced without written permission."] },
  { heading: "Limitation of Liability", body: ["EMMANADIM Nigeria Limited makes reasonable efforts to ensure information on this website is accurate but does not guarantee it is free of errors. We are not liable for indirect or consequential losses arising from use of this website."] },
  { heading: "Governing Law", body: ["These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from use of this website or our services will be subject to the jurisdiction of Nigerian courts."] },
];

export default function TermsPage() {
  return <LegalLayout eyebrow="Terms & Conditions" title="Terms & Conditions" lastUpdated="July 2026" sections={TERMS_SECTIONS} />;
}
