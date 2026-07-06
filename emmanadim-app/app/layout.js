import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { getContactInfo } from "@/lib/data";

export const metadata = {
  title: "EMMANADIM Nigeria Limited | Luxury Interior & Home Décor, Lagos",
  description: "EMMANADIM Nigeria Limited designs, sources and installs luxury furniture, décor and outdoor finishes for homes and estates across Lagos.",
  openGraph: {
    title: "EMMANADIM Nigeria Limited",
    description: "Luxury Interior & Home Décor, Lagos.",
    images: ["/logo.png"],
  },
};

export default async function RootLayout({ children }) {
  const contact = await getContactInfo();

  return (
    <html lang="en">
      <body>
        <Navbar whatsapp={contact.whatsapp} />
        <main>{children}</main>
        <Footer contact={contact} />
        <WhatsAppFAB whatsapp={contact.whatsapp} />
      </body>
    </html>
  );
}
