import { GraduationCap, Sparkles, Target, Wrench } from "lucide-react";
import thinking from "@/assets/thinking.png.asset.json";
import { Counter, Reveal } from "./Reveal";
import { STATS, TOOLS, SKILLS } from "./data";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8">
      <Reveal>
        <p className="mono-tag text-accent">01 — The story so far</p>
        <h2 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          A student by day, a builder <span className="text-gradient">every hour after</span>.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-6">
        <Reveal className="md:col-span-4" direction="right">
          <article className="glass card-hover h-full rounded-3xl p-8">
            <Sparkles className="h-6 w-6 text-primary" />
            <h3 className="mt-5 text-xl font-bold">Introduction</h3>
            <p className="mt-3 text-muted-foreground">
              I'm a Computer Science student and aspiring software developer with a strong passion
              for building modern, practical, and user-friendly digital experiences. I enjoy turning
              ideas into functional websites and applications while continuously expanding my skills
              in software development, problem-solving, and emerging technologies.
            </p>
          </article>
        </Reveal>

        <Reveal className="md:col-span-2" direction="left" delay={0.1}>
          <article className="glass card-hover h-full overflow-hidden rounded-3xl">
            <img
              src={thinking.url}
              alt="Anwar Adem working at his desk"
              loading="lazy"
              width={600}
              height={800}
              className="h-48 w-full object-cover object-top transition-transform duration-700 hover:scale-105 sm:h-60 md:h-full"
            />
          </article>
        </Reveal>

        {STATS.map((s, i) => (
          <Reveal key={s.label} className="md:col-span-2" delay={i * 0.08}>
            <article className="glass card-hover rounded-3xl p-7 text-center">
              <p className="text-5xl font-extrabold tracking-tight text-gradient">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mono-tag mt-2 text-muted-foreground">{s.label}</p>
            </article>
          </Reveal>
        ))}

        <Reveal className="md:col-span-3" direction="right" delay={0.05}>
          <article className="glass card-hover h-full rounded-3xl p-8">
            <GraduationCap className="h-6 w-6 text-accent" />
            <h3 className="mt-5 text-xl font-bold">Education</h3>
            <p className="mt-3 text-muted-foreground">
              Computer Science at <span className="text-foreground">Werabe University</span> —
              expected graduation June 2028. Certified in Programming and Data Science Fundamentals
              by Udacity.
            </p>
            <a
              href="https://confirm.udacity.com/Y2Z3QC6A"
              target="_blank"
              rel="noreferrer"
              className="mono-tag mt-5 inline-block rounded-full border border-accent/40 px-4 py-2 text-accent transition-colors hover:bg-accent/10"
            >
              Verify certificate
            </a>
          </article>
        </Reveal>

        <Reveal className="md:col-span-3" direction="left" delay={0.12}>
          <article className="glass card-hover h-full rounded-3xl p-8">
            <Target className="h-6 w-6 text-primary" />
            <h3 className="mt-5 text-xl font-bold">Career goal</h3>
            <p className="mt-3 text-muted-foreground">
              To become a skilled, well-rounded software engineer — gaining experience on real-world
              projects, solving meaningful problems, and eventually building innovative solutions of
              my own.
            </p>
          </article>
        </Reveal>

        <Reveal className="md:col-span-3" delay={0.05}>
          <article className="glass card-hover h-full rounded-3xl p-8">
            <h3 className="text-xl font-bold">Languages I write</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {SKILLS.map((s) => (
                <li
                  key={s}
                  className="mono-tag rounded-lg border border-border bg-surface px-3 py-2 transition-colors hover:border-primary/60 hover:text-primary"
                >
                  {s}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        <Reveal className="md:col-span-3" delay={0.12}>
          <article className="glass card-hover h-full rounded-3xl p-8">
            <Wrench className="h-6 w-6 text-accent" />
            <h3 className="mt-5 text-xl font-bold">Tools I ship with</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {TOOLS.map((s) => (
                <li
                  key={s}
                  className="mono-tag rounded-lg border border-border bg-surface px-3 py-2 transition-colors hover:border-accent/60 hover:text-accent"
                >
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              Curious, disciplined and growth-oriented — I value continuous learning, creativity,
              teamwork and delivering quality work.
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
