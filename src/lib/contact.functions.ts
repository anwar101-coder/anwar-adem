import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .max(255, "Email is too long"),
  subject: z.string().trim().min(1, "Subject is required").max(150, "Subject is too long"),
  message: z.string().trim().min(1, "Message is required").max(4000, "Message is too long"),
});

export type ContactInput = z.infer<typeof contactSchema>;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const token = process.env["TELEGRAM_BOT_TOKEN"];
    const chatId = process.env["TELEGRAM_CHAT_ID"];

    if (!token || !chatId) {
      console.error("Telegram credentials are not configured");
      return { ok: false as const };
    }

    const time = new Date().toLocaleString("en-GB", {
      timeZone: "Africa/Nairobi",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const text = [
      "📩 <b>New Portfolio Contact</b>",
      "",
      `<b>Name:</b> ${escapeHtml(data.name)}`,
      `<b>Email:</b> ${escapeHtml(data.email)}`,
      `<b>Subject:</b> ${escapeHtml(data.subject)}`,
      "",
      "<b>Message:</b>",
      escapeHtml(data.message),
      "",
      `<b>Time:</b> ${escapeHtml(time)}`,
    ].join("\n");

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const body = (await response.json().catch(() => null)) as { ok?: boolean; description?: string } | null;

    if (!response.ok || !body?.ok) {
      console.error(`Telegram sendMessage failed [${response.status}]: ${body?.description ?? "unknown error"}`);
      return { ok: false as const };
    }

    return { ok: true as const };
  });
