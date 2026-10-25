import { NextResponse } from "next/server";

export const runtime = "nodejs";

const TO = process.env.CONTACT_TO ?? "missouni23@gmail.com";

type Payload = {
  name?: string;
  email?: string;
  problem?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const problem = (body.problem ?? "").trim();

  if (!name || !email || !problem) {
    return NextResponse.json({ ok: false, error: "All fields are required." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please provide a valid email." }, { status: 400 });
  }

  const subject = `Portfolio inquiry from ${name}`;
  const message = `New message from your portfolio contact form\n\nName: ${name}\nEmail: ${email}\n\n${problem}`;

  try {
    // Preferred: Resend (set RESEND_API_KEY + CONTACT_FROM to a verified sender).
    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
          to: [TO],
          reply_to: email,
          subject,
          text: message,
        }),
      });
      if (!res.ok) {
        const detail = await res.text();
        return NextResponse.json({ ok: false, error: `Email provider error: ${detail}` }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    }

    // Zero-config default: FormSubmit forwards the message to the address below.
    // FormSubmit requires a real web origin, so forward the caller's origin as
    // Referer/Origin (falls back to SITE_URL in the environment).
    const origin =
      process.env.SITE_URL ??
      req.headers.get("origin") ??
      req.headers.get("referer") ??
      "https://nacermissouni.vercel.app";

    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(TO)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        Referer: origin,
      },
      body: JSON.stringify({
        name,
        email,
        message: problem,
        _subject: subject,
        _replyto: email,
        _template: "table",
        _captcha: false,
      }),
    });

    const data = (await res.json().catch(() => null)) as
      | { success?: string; message?: string }
      | null;

    if (!res.ok || data?.success !== "true") {
      return NextResponse.json(
        {
          ok: false,
          error: data?.message ?? "Email service rejected the message.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Failed to send message." },
      { status: 502 },
    );
  }
}
