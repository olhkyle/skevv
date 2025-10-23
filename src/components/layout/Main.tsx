export default function Main({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <main className="flex-1 h-screen grid grid-rows-[1fr] pt-[72px] bg-white md:pt-0">{children}</main>;
}
