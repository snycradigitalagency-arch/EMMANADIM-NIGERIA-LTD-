"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Wrench, Armchair, Frame, ImagePlus, Star, HelpCircle, Phone,
  Lock, LogOut, Sun, Moon, Trash2, Save, Upload, Plus, Menu, ExternalLink, Loader2,
  Sparkles, Trees, Flower2, Award, PencilRuler, HeadphonesIcon, ShieldCheck, Truck,
  Heart, Target, Eye, Users, ClipboardList, PackageCheck, Hammer, DoorOpen, MessageSquare,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const ICON_MAP = { Sparkles, Frame, Armchair, Trees, Flower2, Award, PencilRuler, HeadphonesIcon, ShieldCheck, Truck, Star, Heart, Target, Eye, Users, ClipboardList, PackageCheck, Hammer, DoorOpen, MessageSquare };
const ICON_OPTIONS = Object.keys(ICON_MAP);
const PRODUCT_CATEGORY_OPTIONS = ["Royal Chairs", "Swing & Pool Chairs", "Fiber Doors", "Flowers & Vases", "Garden & Outdoor", "Interior Accessories"];
const PROJECT_CATEGORY_OPTIONS = ["Residential", "Outdoor & Garden", "Church & Event", "Commercial"];
const GALLERY_CATEGORY_OPTIONS = ["Living Rooms", "Royal Chairs", "Outdoor & Garden", "Doors", "Events", "Accessories"];
const RATIO_OPTIONS = ["1/1", "3/4", "4/3", "4/5"];

function themeOf(dark) {
  return dark
    ? { bg: "#121A17", panel: "#1B2621", panel2: "#212E28", text: "#F3F1EA", sub: "#93A19B", border: "#2C3833", gold: "#C8A542" }
    : { bg: "#F7F4ED", panel: "#FFFFFF", panel2: "#FBFAF6", text: "#1E1E1E", sub: "#666666", border: "#E7E2D6", gold: "#C8A542" };
}
function adminInput(theme) {
  return { width: "100%", padding: "10px 13px", borderRadius: 4, border: `1px solid ${theme.border}`, background: theme.panel, color: theme.text, fontFamily: "Manrope, sans-serif", fontSize: "0.85rem", outline: "none" };
}
function AdminLabel({ theme, children }) {
  return <label className="block text-[11px] uppercase tracking-wide mb-1.5" style={{ color: theme.sub, fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>{children}</label>;
}
function AdminSaveBar({ theme, onSave, savedMsg, saving }) {
  return (
    <div className="flex items-center gap-4 mb-7">
      <button onClick={onSave} disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wide" style={{ background: theme.gold, color: "#1E1E1E", fontFamily: "Manrope, sans-serif", fontWeight: 700, borderRadius: 4, opacity: saving ? 0.6 : 1 }}>
        {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} {saving ? "Saving..." : "Save Changes"}
      </button>
      {savedMsg && <span className="text-xs" style={{ color: theme.gold, fontFamily: "Manrope, sans-serif" }}>{savedMsg}</span>}
    </div>
  );
}
function AdminCard({ theme, children, onRemove }) {
  return (
    <div className="p-5 mb-4 relative" style={{ background: theme.panel2, border: `1px solid ${theme.border}`, borderRadius: 6 }}>
      {onRemove && <button onClick={onRemove} className="absolute top-4 right-4" title="Remove"><Trash2 size={15} color="#C0524F" /></button>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-8">{children}</div>
    </div>
  );
}

/* ---------------- LOGIN ---------------- */

function AdminLogin({ onSuccess, theme }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    setLoading(false);
    if (error) { setErr("Incorrect email or password."); return; }
    onSuccess();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: theme.bg }}>
      <div className="w-full max-w-sm p-9" style={{ background: theme.panel, border: `1px solid ${theme.border}`, borderRadius: 6 }}>
        <Image src="/logo-white.png" alt="EMMANADIM" width={200} height={90} style={{ height: 46, width: "auto", margin: "0 auto 22px", display: "block" }} />
        <div className="flex items-center justify-center gap-2 mb-6">
          <Lock size={15} color={theme.gold} />
          <p className="text-xs uppercase tracking-[0.2em]" style={{ color: theme.sub, fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>Admin Access</p>
        </div>
        <div className="flex flex-col gap-4">
          <input type="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={adminInput(theme)} />
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") submit(); }} placeholder="Password" style={adminInput(theme)} />
          {err && <p className="text-xs" style={{ color: "#C0524F", fontFamily: "Manrope, sans-serif" }}>{err}</p>}
          <button type="button" disabled={loading} onClick={submit} className="py-3 text-sm" style={{ background: theme.gold, color: "#1E1E1E", fontFamily: "Manrope, sans-serif", fontWeight: 700, borderRadius: 4, opacity: loading ? 0.6 : 1 }}>{loading ? "Signing in..." : "Sign In"}</button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- HERO EDITOR ---------------- */

function HeroEditor({ theme }) {
  const [draft, setDraft] = useState({ title: "", subtitle: "" });
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { (async () => {
    const { data } = await supabase.from("hero").select("*").eq("id", 1).single();
    if (data) setDraft(data);
    setLoading(false);
  })(); }, []);

  const save = async () => {
    setSaving(true);
    await supabase.from("hero").update({ title: draft.title, subtitle: draft.subtitle, updated_at: new Date().toISOString() }).eq("id", 1);
    setSaving(false);
    setMsg("Saved."); setTimeout(() => setMsg(""), 2000);
  };

  if (loading) return <Loader2 className="animate-spin" color={theme.gold} />;
  return (
    <div>
      <AdminSaveBar theme={theme} savedMsg={msg} saving={saving} onSave={save} />
      <div className="flex flex-col gap-5 max-w-2xl">
        <div><AdminLabel theme={theme}>Hero Title</AdminLabel><textarea rows={2} style={adminInput(theme)} value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /></div>
        <div><AdminLabel theme={theme}>Hero Subtitle</AdminLabel><textarea rows={3} style={adminInput(theme)} value={draft.subtitle} onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })} /></div>
      </div>
    </div>
  );
}

