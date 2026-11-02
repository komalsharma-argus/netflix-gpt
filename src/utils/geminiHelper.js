import gemini from "./openai";
import { GEMINI_MODEL } from "./constants";

const MODELS = [
  GEMINI_MODEL,
  "gemini-3.5-flash-lite",
  "gemini-2.5-flash",
]; 

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const generateWithFallback = async (prompt) => {
  for (const model of MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await gemini.models.generateContent({
          model,
          contents: prompt,
        });
        console.log("Answered by:", model);
        return response.text;
      } catch (err) {
        const busy = err?.status === 503 || err?.status === 429 ||
          String(err?.message).includes("UNAVAILABLE");
        console.warn(`${model} failed (attempt ${attempt + 1}):`, err?.message);
        if (!busy) throw err;           // real errors (bad key, bad model) shouldn't retry
        await sleep(1000 * (attempt + 1));
      }
    }
  }
  throw new Error("All Gemini models are busy right now.");
};