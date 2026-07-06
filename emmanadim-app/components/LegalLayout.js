"use client";
import { PageHeader, Eyebrow, FadeIn } from "@/lib/ui";

export default function LegalLayout({ eyebrow, title, lastUpdated, sections }) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} subtitle={`Last updated: ${lastUpdated}`} />
      <section className="py-24" style={{ background: "#FFFFFF" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-14">
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <p className="text-xs uppercase tracking-wide mb-4" style={{ color: "#8A6E22", fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>On This Page</p>
              <div className="flex flex-col gap-3">
                {sections.map((s, i) => <a key={s.heading} href={`#sec-${i}`} className="text-sm leading-snug" style={{ color: "#666", fontFamily: "Manrope, sans-serif" }}>{i + 1}. {s.heading}</a>)}
              </div>
            </div>
          </div>
          <div>
            {sections.map((s, i) => (
              <FadeIn key={s.heading} className="mb-12" id={`sec-${i}`}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#1E4D3A" }}>{i + 1}. {s.heading}</h2>
                <div className="mt-4 flex flex-col gap-4">
                  {s.body.map((p, pi) => Array.isArray(p) ? (
                    <ul key={pi} className="list-disc pl-5 flex flex-col gap-2">{p.map((li, li_i) => <li key={li_i} className="text-sm leading-relaxed" style={{ color: "#666", fontFamily: "Manrope, sans-serif" }}>{li}</li>)}</ul>
                  ) : (
                    <p key={pi} className="text-sm leading-relaxed" style={{ color: "#666", fontFamily: "Manrope, sans-serif" }}>{p}</p>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
