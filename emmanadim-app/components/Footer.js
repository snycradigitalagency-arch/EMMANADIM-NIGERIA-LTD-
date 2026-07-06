"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

export default function Footer({ contact }) {
  const router = useRouter();
  const tapCount = useRef(0);
  const tapTimer = useRef(null);

  const handleLogoTap = () => {
    tapCount.current += 1;
    if (tapTimer.current) clearTimeout(tapTimer.current);
    tapTimer.current = setTimeout(() => { tapCount.current = 0; }, 2500);
    if (tapCount.current >= 5) {
      tapCount.current = 0;
      router.push("/admin");
    }
  };

  return (
    <footer style={{ background: "#16241D", color: "#F7F4ED" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <button onClick={handleLogoTap} aria-label="EMMANADIM">
            <Image src="/logo-white.png" alt="EMMANADIM Nigeria Limited" width={200} height={90} style={{ height: 56, width: "auto", marginBottom: 18 }} />
          </button>
          <p className="text-sm leading-relaxed" style={{ color: "#B9C4BD", fontFamily: "Manrope, sans-serif" }}>
            Bespoke interior décor and luxury home furnishing, crafted for Lagos's most discerning spaces.
          </p>
          <div className="flex gap-4 mt-6">
            {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 flex items-center justify-center rounded-full border" style={{ borderColor: "#33463C" }}>
                <Icon size={15} color="#C8A542" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] mb-5" style={{ color: "#C8A542", fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>Quick Links</p>
          <div className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-left" style={{ color: "#B9C4BD", fontFamily: "Manrope, sans-serif" }}>{item.label}</Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] mb-5" style={{ color: "#C8A542", fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>Contact</p>
          <div className="flex flex-col gap-4 text-sm" style={{ color: "#B9C4BD", fontFamily: "Manrope, sans-serif" }}>
            <div className="flex gap-3"><Phone size={16} color="#C8A542" className="mt-0.5 shrink-0" /> {contact.phone}</div>
            <div className="flex gap-3"><Mail size={16} color="#C8A542" className="mt-0.5 shrink-0" /> {contact.email}</div>
            <div className="flex gap-3"><MapPin size={16} color="#C8A542" className="mt-0.5 shrink-0" /> {contact.locations?.[0]?.address}</div>
            <div className="flex gap-3"><Clock size={16} color="#C8A542" className="mt-0.5 shrink-0" /> {contact.hours}</div>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] mb-5" style={{ color: "#C8A542", fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>Stay Updated</p>
          <p className="text-sm mb-4" style={{ color: "#B9C4BD", fontFamily: "Manrope, sans-serif" }}>New collections and design ideas, occasionally.</p>
          <div className="flex">
            <input placeholder="Your email" className="flex-1 px-4 py-3 text-sm bg-transparent border outline-none" style={{ borderColor: "#33463C", color: "#F7F4ED", fontFamily: "Manrope, sans-serif" }} />
            <button className="px-4 border-t border-b border-r" style={{ borderColor: "#33463C", background: "#C8A542" }}>
              <ArrowRight size={16} color="#16241D" />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: "#243128" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs" style={{ color: "#7E8A83", fontFamily: "Manrope, sans-serif" }}>
          <span>© {new Date().getFullYear()} EMMANADIM Nigeria Limited. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
