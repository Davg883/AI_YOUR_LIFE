import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // 0. USERS (Auth)
    users: defineTable({
        tokenIdentifier: v.string(),
        name: v.string(),
        email: v.string(),
        image: v.optional(v.string()),
        role: v.string(),
    }).index("by_token", ["tokenIdentifier"]),

    // 1. TRANSPORT OS (Fleet)
    policies: defineTable({
        provider: v.string(),
        type: v.string(),
        policyNumber: v.string(),
        expiryDate: v.number(),
        limits: v.any(),
        restrictions: v.any(),
        docUrl: v.optional(v.string()),
    }),
    assets: defineTable({
        reg: v.string(),
        make: v.string(),
        model: v.string(),
        vin: v.string(),
        type: v.string(),
        technicalSpecs: v.any(),
        hazchemProfile: v.any(),
        compliance: v.any(),
        status: v.string(),
    }).index("by_reg", ["reg"]),
    operators: defineTable({
        name: v.string(),
        dob: v.string(),
        licence: v.any(),
        adr: v.any(),
        cpcExpiry: v.number(),
        tachoCardExpiry: v.number(),
        mandateSigned: v.boolean(),
        handbookSigned: v.boolean(),
        status: v.string(),
    }),
    maintenance_events: defineTable({
        assetId: v.id("assets"),
        date: v.number(),
        type: v.string(),
        odometer: v.number(),
        provider: v.string(),
        result: v.string(),
        notes: v.optional(v.string()),
        technicalData: v.optional(v.any()),
        docUrl: v.optional(v.string()),
    }).index("by_asset", ["assetId"]),
    shifts: defineTable({
        driverId: v.id("operators"),
        vehicleId: v.id("assets"),
        date: v.number(),
        startTime: v.number(),
        checks: v.any(),
    }),

    // 2. AEGIS OS (Legal)
    cases: defineTable({
        ref: v.string(),
        title: v.string(),
        opponent: v.string(),
        status: v.string(),
        strategy: v.string(),
        financialExposure: v.number(),
        probabilityOfSuccess: v.number(),
        nextActionDate: v.number(),
    }).index("by_status", ["status"]),
    evidence: defineTable({
        caseId: v.id("cases"),
        type: v.string(),
        title: v.string(),
        summary: v.optional(v.string()),
        sender: v.optional(v.string()),
        dateReceived: v.number(),
        sentiment: v.string(),
        docUrl: v.string(),
    }).index("by_case", ["caseId"]),
    legal_events: defineTable({
        caseId: v.id("cases"),
        title: v.string(),
        date: v.number(),
        type: v.string(),
        completed: v.boolean(),
    }).index("by_date", ["date"]),

    // 3. SITE OS (Safety)
    sites: defineTable({
        name: v.string(),
        type: v.string(),
        status: v.string(),
        manager: v.string(),
        location: v.string(),
    }),
    site_audits: defineTable({
        siteId: v.id("sites"),
        date: v.number(),
        auditor: v.string(),
        riskScore: v.number(),
        status: v.string(),
    }).index("by_site", ["siteId"]),
    site_hazards: defineTable({
        auditId: v.id("site_audits"),
        imageUrl: v.string(),
        description: v.string(),
        severity: v.string(),
        controlMeasure: v.string(),
        rectified: v.boolean(),
    }),

    // 4. CIVIC OS (Planning)
    planning_apps: defineTable({
        ref: v.string(),
        site: v.string(),
        description: v.string(),
        council: v.string(),
        status: v.string(),
        submissionDate: v.number(),
        decisionTargetDate: v.number(),
        sentimentScore: v.number(),
    }).index("by_status", ["status"]),
    // Temporary: allow missing appId to unblock schema sync; clean data then tighten back to required.
    planning_comments: defineTable({
        appId: v.optional(v.id("planning_apps")),
        author: v.optional(v.string()),
        type: v.optional(v.string()),
        text: v.optional(v.string()),
        date: v.optional(v.number()),
        sentiment: v.string(),
        anomalyDetected: v.optional(v.boolean()),
        keyTopics: v.array(v.string()),
    }).index("by_app", ["appId"]),
});
