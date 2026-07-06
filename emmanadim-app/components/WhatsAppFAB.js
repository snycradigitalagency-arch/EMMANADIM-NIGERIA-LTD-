"use client";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFAB({ whatsapp }) {
  return (
    <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg" style={{ background: "#1E4D3A" }}>
      <MessageCircle size={24} color="#F7F4ED" />
    </a>
  );
}
