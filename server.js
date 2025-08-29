// Simple Express server for Ω Decoder app
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Serve static files
app.use(express.static('.'));
app.use(express.json());

// API endpoint for resistor analysis
app.post('/api/analyze-resistor', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Read the uploaded image
    const imagePath = req.file.path;
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');

    // Google Gemini API integration
    const analysis = await analyzeResistorWithGemini(base64Image, req.file.mimetype);

    // Clean up uploaded file
    fs.unlinkSync(imagePath);

    res.json({ analysis });

  } catch (error) {
    console.error('Error analyzing resistor:', error);
    
    // Clean up uploaded file in case of error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ 
      error: 'Failed to analyze resistor',
      details: error.message 
    });
  }
});

async function analyzeResistorWithGemini(base64Image, mimeType) {
  // You need to install the Google Gemini SDK: npm install @google/genai
  // And set your API key: export GOOGLE_API_KEY=your_api_key_here
  
  try {
    const { GoogleGenAI } = require('@google/genai');
    
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY
    });

    const prompt = 'You are an expert electronics engineer. Analyze the provided image of a resistor. Identify the color bands in their correct order, from left to right. Based on the standard 4-band or 5-band resistor color code, determine the significant digits, the multiplier, and the tolerance. Calculate the final resistance value and express it with appropriate units (e.g., Ω, kΩ, MΩ). Also, state the tolerance percentage. Provide a step-by-step explanation of your calculation. If you cannot clearly identify the bands or if the component is not a resistor, please state that in the error field. Respond ONLY with a JSON object that matches the provided schema.';

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

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    details: error.message 
  });
});

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.listen(PORT, () => {
  console.log(`🚀 Ω Decoder server running on http://localhost:${PORT}`);
  console.log('📋 Make sure to set GOOGLE_API_KEY environment variable');
  console.log('📦 Install dependencies: npm install express multer @google/genai');
});

module.exports = app;