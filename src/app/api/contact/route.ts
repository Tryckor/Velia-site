import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  service?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let data: ContactPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const name = data.name?.trim();
  const email = data.email?.trim();
  const message = data.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Merci de renseigner votre nom, votre email et votre message." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Adresse email invalide." },
      { status: 400 }
    );
  }

  // --- Where the lead goes ---------------------------------------------------
  // To actually receive these emails, connect a provider (recommended: Resend).
  //   1. npm i resend
  //   2. Add RESEND_API_KEY and CONTACT_TO to your environment (.env.local)
  //   3. Uncomment the block below.
  //
  // import { Resend } from "resend";
  // if (process.env.RESEND_API_KEY) {
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "Velia <contact@velia.fr>",
  //     to: process.env.CONTACT_TO!,
  //     replyTo: email,
  //     subject: `Nouveau lead — ${name} (${data.service ?? "Sans précision"})`,
  //     text: [
  //       `Nom: ${name}`,
  //       `Email: ${email}`,
  //       `Entreprise: ${data.company ?? "-"}`,
  //       `Téléphone: ${data.phone ?? "-"}`,
  //       `Service: ${data.service ?? "-"}`,
  //       ``,
  //       message,
  //     ].join("\n"),
  //   });
  // }

  // Until a provider is wired, log the lead so nothing is lost in development.
  console.log("[velia] Nouveau lead:", {
    name,
    email,
    company: data.company,
    phone: data.phone,
    service: data.service,
    message,
  });

  return NextResponse.json({ ok: true });
}
