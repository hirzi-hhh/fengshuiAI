const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// --- Configuration ---
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// --- Helper Function ---
function bufferToGenerativePart(buffer, mimeType) {
  return { inlineData: { data: buffer.toString('base64'), mimeType } };
}

// --- Main Route Handler ---
router.post('/', upload.single('roomImage'), async (req, res) => {
  const { style, colorPalette, budget } = req.body;
  const imageFile = req.file;

  // --- Validation ---
  if (!imageFile || !style) {
    return res.status(400).json({ message: 'Image and style are required.' });
  }
  if (!process.env.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY === 'YOUR_API_KEY_HERE') {
    return res.status(500).json({ message: 'Google API key is not configured.' });
  }

  try {
    console.log('--- Initializing AI Consultant Request ---');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // --- The AI Consultant Prompt ---
    const prompt = `
      You are "FENGSHUI AI," an expert interior designer providing a digital consultation.
      Analyze the user's room photo and their preferences for a "${style}" style, a "${colorPalette}" color palette, and a "${budget}" budget.
      Your response MUST be a single, valid JSON object with no markdown.
      The JSON object must contain three properties: "designDescription", "actionSteps", and "shoppingList".

      1. "designDescription": A creative, one-paragraph description of the new room design.
      2. "actionSteps": An array of 3-5 strings of actionable steps.
      3. "shoppingList": An array of 3-5 objects, each with "item", "details", and "affiliateUrl" properties.
    `;

    const imagePart = bufferToGenerativePart(imageFile.buffer, imageFile.mimetype);

    console.log('--- Sending request to Gemini API with model: gemini-2.5-flash-latest ---');
    const result = await model.generateContentStream([prompt, imagePart]);

    // *** FIX: Await the aggregated response from the stream directly. ***
    // This is the correct and simpler way to get the full text response.
    const response = await result.response;
    const aiResponseText = response.text();
    
    console.log('--- Received raw response from Gemini ---', aiResponseText);

    // Clean up the response to ensure it's valid JSON
    const cleanedJsonString = aiResponseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const aiJsonResponse = JSON.parse(cleanedJsonString);

    // --- Final Response to Frontend ---
    res.status(200).json({
      message: 'Design plan generated successfully!',
      designPlan: aiJsonResponse,
    });

  } catch (e) {
    console.error('--- AI Generation Error ---', e);
    res.status(500).json({ message: `An error occurred during AI generation: ${e.message}` });
  }
});

module.exports = router;
