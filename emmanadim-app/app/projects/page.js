import { PageHeader, CTABanner } from "@/lib/ui";
import { getProjects, getContactInfo } from "@/lib/data";
import ProjectsClient from "@/components/ProjectsClient";

export const metadata = { title: "Our Projects | EMMANADIM Nigeria Limited" };

export default async function ProjectsPage() {
  const [projects, contact] = await Promise.all([getProjects(), getContactInfo()]);
  return (
    <>
      <PageHeader eyebrow="Our Projects" title="Completed spaces, from concept to final walkthrough." subtitle="A selection of homes, gardens, churches and commercial spaces furnished and finished by EMMANADIM." />
      <ProjectsClient projects={projects} />
      <CTABanner whatsapp={contact.whatsapp} />
    </>
  );
}
