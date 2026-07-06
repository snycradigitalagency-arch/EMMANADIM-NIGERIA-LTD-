import { supabase } from "./supabase";

export async function getHero() {
  const { data } = await supabase.from("hero").select("*").eq("id", 1).single();
  return data || { title: "", subtitle: "" };
}

export async function getContactInfo() {
  const { data: contact } = await supabase.from("contact_info").select("*").eq("id", 1).single();
  const { data: locations } = await supabase.from("locations").select("*").order("sort_order");
  return { ...(contact || {}), locations: locations || [] };
}

export async function getServices() {
  const { data } = await supabase.from("services").select("*").order("sort_order");
  return data || [];
}

export async function getProducts() {
  const { data } = await supabase.from("products").select("*").order("sort_order");
  return data || [];
}

export async function getProjects() {
  const { data } = await supabase.from("projects").select("*").order("created_at");
  return data || [];
}

export async function getGallery() {
  const { data } = await supabase.from("gallery").select("*").order("sort_order");
  return data || [];
}

export async function getTestimonials() {
  const { data } = await supabase.from("testimonials").select("*").order("sort_order");
  return data || [];
}

export async function getFaqs() {
  const { data } = await supabase.from("faqs").select("*").order("sort_order");
  return data || [];
}

export function galleryImageUrl(path) {
  if (!path) return null;
  const { data } = supabase.storage.from("gallery").getPublicUrl(path);
  return data.publicUrl;
}
