"use node";
import { action } from "../_generated/server";
import { v } from "convex/values";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateContent = action({
    // FIX: Added projectId as an optional argument to match the frontend call
    args: {
        prompt: v.string(),
        projectId: v.optional(v.string()) // Changing to v.string() is safer if the ID format varies
    },
    handler: async (ctx, args) => {
        const apiKey = process.env.GOOGLE_API_KEY;
        if (!apiKey) throw new Error("GOOGLE_API_KEY is missing");

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        try {
            const result = await model.generateContent(args.prompt);
            const response = await result.response;
            const text = response.text();

            // Optional: If you have a logging mutation, call it here using args.projectId

            return text;
        } catch (error: any) {
            throw new Error(`Gemini Error: ${error.message}`);
        }
    },
});