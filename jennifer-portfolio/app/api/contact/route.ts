import { NextResponse } from "next/server";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    // basic email validation to reject malformed addresses early
    // keep it intentionally simple — this is only user input validation
    const emailIsValid =
      typeof email === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    if (!emailIsValid)
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM;
    const to = process.env.RESEND_TO;
    if (!apiKey || !from || !to)
      return NextResponse.json(
        { error: "Server not configured" },
        { status: 500 }
      );

    const html = `
      <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(
      email
    )}&gt;</p>
      <hr/>
      <div>${escapeHtml(message)}</div>
    `;

    // Keep the `from` address set from the environment (must be a verified sender)
    // Add reply_to so replies go directly to the user who submitted the form.
    const payload: Record<string, unknown> = {
      from,
      to: [to],
      subject: `Message from ${name}`,
      html,
      reply_to: email,
    };

    const r = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      // Attempt to parse the response body for a helpful error message —
      // Resend may return JSON or plain text.
      let detail = undefined;
      try {
        detail = await r.json();
      } catch {
        try {
          detail = await r.text();
        } catch {
          detail = undefined;
        }
      }

      // Log for server-side debugging (do not leak secrets to client)
      console.error("Resend API error", { status: r.status, detail });

      return NextResponse.json(
        { error: "Failed to send", status: r.status, detail },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

function escapeHtml(str: string) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
