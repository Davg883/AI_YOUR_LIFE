import Shell from "@/components/layout/Shell";

export default function AegisLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Shell>
            {children}
        </Shell>
    );
}
