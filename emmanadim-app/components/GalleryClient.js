"use client";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { FilterTabs, MediaFrame, FadeIn } from "@/lib/ui";

export default function GalleryClient({ gallery }) {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const categories = ["All", ...Array.from(new Set(gallery.map((g) => g.category)))];
  const filtered = filter === "All" ? gallery : gallery.filter((g) => g.category === filter);

  return (
    <>
      <section className="py-24" style={{ background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FilterTabs options={categories} active={filter} setActive={setFilter} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {filtered.map((item) => (
              <FadeIn key={item.id}>
                <button onClick={() => setLightbox(item)} className="relative block w-full group overflow-hidden">
                  <MediaFrame label={item.title} sublabel={item.category} ratio={item.ratio || "1/1"} imageUrl={item.image_url} />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(30,77,58,0.35)" }}>
                    <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "#F7F4ED" }}><ZoomIn size={18} color="#1E4D3A" /></div>
                  </div>
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6" style={{ background: "rgba(22,36,29,0.92)" }} onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6" onClick={() => setLightbox(null)}><X size={28} color="#F7F4ED" /></button>
          <div className="max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <MediaFrame label={lightbox.title} sublabel={lightbox.category} ratio={lightbox.ratio || "1/1"} imageUrl={lightbox.image_url} />
            <p className="text-center mt-5 text-sm" style={{ color: "#F7F4ED", fontFamily: "Manrope, sans-serif" }}>{lightbox.title} — <span style={{ color: "#C8A542" }}>{lightbox.category}</span></p>
          </div>
        </div>
      )}
    </>
  );
}
