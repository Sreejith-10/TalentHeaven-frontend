import {
	FileIcon,
	LayoutDashboard,
	Mail,
	Settings,
	TargetIcon,
} from "lucide-react";
import Link from "next/link";

export default function SideBar() {
	return (
		<div className="w-full h-full">
			<div className="py-5 flex flex-col items-center justify-center">
				<h1 className="py-6 font-semibold text-[30px]">TalentHeaven</h1>
				<br />
				<div className="space-y-10">
					<div className="flex items-center gap-5">
						<LayoutDashboard size={30} />
						<Link href={""} className="font-semibold">
							Dashboard
						</Link>
					</div>
					<div className="flex items-center gap-5">
						<FileIcon />
						<Link href={""} className="font-semibold">Applications</Link>
					</div>
					<div className="flex items-center gap-5">
						<TargetIcon />
						<Link href={""} className="font-semibold">Jobs</Link>
					</div>
					<div className="flex items-center gap-5">
						<Mail />
						<Link href={""} className="font-semibold">Messages</Link>
					</div>
					<div className="flex items-center gap-5">
						<Settings />
						<Link href={""} className="font-semibold">Settings</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
