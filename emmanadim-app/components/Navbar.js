"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, MessageCircle } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/lib/ui";

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

export default function Navbar({ whatsapp }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300" style={{ background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)", borderBottom: scrolled ? "1px solid #EAEAEA" : "1px solid transparent" }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10" style={{ height: scrolled ? 76 : 92, transition: "height 0.3s ease" }}>
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="EMMANADIM Nigeria Limited" width={200} height={90} style={{ height: scrolled ? 44 : 54, width: "auto", transition: "height 0.3s ease" }} priority />
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="text-[13px] tracking-wide uppercase relative" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, color: pathname === item.href ? "#1E4D3A" : "#444" }}>
              {item.label}
              {pathname === item.href && <span style={{ position: "absolute", left: 0, right: 0, bottom: -6, height: 2, background: "#C8A542" }} />}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2.5 text-sm" style={{ color: "#1E4D3A", fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>
            <MessageCircle size={17} /> WhatsApp
          </a>
          <PrimaryButton href="/quote">Request Quote</PrimaryButton>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={26} color="#1E4D3A" /> : <Menu size={26} color="#1E4D3A" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t px-6 py-6 flex flex-col gap-5" style={{ borderColor: "#EAEAEA" }}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="text-left text-sm uppercase tracking-wide" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, color: pathname === item.href ? "#1E4D3A" : "#444" }}>
              {item.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-3 border-t" style={{ borderColor: "#EAEAEA" }}>
            <SecondaryButton href={`https://wa.me/${whatsapp}`} icon={<MessageCircle size={16} />}>WhatsApp Us</SecondaryButton>
            <PrimaryButton href="/quote">Request Quote</PrimaryButton>
          </div>
        </div>
      )}
    </header>
  );
}
