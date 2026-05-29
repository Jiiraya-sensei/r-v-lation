import { createClient } from "npm:@supabase/supabase-js@2";
import { PDFDocument, StandardFonts, rgb } from "https://esm.sh/pdf-lib@1.17.1";
import QRCode from "https://esm.sh/qrcode@1.5.4";
import { type StripeEnv, createStripeClient, verifyWebhook } from "../_shared/stripe.ts";

let _supabase: ReturnType<typeof createClient> | null = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
  }
  return _supabase;
}

const TICKET_LABELS: Record<string, { title: string; subtitle: string; date: string }> = {
  ticket_semifinal_presale: {
    title: "DEMI-FINALE",
    subtitle: "Salle Sylvain-Lelièvre",
    date: "Jeudi 1er octobre 2026 · 19h",
  },
  ticket_finale_presale: {
    title: "GRANDE FINALE",
    subtitle: "Salle Sylvain-Lelièvre",
    date: "Jeudi 22 octobre 2026 · 19h",
  },
  ticket_bundle_presale: {
    title: "FORFAIT DEUX SOIRÉES",
    subtitle: "Salle Sylvain-Lelièvre",
    date: "1er + 22 octobre 2026",
  },
};

function ticketTypeFromLookup(lookupKey: string, sub: "semifinal" | "finale" | null = null):
  | "semifinal" | "finale" | "bundle_semifinal" | "bundle_finale" {
  if (lookupKey === "ticket_bundle_presale") {
    return sub === "finale" ? "bundle_finale" : "bundle_semifinal";
  }
  if (lookupKey === "ticket_finale_presale") return "finale";
  return "semifinal";
}

async function generateTicketPDF(args: {
  ticketType: "semifinal" | "finale" | "bundle_semifinal" | "bundle_finale";
  token: string;
  holderName: string;
  holderEmail: string;
  orderId: string;
}): Promise<Uint8Array> {
  const isBundleFinale = args.ticketType === "bundle_finale";
  const isBundle = args.ticketType.startsWith("bundle_");
  const baseType = args.ticketType === "finale" || isBundleFinale ? "finale" : "semifinal";

  const info = baseType === "finale"
    ? { title: isBundle ? "FORFAIT · GRANDE FINALE" : "GRANDE FINALE", date: "Jeudi 22 octobre 2026 · 19h à 21h" }
    : { title: isBundle ? "FORFAIT · DEMI-FINALE" : "DEMI-FINALE", date: "Jeudi 1er octobre 2026 · 19h à 21h" };

  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 350]); // landscape A5-ish
  const { width, height } = page.getSize();
  const helv = await pdf.embedFont(StandardFonts.HelveticaBold);
  const helvReg = await pdf.embedFont(StandardFonts.Helvetica);

  const gold = rgb(0.83, 0.69, 0.22);
  const black = rgb(0.05, 0.05, 0.05);

  // Gold border
  page.drawRectangle({ x: 0, y: 0, width, height, color: black });
  page.drawRectangle({ x: 8, y: 8, width: width - 16, height: height - 16, borderColor: gold, borderWidth: 2 });

  // Brand
  page.drawText("RÉVÉLATION", { x: 30, y: height - 50, size: 22, font: helv, color: gold });
  page.drawText("Gala de talents · Cégep Limoilou", { x: 30, y: height - 70, size: 9, font: helvReg, color: rgb(0.9, 0.9, 0.85) });

  // Event title
  page.drawText(info.title, { x: 30, y: height - 130, size: 26, font: helv, color: gold });
  page.drawText(info.date, { x: 30, y: height - 155, size: 11, font: helvReg, color: rgb(0.95, 0.95, 0.9) });
  page.drawText("Salle Sylvain-Lelièvre · Cégep Limoilou Québec", { x: 30, y: height - 173, size: 10, font: helvReg, color: rgb(0.85, 0.85, 0.8) });

  // Holder
  page.drawText("AU NOM DE", { x: 30, y: 110, size: 8, font: helv, color: rgb(0.6, 0.6, 0.55) });
  page.drawText(args.holderName || args.holderEmail, { x: 30, y: 90, size: 14, font: helv, color: rgb(1, 1, 0.95) });

  page.drawText("COMMANDE", { x: 30, y: 60, size: 7, font: helv, color: rgb(0.6, 0.6, 0.55) });
  page.drawText(args.orderId.slice(0, 18), { x: 30, y: 45, size: 8, font: helvReg, color: rgb(0.75, 0.75, 0.7) });

  page.drawText("BILLET", { x: 30, y: 30, size: 7, font: helv, color: rgb(0.6, 0.6, 0.55) });
  page.drawText(args.token.slice(0, 8).toUpperCase(), { x: 80, y: 30, size: 9, font: helv, color: gold });

  // QR
  const qrDataUrl = await QRCode.toDataURL(args.token, { width: 220, margin: 1, color: { dark: "#000000", light: "#FFD86A" } });
  const qrBase64 = qrDataUrl.split(",")[1];
  const qrBytes = Uint8Array.from(atob(qrBase64), (c) => c.charCodeAt(0));
  const qrImage = await pdf.embedPng(qrBytes);
  const qrSize = 160;
  page.drawImage(qrImage, { x: width - qrSize - 30, y: (height - qrSize) / 2 + 10, width: qrSize, height: qrSize });
  page.drawText("Présenter à l'entrée", { x: width - qrSize - 30, y: (height - qrSize) / 2 - 10, size: 8, font: helvReg, color: rgb(0.8, 0.8, 0.75) });

  return await pdf.save();
}

