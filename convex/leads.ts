import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const capture = mutation({
    args: {
        email: v.string(),
        type: v.string(),
        score: v.string(),
        answers: v.any(),
    },
    handler: async (ctx, args) => {
        const newLeadId = await ctx.db.insert("leads", {
            email: args.email,
            type: args.type,
            score: args.score,
            answers: args.answers,
            status: "new",
            createdAt: Date.now(),
        });
        return newLeadId;
    },
});
