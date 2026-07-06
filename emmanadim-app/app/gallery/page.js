import { PageHeader, CTABanner } from "@/lib/ui";
import { getGallery, getContactInfo } from "@/lib/data";
import GalleryClient from "@/components/GalleryClient";

export const metadata = { title: "Gallery | EMMANADIM Nigeria Limited" };

export default async function GalleryPage() {
  const [gallery, contact] = await Promise.all([getGallery(), getContactInfo()]);
  return (
    <>
      <PageHeader eyebrow="Gallery" title="A closer look at finished spaces." subtitle="Curated by our team — this gallery is updated regularly as new projects are completed. Tap any image for a closer view." />
      <GalleryClient gallery={gallery} />
      <CTABanner whatsapp={contact.whatsapp} />
    </>
  );
}
