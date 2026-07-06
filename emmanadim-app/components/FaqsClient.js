"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Eyebrow, FadeIn } from "@/lib/ui";

function FAQAccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b" style={{ borderColor: "#EAEAEA" }}>
      <button onClick={onToggle} className="w-full flex items-center justify-between gap-6 py-6 text-left">
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", color: "#1E4D3A" }}>{item.question}</span>
        <span className="shrink-0">{isOpen ? <Minus size={18} color="#C8A542" /> : <Plus size={18} color="#C8A542" />}</span>
      </button>
      <div style={{ maxHeight: isOpen ? 260 : 0, overflow: "hidden", transition: "max-height 0.35s ease" }}>
        <p className="pb-6 text-sm leading-relaxed max-w-2xl" style={{ color: "#666", fontFamily: "Manrope, sans-serif" }}>{item.answer}</p>
      </div>
    </div>
  );
}

export default function FaqsClient({ faqs }) {
  const [openKey, setOpenKey] = useState(faqs[0]?.id || null);
  const groups = [];
  faqs.forEach((f) => { if (!groups.includes(f.group_name)) groups.push(f.group_name); });

  return (
    <section className="py-24" style={{ background: "#FFFFFF" }}>
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        {groups.map((group) => (
          <FadeIn key={group} className="mb-12">
            <Eyebrow>{group}</Eyebrow>
            <div className="mt-2">
              {faqs.filter((f) => f.group_name === group).map((item) => (
                <FAQAccordionItem key={item.id} item={item} isOpen={openKey === item.id} onToggle={() => setOpenKey(openKey === item.id ? null : item.id)} />
              ))}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
