const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini API with your key from Secrets
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// @route   POST api/ai/generate-charter
// @desc    Generate a project charter using Gemini
// @access  Private
router.post("/generate-charter", auth, async (req, res) => {
  const { name, type } = req.body;

  try {
    // Use the flash model for speed
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-09-2025",
    });

    const prompt = `
      Act as a professional Project Manager expert in the ${type} industry.
      Write a concise, professional Project Charter for a project named "${name}".

      Structure the response clearly with these headers:
      1. **Executive Summary**
      2. **Key Objectives**
      3. **Scope of Work**
      4. **Key Deliverables**

      Keep the tone professional, strategic, and concise. Do not use markdown formatting like bolding or headers, just plain text with clear spacing.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ generatedText: text });
  } catch (err) {
    console.error("AI Generation Error:", err.message);
    res.status(500).send("Server Error: Failed to generate AI content");
  }
});

module.exports = router;
