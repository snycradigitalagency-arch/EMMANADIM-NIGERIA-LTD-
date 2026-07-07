import { Target, Eye, Heart, ClipboardList, PencilRuler, PackageCheck, Hammer, Quote } from "lucide-react";
import { Eyebrow, PageHeader, MediaFrame, FadeIn, CTABanner } from "@/lib/ui";
import { getContactInfo } from "@/lib/data";

export const revalidate = 60;

const CORE_VALUES = [
  { icon: Target, title: "Our Mission", desc: "To furnish Nigerian homes and institutions with interior solutions that combine lasting quality with refined design — delivered with honesty at every step." },
  { icon: Eye, title: "Our Vision", desc: "To be the most trusted name in luxury interior décor across West Africa, known as much for reliability as for craftsmanship." },
  { icon: Heart, title: "Our Values", desc: "Craftsmanship, integrity and attention to detail guide every quotation, sourcing decision and installation we undertake." },
];

const PROCESS_STEPS = [
  { icon: ClipboardList, title: "Consultation", desc: "We learn your space, budget and style before recommending a single product." },
  { icon: PencilRuler, title: "Design & Quotation", desc: "A tailored proposal with product selections, pricing and timelines." },
  { icon: PackageCheck, title: "Sourcing & Craft", desc: "Materials sourced and pieces prepared to the specification agreed." },
  { icon: Hammer, title: "Installation", desc: "Professional delivery and installation, with a final walkthrough." },
];

export const metadata = { title: "About Us | EMMANADIM Nigeria Limited" };

export default async function AboutPage() {
  const contact = await getContactInfo();
  return (
    <>
      <PageHeader eyebrow="About EMMANADIM" title="Crafting interiors people live in, not just look at." subtitle="For fifteen years, EMMANADIM Nigeria Limited has furnished homes, churches and businesses across Lagos with décor built to be lived in, not just admired." />

      <section className="py-28" style={{ background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn className="order-2 lg:order-1">
            <Eyebrow>How We Started</Eyebrow>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", color: "#1E4D3A", lineHeight: 1.25 }}>A small furnishing outfit, grown on referrals and repeat clients.</h2>
            <p className="mt-6 text-base leading-relaxed" style={{ color: "#666", fontFamily: "Manrope, sans-serif" }}>EMMANADIM began with a simple belief: that quality interior décor shouldn't be reserved for a handful of showrooms in Victoria Island. We started by furnishing individual homes across Lekki and Ajah, and grew — almost entirely by word of mouth — into a company trusted by real estate developers, church ministries and hospitality brands across Lagos.</p>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "#666", fontFamily: "Manrope, sans-serif" }}>Today, our workshop and showroom locations on the Lekki-Epe corridor serve clients from initial consultation through to final installation — sourcing, upholstery, fabrication and outdoor décor, all under one roof.</p>
          </FadeIn>
          <FadeIn delay={150} className="order-1 lg:order-2"><MediaFrame label="EMMANADIM Workshop" sublabel="Lekki-Epe Corridor, Lagos" ratio="4/5" imageUrl="https://images.pexels.com/photos/6312360/pexels-photo-6312360.jpeg?auto=compress&cs=tinysrgb&w=1200" /></FadeIn>
        </div>
      </section>

      <section className="py-28" style={{ background: "#F7F4ED" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeIn className="max-w-xl"><Eyebrow>What Drives Us</Eyebrow><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", color: "#1E4D3A" }}>Mission, vision and the values behind them.</h2></FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-14">
            {CORE_VALUES.map((v) => (
              <FadeIn key={v.title}>
                <div className="p-9 bg-white border h-full" style={{ borderColor: "#EAEAEA" }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ background: "#F7F4ED" }}><v.icon size={20} color="#1E4D3A" /></div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#1E4D3A" }}>{v.title}</h3>
                  <p className="text-sm mt-3 leading-relaxed" style={{ color: "#666", fontFamily: "Manrope, sans-serif" }}>{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28" style={{ background: "#1E4D3A" }}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 items-center">
          <FadeIn><div style={{ width: 180, height: 180 }}><MediaFrame label="Founder" sublabel="" ratio="1/1" /></div></FadeIn>
          <FadeIn delay={150}>
            <Quote size={26} color="#C8A542" className="mb-6" />
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#F7F4ED", lineHeight: 1.5, fontStyle: "italic" }}>We built EMMANADIM on a simple rule — never sell a client something we wouldn't put in our own homes. Every quotation that leaves this company reflects that.</p>
            <p className="mt-6 text-sm uppercase tracking-wide" style={{ color: "#C8A542", fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>Founder & CEO, EMMANADIM Nigeria Limited</p>
          </FadeIn>
        </div>
      </section>

      <section className="py-28" style={{ background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeIn className="max-w-xl"><Eyebrow>Our Process</Eyebrow><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", color: "#1E4D3A" }}>From first consultation to final walkthrough.</h2></FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-14">
            {PROCESS_STEPS.map((step, i) => (
              <FadeIn key={step.title}>
                <div className="flex items-center gap-3 mb-5">
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: "#C8A542" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ width: 28, height: 1, background: "#EAEAEA" }} />
                  <step.icon size={18} color="#1E4D3A" />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#1E4D3A" }}>{step.title}</h3>
                <p className="text-sm mt-3 leading-relaxed" style={{ color: "#666", fontFamily: "Manrope, sans-serif" }}>{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <CTABanner whatsapp={contact.whatsapp} />
    </>
  );
}
