import Shell from "@/components/layout/Shell";

export default function CivicLayout({
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
