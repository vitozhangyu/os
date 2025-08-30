// Very simple CORS test endpoint
module.exports = async function handler(req, res) {
  // Set CORS headers at the very beginning
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Always return success for any method
  res.status(200).json({
    message: 'Simple CORS test successful!',
    method: req.method,
    origin: req.headers.origin || 'No origin header',
    timestamp: new Date().toISOString(),
    headers: Object.keys(req.headers)
  });
}