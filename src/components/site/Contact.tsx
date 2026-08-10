import { useState } from "react";
import { Check, Copy, Github, Instagram, Linkedin, Mail, Phone, FileText, Send } from "lucide-react";
import { MagneticButton, Reveal } from "./Reveal";
import { ContactForm } from "./ContactForm";
import { CONTACT } from "./data";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(CONTACT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-96 w-[80%] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]"
      />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="mono-tag text-accent">06 — Let's build something</p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">
            Have a project <span className="text-gradient">in mind?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            I'm open to freelance work, internships and collaborations. Tell me what you're building
            and I'll reply within a day.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <MagneticButton href={`mailto:${CONTACT.email}`}>
              <Mail className="h-4 w-4" /> Email me
            </MagneticButton>
            <MagneticButton href={`tel:${CONTACT.phone}`} variant="ghost">
              <Phone className="h-4 w-4" /> {CONTACT.phone}
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <button
            type="button"
            onClick={copy}
            className="glass mono-tag mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 text-muted-foreground transition-colors hover:text-accent"
          >
            {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : CONTACT.email}
          </button>
        </Reveal>

        <Reveal delay={0.28}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {[
              { href: CONTACT.github, Icon: Github, label: "GitHub" },
              { href: CONTACT.telegram, Icon: Send, label: "Telegram" },
              { href: CONTACT.linkedin, Icon: Linkedin, label: "LinkedIn" },
              { href: CONTACT.instagram, Icon: Instagram, label: "Instagram" },
              { href: CONTACT.resume, Icon: FileText, label: "Resume" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="glass card-hover inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium"
              >
                <Icon className="h-4 w-4 text-accent" />
                {label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <footer className="mx-auto mt-24 grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t border-border px-5 pt-8 sm:px-8">
        <p className="mono-tag min-w-0 truncate text-muted-foreground">
          © {new Date().getFullYear()} Anwar Adem
        </p>
        <div className="mono-tag flex shrink-0 items-center gap-4 text-muted-foreground">
          <a href={CONTACT.github} target="_blank" rel="noreferrer" className="hover:text-foreground">
            GitHub
          </a>
          <a
            href={CONTACT.telegram}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            Telegram
          </a>
          <a href="#top" className="hover:text-foreground">
            Top ↑
          </a>
        </div>
      </footer>
    </section>
  );
}
