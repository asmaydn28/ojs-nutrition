// Netlify Edge Function - API Proxy
// Bu fonksiyon origin sorununu çözmek için API isteklerini proxy'ler

export default async (request, context) => {
  const url = new URL(request.url);
  const path = url.pathname.replace('/.netlify/functions/api-proxy', '');
  const targetUrl = `https://fe1111.projects.academy.onlyjs.com/api/v1${path}${url.search}`;

  console.log("Proxy request to:", targetUrl);

  const headers = {
    "Content-Type": "application/json",
  };
  
  const authHeader = request.headers.get("Authorization");
  if (authHeader) {
    headers["Authorization"] = authHeader;
  }

  let body = null;
  if (request.method !== "GET" && request.method !== "HEAD") {
    body = await request.text();
  }

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: headers,
      body: body,
    });

    const data = await response.text();

    return new Response(data, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
