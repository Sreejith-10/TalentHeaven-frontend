import Header from "@/components/dashboard/header";
import {ReactNode} from "react";

export default function MainLayout({
	children,
}: Readonly<{children: ReactNode}>) {
	return (
		<div className="w-full h-full bg-slate-200 dark:bg-slate-900 p-10 flex flex-col gap-5 overflow-hidden">
			<Header />
			{children}
		</div>
	);
}
