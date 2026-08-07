import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import portrait from "@/assets/portrait.png.asset.json";
import { MagneticButton } from "./Reveal";
import { SKILLS } from "./data";

const FLOATING = ["TS", "JS", "PY", "SQL", "C++", "{ }"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) =>
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-16"
    >
      <motion.div
        aria-hidden
        style={{
          y,
          background: "var(--gradient-hero)",
          x: mouse.x * -20,
        }}
        className="pointer-events-none absolute inset-[-20%] opacity-80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass mono-tag inline-flex items-center gap-2 rounded-full px-4 py-2"
          >
            <span className="animate-pulse-ring relative h-2 w-2 rounded-full bg-accent" />
            Available for work
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-5xl leading-[0.95] font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
          >
            I build websites <br />
            that <span className="text-gradient">grow businesses</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            I design and build modern, responsive websites and web applications that help
            businesses grow online.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.34 }}
            className="mono-tag mt-4 text-accent"
          >
            Computer Science Student • Full-Stack Web Developer
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <MagneticButton href="#work">
              View work <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              <Mail className="h-4 w-4" /> Let's talk
            </MagneticButton>
          </motion.div>

          <div className="mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <div className="animate-marquee flex w-max gap-3">
              {[...SKILLS, ...SKILLS].map((s, i) => (
                <span
                  key={i}
                  className="glass mono-tag rounded-full px-4 py-2 text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ rotateY: mouse.x * 5, rotateX: mouse.y * -5 }}
          className="relative mx-auto w-full max-w-sm [transform-style:preserve-3d]"
        >
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-primary/40 to-accent/30 blur-3xl" />
          <div className="glass relative overflow-hidden rounded-[2rem] p-2">
            <img
              src={portrait.url}
              alt="Portrait of Anwar Adem"
              width={600}
              height={800}
              className="w-full rounded-[1.6rem] object-cover transition-transform duration-700 hover:scale-[1.04]"
            />
          </div>
          {FLOATING.map((t, i) => (
            <span
              key={t}
              className="glass animate-float mono-tag absolute rounded-xl px-3 py-2 text-accent"
              style={{
                top: `${[8, 30, 62, 84, 46, 16][i]}%`,
                left: i % 2 ? "-12%" : "88%",
                animationDelay: `${i * 0.7}s`,
              }}
            >
              {t}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        style={{ opacity: fade }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-muted-foreground hover:text-foreground"
      >
        <ArrowDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}
