import { Phone, Mail, Clock, ChevronRight, MessageCircle, ArrowRight } from "lucide-react";
import { Eyebrow, PageHeader, FadeIn, PrimaryButton } from "@/lib/ui";
import { getContactInfo } from "@/lib/data";

export const metadata = { title: "Contact Us | EMMANADIM Nigeria Limited" };

export default async function ContactPage() {
  const contact = await getContactInfo();
  const info = [
    { icon: Phone, label: "Call Us", value: contact.phone, href: `tel:${contact.phone_href}` },
    { icon: Mail, label: "Email Us", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Clock, label: "Business Hours", value: contact.hours, href: null },
  ];

  return (
    <>
      <PageHeader eyebrow="Contact" title="Visit, call or send a message." subtitle="We're reachable across two Lagos locations, WhatsApp and email — whichever is easiest for you." />
      <section className="py-20" style={{ background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 sm:grid-cols-3 gap-7">
          {info.map((item) => {
            const Comp = item.href ? "a" : "div";
            return (
              <FadeIn key={item.label}>
                <Comp href={item.href} className="flex flex-col items-start p-8 border h-full" style={{ borderColor: "#EAEAEA" }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center mb-5" style={{ background: "#F7F4ED" }}><item.icon size={18} color="#1E4D3A" /></div>
                  <p className="text-xs uppercase tracking-wide" style={{ color: "#8A6E22", fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>{item.label}</p>
                  <p className="mt-2 text-sm" style={{ color: "#1E4D3A", fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>{item.value}</p>
                </Comp>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section className="py-8 pb-24" style={{ background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeIn className="mb-10"><Eyebrow>Our Locations</Eyebrow><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#1E4D3A" }}>Find us in Lagos.</h2></FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {(contact.locations || []).map((loc) => {
              const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(loc.address)}&output=embed`;
              return (
                <FadeIn key={loc.id}>
                  <div className="bg-white border" style={{ borderColor: "#EAEAEA" }}>
                    <div style={{ aspectRatio: "16/10" }}><iframe title={loc.name} src={mapSrc} width="100%" height="100%" style={{ border: 0, display: "block" }} loading="lazy" /></div>
                    <div className="p-7">
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", color: "#1E4D3A" }}>{loc.name}</h3>
                      <p className="text-sm mt-2 leading-relaxed" style={{ color: "#666", fontFamily: "Manrope, sans-serif" }}>{loc.address}</p>
                      <a href={`https://www.google.com/maps?q=${encodeURIComponent(loc.address)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs uppercase tracking-wide mt-5" style={{ color: "#8A6E22", fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>Get Directions <ChevronRight size={14} /></a>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: "#1E4D3A" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#F7F4ED" }}>Prefer a quick chat?</h2>
            <p className="mt-4 text-base" style={{ color: "#C9D3CC", fontFamily: "Manrope, sans-serif" }}>Message us on WhatsApp for the fastest response.</p>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm" style={{ background: "#C8A542", color: "#1E4D3A", fontFamily: "Manrope, sans-serif", fontWeight: 600, borderRadius: 2 }}><MessageCircle size={16} /> Chat on WhatsApp</a>
              <PrimaryButton href="/quote" icon={<ArrowRight size={16} />}>Request a Quote</PrimaryButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
