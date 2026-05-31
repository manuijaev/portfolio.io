/* global Buffer, process */

const PORTFOLIO_KEY = "portfolio:data";

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Cache-Control", "no-store");
  response.end(JSON.stringify(payload));
}

function getRedisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  return url && token ? { url, token } : null;
}

function isAuthorizedWrite(request) {
  const expectedToken = process.env.PORTFOLIO_WRITE_TOKEN;
  const incomingToken = request.headers["x-portfolio-write-token"];

  return Boolean(expectedToken) && incomingToken === expectedToken;
}

async function redisRequest(command) {
  const config = getRedisConfig();
  if (!config) {
    return { configured: false };
  }

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  if (!response.ok) {
    return { configured: true, ok: false };
  }

  const payload = await response.json();
  return { configured: true, ok: true, result: payload?.result };
}

async function readBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

export default async function handler(request, response) {
  if (request.method === "GET") {
    const result = await redisRequest(["GET", PORTFOLIO_KEY]);

    if (!result.configured) {
      sendJson(response, 503, { data: null, message: "Remote portfolio storage is not configured." });
      return;
    }

    if (!result.ok) {
      sendJson(response, 502, { data: null, message: "Remote portfolio storage failed." });
      return;
    }

    sendJson(response, 200, { data: result.result ? JSON.parse(result.result) : null });
    return;
  }

  if (request.method === "PUT") {
    if (!isAuthorizedWrite(request)) {
      sendJson(response, 401, { success: false, message: "Portfolio write token is missing or invalid." });
      return;
    }

    const data = await readBody(request);

    if (!data || typeof data !== "object" || !Array.isArray(data.projects)) {
      sendJson(response, 400, { success: false, message: "Invalid portfolio payload." });
      return;
    }

    const result = await redisRequest(["SET", PORTFOLIO_KEY, JSON.stringify(data)]);

    if (!result.configured) {
      sendJson(response, 503, { success: false, message: "Remote portfolio storage is not configured." });
      return;
    }

    if (!result.ok) {
      sendJson(response, 502, { success: false, message: "Remote portfolio storage failed." });
      return;
    }

    sendJson(response, 200, { success: true });
    return;
  }

  response.setHeader("Allow", "GET, PUT");
  sendJson(response, 405, { message: "Method not allowed." });
}
