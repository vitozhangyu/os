// Test endpoint with manual CORS handling
module.exports = async function handler(req, res) {
  // Set comprehensive CORS headers for multiple origins
  const allowedOrigins = [
    'https://vitozhangyu.github.io',
    'https://os-git-new-features-yu-zhangs-projects-dca1c9c8.vercel.app',
    'http://localhost:3000'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Fallback for development
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'false');
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