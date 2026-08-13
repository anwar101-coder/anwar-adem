import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import cafe from "@/assets/cafe.png";
import { Reveal } from "./Reveal";

export function Interests() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal direction="right">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-tr from-accent/25 to-primary/25 blur-3xl" />
            <div className="glass relative overflow-hidden rounded-[2rem] p-2">
              <motion.img
                style={{ y }}
                src={cafe}
                alt="Anwar Adem holding a coffee in a café"
                loading="lazy"
                width={600}
                height={780}
                className="h-64 w-full scale-110 rounded-[1.6rem] object-cover sm:h-80 lg:h-[26rem]"
              />
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="mono-tag text-accent">05 — Beyond the code</p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Curious by default, <span className="text-gradient">disciplined by habit</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-muted-foreground">
              I'm interested in web development, software engineering, artificial intelligence,
              problem-solving and emerging technologies. I enjoy learning how technology can be used
              to create useful solutions and improve the way people interact with digital products.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              ["Web development", "Interfaces people actually enjoy"],
              ["Software engineering", "Clean, maintainable systems"],
              ["Artificial intelligence", "Practical, useful applications"],
              ["Problem-solving", "The part I like most"],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={0.15 + i * 0.06}>
                <div className="glass card-hover rounded-2xl p-5">
                  <p className="font-semibold">{t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
