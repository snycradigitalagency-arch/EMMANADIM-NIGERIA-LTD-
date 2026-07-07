"use client";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { FilterTabs, MediaFrame, PrimaryButton, FadeIn } from "@/lib/ui";

export default function ProductsClient({ products, whatsapp }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <section className="py-24" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <FilterTabs options={categories} active={filter} setActive={setFilter} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-12">
          {filtered.map((product) => {
            const waMsg = encodeURIComponent(`Hi EMMANADIM, I'd like to request a quote for: ${product.name}`);
            return (
              <FadeIn key={product.id}>
                <div className="group bg-white border" style={{ borderColor: "#EAEAEA" }}>
                  <MediaFrame label={product.name} sublabel={product.category} ratio="1/1" imageUrl={product.image_url} />
                  <div className="p-6">
                    <p className="text-[11px] uppercase tracking-wide" style={{ color: "#8A6E22", fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>{product.category}</p>
                    <h3 className="mt-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#1E4D3A" }}>{product.name}</h3>
                    <p className="text-sm mt-2 leading-relaxed" style={{ color: "#666", fontFamily: "Manrope, sans-serif" }}>{product.description}</p>
                    <div className="flex flex-col gap-2.5 mt-6">
                      <PrimaryButton href="/quote">Request Quote</PrimaryButton>
                      <a href={`https://wa.me/${whatsapp}?text=${waMsg}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm border" style={{ borderColor: "#1E4D3A", color: "#1E4D3A", fontFamily: "Manrope, sans-serif", fontWeight: 600, borderRadius: 2 }}>
                        <MessageCircle size={16} /> WhatsApp Request
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
