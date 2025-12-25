import { query } from "./_generated/server";
export const getSiteDashboard = query({
    args: {},
    handler: async (ctx) => {
        // Return empty state to unblock frontend
        return { sites: [], hazards: [] };
    }
});