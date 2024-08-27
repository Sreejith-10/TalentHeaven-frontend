import {Metadata} from "next";
import {ReactNode} from "react";

export const metadata: Metadata = {
	title: "Get Started - Talent Heaven",
	description: "talent heaven",
};

export default function GetStartedLayout({
	children,
}: Readonly<{children: ReactNode}>) {
	return <main>{children}</main>;
}
