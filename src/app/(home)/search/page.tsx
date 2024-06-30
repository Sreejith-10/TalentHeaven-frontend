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
import {X} from "lucide-react";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getJob, searchJob} from "@/controllers/jobController";
import {JobType} from "@/lib/types";
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";

export default function Search() {
	const params = useSearchParams();
	const url = new URL(window.location.href);
	const search = new URLSearchParams(url.search);

	const [showFilter, setShowFilter] = useState(false);
	const [filters, setFilters] = useState<{
		job_type: [] | string[];
		job_mode: [] | string[];
		experience_level: [] | string[];
		salary: [] | string[];
	}>({
		job_type: [],
		job_mode: [],
		experience_level: [],
		salary: [],
	});

	const {data, isLoading, isError, refetch} = useQuery<JobType[]>({
		queryKey: ["joblist", {param: search, size: search.size}],
		queryFn: searchJob,
	});

	useEffect(() => {
		document.body.style.overflow = showFilter ? "hidden" : "auto";
	}, [showFilter]);

	const job_type = [
		"full-time",
		"part-time",
		"contract",
		"temporary",
		"intern",
	];
	const job_mode = ["remote", "work from home", "on site", "hybrid"];
	const experience_level = [
		"fresher",
		"0 - 1 year",
		"1 - 3 years",
		"3 - 5 years",
		"5 - 10 years",
		"10+ years",
	];
	const salary = [
		"all",
		"0 - 2 LPA",
		"2 - 5 LPA",
		"5 - 10 LPA",
		"10 - 20 LPA",
		"20+ LPA",
	];

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
					<div className="w-full h-auto flex gap-5 py-[90px] px-[200px] sm:py-[30px]">
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
											<Checkbox
												checked={search
													.getAll("filter_job_type")
													.includes(item)}
												onCheckedChange={(state) => {
													if (state) {
														search.append("filter_job_type", item);
														window.history.pushState(
															{},
															"",
															`${url.origin}${
																url.pathname
															}?${search.toString()}`
														);
														setFilters((prev) => ({
															...prev,
															job_type: [...prev.job_type, item],
														}));
													} else {
														search.delete("filter_job_type", item);
														window.history.pushState(
															{},
															"",
															`${url.origin}${
																url.pathname
															}?${search.toString()}`
														);
														setFilters((prev) => ({
															...prev,
															job_type: prev.job_type.filter(
																(val) => val !== item
															),
														}));
													}
												}}
											/>
											<p className="text-slate-600">
												{item.charAt(0).toUpperCase().concat(item.slice(1))}
											</p>
										</li>
									))}
								</ul>
							</div>
							<br />
							<div className="space-y-3">
								<h2 className="text-slate-600 font-semibold uppercase text-sm">
									Job Mode
								</h2>
								<ul className="space-y-2">
									{job_mode.map((item) => (
										<li key={item} className="flex gap-3 items-center">
											<Checkbox
												checked={search
													.getAll("filter_job_mode")
													.includes(item)}
												onCheckedChange={(state) => {
													if (state) {
														search.append("filter_job_mode", item);
														window.history.pushState(
															{},
															"",
															`${url.origin}${
																url.pathname
															}?${search.toString()}`
														);
														setFilters((prev) => ({
															...prev,
															job_mode: [...prev.job_mode, item],
														}));
													} else {
														search.delete("filter_job_mode", item);
														window.history.pushState(
															{},
															"",
															`${url.origin}${
																url.pathname
															}?${search.toString()}`
														);
														setFilters((prev) => ({
															...prev,
															job_mode: prev.job_mode.filter(
																(val) => val !== item
															),
														}));
													}
												}}
											/>
											<p className="text-slate-600">
												{" "}
												{item.charAt(0).toUpperCase().concat(item.slice(1))}
											</p>
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
											<Checkbox
												checked={search
													.getAll("filter_experience")
													?.includes(item)}
												onCheckedChange={(state) => {
													if (state) {
														search.append("filter_experience", item);
														window.history.pushState(
															{},
															"",
															`${url.origin}${
																url.pathname
															}?${search.toString()}`
														);
														setFilters((prev) => ({
															...prev,
															experience_level: [
																...prev.experience_level,
																item,
															],
														}));
													} else {
														search.delete("filter_experience", item);
														window.history.pushState(
															{},
															"",
															`${url.origin}${
																url.pathname
															}?${search.toString()}`
														);
														setFilters((prev) => ({
															...prev,
															experience_level: prev.experience_level.filter(
																(val) => val !== item
															),
														}));
													}
												}}
											/>
											<p className="text-slate-600">{item}</p>
										</li>
									))}
								</ul>
							</div>
							<br />
							<div className="space-y-3">
								<h2 className="text-slate-600 font-semibold uppercase text-sm">
									Salary
								</h2>
								<ul className="space-y-2">
									{salary.map((item) => (
										<li key={item} className="flex gap-3 items-center">
											<Checkbox
												checked={search.getAll("filter_salary")?.includes(item)}
												onCheckedChange={(state) => {
													if (state) {
														search.append("filter_salary", item);
														window.history.pushState(
															{},
															"",
															`${url.origin}${
																url.pathname
															}?${search.toString()}`
														);
														setFilters((prev) => ({
															...prev,
															salary: [...prev.salary, item],
														}));
													} else {
														search.delete("filter_salary", item);
														window.history.pushState(
															{},
															"",
															`${url.origin}${
																url.pathname
															}?${search.toString()}`
														);
														setFilters((prev) => ({
															...prev,
															salary: prev.salary.filter((val) => val !== item),
														}));
													}
												}}
											/>
											<p className="text-slate-600">{item}</p>
										</li>
									))}
								</ul>
							</div>
							<br />
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
							<div className="w-full space-y-5">
								{isLoading ? (
									<div>loading . . .</div>
								) : isError ? (
									<div>
										<h1>Error</h1>
										<Button onClick={() => refetch()}>Try again</Button>
									</div>
								) : (
									data?.map((data, index) => (
										<JobCard
											job={data}
											key={index}
											className="w-full shadow-md"
										/>
									))
								)}
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
			</motion.div>
		</main>
	);
}
