"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PageHeader } from "@/components/layout/PageHeader";
import { Building2, Plus, FolderOpen, Clock, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CivicPlanningPage() {
    const projects = useQuery(api.civic.getProjects);
    const createProject = useMutation(api.civic.createProject);
    const router = useRouter();

    const [isCreating, setIsCreating] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newRef, setNewRef] = useState("");

    const handleCreate = async () => {
        if (!newTitle || !newRef) return;
        try {
            const id = await createProject({ title: newTitle, reference: newRef });
            setIsCreating(false);
            router.push(`/planning/${id}`);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8">
            <PageHeader
                title="CivicOS: Case Files"
                description="Manage Active Public Consultations"
                icon={<Building2 size={24} />}
                themeColor="teal"
                action={
                    <button
                        onClick={() => setIsCreating(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg shadow-lg shadow-teal-500/25 transition-all transform hover:scale-105"
                    >
                        <Plus size={20} />
                        New Case File
                    </button>
                }
            />

            {/* Creation Modal (Inline for simplicity) */}
            {isCreating && (
                <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border-t-4 border-teal-500">
                        <h3 className="text-xl font-bold mb-4">Open New Case File</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Planning Reference</label>
                                <input
                                    autoFocus
                                    className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                    placeholder="e.g. TCP/9921"
                                    value={newRef}
                                    onChange={e => setNewRef(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Project Title</label>
                                <input
                                    className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                    placeholder="e.g. Westside Development"
                                    value={newTitle}
                                    onChange={e => setNewTitle(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    onClick={() => setIsCreating(false)}
                                    className="px-4 py-2 text-slate-500 hover:text-slate-700 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreate}
                                    disabled={!newTitle || !newRef}
                                    className="px-6 py-2 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 disabled:opacity-50"
                                >
                                    Create File
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects === undefined ? (
                    // Loading Skeletons
                    [1, 2, 3].map(i => (
                        <div key={i} className="h-48 bg-white rounded-xl border border-slate-200 animate-pulse" />
                    ))
                ) : projects.length === 0 ? (
                    <div className="col-span-full text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                            <FolderOpen size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">No Active Cases</h3>
                        <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                            Start by creating a new case file to track public consultations.
                        </p>
                    </div>
                ) : (
                    projects.map(project => (
                        <Link
                            key={project._id}
                            href={`/planning/${project._id}`}
                            className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-300 transition-all"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-mono rounded border border-slate-200 group-hover:bg-teal-50 group-hover:text-teal-700 group-hover:border-teal-200 transition-colors">
                                    {project.planningRef}
                                </span>
                                {project.status === "outdated" && (
                                    <span className="flex h-3 w-3 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                                    </span>
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                                {project.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-slate-500 mt-4">
                                <div className="flex items-center gap-1">
                                    <FileText size={16} />
                                    <span>{project.totalCommentCount} Comments</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock size={16} />
                                    <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
