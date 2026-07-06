import { PageHeader, CTABanner } from "@/lib/ui";
import { getProducts, getContactInfo } from "@/lib/data";
import ProductsClient from "@/components/ProductsClient";

export const metadata = { title: "Our Products | EMMANADIM Nigeria Limited" };

export default async function ProductsPage() {
  const [products, contact] = await Promise.all([getProducts(), getContactInfo()]);
  return (
    <>
      <PageHeader eyebrow="Our Products" title="Furniture and décor, made to order." subtitle="Browse by category and request a quote — every piece is priced and prepared around your space, so we don't sell off a shelf." />
      <ProductsClient products={products} whatsapp={contact.whatsapp} />
      <CTABanner whatsapp={contact.whatsapp} />
    </>
  );
}
