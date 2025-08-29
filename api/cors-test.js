// Test endpoint with manual CORS handling
export default async function handler(req, res) {
  // Set CORS headers manually
  res.setHeader('Access-Control-Allow-Origin', 'https://vitozhangyu.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Simple test response
  try {
    res.status(200).json({
      message: 'CORS test successful!',
      method: req.method,
      origin: req.headers.origin,
      timestamp: new Date().toISOString(),
      apiKeyPresent: !!process.env.GOOGLE_API_KEY
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}