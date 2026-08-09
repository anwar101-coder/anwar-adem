import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import portrait from "@/assets/portrait.png.asset.json";
import { CONTACT } from "./data";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative flex min-h-svh items-center overflow-hidden bg-background"
    >
      {/* Portrait */}
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[62%]"
      >
        <img
          src={portrait.url}
          alt="Portrait of Anwar Adem"
          className="h-full w-full object-cover object-[70%_18%] opacity-25 lg:opacity-100"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--color-background) 0%, color-mix(in oklab, var(--color-background) 85%, transparent) 40%, transparent 80%), linear-gradient(0deg, var(--color-background) 4%, color-mix(in oklab, var(--color-background) 55%, transparent) 45%, transparent 100%)",
          }}
        />
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[36rem] w-[36rem] rounded-full bg-primary/15 blur-[140px]"
      />

      {/* Copy */}
      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto w-full max-w-6xl px-5 pt-32 pb-28 sm:px-8"
      >
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-lg font-medium text-primary"
          >
            Hey there — I&apos;m Anwar
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mono-tag mt-5 text-muted-foreground"
          >
            Computer Science <span className="text-primary">•</span> Full-Stack Software Development
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-[clamp(2.6rem,7vw,5.4rem)] leading-[0.94] font-extrabold tracking-[-0.03em]"
          >
            I build digital experiences that turn{" "}
            <span className="text-primary">ideas into reality.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Computer Science student and aspiring software developer focused on building modern,
            responsive, and user-friendly websites and applications that solve real-world problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.44 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform duration-300 hover:scale-[1.03]"
            >
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
            >
              Let&apos;s Connect
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mono-tag mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-muted-foreground"
          >
            {[
              { label: "GitHub", href: CONTACT.github },
              { label: "LinkedIn", href: CONTACT.linkedin },
              { label: "Email", href: `mailto:${CONTACT.email}` },
            ].map((l, i) => (
              <span key={l.label} className="flex items-center gap-3">
                {i > 0 && <span className="text-border">·</span>}
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        style={{ opacity: fade }}
        aria-label="Scroll to about section"
        className="mono-tag absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
      >
        Scroll to explore
        <ArrowDown className="animate-scroll-cue h-4 w-4" />
      </motion.a>
    </section>
  );
}
