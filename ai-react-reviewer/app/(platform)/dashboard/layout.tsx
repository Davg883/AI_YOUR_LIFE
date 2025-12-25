import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Simple Top Navigation */}
            <nav className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <Link href="/" className="font-bold text-xl tracking-tight text-slate-900">
                        AI YOUR BUSINESS
                    </Link>
                    <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
                        <Link href="/dashboard" className="text-slate-900">Overview</Link>
                        <Link href="/products/chefos" className="hover:text-slate-900 transition-colors">Marketplace</Link>
                    </div>
                </div>

                <UserButton afterSignOutUrl="/" />
            </nav>

            <main>{children}</main>
        </div>
    );
}
