"use client";
import { useState } from "react";
import { CheckCircle2, MessageCircle, Mail, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";

const fieldStyle = { width: "100%", padding: "13px 16px", border: "1px solid #EAEAEA", fontFamily: "Manrope, sans-serif", fontSize: "0.9rem", color: "#222", borderRadius: 2, outline: "none", background: "#FFFFFF" };
function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wide mb-2" style={{ color: "#666", fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>{label} {required && <span style={{ color: "#C8A542" }}>*</span>}</label>
      {children}
    </div>
  );
}
function focusGold(e) { e.currentTarget.style.borderColor = "#C8A542"; }
function blurGray(e) { e.currentTarget.style.borderColor = "#EAEAEA"; }

const CONTACT_METHODS = ["WhatsApp", "Phone Call", "Email"];

export default function QuoteForm({ categories, contact }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", category: "", product: "", message: "", preferred: "WhatsApp" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const waMessage = () => encodeURIComponent(`Hi EMMANADIM, I'd like to request a quote.\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nCategory: ${form.category || "—"}\nProduct: ${form.product || "—"}\nMessage: ${form.message || "—"}\nPreferred Contact: ${form.preferred}`);
  const mailtoHref = () => `mailto:${contact.email}?subject=${encodeURIComponent("Quote Request — " + form.name)}&body=${encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nCategory: ${form.category || "—"}\nProduct: ${form.product || "—"}\nPreferred Contact: ${form.preferred}\n\nMessage:\n${form.message}`)}`;

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) { setError("Please fill in your name, phone number and email."); return; }
    setError("");
    setSaving(true);
    await supabase.from("quote_requests").insert({
      name: form.name, phone: form.phone, email: form.email,
      category: form.category || null, product: form.product || null,
      message: form.message || null, preferred_contact: form.preferred,
    });
    setSaving(false);
    window.open(`https://wa.me/${contact.whatsapp}?text=${waMessage()}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-28" style={{ background: "#FFFFFF" }}>
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-7" style={{ background: "#F7F4ED" }}><CheckCircle2 size={30} color="#1E4D3A" /></div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "#1E4D3A" }}>Thank you, {form.name.split(" ")[0]}.</h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "#666", fontFamily: "Manrope, sans-serif" }}>Your request has been saved and opened in WhatsApp — send the pre-filled message to reach our team directly. We typically respond within 24 hours with a tailored quotation.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-9">
            <a href={`https://wa.me/${contact.whatsapp}?text=${waMessage()}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm" style={{ background: "#1E4D3A", color: "#F7F4ED", fontFamily: "Manrope, sans-serif", fontWeight: 600, borderRadius: 2 }}><MessageCircle size={16} /> Open WhatsApp Again</a>
            <a href={mailtoHref()} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm border" style={{ borderColor: "#C8A542", color: "#1E4D3A", fontFamily: "Manrope, sans-serif", fontWeight: 600, borderRadius: 2 }}><Mail size={16} /> Prefer Email? Send Instead</a>
          </div>
          <button onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", category: "", product: "", message: "", preferred: "WhatsApp" }); }} className="mt-8 text-xs uppercase tracking-wide" style={{ color: "#999", fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>Submit Another Request</button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24" style={{ background: "#FFFFFF" }}>
      <div className="max-w-2xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label="Full Name" required><input style={fieldStyle} onFocus={focusGold} onBlur={blurGray} value={form.name} onChange={update("name")} placeholder="Your full name" /></Field>
            <Field label="Phone Number" required><input style={fieldStyle} onFocus={focusGold} onBlur={blurGray} value={form.phone} onChange={update("phone")} placeholder="e.g. 0803 000 0000" /></Field>
          </div>
          <Field label="Email Address" required><input type="email" style={fieldStyle} onFocus={focusGold} onBlur={blurGray} value={form.email} onChange={update("email")} placeholder="you@email.com" /></Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label="Product Category">
              <select style={fieldStyle} onFocus={focusGold} onBlur={blurGray} value={form.category} onChange={update("category")}>
                <option value="">Select a category</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Specific Product"><input style={fieldStyle} onFocus={focusGold} onBlur={blurGray} value={form.product} onChange={update("product")} placeholder="e.g. Royal Armchair" /></Field>
          </div>
          <Field label="Message"><textarea rows={5} style={{ ...fieldStyle, resize: "vertical" }} onFocus={focusGold} onBlur={blurGray} value={form.message} onChange={update("message")} placeholder="Tell us about your space, quantity, timeline or any references..." /></Field>
          <Field label="Preferred Contact Method" required>
            <div className="flex flex-wrap gap-3">
              {CONTACT_METHODS.map((m) => (
                <button type="button" key={m} onClick={() => setForm((f) => ({ ...f, preferred: m }))} className="px-5 py-2.5 text-xs uppercase tracking-wide transition-all" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, borderRadius: 2, border: "1px solid", borderColor: form.preferred === m ? "#1E4D3A" : "#EAEAEA", background: form.preferred === m ? "#1E4D3A" : "transparent", color: form.preferred === m ? "#F7F4ED" : "#666" }}>{m}</button>
              ))}
            </div>
          </Field>
          {error && <p className="text-sm" style={{ color: "#B0413E", fontFamily: "Manrope, sans-serif" }}>{error}</p>}
          <button type="button" disabled={saving} onClick={handleSubmit} className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm mt-2" style={{ background: "#1E4D3A", color: "#F7F4ED", fontFamily: "Manrope, sans-serif", fontWeight: 600, borderRadius: 2, opacity: saving ? 0.7 : 1 }}>
            {saving ? "Sending..." : "Send Request"} <Send size={16} />
          </button>
          <p className="text-xs text-center" style={{ color: "#999", fontFamily: "Manrope, sans-serif" }}>Submitting saves your request and opens WhatsApp with your details pre-filled.</p>
        </div>
      </div>
    </section>
  );
}
