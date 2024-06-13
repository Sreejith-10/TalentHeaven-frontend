import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Talent Heaven -  Recruiter",
	description: "Where skills meet opportunity. Recruiter Dashboard",
};

export default function RecruiterLayout({
	main,
	sidebar,
}: Readonly<{
	main: React.ReactNode;
	sidebar: React.ReactNode;
}>) {
	return (
		<div className="w-ful h-dvh flex">
			<div className="w-[20%]">{sidebar}</div>
			<div className="w-[80%] h-full">{main}</div>
		</div>
	);
}
