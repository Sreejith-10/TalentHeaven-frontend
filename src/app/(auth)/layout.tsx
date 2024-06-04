export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div className="w-full h-dvh grid place-content-center">{children}</div>;
}
