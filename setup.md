# Ω Decoder Setup Instructions

## For Local Development

### Prerequisites
- Node.js (version 14 or higher)
- Google API key from Google AI Studio

## For Production (Vercel Deployment)

This app is designed to be deployed on Vercel with serverless functions.

## Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Google API Key**
   
   **Option A: Environment Variable (Recommended)**
   ```bash
   export GOOGLE_API_KEY=your_api_key_here
   ```
   
   **Option B: Create .env file**
   ```bash
   echo "GOOGLE_API_KEY=your_api_key_here" > .env
   ```

3. **Start the Server**
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Open the Portfolio**
   - Open your browser and go to: `http://localhost:3000`
   - Click on the Ω Decoder app in the dock
   - Upload a resistor image or take a photo to test

## How to Get Google API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign up or log in with your Google account
3. Click on "Get API Key" 
4. Create a new API key
5. Copy the key and set it as environment variable

## Features

- **Photo Upload**: Click "Photo Album" to select image from device
- **Camera Capture**: Click "Take Photo" to use device camera
- **AI Analysis**: Images are sent to Google Gemini API for resistor value analysis
- **Clean Interface**: Matches your portfolio's macOS-style design

## Troubleshooting

- **Camera not working**: Check browser permissions for camera access
- **API errors**: Verify your GOOGLE_API_KEY is set correctly
- **Upload fails**: Make sure image is under 10MB and is a valid image format

## Supported Image Formats
- JPEG
- PNG
- GIF
- WebP