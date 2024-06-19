"use client";

import SerachBar from "@/components/serach/search-bar";
import {Button} from "@/components/ui/button";
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
import {Heart, X} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";

export default function Search() {
	const [showFilter, setShowFilter] = useState(false);

	useEffect(() => {
		document.body.style.overflow = showFilter ? "hidden" : "auto";
	}, [showFilter]);

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
	const career_level = ["Senior", "Junior", "Executive", "Director"];

	return (
		<main className="w-full h-full relative">
			<SectionWrapper>
				<div className="w-full h-auto flex flex-col items-center">
					<section className="w-full pt-10 flex flex-col gap-10 items-center justify-center">
						<h1 className="text-[30px] font-semibold text-slate-800 dark:text-slate-200">
							Find Your Dream Jobs
						</h1>
						<SerachBar />
					</section>
					<div className="w-full h-auto flex  gap-5 py-[90px] sm:py-[30px]">
						<div className="w-[40%] lg:w-[25%] p-5 space-y-4 sm:hidden">
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
								<div className="flex gap-5 lg:flex-col">
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
						<div className="w-[60%] xs:w-full lg:w-[75%] h-full p-5 space-y-5 flex flex-col">
							<div className="w-full flex justify-between">
								<h2 className="font-semibold">121 jobs</h2>
								<div>Sort by Newest</div>
							</div>
							<Button
								onClick={() => setShowFilter(true)}
								className="hidden sm:block bg-purple-600 hover:bg-purple-500">
								Filter
							</Button>
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
												<span className="bg-purple-300 text-purple-800 text-[14px] px-2 rounded-md font-semibold sm:grid sm:place-content-center">
													Remote
												</span>
												<span className="bg-emerald-200 w-fit text-emerald-700 text-[14px] px-2 rounded-md font-semibold sm:grid sm:place-content-center">
													Part time
												</span>
												<span className="bg-emerald-200 text-emerald-700 text-[14px] px-2 rounded-md font-semibold sm:grid sm:place-content-center">
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
								{/* <Pagination>
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
								</Pagination> */}
							</div>
						</div>
					</div>
				</div>
			</SectionWrapper>
			<motion.div
				variants={{
					initial: {
						translateX: 1000,
						z: -9999,
					},
					slide: {
						translateX: 0,
					},
				}}
				animate={showFilter ? "slide" : "initial"}
				className="hidden sm:block fixed w-[300px] z-[99] h-dvh top-0 left-0 bg-slate-100 overflow-scroll px-10 py-5">
				<X
					className="absolute top-4 right-4"
					onClick={() => setShowFilter(false)}
				/>

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
						<Input className="w-[100px]" placeholder="MIN" />
						<Input className="w-[100px]" placeholder="MAX" />
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
			</motion.div>
		</main>
	);
}
