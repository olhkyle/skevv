export default function Main({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="grid grid-rows-[1fr] w-full h-screen pt-[calc(var(--global-layout-padding)+var(--global-layout-nav-height))] bg-white sm:pt-0">
			{children}
		</main>
	);
}
