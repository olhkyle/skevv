export default function Main({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <main className="relative flex-1 bg-white">{children}</main>;
}
