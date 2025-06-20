import { GoogleGenerativeAI } from "@google/generative-ai";
import { sendError, sendSuccess } from "../Utils/response.js";
import axios from 'axios';

const callGeminiAPi = async (req, res, next) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const { text } = req.body;

  try {
    if(!text){
        return sendError(res,"Please Enter text")
    }
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" }); 

    const result = await model.generateContent(text);
    const response = await result.response;
    const output = response.text();
    return sendSuccess(res, "Gemini API response received", 200, output);
  } catch (error) {
    console.error("Error calling Gemini API:", error.message);
    return res.status(500).json({
      success: false,
      message: "",
      error: error.message,
    });
  }
};

export { callGeminiAPi };
