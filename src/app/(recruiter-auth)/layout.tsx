export default function RecruiterAuth({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div className="h-dvh grid place-content-center">{children}</div>;
}
