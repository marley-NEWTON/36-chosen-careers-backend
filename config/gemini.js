const { GoogleGenAI } = require("@google/genai");

function getClient() {
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

module.exports = { getClient };
