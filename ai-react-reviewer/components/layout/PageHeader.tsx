import React from "react";

interface PageHeaderProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    themeColor?: string; // e.g., "blue", "teal", "amber"
}

export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    description,
    icon,
    action,
    themeColor = "slate"
}) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-4">
                {icon && (
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg shadow-${themeColor}-500/20 bg-${themeColor}-600`}>
                        {icon}
                    </div>
                )}
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-slate-500 mt-1 text-lg">
                            {description}
                        </p>
                    )}
                </div>
            </div>
            {action && (
                <div className="flex-shrink-0">
                    {action}
                </div>
            )}
        </div>
    );
};
