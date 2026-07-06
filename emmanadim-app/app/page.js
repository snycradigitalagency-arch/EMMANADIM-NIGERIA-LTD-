import Link from "next/link";
import { ArrowRight, Phone, MessageCircle, ChevronRight, Quote, ShieldCheck, Award, Truck, HeadphonesIcon, Sparkles, Frame, Armchair, Trees, Flower2, PencilRuler } from "lucide-react";
import { Eyebrow, PrimaryButton, SecondaryButton, MediaFrame, FadeIn, CTABanner } from "@/lib/ui";
import { getHero, getContactInfo, getServices, getProjects, getTestimonials, galleryImageUrl } from "@/lib/data";

const ICON_MAP = { Sparkles, Frame, Armchair, Trees, Flower2, Award, PencilRuler, HeadphonesIcon, ShieldCheck, Truck };

const WHY_US = [
  { icon: ShieldCheck, title: "High-Quality Materials", desc: "Every piece is sourced and finished to withstand daily luxury living." },
  { icon: Award, title: "Experienced Craftsmen", desc: "Fifteen years of hands-on installation and design expertise." },
  { icon: Truck, title: "Reliable Delivery", desc: "On-time delivery and professional installation across Lagos." },
  { icon: HeadphonesIcon, title: "Dedicated Support", desc: "A single point of contact from quotation to final walkthrough." },
];

export default async function HomePage() {
  const [hero, contact, services, projects, testimonials] = await Promise.all([
    getHero(), getContactInfo(), getServices(), getProjects(), getTestimonials(),
  ]);
  const featuredTestimonial = testimonials[0];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "#1E4D3A" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-28 relative">
          <FadeIn><Eyebrow dark>Lagos's Home for Refined Living</Eyebrow></FadeIn>
          <FadeIn delay={100}>
            <h1 className="max-w-3xl" style={{ fontFamily: "'Playfair Display', serif", color: "#F7F4ED", fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.1, fontWeight: 600 }}>
              {hero.title}
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="max-w-xl mt-7 text-base leading-relaxed" style={{ color: "#C9D3CC", fontFamily: "Manrope, sans-serif" }}>{hero.subtitle}</p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="flex flex-wrap gap-4 mt-10">
              <PrimaryButton href="/quote" icon={ArrowRight}>Request a Quote</PrimaryButton>
              <SecondaryButton href={`tel:${contact.phone_href}`} icon={Phone} className="!text-[#F7F4ED] !border-[#C8A542]">Call Now</SecondaryButton>
              <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm" style={{ color: "#C8A542", fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>
                <MessageCircle size={17} /> Chat on WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="py-28" style={{ background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn><MediaFrame label="From the EMMANADIM Showroom" sublabel="Project photography" ratio="4/5" /></FadeIn>
          <FadeIn delay={150}>
            <Eyebrow>Our Story</Eyebrow>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.4rem", color: "#1E4D3A", lineHeight: 1.2 }}>Fifteen years of furnishing Lagos's finest interiors.</h2>
            <p className="mt-6 text-base leading-relaxed" style={{ color: "#666", fontFamily: "Manrope, sans-serif" }}>
              What began as a small furnishing outfit has grown into one of Lagos's trusted names in interior décor. We work closely with homeowners, churches, hospitality brands and estate developers — pairing durable craftsmanship with a design sensibility that never goes out of style.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-10">
              {[["500+", "Projects Delivered"], ["15", "Years of Craft"], ["98%", "Client Satisfaction"]].map(([num, label]) => (
                <div key={label}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#1E4D3A" }}>{num}</p>
                  <p className="text-xs mt-1 uppercase tracking-wide" style={{ color: "#999", fontFamily: "Manrope, sans-serif" }}>{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-10"><SecondaryButton href="/about" icon={ChevronRight}>Read Our Story</SecondaryButton></div>
          </FadeIn>
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className="py-28" style={{ background: "#F7F4ED" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeIn className="max-w-xl">
            <Eyebrow>What We Offer</Eyebrow>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.4rem", color: "#1E4D3A" }}>Curated services, each built around your space.</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-14">
            {services.slice(0, 6).map((s) => {
              const Icon = ICON_MAP[s.icon] || Sparkles;
              return (
                <FadeIn key={s.id}>
                  <div className="p-9 bg-white border h-full" style={{ borderColor: "#EAEAEA" }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ background: "#F7F4ED" }}><Icon size={20} color="#1E4D3A" /></div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "#1E4D3A" }}>{s.title}</h3>
                    <p className="text-sm mt-3 leading-relaxed" style={{ color: "#666", fontFamily: "Manrope, sans-serif" }}>{s.description}</p>
                    <Link href="/services" className="inline-flex items-center gap-2 text-xs uppercase tracking-wide mt-6" style={{ color: "#8A6E22", fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>
                      Learn More <ChevronRight size={14} />
                    </Link>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-28" style={{ background: "#1E4D3A" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeIn className="max-w-xl"><Eyebrow dark>Why Choose Us</Eyebrow><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.4rem", color: "#F7F4ED" }}>The standard behind every EMMANADIM interior.</h2></FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
            {WHY_US.map((item) => (
              <FadeIn key={item.title}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center mb-6 border" style={{ borderColor: "#C8A542" }}><item.icon size={18} color="#C8A542" /></div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#F7F4ED" }}>{item.title}</h3>
                <p className="text-sm mt-3 leading-relaxed" style={{ color: "#B9C4BD", fontFamily: "Manrope, sans-serif" }}>{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS TEASER */}
      <section className="py-28" style={{ background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <FadeIn><Eyebrow>Recent Work</Eyebrow><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.4rem", color: "#1E4D3A" }}>A glimpse into completed projects.</h2></FadeIn>
            <SecondaryButton href="/projects" icon={ChevronRight}>View All Projects</SecondaryButton>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-14">
            {projects.slice(0, 3).map((p) => (
              <FadeIn key={p.id}><MediaFrame label={p.title} sublabel={p.category} ratio={p.ratio} /></FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL STRIP */}
      {featuredTestimonial && (
        <section className="py-28" style={{ background: "#F7F4ED" }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <FadeIn>
              <Quote size={30} color="#C8A542" className="mx-auto mb-8" />
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: "#1E4D3A", lineHeight: 1.5, fontStyle: "italic" }}>"{featuredTestimonial.quote}"</p>
              <p className="mt-7 text-sm uppercase tracking-wide" style={{ color: "#8A6E22", fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>— {featuredTestimonial.role}</p>
            </FadeIn>
          </div>
        </section>
      )}

      <CTABanner whatsapp={contact.whatsapp} />
    </>
  );
}
