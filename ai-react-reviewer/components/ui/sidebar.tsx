"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutGrid,
    Truck,
    Warehouse,
    Map as MapIcon,
    ShieldCheck,
    Hexagon,
    Lock,
    Landmark,
    HardHat
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const routes = [
    {
        label: "Launchpad",
        icon: LayoutGrid,
        href: "/dashboard",
        active: false,
    },
    {
        label: "TransportOS",
        icon: Truck,
        href: "/transport",
        active: true, // The current focus
        description: "Fleet Compliance"
    },
    {
        label: "AegisOS",
        icon: ShieldCheck,
        href: "/aegis",
        active: false,
        description: "Legal Defence"
    },
    {
        label: "CivicOS",
        icon: Landmark,
        href: "/civic",
        badge: "NEW",
        description: "Planning Intelligence"
    },
    {
        label: "SiteOS",
        icon: HardHat,
        href: "/site",
        active: false,
        badge: "AI BETA",
        description: "Construction Safety"
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Hexagon className="w-8 h-8 text-blue-500 fill-blue-500/20" />
                    </div>
                    <h1 className="text-2xl font-bold">
                        Vectis One
                    </h1>
                </Link>

                <div className="space-y-1">
                    <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Modules
                    </div>

                    {routes.map((route) => (
                        <Link
                            key={route.label}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
                                route.disabled && "cursor-not-allowed opacity-50"
                            )}
                            onClick={(e) => route.disabled && e.preventDefault()}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.active ? "text-blue-500" : "text-zinc-400")} />
                                <div className="flex flex-col">
                                    <span>{route.label}</span>
                                </div>
                            </div>
                            {route.badge && (
                                <Badge variant="secondary" className="text-[10px] bg-blue-900/50 text-blue-200 border-0">
                                    {route.badge}
                                </Badge>
                            )}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Bottom Section */}
            <div className="px-3 py-2">
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-mono text-slate-400">SYSTEM ONLINE</span>
                    </div>
                    <div className="text-[10px] text-slate-600">
                        v1.2.0 • London, UK
                    </div>
                </div>
            </div>
        </div>
    );
}
