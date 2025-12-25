import Shell from "@/components/layout/Shell";

export default function TransportLayout({
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
