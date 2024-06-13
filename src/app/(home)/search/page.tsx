"use client";

import SerachBar from "@/components/serach/search-bar";
import JobCard from "@/components/ui/cards/job-card";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import SectionWrapper from "@/components/wrapper/section-wrapper";
import {Heart} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {useState} from "react";

export default function Search() {
	const params = useSearchParams();

	const job_type = [
		"Full time",
		"Part time",
		"Contract",
		"Temporary",
		"Intern",
	];
	const experience_level = [
		"Fresher",
		"1-2 years",
		"3-5 years",
		"6-8 years",
		"9+ years",
	];
	const career_level = ["Senior", "Junior", "Executive", "Director", "Manager"];

	return (
		<main className="w-full h-full">
			<SectionWrapper>
				<div className="w-full h-auto flex flex-col items-center">
					<section className="w-full pt-10 flex flex-col gap-10 items-center justify-center">
						<h1 className="text-[30px] font-semibold text-slate-800 dark:text-slate-200">
							Find Your Dream Jobs
						</h1>
						<SerachBar />
					</section>
					<div className="w-full h-auto flex gap-5 py-[90px]">
						<div className="w-[40%] p-5 space-y-4">
							<div>
								<h2 className="font-semibold up">Filter</h2>
							</div>
							<div className="space-y-3">
								<h2 className="text-slate-600 font-semibold uppercase text-sm">
									Job Type
								</h2>
								<ul className="space-y-2">
									{job_type.map((item) => (
										<li key={item} className="flex gap-3 items-center">
											<Checkbox />
											<p className="text-slate-600">{item}</p>
										</li>
									))}
								</ul>
							</div>
							<br />
							<div className="space-y-3">
								<h2 className="text-slate-600 font-semibold uppercase text-sm">
									Experience level
								</h2>
								<ul className="space-y-2">
									{experience_level.map((item) => (
										<li key={item} className="flex gap-3 items-center">
											<Checkbox />
											<p className="text-slate-600">{item}</p>
										</li>
									))}
								</ul>
							</div>
							<br />
							<div className="space-y-3">
								<h2 className="text-slate-600 font-semibold uppercase text-sm">
									salary<span className="text-slate-500 pl-2">(in LPA)</span>
								</h2>
								<div className="flex gap-5">
									<Input className="w-[150px]" placeholder="MIN" />
									<Input className="w-[150px]" placeholder="MAX" />
								</div>
							</div>
							<br />
							<div className="space-y-3">
								<h2 className="text-slate-600 font-semibold uppercase text-sm">
									Career level
								</h2>
								<ul className="space-y-2">
									{career_level.map((item) => (
										<li key={item} className="flex gap-3 items-center">
											<Checkbox />
											<p className="text-slate-600">{item}</p>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="w-[60%] h-full p-5 space-y-5 flex flex-col">
							<div className="w-full flex justify-between">
								<h2 className="font-semibold">121 jobs</h2>
								<div>Sort by Newest</div>
							</div>
							<div className="w-full space-y-3">
								{Array(1)
									.fill("")
									.map((_, index) => (
										<div
											key={index}
											className="w-full h-fit rounded-[28px] shadow-xl py-4 px-8 space-y-5 border border-slate-300 dark:shadow-lg dark:shadow-slate-900 border-opacity-35">
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
														<h1 className="font-semibold">
															front end developer
														</h1>
														<h2 className="text-slate-400">Google</h2>
													</div>
												</div>
												<div className="w-auto">
													<Heart className="float-right" />
												</div>
											</div>
											<div className="w-full flex gap-5">
												<span className="bg-purple-300 text-purple-800 text-[14px] px-2 rounded-md font-semibold">
													Remote
												</span>
												<span className="bg-emerald-200 text-emerald-700 text-[14px] px-2 rounded-md font-semibold">
													Part time
												</span>
												<span className="bg-emerald-200 text-emerald-700 text-[14px] px-2 rounded-md font-semibold">
													2 - 4 LPA
												</span>
											</div>
											<div className="w-full flex justify-between">
												<p className="text-slate-400">3 days left</p>
												<Link
													href={"/job/1"}
													className="bg-purple-600 hover:bg-purple-500 rounded-md px-2 py-1 text-white text-sm">
													Apply
												</Link>
											</div>
										</div>
									))}
							</div>
							<div>
								<Pagination>
									<PaginationContent>
										<PaginationItem>
											<PaginationPrevious href={"#"} />
										</PaginationItem>
										<PaginationItem>
											<PaginationLink href="#" isActive>
												1
											</PaginationLink>
										</PaginationItem>
										<PaginationItem>
											<PaginationLink href="#">2</PaginationLink>
										</PaginationItem>
										<PaginationItem>
											<PaginationLink href="#">3</PaginationLink>
										</PaginationItem>
										<PaginationItem className="">
											<PaginationLink href="#">4</PaginationLink>
										</PaginationItem>
										<PaginationItem>
											<PaginationEllipsis />
										</PaginationItem>
										<PaginationItem>
											<PaginationNext href="#" />
										</PaginationItem>
									</PaginationContent>
								</Pagination>
							</div>
						</div>
					</div>
				</div>
			</SectionWrapper>
		</main>
	);
}
