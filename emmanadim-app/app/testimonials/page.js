import { Star } from "lucide-react";
import { PageHeader, FadeIn, CTABanner } from "@/lib/ui";
import { getTestimonials, getContactInfo } from "@/lib/data";

export const metadata = { title: "Testimonials | EMMANADIM Nigeria Limited" };

export default async function TestimonialsPage() {
  const [testimonials, contact] = await Promise.all([getTestimonials(), getContactInfo()]);
  return (
    <>
      <PageHeader eyebrow="Testimonials" title="What clients say after we leave." subtitle="Real feedback from homeowners, churches, developers and businesses we've furnished across Lagos." />
      <section className="py-24" style={{ background: "#F7F4ED" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {testimonials.map((t) => (
              <FadeIn key={t.id}>
                <div className="p-8 bg-white border h-full flex flex-col" style={{ borderColor: "#EAEAEA" }}>
                  <div className="flex gap-1 mb-5">{Array.from({ length: 5 }).map((_, s) => <Star key={s} size={14} fill="#C8A542" color="#C8A542" />)}</div>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "#444", fontFamily: "Manrope, sans-serif", fontStyle: "italic" }}>"{t.quote}"</p>
                  <div className="flex items-center gap-3 mt-7 pt-6 border-t" style={{ borderColor: "#EAEAEA" }}>
                    <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ border: "1px solid #C8A542", color: "#1E4D3A", fontFamily: "'Playfair Display', serif", fontSize: "0.85rem" }}>{t.initials}</div>
                    <div>
                      <p className="text-sm" style={{ color: "#1E4D3A", fontFamily: "Manrope, sans-serif", fontWeight: 700 }}>{t.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#999", fontFamily: "Manrope, sans-serif" }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <CTABanner whatsapp={contact.whatsapp} />
    </>
  );
}