async function handleCheckoutCompleted(session: any, env: StripeEnv) {
  const supabase = getSupabase();
  const stripe = createStripeClient(env);

  // Idempotency: skip if already processed
  const { data: existing } = await supabase
    .from("orders")
    .select("id")
    .eq("stripe_session_id", session.id)
    .maybeSingle();
  if (existing) {
    console.log("Session already processed:", session.id);
    return;
  }

  const lookupKey = session.metadata?.price_lookup_key as string | undefined;
  const customerName = (session.metadata?.customer_name as string) || "";
  const quantity = parseInt((session.metadata?.quantity as string) || "1", 10);
  const customerEmail = session.customer_details?.email || session.customer_email || "";

  if (!lookupKey || !customerEmail) {
    console.error("Missing metadata or email on session", session.id);
    return;
  }

  // Try to link to a user account by email
  let userId: string | null = null;
  try {
    const { data: list } = await supabase.auth.admin.listUsers({ page: 1, perPage: 200 });
    const matchUser = list?.users?.find((u: any) => u.email?.toLowerCase() === customerEmail.toLowerCase());
    if (matchUser) userId = matchUser.id;
  } catch (e) {
    console.warn("Could not look up user by email:", e);
  }

  const { data: orderRow, error: orderErr } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      stripe_session_id: session.id,
      stripe_payment_intent_id: typeof session.payment_intent === "string" ? session.payment_intent : null,
      customer_email: customerEmail,
      customer_name: customerName || null,
      total_amount: session.amount_total ?? 0,
      currency: session.currency ?? "cad",
      status: "paid",
      environment: env,
    })
    .select("id")
    .single();
  if (orderErr || !orderRow) {
    console.error("Failed to insert order:", orderErr);
    return;
  }
  const orderId = orderRow.id as string;

  // Build ticket types — bundle = 1 semifinal + 1 finale per quantity
  const ticketTypes: Array<"semifinal" | "finale" | "bundle_semifinal" | "bundle_finale"> = [];
  if (lookupKey === "ticket_bundle_presale") {
    for (let i = 0; i < quantity; i++) {
      ticketTypes.push("bundle_semifinal");
      ticketTypes.push("bundle_finale");
    }
  } else {
    const single = ticketTypeFromLookup(lookupKey);
    for (let i = 0; i < quantity; i++) ticketTypes.push(single);
  }

  // Insert all ticket rows first to get tokens
  const insertPayload = ticketTypes.map((t) => ({
    order_id: orderId,
    ticket_type: t,
    holder_email: customerEmail,
  }));
  const { data: insertedTickets, error: tErr } = await supabase
    .from("tickets")
    .insert(insertPayload)
    .select("id,token,ticket_type");
  if (tErr || !insertedTickets) {
    console.error("Failed to insert tickets:", tErr);
    return;
  }

  // Generate PDFs and upload
  const pdfPaths: { ticketId: string; path: string; bytes: Uint8Array; ticketType: string }[] = [];
  for (const tkt of insertedTickets) {
    try {
      const bytes = await generateTicketPDF({
        ticketType: tkt.ticket_type as any,
        token: tkt.token as string,
        holderName: customerName,
        holderEmail: customerEmail,
        orderId,
      });
      const path = `${orderId}/${tkt.id}.pdf`;
      const { error: upErr } = await supabase.storage.from("tickets-pdf").upload(path, bytes, {
        contentType: "application/pdf",
        upsert: true,
      });
      if (upErr) {
        console.error("Upload failed for", tkt.id, upErr);
        continue;
      }
      await supabase.from("tickets").update({ pdf_path: path }).eq("id", tkt.id);
      pdfPaths.push({ ticketId: tkt.id as string, path, bytes, ticketType: tkt.ticket_type as string });
    } catch (e) {
      console.error("PDF gen failed for", tkt.id, e);
    }
  }

  // Send confirmation email with signed download links to each ticket PDF.
  try {
    const tickets = [];
    for (const p of pdfPaths) {
      const { data: signed } = await supabase.storage
        .from("tickets-pdf")
        .createSignedUrl(p.path, 60 * 60 * 24 * 30); // 30 days
      if (signed?.signedUrl) {
        tickets.push({ type: p.ticketType, url: signed.signedUrl });
      }
    }
    const totalLabel = `${(session.amount_total ?? 0) / 100} ${(session.currency ?? "cad").toUpperCase()}`;
    const url = `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-transactional-email`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
      },
      body: JSON.stringify({
        templateName: "ticket-confirmation",
        recipientEmail: customerEmail,
        idempotencyKey: `ticket-confirm-${session.id}`,
        templateData: {
          customerName: customerName || null,
          orderId: order.id,
          totalLabel,
          tickets,
        },
      }),
    });
  } catch (e) {
    console.warn("Email send skipped:", e);
  }
}

async function handleWebhook(req: Request, env: StripeEnv) {
  const event = await verifyWebhook(req, env);
  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutCompleted(event.data.object, env);
      break;
    default:
      console.log("Unhandled event:", event.type);
  }
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const rawEnv = new URL(req.url).searchParams.get("env");
  if (rawEnv !== "sandbox" && rawEnv !== "live") {
    return new Response(JSON.stringify({ received: true, ignored: "invalid env" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    await handleWebhook(req, rawEnv as StripeEnv);
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Webhook error:", e);
    return new Response("Webhook error", { status: 400 });
  }
});
