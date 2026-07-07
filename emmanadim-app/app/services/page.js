import { Sparkles, Frame, Armchair, Trees, Flower2, Award, PencilRuler, HeadphonesIcon, ShieldCheck, Truck, Star, Heart, Target, Eye, Users, ClipboardList, PackageCheck, Hammer, DoorOpen, MessageSquare } from "lucide-react";
import { PageHeader, FadeIn, CTABanner } from "@/lib/ui";
import { getServices, getContactInfo } from "@/lib/data";

export const revalidate = 60;

const ICON_MAP = { Sparkles, Frame, Armchair, Trees, Flower2, Award, PencilRuler, HeadphonesIcon, ShieldCheck, Truck, Star, Heart, Target, Eye, Users, ClipboardList, PackageCheck, Hammer, DoorOpen, MessageSquare };

export const metadata = { title: "Our Services | EMMANADIM Nigeria Limited" };

export default async function ServicesPage() {
  const [services, contact] = await Promise.all([getServices(), getContactInfo()]);
  return (
    <>
      <PageHeader eyebrow="Our Services" title="More than furniture — a complete interior service." subtitle="From first consultation to final styling touch, our team handles every stage of your interior project." />
      <section className="py-24" style={{ background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((s) => {
              const Icon = ICON_MAP[s.icon] || Sparkles;
              return (
                <FadeIn key={s.id}>
                  <div className="p-9 border h-full" style={{ borderColor: "#EAEAEA" }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ background: "#F7F4ED" }}><Icon size={20} color="#1E4D3A" /></div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "#1E4D3A" }}>{s.title}</h3>
                    <p className="text-sm mt-3 leading-relaxed" style={{ color: "#666", fontFamily: "Manrope, sans-serif" }}>{s.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
      <CTABanner whatsapp={contact.whatsapp} />
    </>
  );
}
