import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    leads: defineTable({
        email: v.string(),
        type: v.string(), // "detox", "meal-plan", "legacy"
        score: v.string(), // "HIGH", "LOW", "PENDING"
        answers: v.any(),  // Store the raw quiz answers for context
        status: v.string(), // "new", "emailed", "converted"
        createdAt: v.number(),
    }),
});