/* ---------------- CONTACT EDITOR ---------------- */

function ContactEditor({ theme }) {
  const [draft, setDraft] = useState(null);
  const [locations, setLocations] = useState([]);
  const [removedLocIds, setRemovedLocIds] = useState([]);
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { (async () => {
    const { data: c } = await supabase.from("contact_info").select("*").eq("id", 1).single();
    const { data: l } = await supabase.from("locations").select("*").order("sort_order");
    setDraft(c); setLocations(l || []);
  })(); }, []);

  const updateLoc = (id, key, val) => setLocations((ls) => ls.map((l) => (l.id === id ? { ...l, [key]: val } : l)));
  const removeLoc = (id) => { setLocations((ls) => ls.filter((l) => l.id !== id)); if (!id.toString().startsWith("new-")) setRemovedLocIds((r) => [...r, id]); };
  const addLoc = () => setLocations((ls) => [...ls, { id: `new-${Date.now()}`, name: "New Location", address: "", sort_order: ls.length }]);

  const save = async () => {
    setSaving(true);
    await supabase.from("contact_info").update({ ...draft, updated_at: new Date().toISOString() }).eq("id", 1);
    if (removedLocIds.length) await supabase.from("locations").delete().in("id", removedLocIds);
    for (const loc of locations) {
      if (loc.id.toString().startsWith("new-")) {
        await supabase.from("locations").insert({ name: loc.name, address: loc.address, sort_order: loc.sort_order });
      } else {
        await supabase.from("locations").update({ name: loc.name, address: loc.address }).eq("id", loc.id);
      }
    }
    setRemovedLocIds([]);
    setSaving(false);
    setMsg("Saved."); setTimeout(() => setMsg(""), 2000);
  };

  if (!draft) return <Loader2 className="animate-spin" color={theme.gold} />;
  return (
    <div>
      <AdminSaveBar theme={theme} savedMsg={msg} saving={saving} onSave={save} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mb-8">
        <div><AdminLabel theme={theme}>Phone (display)</AdminLabel><input style={adminInput(theme)} value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} /></div>
        <div><AdminLabel theme={theme}>Phone (digits only)</AdminLabel><input style={adminInput(theme)} value={draft.phone_href} onChange={(e) => setDraft({ ...draft, phone_href: e.target.value })} /></div>
        <div><AdminLabel theme={theme}>Email</AdminLabel><input style={adminInput(theme)} value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} /></div>
        <div><AdminLabel theme={theme}>WhatsApp Number (digits only)</AdminLabel><input style={adminInput(theme)} value={draft.whatsapp} onChange={(e) => setDraft({ ...draft, whatsapp: e.target.value })} /></div>
        <div><AdminLabel theme={theme}>Business Hours</AdminLabel><input style={adminInput(theme)} value={draft.hours} onChange={(e) => setDraft({ ...draft, hours: e.target.value })} /></div>
      </div>
      <p className="text-xs uppercase tracking-wide mb-3" style={{ color: theme.sub, fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>Locations</p>
      {locations.map((loc) => (
        <AdminCard theme={theme} key={loc.id} onRemove={() => removeLoc(loc.id)}>
          <div><AdminLabel theme={theme}>Location Name</AdminLabel><input style={adminInput(theme)} value={loc.name} onChange={(e) => updateLoc(loc.id, "name", e.target.value)} /></div>
          <div><AdminLabel theme={theme}>Address</AdminLabel><input style={adminInput(theme)} value={loc.address} onChange={(e) => updateLoc(loc.id, "address", e.target.value)} /></div>
        </AdminCard>
      ))}
      <button onClick={addLoc} className="inline-flex items-center gap-2 text-xs uppercase tracking-wide mt-2" style={{ color: theme.gold, fontFamily: "Manrope, sans-serif", fontWeight: 700 }}><Plus size={14} /> Add Location</button>
    </div>
  );
}

