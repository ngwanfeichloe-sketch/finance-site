export const handler = async (event) => {
  try {
    const target = event.queryStringParameters && event.queryStringParameters.url;
    if (!target || !/^https:\/\/news\.google\.com\/rss\//.test(target)) {
      return { statusCode: 400, body: "Missing or invalid url parameter" };
    }
    const res = await fetch(target, { headers: { "User-Agent": "Mozilla/5.0" } });
    const xml = await res.text();
    return {
      statusCode: 200,
      headers: {
        "content-type": "application/xml; charset=utf-8",
        "access-control-allow-origin": "*",
        "cache-control": "public, max-age=600"
      },
      body: xml
    };
  } catch (e) {
    return { statusCode: 502, body: "Fetch failed: " + String(e) };
  }
};
