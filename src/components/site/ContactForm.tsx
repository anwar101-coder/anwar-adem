import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { contactSchema, sendContactMessage } from "@/lib/contact.functions";

type Fields = { name: string; email: string; subject: string; message: string };
type Status = "idle" | "sending" | "success" | "error";

const EMPTY: Fields = { name: "", email: "", subject: "", message: "" };

const fieldClass =
  "w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary/60";

export function ContactForm() {
  const send = useServerFn(sendContactMessage);
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<keyof Fields, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Fields;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus("idle");
      return;
    }

    setStatus("sending");
    try {
      const result = await send({ data: parsed.data });
      if (result.ok) {
        setStatus("success");
        setValues(EMPTY);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="glass mx-auto mt-12 w-full rounded-3xl border border-border p-5 text-left sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" error={errors.name}>
          <input
            className={fieldClass}
            placeholder="Jane Doe"
            value={values.name}
            onChange={set("name")}
            autoComplete="name"
            aria-invalid={!!errors.name}
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            className={fieldClass}
            type="email"
            placeholder="jane@email.com"
            value={values.email}
            onChange={set("email")}
            autoComplete="email"
            aria-invalid={!!errors.email}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Subject" error={errors.subject}>
          <input
            className={fieldClass}
            placeholder="Let's collaborate"
            value={values.subject}
            onChange={set("subject")}
            aria-invalid={!!errors.subject}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message" error={errors.message}>
          <textarea
            className={`${fieldClass} min-h-40 resize-y`}
            placeholder="Tell me about your project or opportunity..."
            value={values.message}
            onChange={set("message")}
            aria-invalid={!!errors.message}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-7 w-full rounded-xl bg-[linear-gradient(90deg,var(--color-destructive),var(--color-accent))] px-6 py-4 text-base font-bold text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      <div aria-live="polite" className="min-h-6">
        {status === "success" && (
          <p className="mt-4 text-sm font-medium text-accent">
            ✓ Message sent successfully! I'll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm font-medium text-destructive">
            Unable to send your message. Please try again or contact me directly.
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
