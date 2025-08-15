export const onRequestPost = async (context) => {
  const { request, env } = context;

  // CORS (tillad samme-origin POST fra vores site)
  const origin = new URL(request.url).origin;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const data = await request.json();

    // Minimal validering
    const required = ["name", "email", "topic", "goal"];
    for (const k of required) {
      if (!data[k] || String(data[k]).trim().length === 0) {
        return new Response(JSON.stringify({ error: `Missing field: ${k}` }), { status: 400, headers });
      }
    }

    // Sammensæt emne og tekst
    const subject = `Request content: ${data.topic} — ${data.company || data.name}`;
    const lines = [
      "Request details",
      "----------------",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Company: ${data.company || ""}`,
      `Industry: ${data.industry || ""}`,
      `Department(s): ${data.department || ""}`,
      `Team size: ${data.team || ""}`,
      `Topic: ${data.topic}`,
      "",
      `Goal:\n${data.goal || ""}`,
      "",
      `Context:\n${data.context || ""}`,
      "",
      `Constraints:\n${data.constraints || ""}`,
      "",
      `Success measure:\n${data.success || ""}`,
      "",
      `Links/examples:\n${data.examples || ""}`,
      "",
      `Urgency:\n${data.urgency || ""}`,
    ];
    const text = lines.join("\n");

    // Send mail via Resend (https://resend.com)
    // Konfig: tilføj RESEND_API_KEY og TO_EMAIL som Secrets i Cloudflare Pages projektet.
    const RESEND_API_KEY = env.RESEND_API_KEY;
    const TO_EMAIL = env.TO_EMAIL || "contact@commercialleadershiphub.com";
    const FROM_EMAIL = env.FROM_EMAIL || "contact@commercialleadershiphub.com";

    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "Missing RESEND_API_KEY" }), { status: 500, headers });
    }

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: data.email, // så du kan svare direkte til afsender
        subject,
        text, // enkel tekstmail (robust og leveringssikker)
      }),
    });

    if (!resp.ok) {
      const err = await resp.text();
      return new Response(JSON.stringify({ error: "Email send failed", detail: err }), { status: 502, headers });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid request", detail: String(e) }), { status: 400, headers });
  }
};

// Preflight for CORS (hvis nødvendigt)
export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
