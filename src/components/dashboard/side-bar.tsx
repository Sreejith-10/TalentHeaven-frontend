"use client";

import {useRecruiterStore} from "@/store/useRecruiterStore";
import {
	Building,
	FileIcon,
	LayoutDashboard,
	Mail,
	Settings,
	TargetIcon,
} from "lucide-react";
import Link from "next/link";

const SideBar = () => {
	const id = useRecruiterStore((state) => state.recuiterId);

	return (
		<div className="w-full h-full">
			<div className="py-5 flex flex-col items-center justify-center">
				<h1 className="py-6 font-semibold text-[30px]">TalentHeaven</h1>
				<br />
				<div className="space-y-10">
					<div className="flex items-center gap-5">
						<LayoutDashboard size={30} />
						<Link href={"/dashboard"} className="font-semibold">
							Dashboard
						</Link>
					</div>
					<div className="flex items-center gap-5">
						<FileIcon />
						<Link href={"/dashboard/applications"} className="font-semibold">
							Applications
						</Link>
					</div>
					<div className="flex items-center gap-5">
						<TargetIcon />
						<Link href={"/dashboard/jobs"} className="font-semibold">
							Jobs
						</Link>
					</div>
					<div className="flex items-center gap-5">
						<Building />
						<Link href={"/dashboard/company"} className="font-semibold">
							Company
						</Link>
					</div>
					<div className="flex items-center gap-5">
						<Mail />
						<Link href={"/dashboard/messages/" + id} className="font-semibold">
							Messages
						</Link>
					</div>
					<div className="flex items-center gap-5">
						<Settings />
						<Link href={""} className="font-semibold">
							Settings
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SideBar;
