export default function Main({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <main className="relative flex-1 bg-white pt-[72px] md:pt-0">{children}</main>;
}
