"use client";

import Academic from "@/components/dashboard/candidate-data/academic";
import Experience from "@/components/dashboard/candidate-data/experience";
import Personal from "@/components/dashboard/candidate-data/personal";
import Projects from "@/components/dashboard/candidate-data/projects";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Briefcase,
	EllipsisVertical,
	School,
	TrafficCone,
	User2,
} from "lucide-react";
import Image from "next/image";
import {useState} from "react";

export default function Page() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const tabs: {[key: number]: JSX.Element} = {
		0: <Personal />,
		1: <Academic />,
		2: <Experience />,
		3: <Projects />,
	};

	return (
		<div className="w-full h-full bg-slate-50 dark:bg-slate-900 dark:border dark:border-slate-800 rounded-2xl p-6 flex gap-5">
			<div className="w-1/2 h-[780px] overflow-auto hide-scroll-bar">
				<div className="w-full flex justify-between py-3 px-4 sticky top-0 left-0 z-50 bg-slate-50">
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
				<div className="w-full flex flex-col gap-5">
					{Array(8)
						.fill("")
						.map((_, index) => (
							<div
								key={index}
								className="w-full relative flex gap-3 items-center bg-slate-100 dark:bg-slate-900 py-2 px-5 rounded-xl border border-slate-500 border-opacity-30 cursor-pointer">
								<Checkbox />
								<Image
									src={"/icons/Default_pfp.svg.png"}
									width={60}
									height={60}
									alt="user-icon"
								/>
								<div>
									<h1 className="font-semibold">User full name</h1>
									<h2 className="text-slate-600 text-[14px]">Profession</h2>
									<p className="text-slate-600 text-[14px]">
										Application submited date
									</p>
								</div>
								<EllipsisVertical className="absolute right-5 cursor-pointer text-slate-600" />
							</div>
						))}
				</div>
			</div>
			<div className="w-1/2 h-[780px] overflow-auto hide-scroll-bar">
				<div className="w-full h-auto sticky top-0 bg-slate-50">
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
										<h1 className="font-semibold">User full name</h1>
										<h2 className="text-slate-600 text-[14px]">Profession</h2>
										<p className="text-slate-600 text-[14px]">
											Application submited date
										</p>
									</div>
								</div>
								<div className="space-x-3">
									<Button className="bg-blue-500 hover:bg-blue-400">
										Interview
									</Button>
									<Button className="bg-destructive hover:bg-destructive/50">
										Reject
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
				<div className="w-full p-5 overflow-auto bg-slate-100 dark:bg-slate-900 py-2 px-5 rounded-xl border border-slate-500 border-opacity-30">
					{tabs[currentIndex]}
				</div>
			</div>
		</div>
	);
}
