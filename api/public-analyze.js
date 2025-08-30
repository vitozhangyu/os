// Public resistor analysis endpoint with CORS
const multiparty = require('multiparty');

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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('Request received from:', req.headers.origin);
  console.log('API Key present:', !!process.env.GOOGLE_API_KEY);
  
  // Check if API key is missing and return proper error
  if (!process.env.GOOGLE_API_KEY) {
    console.error('Google API key is missing!');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    return res.status(401).json({ 
      error: 'API configuration error', 
      details: 'Google API key not configured' 
    });
  }

  try {
    const form = new multiparty.Form();
    
    const parseForm = () => new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const { files } = await parseForm();
    
    if (!files.image || !files.image[0]) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const file = files.image[0];
    const fs = require('fs');
    const imageBuffer = fs.readFileSync(file.path);
    const base64Image = imageBuffer.toString('base64');

    // Google Gemini API integration
    const analysis = await analyzeResistorWithGemini(base64Image, file.headers['content-type'] || 'image/jpeg');

    // Clean up uploaded file
    fs.unlinkSync(file.path);

    res.json({ analysis });

  } catch (error) {
    console.error('Error analyzing resistor:', error);
    res.status(500).json({ 
      error: 'Failed to analyze resistor',
      details: error.message 
    });
  }
}

async function analyzeResistorWithGemini(base64Image, mimeType) {
  try {
    const { GoogleGenAI } = require('@google/genai');
    
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY
    });

    const prompt = 'You are an expert electronics engineer. Analyze the provided image of a resistor. Identify the color bands in their correct order, from left to right. Based on the standard 4-band or 5-band resistor color code, determine the significant digits, the multiplier, and the tolerance. Calculate the final resistance value and express it with appropriate units (e.g., Ω, kΩ, MΩ). Also, state the tolerance percentage. Provide a clear, concise explanation in natural language. Start with the resistance value, then explain the color bands and calculation. If you cannot clearly identify the bands or if the component is not a resistor, please explain what you see instead.';

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          parts: [
            { text: prompt },
            { 
              inlineData: { 
                mimeType: mimeType, 
                data: base64Image 
              } 
            }
          ]
        }
      ]
    });
    
    return response.text;

  } catch (error) {
    console.error('Google Gemini API Error:', error);
    
    if (error.message.includes('API_KEY') || error.message.includes('api_key')) {
      throw new Error('Google API key not configured. Please set GOOGLE_API_KEY environment variable.');
    }
    
    throw new Error(`Google Gemini API error: ${error.message}`);
  }
}