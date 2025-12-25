import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

  if (!publishableKey) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-white p-4">
        <div className="max-w-md bg-red-900/20 border border-red-500/50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-400 mb-2">Configuration Error</h2>
          <p className="mb-4">Missing Clerk Publishable Key.</p>
          <p className="text-sm opacity-80 mb-2">Please add the following to your <code className="bg-neutral-800 px-1 py-0.5 rounded">.env.local</code> file:</p>
          <pre className="bg-neutral-950 p-3 rounded text-xs overflow-x-auto">
            VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
          </pre>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
