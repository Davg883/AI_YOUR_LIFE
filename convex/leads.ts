import { mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

// 🔒 SECURITY CONFIGURATION
// Add your Clerk email addresses here to grant admin access
const AUTHORISED_ADMINS = [
    "david@isleconnect.co.uk",  // Update with your actual email
    // Add more admin emails as needed
];

// Legacy capture mutation (for backwards compatibility)
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

// Diagnostic Engine capture mutation
export const captureDiagnostic = mutation({
    args: {
        email: v.string(),
        scores: v.object({
            shield: v.number(),
            firewall: v.number(),
            archive: v.number(),
        }),
        recommendation: v.string(),
    },
    handler: async (ctx, args) => {
        // Check if user exists to avoid duplicates
        const existing = await ctx.db
            .query("leads")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();

        let id;

        if (existing) {
            // Update existing record with latest diagnostic
            await ctx.db.patch(existing._id, {
                scores: args.scores,
                recommendation: args.recommendation,
                createdAt: Date.now(),
            });
            id = existing._id;
        } else {
            // Insert new lead
            id = await ctx.db.insert("leads", {
                email: args.email,
                scores: args.scores,
                recommendation: args.recommendation,
                status: "new",
                converted: false,
                createdAt: Date.now(),
            });

            // 📧 SEND WELCOME EMAIL (only for new leads)
            // Schedule the email action to run immediately after DB write
            await ctx.scheduler.runAfter(0, internal.email.sendWelcome, {
                email: args.email,
                recommendation: args.recommendation,
            });
        }

        return id;
    },
});

// Mark a lead as converted (when they click the CTA button)
export const markConverted = mutation({
    args: { id: v.id("leads") },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { converted: true });
    },
});

// 🔒 PROTECTED: Dashboard metrics query for Admin panel
export const getDashboardMetrics = query({
    args: {},
    handler: async (ctx) => {
        // 1. Verify identity is established
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("UNAUTHORISED: Establish identity link.");
        }

        // 2. Check if user has admin clearance
        const userEmail = identity.email || "";
        if (!AUTHORISED_ADMINS.includes(userEmail)) {
            throw new Error("ACCESS DENIED: Insufficient clearance level.");
        }

        // 3. Return dashboard data
        const leads = await ctx.db.query("leads").order("desc").take(100);

        // Calculate aggregates (only for leads with recommendation field)
        const diagnosticLeads = leads.filter(l => l.recommendation);
        const total = diagnosticLeads.length;
        const shieldCount = diagnosticLeads.filter(l => l.recommendation?.includes("Attention")).length;
        const firewallCount = diagnosticLeads.filter(l => l.recommendation?.includes("Metabolic")).length;
        const archiveCount = diagnosticLeads.filter(l => l.recommendation?.includes("Legacy")).length;
        const convertedCount = diagnosticLeads.filter(l => l.converted === true).length;

        return {
            leads: diagnosticLeads,
            metrics: { total, shieldCount, firewallCount, archiveCount, convertedCount },
            commander: userEmail, // Return who is viewing
        };
    },
});

// Query to get all leads (also protected)
export const getAllLeads = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity || !AUTHORISED_ADMINS.includes(identity.email || "")) {
            throw new Error("ACCESS DENIED");
        }
        return await ctx.db.query("leads").order("desc").collect();
    },
});
