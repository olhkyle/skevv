const Main = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return <main className="relative flex-1 bg-white p-4">{children}</main>;
};

export default Main;
