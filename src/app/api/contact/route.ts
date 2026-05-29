import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/schemas/contact";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "info@darkplus.studio";
  const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "D.ARK+ Website <noreply@doloresarkitecture.com>";
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid form data", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { name, email, phone, projectType, message, website } = parsed.data;

  // Honeypot check — reject if filled
  if (website) {
    return NextResponse.json({ ok: true }); // Silently succeed for bots
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New enquiry: ${projectType} — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        `Project type: ${projectType}`,
        ``,
        `Message:`,
        message,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #1a1a1a;">
          <h2 style="margin: 0 0 24px; font-weight: 300; font-size: 22px; border-bottom: 1px solid #e5e5e5; padding-bottom: 16px;">
            New project enquiry — D.ARK+
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr><td style="padding: 8px 0; color: #666; width: 120px; font-size: 13px;">Name</td><td style="padding: 8px 0; font-size: 13px;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Email</td><td style="padding: 8px 0; font-size: 13px;"><a href="mailto:${email}" style="color: #c8a96e;">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Phone</td><td style="padding: 8px 0; font-size: 13px;">${phone}</td></tr>` : ""}
            <tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Project type</td><td style="padding: 8px 0; font-size: 13px;">${projectType}</td></tr>
          </table>
          <h3 style="margin: 0 0 12px; font-weight: 400; font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 0.05em;">Message</h3>
          <p style="margin: 0; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
          <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e5e5;" />
          <p style="margin: 0; font-size: 11px; color: #999;">Sent from the D.ARK+ website contact form.</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