/* ---------------- GENERIC TABLE REPEATER ---------------- */

function TableRepeater({ theme, table, orderBy = "sort_order", fields, emptyItem, mapOut, mapIn }) {
  const [items, setItems] = useState([]);
  const [removedIds, setRemovedIds] = useState([]);
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { (async () => {
    const { data } = await supabase.from(table).select("*").order(orderBy);
    setItems((data || []).map(mapIn));
    setLoading(false);
  })(); }, [table]);

  const updateItem = (id, key, val) => setItems((its) => its.map((it) => (it.id === id ? { ...it, [key]: val } : it)));
  const removeItem = (id) => { setItems((its) => its.filter((it) => it.id !== id)); if (!id.toString().startsWith("new-")) setRemovedIds((r) => [...r, id]); };
  const addItem = () => setItems((its) => [...its, { id: `new-${Date.now()}`, ...emptyItem }]);

  const save = async () => {
    setSaving(true);
    if (removedIds.length) await supabase.from(table).delete().in("id", removedIds);
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const payload = mapOut(it, i);
      if (it.id.toString().startsWith("new-")) {
        await supabase.from(table).insert(payload);
      } else {
        await supabase.from(table).update(payload).eq("id", it.id);
      }
    }
    setRemovedIds([]);
    setSaving(false);
    setMsg("Saved. Refresh this tab to see updated IDs.");
    setTimeout(() => setMsg(""), 3000);
  };

  if (loading) return <Loader2 className="animate-spin" color={theme.gold} />;
  return (
    <div>
      <AdminSaveBar theme={theme} savedMsg={msg} saving={saving} onSave={save} />
      {items.map((item) => (
        <AdminCard theme={theme} key={item.id} onRemove={() => removeItem(item.id)}>
          {fields.map((f) => (
            <div key={f.key} className={f.wide ? "sm:col-span-2" : ""}>
              <AdminLabel theme={theme}>{f.label}</AdminLabel>
              {f.type === "textarea" ? (
                <textarea rows={f.rows || 3} style={adminInput(theme)} value={item[f.key] || ""} onChange={(e) => updateItem(item.id, f.key, e.target.value)} />
              ) : f.type === "select" ? (
                <select style={adminInput(theme)} value={item[f.key] || f.options[0]} onChange={(e) => updateItem(item.id, f.key, e.target.value)}>
                  {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input style={adminInput(theme)} value={item[f.key] || ""} onChange={(e) => updateItem(item.id, f.key, e.target.value)} />
              )}
            </div>
          ))}
        </AdminCard>
      ))}
      <button onClick={addItem} className="inline-flex items-center gap-2 text-xs uppercase tracking-wide mt-2" style={{ color: theme.gold, fontFamily: "Manrope, sans-serif", fontWeight: 700 }}><Plus size={14} /> Add New</button>
    </div>
  );
}

/* ---------------- GALLERY EDITOR (real Supabase Storage upload) ---------------- */

