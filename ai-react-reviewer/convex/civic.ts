import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const seedCivicData = mutation({
    args: {},
    handler: async (ctx) => {
        // Cleanup
        const apps = await ctx.db.query("planning_apps").collect();
        for (const a of apps) await ctx.db.delete(a._id);
        const comments = await ctx.db.query("planning_comments").collect();
        for (const c of comments) await ctx.db.delete(c._id);

        // 1. Planning App
        const appId = await ctx.db.insert("planning_apps", {
            ref: "24/00056/FUL",
            site: "Medina Wharf",
            description: "Redevelopment of fuel storage facility and marine offloading infrastructure.",
            council: "Isle of Wight Council",
            status: "consultation",
            submissionDate: Date.now() - 1000 * 60 * 60 * 24 * 14, // 2 weeks ago
            decisionTargetDate: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days away
            sentimentScore: 42, // Mixed
        });

        // 2. Comments (Bot Simulation)
        await ctx.db.insert("planning_comments", {
            appId,
            author: "Sarah White",
            type: "objection",
            text: "This proposal will increase HGV traffic on residential roads significantly. It is unsafe for our children.",
            date: Date.now() - 1000 * 60 * 60 * 2,
            sentiment: "NIMBY",
            keyTopics: ["Traffic", "Safety"],
            anomalyDetected: true, // Bot Trigger
        });

        await ctx.db.insert("planning_comments", {
            appId,
            author: "David Green",
            type: "objection",
            text: "This proposal will increase HGV traffic on residential roads significantly. It is unsafe for our children.",
            date: Date.now() - 1000 * 60 * 60 * 1,
            sentiment: "NIMBY",
            keyTopics: ["Traffic", "Safety"],
            anomalyDetected: true, // Bot Trigger (Identical Text)
        });

        return "CivicOS: Planning Intelligence Active";
    },
});

export const getCivicDashboard = query({
    args: {},
    handler: async (ctx) => {
        const apps = await ctx.db.query("planning_apps").collect();
        const comments = await ctx.db.query("planning_comments").collect();

        // Group comments by anomaly
        const anomalies = comments.filter(c => !!c.anomalyDetected);

        return {
            apps,
            comments,
            anomalies,
            sentiment: { support: 35, objection: 65 } // Calculated Mock
        };
    },
});
