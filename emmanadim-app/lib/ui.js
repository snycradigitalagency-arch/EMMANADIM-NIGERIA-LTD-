"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, MessageCircle } from "lucide-react";

export function Eyebrow({ children, dark }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span style={{ width: 28, height: 1, background: "#C8A542", display: "inline-block" }} />
      <span className="text-xs tracking-[0.28em] uppercase" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, color: dark ? "#C8A542" : "#8A6E22" }}>
        {children}
      </span>
    </div>
  );
}

export function PrimaryButton({ children, onClick, icon: Icon, href, className = "" }) {
  const cls = `inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm tracking-wide transition-all duration-300 ${className}`;
  const style = { background: "#1E4D3A", color: "#F7F4ED", fontFamily: "Manrope, sans-serif", fontWeight: 600, borderRadius: 2 };
  const handlers = {
    onMouseEnter: (e) => (e.currentTarget.style.background = "#163B2C"),
    onMouseLeave: (e) => (e.currentTarget.style.background = "#1E4D3A"),
  };
  if (href) return <Link href={href} className={cls} style={style} {...handlers}>{children}{Icon} />}</Link>;
  return <button type="button" onClick={onClick} className={cls} style={style} {...handlers}>{children}{Icon} />}</button>;
}

export function SecondaryButton({ children, onClick, Icon, href, className = "" }) {
  const cls = `inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm tracking-wide border transition-all duration-300 ${className}`;
  const style = { borderColor: "#C8A542", color: "#1E4D3A", background: "transparent", fontFamily: "Manrope, sans-serif", fontWeight: 600, borderRadius: 2 };
  const handlers = {
    onMouseEnter: (e) => { e.currentTarget.style.background = "#C8A542"; e.currentTarget.style.color = "#1E4D3A"; },
    onMouseLeave: (e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1E4D3A"; },
  };
  if (href) return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={cls} style={style} {...handlers}>{children}{Icon} />}</a>;
  return <button type="button" onClick={onClick} className={cls} style={style} {...handlers}>{children}{Icon} />}</button>;
}

export function MediaFrame({ label, sublabel, ratio = "4/5", imageUrl, className = "" }) {
  if (imageUrl) {
    return (
      <div className={`overflow-hidden ${className}`} style={{ aspectRatio: ratio, border: "1px solid #EAEAEA" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt={label || ""} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: ratio, background: "linear-gradient(135deg, #F7F4ED 0%, #EFE9DA 100%)", border: "1px solid #EAEAEA" }}>
      <div className="absolute inset-4 border" style={{ borderColor: "rgba(200,165,66,0.4)" }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "#8A6E22", fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>{label}</p>
        {sublabel && <p className="text-[11px] mt-1" style={{ color: "#999", fontFamily: "Manrope, sans-serif" }}>{sublabel}</p>}
      </div>
    </div>
  );
}

export function FadeIn({ children, delay = 0, className = "", id }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect(); }
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} id={id} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
      {children}
    </div>
  );
}

export function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="relative overflow-hidden" style={{ background: "#1E4D3A" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-20 relative">
        <FadeIn>
          <Eyebrow dark>{eyebrow}</Eyebrow>
          <h1 className="max-w-2xl" style={{ fontFamily: "'Playfair Display', serif", color: "#F7F4ED", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.2, fontWeight: 600 }}>{title}</h1>
          {subtitle && <p className="max-w-xl mt-5 text-base leading-relaxed" style={{ color: "#C9D3CC", fontFamily: "Manrope, sans-serif" }}>{subtitle}</p>}
        </FadeIn>
      </div>
    </section>
  );
}

export function FilterTabs({ options, active, setActive }) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <button key={opt} type="button" onClick={() => setActive(opt)} className="px-5 py-2.5 text-xs uppercase tracking-wide transition-all duration-300" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, border: "1px solid", borderColor: active === opt ? "#1E4D3A" : "#EAEAEA", background: active === opt ? "#1E4D3A" : "transparent", color: active === opt ? "#F7F4ED" : "#666", borderRadius: 2 }}>
          {opt}
        </button>
      ))}
    </div>
  );
}

export function CTABanner({ whatsapp }) {
  return (
    <section className="py-24" style={{ background: "#1E4D3A" }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", color: "#F7F4ED" }}>Ready to elevate your space?</h2>
          <p className="mt-4 text-base" style={{ color: "#C9D3CC", fontFamily: "Manrope, sans-serif" }}>Tell us about your project and receive a tailored quotation within 24 hours.</p>
          <div className="flex flex-wrap gap-4 justify-center mt-9">
            <PrimaryButton href="/quote" icon={ChevronRight size={16} />} }>Request a Quote</PrimaryButton>
            <SecondaryButton href={`https://wa.me/${whatsapp}`} icon={MessageCircle size={16} />} className="!text-[#F7F4ED] !border-[#C8A542]">Chat on WhatsApp</SecondaryButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
