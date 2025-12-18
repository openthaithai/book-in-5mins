
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { BookSummary } from "@/types";

// Initialize Gemini
// Note: In a real production app, you should proxy this through a backend to protect your API key.
// For this client-side demo, we'll use the environment variable directly.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("Missing VITE_GEMINI_API_KEY environment variable. AI features will not work.");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

const DAILY_LIMIT = 20;
const STORAGE_KEY_PREFIX = 'gemini_usage_';

const checkAndIncrementRateLimit = (): boolean => {
  const today = new Date().toISOString().split('T')[0];
  const key = `${STORAGE_KEY_PREFIX}${today}`;
  const usage = parseInt(localStorage.getItem(key) || '0', 10);
  
  if (usage >= DAILY_LIMIT) {
    return false;
  }
  
  localStorage.setItem(key, (usage + 1).toString());
  return true;
};

export const generateBookInsight = async (bookTitle: string, bookAuthor: string, description: string): Promise<Partial<BookSummary>> => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Please check your .env file.");
  }

  if (!checkAndIncrementRateLimit()) {
    throw new Error(`Daily limit of ${DAILY_LIMIT} requests reached. Please try again tomorrow.`);
  }

  // Using specific version 001 to avoid potential alias issues
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    You are an expert Book Analyst & Strategy Consultant (The "Insight Extractor").
    Your goal is to analyze the book "${bookTitle}" by ${bookAuthor} based on the provided description/content and generate distinct, actionable insights.

    CONTEXT:
    I want to recommend this book to readers by focusing on practical application and key concepts, NOT just summarizing the plot.
    
    ROLE:
    You are smart, enthusiastic, and easy to understand. You break down complex topics into fun, digestible pieces.

    TASK:
    Analyze the input text below and generate the following 4 sections.
    CRITICAL: YOU MUST NOT COPY TEXT DIRECTLY. PARAPHRASE EVERYTHING in your own specific "Smart & Enthusiastic" tone.

    INPUT TEXT:
    "${description}"

    OUTPUT FORMAT (JSON ONLY):
    {
      "bigIdea": "One catchy, headline-style sentence capturing the essence.",
      "keyTakeaways": ["Point 1 (Simple)", "Point 2 (Simple)", "Point 3 (Simple)"],
      "application": ["Actionable Step 1", "Actionable Step 2", "Actionable Step 3"],
      "insight": "A smart comparison to current events or daily life to make it relatable."
    }
    
    Ensure the output is valid JSON without markdown formatting constraints (no \`\`\`json wrappers).
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up potential markdown formatting if Gemini adds it despite instructions
    const infiniteCleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const data = JSON.parse(infiniteCleanText);

    return {
      bigIdea: data.bigIdea,
      keyTakeaways: data.keyTakeaways,
      application: data.application,
      insight: data.insight,
    };
  } catch (error) {
    console.error("Error generating insight:", error);
    throw new Error("Failed to generate insight.");
  }
};
