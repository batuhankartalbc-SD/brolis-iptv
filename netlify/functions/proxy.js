exports.handler = async function(event) {
  const url = event.queryStringParameters?.url;
  if (!url) return { statusCode: 400, body: 'url param missing' };

  try {
    const res = await fetch(decodeURIComponent(url));
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
    return { statusCode: 500, body: 'Proxy error: ' + e.message };
  }
};
