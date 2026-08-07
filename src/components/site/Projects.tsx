import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { PROJECTS } from "./data";

const FILTERS = ["All", "Web Apps", "Dashboards"];

export function Projects() {
  const [filter, setFilter] = useState("All");
  const list = PROJECTS.filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8">
      <Reveal>
        <p className="mono-tag text-accent">02 — Selected work</p>
        <h2 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          Projects that went <span className="text-gradient">live</span>, not just to a repo.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-9 flex flex-wrap gap-2" role="tablist" aria-label="Project filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`mono-tag relative rounded-full px-5 py-2.5 transition-colors ${
                filter === f ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.article
              key={p.title}
              layout
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="glass card-hover group relative flex flex-col overflow-hidden rounded-3xl p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-primary/25 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="flex items-start justify-between gap-4">
                <span className="mono-tag text-accent">{p.category}</span>
                <span className="mono-tag text-muted-foreground">{p.year}</span>
              </div>
              <h3 className="mt-5 text-2xl font-bold tracking-tight">{p.title}</h3>
              <p className="mt-3 text-muted-foreground">{p.blurb}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <li
                    key={s}
                    className="mono-tag rounded-lg border border-border bg-surface px-3 py-1.5 text-muted-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex items-center justify-between gap-4 border-t border-border pt-6">
                <p className="mono-tag text-accent">{p.result}</p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                >
                  Live site
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
