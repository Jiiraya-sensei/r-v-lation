import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

async function createCheckoutSession(options: {
  priceId: string;
  quantity?: number;
  customerEmail?: string;
  returnUrl: string;
  environment: StripeEnv;
}) {
  if (!/^[a-zA-Z0-9_-]+$/.test(options.priceId)) throw new Error("Invalid priceId");
  const stripe = createStripeClient(options.environment);

  const prices = await stripe.prices.list({ lookup_keys: [options.priceId] });
  if (!prices.data.length) throw new Error("Price not found");
  const stripePrice = prices.data[0];

  const productId =
    typeof stripePrice.product === "string" ? stripePrice.product : stripePrice.product.id;
  const product = await stripe.products.retrieve(productId);
  const productDescription = product.name;

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: stripePrice.id, quantity: options.quantity || 1 }],
    mode: "payment",
    ui_mode: "embedded_page",
    return_url: options.returnUrl,
    payment_intent_data: { description: productDescription },
    ...(options.customerEmail && { customer_email: options.customerEmail }),
  });

  return session.client_secret;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST")
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  try {
    const body = await req.json();
    const { priceId, quantity, customerEmail, returnUrl, environment } = body || {};
    if (!priceId || !returnUrl || !environment) {
      return new Response(JSON.stringify({ error: "Missing parameters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (environment !== "sandbox" && environment !== "live") {
      return new Response(JSON.stringify({ error: "Invalid environment" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const clientSecret = await createCheckoutSession({
      priceId,
      quantity,
      customerEmail,
      returnUrl,
      environment,
    });

    return new Response(JSON.stringify({ clientSecret }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("create-checkout error:", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
