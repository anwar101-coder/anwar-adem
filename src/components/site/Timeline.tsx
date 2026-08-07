import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Reveal } from "./Reveal";
import { TIMELINE } from "./data";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="journey" className="relative mx-auto max-w-4xl px-5 py-28 sm:px-8">
      <Reveal>
        <p className="mono-tag text-accent">04 — The journey</p>
        <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Milestones, in <span className="text-gradient">order</span>.
        </h2>
      </Reveal>

      <div ref={ref} className="relative mt-14 pl-10 sm:pl-14">
        <div className="absolute top-2 bottom-2 left-[13px] w-px bg-border sm:left-[21px]" />
        <motion.div
          style={{ scaleY }}
          className="absolute top-2 bottom-2 left-[13px] w-px origin-top bg-gradient-to-b from-primary to-accent sm:left-[21px]"
        />

        <ol className="space-y-10">
          {TIMELINE.map((t, i) => (
            <li key={t.title} className="relative">
              <Reveal direction="right" delay={i * 0.05}>
                <span className="absolute top-6 -left-10 grid h-6 w-6 place-items-center rounded-full border border-border bg-card sm:-left-14">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </span>
                <article className="glass card-hover rounded-2xl p-6">
                  <span className="mono-tag text-primary">{t.year}</span>
                  <h3 className="mt-2 text-lg font-bold">{t.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
