"use client";

import Image from "next/image";
import Link from "next/link";
import {JobType} from "@/lib/types";
import {cva} from "class-variance-authority";
import {cn} from "@/lib/utils";

const style = cva(
	"w-[400px] md:w-full h-fit rounded-[28px] shadow-xl py-4 px-8 space-y-5 border border-slate-300 dark:shadow-lg dark:shadow-slate-900 border-opacity-35 dark:border-slate-800"
);

const JobCard = ({
	job,
	className,
}: {
	job?: JobType;
	className?: string | undefined;
}) => {
	const daysLeft = () => {
		const last = new Date(job?.applications_end_date!);
		const now = new Date();

		const days = now.getDate() - last.getDate();

		return `${days} day${days > 1 ? "s" : ""} left`;
	};

	daysLeft();

	return (
		<div className={cn(style({className}))}>
			<div className="w-full flex gap-5 justify-items-start justify-between">
				<div className="flex items-center gap-5">
					<div>
						<Image
							src={"/google.png"}
							alt="company_icon"
							width={30}
							height={30}
						/>
					</div>
					<div>
						<h1 className="font-semibold">{job?.role}</h1>
						<h2 className="text-slate-400">Google</h2>
					</div>
				</div>
			</div>
			<div className="w-full flex gap-5">
				<span className="bg-purple-300 text-purple-800 text-[14px] px-2 rounded-md font-semibold">
					{job?.job_mode}
				</span>
				<span className="bg-emerald-200 text-emerald-700 text-[14px] px-2 rounded-md font-semibold">
					{job?.job_type}
				</span>
				<span className="bg-emerald-200 text-emerald-700 text-[14px] px-2 rounded-md font-semibold">
					{job?.salary}
				</span>
				<span className="bg-emerald-200 text-emerald-700 text-[14px] px-2 rounded-md font-semibold">
					{job?.experience}
				</span>
			</div>
			<div className="w-full flex justify-between">
				<p className="text-slate-400">{daysLeft()}</p>
				<Link
					href={"/job/" + job?._id}
					className="bg-purple-600 hover:bg-purple-500 rounded-md px-2 py-1 text-white text-sm">
					Apply
				</Link>
			</div>
		</div>
	);
};
export default JobCard;