function GalleryEditor({ theme }) {
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { (async () => {
    const { data } = await supabase.from("gallery").select("*").order("sort_order");
    setItems(data || []);
    setLoading(false);
  })(); }, []);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("gallery").upload(path, file, { upsert: false });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from("gallery").getPublicUrl(path);
      const { data: inserted, error: insErr } = await supabase.from("gallery").insert({
        title: "New Image", category: GALLERY_CATEGORY_OPTIONS[0], ratio: "1/1", image_url: pub.publicUrl, sort_order: items.length,
      }).select().single();
      if (insErr) throw insErr;
      setItems((its) => [inserted, ...its]);
    } catch (err) {
      alert("Upload failed: " + (err.message || "unknown error"));
    }
    setUploading(false);
    e.target.value = "";
  };

  const updateItem = async (id, key, val) => {
    setItems((its) => its.map((it) => (it.id === id ? { ...it, [key]: val } : it)));
  };
  const saveItem = async (id, key, val) => {
    await supabase.from("gallery").update({ [key]: val }).eq("id", id);
    setMsg("Saved."); setTimeout(() => setMsg(""), 1500);
  };
  const removeItem = async (id) => {
    await supabase.from("gallery").delete().eq("id", id);
    setItems((its) => its.filter((it) => it.id !== id));
  };

  if (loading) return <Loader2 className="animate-spin" color={theme.gold} />;
  return (
    <div>
      <div className="flex items-center gap-4 mb-7">
        <label className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wide cursor-pointer" style={{ border: `1px dashed ${theme.gold}`, color: theme.gold, fontFamily: "Manrope, sans-serif", fontWeight: 700, borderRadius: 4 }}>
          {uploading ? <><Loader2 size={14} className="animate-spin" /> Uploading...</> : <><Upload size={14} /> Upload Image</>}
          <input type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} disabled={uploading} />
        </label>
        {msg && <span className="text-xs" style={{ color: theme.gold, fontFamily: "Manrope, sans-serif" }}>{msg}</span>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <div key={item.id} className="p-4 relative" style={{ background: theme.panel2, border: `1px solid ${theme.border}`, borderRadius: 6 }}>
            <button onClick={() => removeItem(item.id)} className="absolute top-3 right-3 z-10" title="Remove"><Trash2 size={15} color="#C0524F" /></button>
            <div className="mb-3" style={{ aspectRatio: "1/1", overflow: "hidden", borderRadius: 4, background: theme.border }}>
              {item.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image_url} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div className="w-full h-full flex items-center justify-center"><ImagePlus size={22} color={theme.sub} /></div>
              )}
            </div>
            <AdminLabel theme={theme}>Title</AdminLabel>
            <input style={{ ...adminInput(theme), marginBottom: 10 }} value={item.title} onChange={(e) => updateItem(item.id, "title", e.target.value)} onBlur={(e) => saveItem(item.id, "title", e.target.value)} />
            <AdminLabel theme={theme}>Category</AdminLabel>
            <select style={adminInput(theme)} value={item.category} onChange={(e) => { updateItem(item.id, "category", e.target.value); saveItem(item.id, "category", e.target.value); }}>
              {GALLERY_CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- QUOTE REQUESTS VIEWER ---------------- */

function QuoteRequestsViewer({ theme }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { (async () => {
    const { data } = await supabase.from("quote_requests").select("*").order("created_at", { ascending: false });
    setRequests(data || []);
    setLoading(false);
  })(); }, []);

  if (loading) return <Loader2 className="animate-spin" color={theme.gold} />;
  if (!requests.length) return <p style={{ color: theme.sub, fontFamily: "Manrope, sans-serif" }}>No quote requests yet.</p>;

  return (
    <div className="flex flex-col gap-4">
      {requests.map((r) => (
        <div key={r.id} className="p-5" style={{ background: theme.panel2, border: `1px solid ${theme.border}`, borderRadius: 6 }}>
          <div className="flex items-center justify-between mb-2">
            <p style={{ color: theme.text, fontFamily: "Manrope, sans-serif", fontWeight: 700 }}>{r.name}</p>
            <span className="text-xs" style={{ color: theme.sub, fontFamily: "Manrope, sans-serif" }}>{new Date(r.created_at).toLocaleString()}</span>
          </div>
          <p className="text-sm" style={{ color: theme.sub, fontFamily: "Manrope, sans-serif" }}>{r.phone} · {r.email} · prefers {r.preferred_contact}</p>
          {r.category && <p className="text-sm mt-1" style={{ color: theme.gold, fontFamily: "Manrope, sans-serif" }}>{r.category}{r.product ? ` — ${r.product}` : ""}</p>}
          {r.message && <p className="text-sm mt-2" style={{ color: theme.text, fontFamily: "Manrope, sans-serif" }}>{r.message}</p>}
        </div>
      ))}
    </div>
  );
}

/* ---------------- DASHBOARD OVERVIEW ---------------- */

