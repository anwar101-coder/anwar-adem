import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV, CONTACT } from "./data";

export function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-60 h-[3px] origin-left bg-gradient-to-r from-primary to-accent"
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid ? "glass py-3" : "py-5"
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8"
        >
          <a
            href="#top"
            className="min-w-0 truncate text-sm font-extrabold tracking-[0.22em] uppercase"
          >
            Anwar Adem
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
            <a
              href={CONTACT.resume}
              target="_blank"
              rel="noreferrer"
              className="ml-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-105"
            >
              Resume
            </a>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="glass grid h-10 w-10 shrink-0 place-items-center rounded-xl md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass mx-5 mt-3 flex flex-col rounded-2xl p-2 md:hidden"
          >
            {[...NAV, { id: "resume", label: "Resume" }].map((n) => (
              <a
                key={n.id}
                href={n.id === "resume" ? CONTACT.resume : `#${n.id}`}
                target={n.id === "resume" ? "_blank" : undefined}
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </motion.div>
        )}
      </header>
    </>
  );
}
