/* global Buffer, process */

const ADMIN_EMAIL = cleanEnvValue(process.env.ADMIN_EMAIL || "Kenyaniemmanuel44@gmail.com");
const ADMIN_PASSWORD = cleanEnvValue(process.env.ADMIN_PASSWORD || "admin123");

function cleanEnvValue(value) {
  return String(value || "").trim().replace(/^["']|["']$/g, "");
}

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Cache-Control", "no-store");
  response.end(JSON.stringify(payload));
}

async function readBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    sendJson(response, 405, { message: "Method not allowed." });
    return;
  }

  const sessionToken = cleanEnvValue(process.env.PORTFOLIO_WRITE_TOKEN);
  if (!sessionToken) {
    sendJson(response, 503, { success: false, message: "Admin session token is not configured." });
    return;
  }

  const { email = "", password = "" } = await readBody(request);
  const submittedEmail = cleanEnvValue(email).toLowerCase();
  const submittedPassword = cleanEnvValue(password);
  const isValid = submittedEmail === ADMIN_EMAIL.toLowerCase() && submittedPassword === ADMIN_PASSWORD;

  if (!isValid) {
    sendJson(response, 401, { success: false, message: "Invalid email or password." });
    return;
  }

  const secureFlag = process.env.NODE_ENV === "production" ? "; Secure" : "";
  response.setHeader(
    "Set-Cookie",
    `portfolio_admin_session=${encodeURIComponent(sessionToken)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=604800${secureFlag}`
  );
  sendJson(response, 200, { success: true });
}
