"use client";
import { useState } from "react";
import { FilterTabs, MediaFrame, FadeIn } from "@/lib/ui";

export default function ProjectsClient({ projects }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="py-24" style={{ background: "#F7F4ED" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <FilterTabs options={categories} active={filter} setActive={setFilter} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-12">
          {filtered.map((project) => (
            <FadeIn key={project.id}>
              <div className="relative group overflow-hidden mb-7">
                <MediaFrame label={project.title} sublabel={project.category} ratio={project.ratio} />
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: "linear-gradient(0deg, rgba(30,77,58,0.88) 0%, rgba(30,77,58,0) 55%)" }}>
                  <p className="text-[11px] uppercase tracking-wide" style={{ color: "#C8A542", fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>{project.category}</p>
                  <p className="mt-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", color: "#F7F4ED" }}>{project.title}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
