export default function Main({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <main className="grid grid-rows-[1fr] w-full h-screen pt-[72px] bg-white md:pt-0">{children}</main>;
}
