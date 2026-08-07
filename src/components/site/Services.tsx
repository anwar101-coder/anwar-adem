import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Code2, Gauge, LayoutDashboard, Layers } from "lucide-react";
import { Reveal } from "./Reveal";
import { SERVICES } from "./data";

const ICONS = [Code2, Layers, LayoutDashboard, Gauge];

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-62%"]);

  return (
    <section id="services" className="relative">
      <div className="mx-auto max-w-6xl px-5 pt-28 sm:px-8">
        <Reveal>
          <p className="mono-tag text-accent">03 — What I can build for you</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Clear scope. <span className="text-gradient">Shipped work.</span>
          </h2>
        </Reveal>
      </div>

      {/* Horizontal scroll gallery */}
      <div ref={ref} className="relative h-[300vh] max-lg:hidden">
        <div className="sticky top-0 flex h-svh items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-6 px-8">
            {SERVICES.map((s, i) => {
              const Icon = ICONS[i] ?? Code2;
              return (
                <article
                  key={s.title}
                  className="glass card-hover flex h-[26rem] w-[26rem] shrink-0 flex-col justify-between rounded-3xl p-9"
                >
                  <div>
                    <span className="mono-tag text-muted-foreground">
                      0{i + 1} / 0{SERVICES.length}
                    </span>
                    <Icon className="mt-7 h-8 w-8 text-primary" />
                    <h3 className="mt-6 text-2xl font-bold">{s.title}</h3>
                    <p className="mt-3 text-muted-foreground">{s.desc}</p>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {s.items.map((it) => (
                      <li
                        key={it}
                        className="mono-tag rounded-lg border border-border bg-surface px-3 py-1.5 text-accent"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Stacked on small screens */}
      <div className="mx-auto grid max-w-6xl gap-5 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:hidden">
        {SERVICES.map((s, i) => {
          const Icon = ICONS[i] ?? Code2;
          return (
            <Reveal key={s.title} delay={i * 0.06}>
              <article className="glass card-hover h-full rounded-3xl p-7">
                <Icon className="h-7 w-7 text-primary" />
                <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className="mono-tag rounded-lg border border-border bg-surface px-3 py-1.5 text-accent"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
