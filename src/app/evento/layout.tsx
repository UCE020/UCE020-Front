export default function EventoLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div className="min-h-screen bg-[#ededed]">{children}</div>;
}