function DashboardOverview({ theme, setSection }) {
  const [counts, setCounts] = useState(null);
  useEffect(() => { (async () => {
    const tables = ["services", "products", "projects", "gallery", "testimonials", "faqs", "quote_requests"];
    const results = await Promise.all(tables.map((t) => supabase.from(t).select("*", { count: "exact", head: true })));
    const c = {};
    tables.forEach((t, i) => { c[t] = results[i].count || 0; });
    setCounts(c);
  })(); }, []);

  const stats = [
    { label: "Services", value: counts?.services, key: "services", icon: Wrench },
    { label: "Products", value: counts?.products, key: "products", icon: Armchair },
    { label: "Projects", value: counts?.projects, key: "projects", icon: Frame },
    { label: "Gallery Images", value: counts?.gallery, key: "gallery", icon: ImagePlus },
    { label: "Testimonials", value: counts?.testimonials, key: "testimonials", icon: Star },
    { label: "FAQs", value: counts?.faqs, key: "faqs", icon: HelpCircle },
    { label: "Quote Requests", value: counts?.quote_requests, key: "requests", icon: Phone },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
      {stats.map((s) => (
        <button key={s.key} onClick={() => setSection(s.key)} className="p-6 text-left" style={{ background: theme.panel2, border: `1px solid ${theme.border}`, borderRadius: 6 }}>
          <s.icon size={18} color={theme.gold} />
          <p className="mt-4 text-2xl" style={{ fontFamily: "'Playfair Display', serif", color: theme.text }}>{s.value ?? "…"}</p>
          <p className="text-xs uppercase tracking-wide mt-1" style={{ color: theme.sub, fontFamily: "Manrope, sans-serif", fontWeight: 600 }}>{s.label}</p>
        </button>
      ))}
    </div>
  );
}

/* ---------------- SHELL ---------------- */

const ADMIN_SECTIONS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "hero", label: "Hero & Homepage", icon: Sparkles },
  { key: "services", label: "Services", icon: Wrench },
  { key: "products", label: "Products", icon: Armchair },
  { key: "projects", label: "Projects", icon: Frame },
  { key: "gallery", label: "Gallery", icon: ImagePlus },
  { key: "testimonials", label: "Testimonials", icon: Star },
  { key: "faqs", label: "FAQs", icon: HelpCircle },
  { key: "contact", label: "Contact Info", icon: Phone },
  { key: "requests", label: "Quote Requests", icon: Phone },
];

