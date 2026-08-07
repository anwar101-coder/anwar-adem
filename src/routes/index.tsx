import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Projects } from "@/components/site/Projects";
import { Services } from "@/components/site/Services";
import { Timeline } from "@/components/site/Timeline";
import { Interests } from "@/components/site/Interests";
import { Contact } from "@/components/site/Contact";

const title = "Anwar Adem — Full-Stack Web Developer & CS Student";
const description =
  "I design and build modern, responsive websites and web applications that help businesses grow online. Portfolio, projects and contact.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Anwar Adem",
          jobTitle: "Full-Stack Web Developer",
          email: "anwaradem486@gmail.com",
          telephone: "0928099462",
          alumniOf: "Werabe University",
          sameAs: [
            "https://www.linkedin.com/in/anwar-adem",
            "https://www.instagram.com/a.n.wa.r_1",
          ],
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Services />
      <Timeline />
      <Interests />
      <Contact />
    </main>
  );
}
