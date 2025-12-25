"use client";

import { useState } from "react";
import { BarChart3, Tag, AlertTriangle, X, Quote, ChevronDown } from "lucide-react";

interface AnalysisData {
    summary: string;
    sentimentScore: {
        support: number;
        neutral: number;
        objection: number;
    };
    keyTopics: {
        topic: string;
        count: number;
        representativeQuotes: string[];
    }[];
    anomalies: {
        type: string;
        quote: string;
        reason: string;
    }[];
}

interface AnalysisReportProps {
    data: AnalysisData;
    rawComments: string[];
}

export default function AnalysisReport({ data, rawComments }: AnalysisReportProps) {
    const { sentimentScore, keyTopics, anomalies, summary } = data;
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

    // Calculate percentages
    const total = sentimentScore.support + sentimentScore.neutral + sentimentScore.objection;
    const supportPct = total ? (sentimentScore.support / total) * 100 : 0;
    const neutralPct = total ? (sentimentScore.neutral / total) * 100 : 0;
    const objectPct = total ? (sentimentScore.objection / total) * 100 : 0;

    // Get quotes for the selected topic
    const selectedTopicData = selectedTopic ? keyTopics.find(t => t.topic === selectedTopic) : null;
    const evidenceComments = selectedTopicData ? selectedTopicData.representativeQuotes : [];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 print:space-y-8 print:w-full print:max-w-none print:p-[20mm]">

            {/* Executive Summary */}
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm print:shadow-none print:border-0 print:p-0 print:break-inside-avoid">
                <h3 className="text-lg font-bold mb-4 text-slate-900 print:text-black print:text-xl print:mb-2">Executive Summary</h3>
                <p className="text-slate-600 leading-relaxed print:text-black print:text-justify">
                    {summary}
                </p>
            </div>

            {/* 1. Sentiment Bar */}
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm print:shadow-none print:border-0 print:p-0 print:break-inside-avoid">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 print:text-black print:mb-4">
                    <BarChart3 className="text-slate-400 print:text-black" /> Sentiment Analysis
                </h3>

                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex mb-4 print:border print:border-slate-300 print:h-6">
                    <div style={{ width: `${supportPct}%` }} className="h-full bg-green-500 print:bg-slate-800 print:border-r print:border-white" />
                    <div style={{ width: `${neutralPct}%` }} className="h-full bg-slate-300 print:bg-slate-400 print:border-r print:border-white" />
                    <div style={{ width: `${objectPct}%` }} className="h-full bg-red-500 print:bg-slate-200" />
                </div>

                <div className="flex justify-between text-sm text-slate-500 print:text-black">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500 print:bg-slate-800" /> Support ({Math.round(supportPct)}%)</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-300 print:bg-slate-400" /> Neutral ({Math.round(neutralPct)}%)</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500 print:bg-slate-200" /> Objection ({Math.round(objectPct)}%)</div>
                </div>
            </div>

            {/* 2. Topic Cloud */}
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm print:shadow-none print:border-0 print:p-0 print:break-inside-avoid">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 print:text-black print:mb-4">
                    <Tag className="text-slate-400 print:text-black" /> Key Topics Detected
                </h3>
                <div className="flex flex-wrap gap-3">
                    {keyTopics.map((topicData, idx) => (
                        <div
                            key={`${topicData.topic}-${idx}`}
                            className="px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700 transition-all hover:scale-105 hover:bg-teal-50 hover:text-teal-700 hover:ring-2 hover:ring-teal-200 cursor-pointer print:bg-white print:text-black print:border print:border-slate-300 print:px-4 print:py-2 flex items-center gap-2"
                            onClick={() => setSelectedTopic(topicData.topic)}
                        >
                            {topicData.topic}
                            <span className="bg-slate-200 text-slate-600 text-xs px-1.5 py-0.5 rounded-full print:bg-slate-100 print:text-black print:font-bold">{topicData.count}</span>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-slate-400 mt-4 print:hidden">
                    Click on a topic to view supporting evidence from the public comments.
                </p>
            </div>

            {/* 3. Outliers / Anomalies (Collapsible) */}
            {anomalies.length > 0 && (
                <div className="bg-amber-50 p-8 rounded-xl border border-amber-200 shadow-sm print:bg-white print:border-0 print:p-0 print:break-inside-avoid">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-amber-800 print:text-black print:mb-4">
                        <AlertTriangle className="text-amber-600 print:text-black" /> Anomalies & Outliers
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        {anomalies.map((anomaly, idx) => (
                            <div key={idx} className="group bg-white/80 backdrop-blur-sm rounded-lg border border-amber-200/50 hover:border-amber-300 transition-colors print:border print:border-slate-300 print:bg-white print:shadow-none">
                                <div className="flex items-start justify-between p-4 list-none print:p-0 print:mb-4 print:border-0">
                                    <div className="flex gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold mt-0.5 print:bg-slate-200 print:text-black">
                                            {idx + 1}
                                        </span>
                                        <div>
                                            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1 block print:text-black print:font-bold">{anomaly.type}</span>
                                            <p className="text-slate-800 text-sm font-medium leading-relaxed print:text-black">
                                                {anomaly.reason}
                                            </p>
                                            {/* Always show quote in print */}
                                            <div className="mt-2 p-3 bg-slate-50 rounded border border-slate-100 text-sm text-slate-600 italic print:bg-white print:border-l-2 print:border-slate-300 print:border-t-0 print:border-r-0 print:border-b-0 print:rounded-none print:pl-4 print:text-slate-800">
                                                "{anomaly.quote}"
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Topic Evidence Modal - Hidden on Print */}
            {selectedTopic && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm print:hidden">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <Tag className="text-teal-600" />
                                Evidence: "{selectedTopic}"
                            </h3>
                            <button
                                onClick={() => setSelectedTopic(null)}
                                className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
                            {evidenceComments.length > 0 ? (
                                evidenceComments.map((quote, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                        <Quote className="w-4 h-4 text-teal-400 mb-2" />
                                        <p className="text-sm text-slate-700 leading-relaxed italic">
                                            "{quote}"
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-slate-500">
                                    <p>No direct quotes found for this topic tag.</p>
                                </div>
                            )}
                        </div>
                        <div className="p-4 border-t border-slate-100 bg-white rounded-b-xl flex justify-end">
                            <button
                                onClick={() => setSelectedTopic(null)}
                                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