function AdminShell({ onLogout }) {
  const [dark, setDark] = useState(true);
  const [section, setSection] = useState("dashboard");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const theme = themeOf(dark);

  return (
    <div style={{ minHeight: "100vh", background: theme.bg }}>
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${theme.border}`, background: theme.panel }}>
        <div className="flex items-center gap-3">
          <button className="lg:hidden" onClick={() => setMobileNavOpen(!mobileNavOpen)}><Menu size={20} color={theme.text} /></button>
          <Image src={dark ? "/logo-white.png" : "/logo.png"} alt="EMMANADIM" width={140} height={60} style={{ height: 30, width: "auto" }} />
          <span className="text-xs uppercase tracking-wide hidden sm:inline" style={{ color: theme.gold, fontFamily: "Manrope, sans-serif", fontWeight: 700 }}>Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setDark(!dark)} className="w-9 h-9 flex items-center justify-center" style={{ border: `1px solid ${theme.border}`, borderRadius: 4 }}>
            {dark ? <Sun size={15} color={theme.text} /> : <Moon size={15} color={theme.text} />}
          </button>
          <a href="/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3.5 py-2 text-xs uppercase tracking-wide" style={{ border: `1px solid ${theme.border}`, color: theme.text, fontFamily: "Manrope, sans-serif", fontWeight: 600, borderRadius: 4 }}>
            <ExternalLink size={13} /> View Site
          </a>
          <button onClick={onLogout} className="inline-flex items-center gap-2 px-3.5 py-2 text-xs uppercase tracking-wide" style={{ background: theme.gold, color: "#1E1E1E", fontFamily: "Manrope, sans-serif", fontWeight: 700, borderRadius: 4 }}>
            <LogOut size={13} /> Logout
          </button>
        </div>
      </div>

      <div className="flex">
        <aside className={`${mobileNavOpen ? "block" : "hidden"} lg:block w-64 shrink-0 p-5`} style={{ borderRight: `1px solid ${theme.border}`, background: theme.panel, minHeight: "calc(100vh - 65px)" }}>
          <div className="flex flex-col gap-1">
            {ADMIN_SECTIONS.map((s) => (
              <button key={s.key} onClick={() => { setSection(s.key); setMobileNavOpen(false); }} className="flex items-center gap-3 px-3.5 py-2.5 text-sm text-left" style={{ background: section === s.key ? theme.panel2 : "transparent", color: section === s.key ? theme.gold : theme.text, fontFamily: "Manrope, sans-serif", fontWeight: section === s.key ? 700 : 500, borderRadius: 4 }}>
                <s.icon size={16} /> {s.label}
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 p-6 lg:p-10 max-w-5xl">
          <h1 className="mb-8" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: theme.text }}>
            {ADMIN_SECTIONS.find((s) => s.key === section)?.label}
          </h1>

          {section === "dashboard" && <DashboardOverview theme={theme} setSection={setSection} />}
          {section === "hero" && <HeroEditor theme={theme} />}
          {section === "services" && (
            <TableRepeater theme={theme} table="services"
              fields={[{ key: "title", label: "Service Title" }, { key: "icon", label: "Icon", type: "select", options: ICON_OPTIONS }, { key: "description", label: "Description", type: "textarea", wide: true }]}
              emptyItem={{ title: "New Service", icon: "Sparkles", description: "" }}
              mapIn={(row) => row}
              mapOut={(it, i) => ({ title: it.title, icon: it.icon, description: it.description, sort_order: i })}
            />
          )}
          {section === "products" && (
            <TableRepeater theme={theme} table="products"
              fields={[{ key: "name", label: "Product Name" }, { key: "category", label: "Category", type: "select", options: PRODUCT_CATEGORY_OPTIONS }, { key: "description", label: "Short Description", type: "textarea", wide: true }]}
              emptyItem={{ name: "New Product", category: PRODUCT_CATEGORY_OPTIONS[0], description: "" }}
              mapIn={(row) => row}
              mapOut={(it, i) => ({ name: it.name, category: it.category, description: it.description, sort_order: i })}
            />
          )}
          {section === "projects" && (
            <TableRepeater theme={theme} table="projects" orderBy="created_at"
              fields={[{ key: "title", label: "Project Title" }, { key: "category", label: "Category", type: "select", options: PROJECT_CATEGORY_OPTIONS }, { key: "ratio", label: "Image Shape", type: "select", options: RATIO_OPTIONS }]}
              emptyItem={{ title: "New Project", category: PROJECT_CATEGORY_OPTIONS[0], ratio: "3/4" }}
              mapIn={(row) => row}
              mapOut={(it) => ({ title: it.title, category: it.category, ratio: it.ratio })}
            />
          )}
          {section === "gallery" && <GalleryEditor theme={theme} />}
          {section === "testimonials" && (
            <TableRepeater theme={theme} table="testimonials"
              fields={[{ key: "initials", label: "Initials (e.g. A.O.)" }, { key: "name", label: "Client Name" }, { key: "role", label: "Role / Location", wide: true }, { key: "quote", label: "Quote", type: "textarea", wide: true }]}
              emptyItem={{ initials: "N.N.", name: "Client Name", role: "", quote: "" }}
              mapIn={(row) => row}
              mapOut={(it, i) => ({ initials: it.initials, name: it.name, role: it.role, quote: it.quote, sort_order: i })}
            />
          )}
          {section === "faqs" && (
            <TableRepeater theme={theme} table="faqs"
              fields={[{ key: "group_name", label: "Group" }, { key: "question", label: "Question", wide: true }, { key: "answer", label: "Answer", type: "textarea", wide: true }]}
              emptyItem={{ group_name: "Ordering & Quotes", question: "New question?", answer: "" }}
              mapIn={(row) => row}
              mapOut={(it, i) => ({ group_name: it.group_name, question: it.question, answer: it.answer, sort_order: i })}
            />
          )}
          {section === "contact" && <ContactEditor theme={theme} />}
          {section === "requests" && <QuoteRequestsViewer theme={theme} />}
        </main>
      </div>
    </div>
  );
}

/* ---------------- ROOT ---------------- */

export default function AdminPage() {
  const [session, setSession] = useState(undefined);
  const theme = themeOf(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return <div className="min-h-screen flex items-center justify-center" style={{ background: theme.bg }}><Loader2 className="animate-spin" color={theme.gold} /></div>;
  }
  if (!session) return <AdminLogin theme={theme} onSuccess={() => {}} />;
  return <AdminShell onLogout={() => supabase.auth.signOut()} />;
}
