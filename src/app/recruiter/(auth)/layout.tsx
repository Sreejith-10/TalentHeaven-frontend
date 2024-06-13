import {ReactNode} from "react";

export default function RecruiterAuth({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div>{children}</div>;
}
