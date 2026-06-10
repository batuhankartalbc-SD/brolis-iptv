exports.handler = async function(event) {
  const url = event.queryStringParameters?.url;
  if (!url) return { statusCode: 400, body: 'url param missing' };

  try {
    const res = await fetch(decodeURIComponent(url), {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "*/*",
        "Connection": "keep-alive"
      }
    });
    
    const ct  = res.headers.get('content-type') || 'text/plain';
    const body = await res.text();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': ct,
        'Access-Control-Allow-Origin': '*',
      },
      body,
    };
  } catch (e) {
    return { statusCode: 502, body: 'Proxy error: ' + e.message };
  }
};
