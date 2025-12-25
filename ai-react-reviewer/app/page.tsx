import Link from "next/link";
import { ArrowUpRight, Truck, ShieldCheck, HardHat, ChefHat, Landmark, Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans text-slate-900">
      
      {/* 1. GLOBAL NAVIGATION */}
      <nav className="flex items-center justify-between px-8 py-6 sticky top-0 z-50 bg-[#F3F4F6]/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-orange-600 rounded-lg flex items-center justify-center font-bold text-white">V</div>
            <div className="flex flex-col">
                <span className="font-bold tracking-tight leading-none">AI YOUR BUSINESS</span>
                <span className="text-[10px] text-slate-500 tracking-widest uppercase">INFRASTRUCTURE</span>
            </div>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <span className="cursor-pointer hover:text-slate-900">Methodology</span>
            <span className="cursor-pointer hover:text-slate-900">Tools</span>
            <span className="cursor-pointer hover:text-slate-900">Insights</span>
        </div>

        <Link href="/dashboard">
            <Button variant="outline" className="rounded-full px-6 border-slate-300 hover:bg-white hover:text-orange-600 transition-colors">
                Universal Login
            </Button>
        </Link>
      </nav>

      <main className="p-8 md:p-20 md:pt-12">
        
        {/* 2. HERO SECTION */}
        <div className="max-w-4xl mb-16">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05] mb-8">
              Intelligence for the <br />
              <span className="text-slate-400">Industrial World.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl leading-relaxed mb-10">
                We build verification engines for Logistics, Legal, and Public Sector. Deploy agents that see, hear, and validate your physical operations.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <Input 
                    className="h-12 pl-12 rounded-xl border-slate-200 bg-slate-100/50 text-base focus-visible:ring-orange-500" 
                    placeholder="Find tools for your sector..." 
                />
            </div>
        </div>

        {/* 3. FILTERS (Visual) */}
        <div className="flex items-center gap-6 mb-10 border-b border-slate-200 pb-4 overflow-x-auto">
            <div className="flex items-center gap-2 text-sm font-bold text-blue-600 border-b-2 border-blue-600 pb-4 -mb-4 px-2">
                <Filter className="w-4 h-4" /> All Modules
            </div>
            <div className="text-sm font-medium text-slate-500 hover:text-slate-800 cursor-pointer px-2">Logistics</div>
            <div className="text-sm font-medium text-slate-500 hover:text-slate-800 cursor-pointer px-2">Legal</div>
            <div className="text-sm font-medium text-slate-500 hover:text-slate-800 cursor-pointer px-2">Construction</div>
            <div className="text-sm font-medium text-slate-500 hover:text-slate-800 cursor-pointer px-2">Public Sector</div>
        </div>

        {/* 4. MODULE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* TRANSPORT OS */}
            <LandingCard 
                category="LOGISTICS"
                title="TransportOS"
                desc="Fleet compliance engine. Automates MOT/PMI tracking and hazardous goods verification."
                icon={Truck}
                badge="LIVE"
                badgeColor="bg-green-100 text-green-700"
                href="/transport"
            />

            {/* AEGIS OS */}
            <LandingCard 
                category="LEGAL DEFENCE"
                title="AegisOS"
                desc="Strategic litigation support. AI paralegal for document analysis and deadline tracking."
                icon={ShieldCheck}
                badge="LIVE"
                badgeColor="bg-green-100 text-green-700"
                href="/aegis"
            />

            {/* CIVIC OS */}
            <LandingCard 
                category="PUBLIC SECTOR"
                title="CivicOS"
                desc="Planning intelligence. Anomaly detection for public comments and sentiment analysis."
                icon={Landmark}
                badge="LIVE"
                badgeColor="bg-green-100 text-green-700"
                href="/civic"
            />

            {/* SITE OS */}
            <LandingCard 
                category="CONSTRUCTION"
                title="SiteOS"
                desc="Autonomous safety management. Computer vision for hazard detection and RAMS."
                icon={HardHat}
                badge="BETA"
                badgeColor="bg-orange-100 text-orange-700"
                href="/site"
            />

            {/* CHEF OS */}
            <LandingCard 
                category="HOSPITALITY"
                title="ChefOS"
                desc="Automated hygiene compliance and kitchen intelligence engine."
                icon={ChefHat}
                badge="WAITLIST"
                badgeColor="bg-slate-100 text-slate-600"
                href="#"
            />

        </div>
      </main>
    </div>
  );
}

// The "High End" Card Component matching your screenshot
function LandingCard({ category, title, desc, icon: Icon, badge, badgeColor, href }: any) {
    return (
        <Link href={href} className="group flex flex-col justify-between p-8 bg-white rounded-sm border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 min-h-[320px]">
            <div>
                <div className="flex justify-between items-start mb-8">
                    <div className="h-12 w-12 bg-slate-50 rounded-lg flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500">
                        <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className={`${badgeColor} border-0 tracking-wider font-bold text-[10px]`}>
                        {badge}
                    </Badge>
                </div>
                
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    {category}
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                    {title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                    {desc}
                </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between text-sm font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                View Details
                <ArrowUpRight className="w-4 h-4" />
            </div>
        </Link>
    )
}