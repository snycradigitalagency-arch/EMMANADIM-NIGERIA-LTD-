import LegalLayout from "@/components/LegalLayout";

export const metadata = { title: "Privacy Policy | EMMANADIM Nigeria Limited" };

const PRIVACY_SECTIONS = [
  { heading: "Information We Collect", body: ["When you request a quote, contact us, or subscribe to updates, we collect the information you provide directly, such as:", ["Full name, phone number and email address", "Product interests and project details you share with us", "Messages sent via our contact form, WhatsApp or email"], "We do not collect payment card details through this website — payment arrangements are handled directly with our team."] },
  { heading: "How We Use Your Information", body: ["Information you provide is used to prepare quotations, respond to enquiries, coordinate delivery and installation, and — where you've opted in — share occasional updates about new collections.", "We do not sell or rent your personal information to third parties."] },
  { heading: "WhatsApp & Third-Party Services", body: ["Quote requests submitted through this website may be sent via WhatsApp, which is operated by Meta Platforms, Inc. Messages sent this way are subject to WhatsApp's own privacy policy in addition to this one.", "We also use Google Maps to display our showroom locations; use of the embedded map is subject to Google's privacy policy."] },
  { heading: "Data Retention", body: ["We retain enquiry and quotation information for as long as needed to fulfil your request and maintain reasonable business records, after which it is deleted or anonymized."] },
  { heading: "Your Rights", body: ["In line with the Nigeria Data Protection Regulation (NDPR), you may request access to, correction of, or deletion of your personal information held by us at any time by contacting us using the details on our Contact page."] },
];

export default function PrivacyPage() {
  return <LegalLayout eyebrow="Privacy Policy" title="Privacy Policy" lastUpdated="July 2026" sections={PRIVACY_SECTIONS} />;
}
