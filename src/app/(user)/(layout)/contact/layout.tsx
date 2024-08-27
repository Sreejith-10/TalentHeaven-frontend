import {Metadata} from "next";

export const metadata: Metadata = {
	title: "Contact-Talent Heaven",
	description: "Where skills meet opportunity",
};

export default function ContactLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div>{children}</div>;
}
