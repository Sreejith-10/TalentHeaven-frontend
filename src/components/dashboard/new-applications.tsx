"use client";

import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";
import {useQuery} from "@tanstack/react-query";
import {recentApplications} from "@/controllers/jobController";
import {useRecruiterStore} from "@/store/useRecruiterStore";
import {fetchUser} from "@/controllers/userController";
import {Skeleton} from "../ui/skeleton";

const NewApplications = () => {
	const id = useRecruiterStore((state) => state.companyId);

	const {data: applications} = useQuery<{
		applications: {user_id: string; appliedFor: string}[];
	}>({
		queryKey: ["recent-user-applications", id],
		queryFn: () => recentApplications(id!),
		enabled: Boolean(id),
	});

	return (
		<div className="w-full h-full bg-slate-50 dark:bg-slate-950 dark:border dark:border-slate-800 rounded-3xl p-4 space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="font-semibold text-xl">Recent Applications</h1>
				<Link href={"#"} className="hover:underline">
					see all
				</Link>
			</div>
			<div className="w-full h-[400px] overflow-scroll ">
				<div className="flex flex-col gap-5">
					{applications?.applications?.map((app, index) => (
						<RecentApplications key={index} app={app} />
					))}
				</div>
			</div>
		</div>
	);
};

export default NewApplications;

const RecentApplications = ({
	app,
}: {
	app: {user_id: string; appliedFor: string};
}) => {
	const {data: user, isLoading} = useQuery({
		queryKey: ["applied_user", app.user_id],
		queryFn: () => fetchUser(app.user_id),
	});

	return isLoading ? (
		<Skeleton className="flex items-center gap-4 cursor-pointer p-2 rounded-md ease-in-out">
			<Skeleton className="h-10 w-10 rounded-full bg-slate-300 dark:bg-slate-500" />
			<div className="space-y-3">
				<Skeleton className="w-36 h-5 bg-slate-300 dark:bg-slate-500" />
				<Skeleton className="w-56 h-5 bg-slate-300 dark:bg-slate-500" />
			</div>
		</Skeleton>
	) : (
		<div className="flex items-center gap-4 hover:bg-slate-200 dark:hover:bg-slate-900 cursor-pointer p-2 rounded-md ease-in-out">
			<Avatar>
				<AvatarFallback>A</AvatarFallback>
				<AvatarImage src="/next.svg" className="dark:bg-slate-50" />
			</Avatar>

			<div className="">
				<h1 className="font-semibold dark:text-slate-200">
					{user?.fname + " " + user?.lname}
				</h1>
				<span className="flex gap-2 items-center">
					<p className="text-sm text-slate-500">Applied for</p>{" "}
					<strong className="text-[14px]">{app.appliedFor}</strong>
				</span>
			</div>
		</div>
	);
};
