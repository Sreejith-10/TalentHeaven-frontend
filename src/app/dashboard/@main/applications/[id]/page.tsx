"use client";

import Academic from "@/components/dashboard/candidate-data/academic";
import Experience from "@/components/dashboard/candidate-data/experience";
import Personal from "@/components/dashboard/candidate-data/personal";
import Projects from "@/components/dashboard/candidate-data/projects";
import {Button} from "@/components/ui/button";
import UserCard from "@/components/ui/cards/user-card";
import {Checkbox} from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {getJobById, rejectApplication} from "@/controllers/jobController";
import {UserType} from "@/lib/types";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Briefcase, School, TrafficCone, User2} from "lucide-react";
import Image from "next/image";
import {useParams} from "next/navigation";
import {useState} from "react";

export default function Page() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentUser, setCurrentUser] = useState<UserType>();
	const {id}: {id: string} = useParams();

	const tabs: {[key: number]: JSX.Element} = {
		0: <Personal user={currentUser} />,
		1: <Academic user={currentUser} />,
		2: <Experience user={currentUser} />,
		3: <Projects user={currentUser} />,
	};

	const {data, error} = useQuery({
		queryKey: ["single-job", id],
		queryFn: () => getJobById(id),
	});

	const {mutate: reject} = useMutation({
		mutationFn: rejectApplication,
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (err) => {
			console.log(err);
		},
	});

	const rejectApp = (uid: string) => {
		reject({job_id: id, user_id: uid});
	};

	return (
		<div className="w-full h-full bg-slate-50 dark:bg-slate-900 dark:border dark:border-slate-800 rounded-2xl p-6 flex gap-5">
			<div className="w-1/2 h-[780px] overflow-auto hide-scroll-bar">
				<div className="w-full flex flex-col gap-5 py-3 px-4 sticky top-0 left-0 z-50 bg-slate-50 dark:bg-slate-900">
					<div>
						<h1 className="font-semibold text-2xl">
							Applications for {data?.role}
						</h1>
					</div>
					<div className="flex justify-between">
						<div className="flex items-center gap-2">
							<Checkbox />
							<p className="font-semibold">Select all</p>
						</div>
						<div>
							<Select>
								<SelectTrigger className="bg-inherit border-none outline-none focus:ring-transparent">
									<SelectValue placeholder="sort by" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="apple">Sort by date</SelectItem>
										<SelectItem value="orenge">Sort by type</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
				<div className="w-full flex flex-col gap-5">
					{data?.applications.length == 0 && <h1>0 Applications</h1>}
					{data?.applications
						?.sort((a, b) => {
							const order: {[key: string]: number} = {
								applied: 0,
								rejected: 1,
							};
							return order[a.status] - order[b.status];
						})
						?.map((app, index) => (
							<UserCard
								app={app}
								onclickhandler={(data) => setCurrentUser(data)}
								key={index}
							/>
						))}
				</div>
			</div>
			<div className="w-1/2 h-[780px] overflow-auto hide-scroll-bar">
				<div className="w-full h-auto sticky top-0 bg-slate-50 dark:bg-slate-900">
					<div className="w-full p-4 flex flex-col gap-10 ">
						<div className="space-y-4">
							<h1 className="font-semibold text-xl">Candidate Details</h1>
							<div className="flex items-end gap-4 justify-between">
								<div className="flex gap-4">
									<Image
										src={"/icons/Default_pfp.svg.png"}
										width={70}
										height={70}
										alt="user-icon"
									/>
									<div>
										<h1 className="font-semibold">
											{currentUser?.fname} {currentUser?.lname}
										</h1>
										<h2 className="text-slate-600 text-[14px]">
											{currentUser?.profession}
										</h2>
									</div>
								</div>
								<div className="space-x-3">
									<Button
										disabled={data?.applications.some(
											(app) =>
												app.user_id === currentUser?.user_id &&
												app.status === "rejected"
										)}
										className="bg-blue-500 hover:bg-blue-400">
										Accept
									</Button>
									<Button
										disabled={data?.applications.some(
											(app) =>
												app.user_id === currentUser?.user_id &&
												app.status === "rejected"
										)}
										onClick={() => rejectApp(currentUser?.user_id!)}
										className="bg-destructive hover:bg-destructive/50">
										{data?.applications.some(
											(app) =>
												app.user_id === currentUser?.user_id &&
												app.status === "rejected"
										)
											? "Rejected"
											: "Reject"}
									</Button>
								</div>
							</div>
						</div>
						<div className="w-full">
							<ul className="w-full flex justify-between">
								<li
									className="flex items-center gap-3 cursor-pointer"
									onClick={() => setCurrentIndex(0)}>
									<User2
										className={`${currentIndex === 0 && "text-blue-600"}`}
									/>
									<p
										className={`${
											currentIndex === 0 && "text-blue-600 font-semibold"
										}`}>
										Overview
									</p>
								</li>
								<li
									className="flex items-center gap-3 cursor-pointer"
									onClick={() => setCurrentIndex(1)}>
									<School
										className={`${currentIndex === 1 && "text-blue-600"}`}
									/>
									<p
										className={`${
											currentIndex === 1 && "text-blue-600 font-semibold"
										}`}>
										Academic
									</p>
								</li>
								<li
									className="flex items-center gap-3 cursor-pointer"
									onClick={() => setCurrentIndex(2)}>
									<Briefcase
										className={`${currentIndex === 2 && "text-blue-600"}`}
									/>
									<p
										className={`${
											currentIndex === 2 && "text-blue-600 font-semibold"
										}`}>
										Experience
									</p>
								</li>
								<li
									className="flex items-center gap-3 cursor-pointer"
									onClick={() => setCurrentIndex(3)}>
									<TrafficCone
										className={`${currentIndex === 3 && "text-blue-600"}`}
									/>
									<p
										className={`${
											currentIndex === 3 && "text-blue-600 font-semibold"
										}`}>
										Projects
									</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
				{currentUser ? (
					<div className="w-full p-5 overflow-auto bg-slate-100 dark:bg-slate-900 py-2 px-5 rounded-xl border border-slate-500 border-opacity-30">
						{tabs[currentIndex]}
					</div>
				) : (
					<div>no user selected</div>
				)}
			</div>
		</div>
	);
}
