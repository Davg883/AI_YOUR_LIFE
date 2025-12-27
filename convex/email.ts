"use node"; // Required for Node.js runtime (Resend SDK)

import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";


// 📧 THE SIGNAL: Welcome Protocol Email
export const sendWelcome = internalAction({
    args: {
        email: v.string(),
        recommendation: v.string(),
    },
    handler: async (ctx, args) => {
        // Dynamic content based on diagnostic result
        let subject = "Protocol Initialised";
        let headline = "Welcome to the Deep";
        let body = "Your diagnostic is complete. Begin your transformation.";
        let ctaText = "ACCESS CONSOLE";
        let ctaUrl = "https://luminousdeep.com"; // Update with your domain

        if (args.recommendation.includes("Attention")) {
            subject = "⚠️ ATTENTION DEFENCE PROTOCOL INITIALISED";
            headline = "Cognitive Bandwidth Compromised";
            body = "Your diagnostic indicates algorithmic interference patterns. The Dopamine Shield is ready to restore your sovereign attention. Access your protocol below.";
            ctaText = "INITIALISE SHIELD";
            ctaUrl = "https://luminousdeep.com/#/detox";
        } else if (args.recommendation.includes("Metabolic")) {
            subject = "🔥 METABOLIC FIREWALL PROTOCOL INITIALISED";
            headline = "Biological Inefficiency Detected";
            body = "Your diagnostic reveals suboptimal fuel sources. The Biological Firewall architecture is ready to optimise your metabolic performance.";
            ctaText = "CONSTRUCT FIREWALL";
            ctaUrl = "https://luminousdeep.com/#/meal-plan";
        } else if (args.recommendation.includes("Legacy")) {
            subject = "∞ LEGACY PRESERVATION PROTOCOL INITIALISED";
            headline = "Ephemeral Data Detected";
            body = "Your intellectual estate is currently unsecured. The Deep Archive is ready to preserve your legacy for future generations.";
            ctaText = "SECURE ARCHIVE";
            ctaUrl = "https://luminousdeep.com/#/legacy";
        }

        try {
            // Initialize Resend inside handler (lazy initialization)
            const resend = new Resend(process.env.RESEND_API_KEY);

            const response = await resend.emails.send({
                from: "Luminous Deep <onboarding@resend.dev>", // Using Resend default until custom domain verified
                to: args.email,
                subject: subject,
                html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px;">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px; background: linear-gradient(135deg, rgba(224,185,166,0.1) 0%, rgba(10,10,10,1) 100%); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px 16px 0 0;">
                            <p style="margin: 0 0 8px 0; font-size: 10px; letter-spacing: 3px; color: #e0b9a6; text-transform: uppercase;">
                                LUMINOUS DEEP INTELLIGENCE
                            </p>
                            <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #ffffff;">
                                ${headline}
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px; background-color: rgba(255,255,255,0.02); border-left: 1px solid rgba(255,255,255,0.1); border-right: 1px solid rgba(255,255,255,0.1);">
                            <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #a0a0a0;">
                                ${body}
                            </p>
                            
                            <!-- CTA Button -->
                            <table cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                                <tr>
                                    <td style="background-color: #e0b9a6; border-radius: 8px;">
                                        <a href="${ctaUrl}" style="display: inline-block; padding: 16px 32px; font-size: 14px; font-weight: bold; letter-spacing: 1px; color: #000000; text-decoration: none;">
                                            ${ctaText} →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 24px 0 0 0; font-size: 12px; color: #666666;">
                                This transmission was triggered by your diagnostic completion. Your data is encrypted and sovereign.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 24px 40px; background-color: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.1); border-top: none; border-radius: 0 0 16px 16px; text-align: center;">
                            <p style="margin: 0; font-size: 10px; letter-spacing: 2px; color: #444444; text-transform: uppercase;">
                                UK Sovereign Intelligence • Est. 2024
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
                `,
            });

            console.log("📧 Email transmitted successfully:", response);
            return { success: true, id: response.data?.id };
        } catch (error) {
            console.error("📧 Email transmission failed:", error);
            // Don't throw - we don't want to fail the mutation if email fails
            return { success: false, error: String(error) };
        }
    },
});
