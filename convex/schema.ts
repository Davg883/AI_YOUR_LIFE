import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // The Diagnostic Lead Magnet Table
    leads: defineTable({
        email: v.string(),
        // Legacy fields (for backwards compatibility)
        type: v.optional(v.string()), // "detox", "meal-plan", "legacy"
        score: v.optional(v.string()), // "HIGH", "LOW", "PENDING"
        answers: v.optional(v.any()), // Store the raw quiz answers for context

        // New Diagnostic Engine fields
        scores: v.optional(v.object({
            shield: v.number(),
            firewall: v.number(),
            archive: v.number(),
        })),
        recommendation: v.optional(v.string()), // e.g., "Attention Defence Required"

        // Tracking fields
        status: v.string(), // "new", "emailed", "converted"
        converted: v.optional(v.boolean()), // Track if they clicked the action button
        createdAt: v.number(),
    }).index("by_email", ["email"]),
});
