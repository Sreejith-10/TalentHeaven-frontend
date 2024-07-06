"use client";

import Link from "next/link";
import SectionWrapper from "../../wrapper/section-wrapper";
import JobCard from "@/components/ui/cards/job-card";
import {motion} from "framer-motion";
import {useQuery} from "@tanstack/react-query";
import {fetchRecentJobs} from "@/controllers/jobController";
import {Skeleton} from "@/components/ui/skeleton";

const RecentJobList = () => {
	const {data, isLoading, isError} = useQuery({
		queryKey: ["recent-jobs"],
		queryFn: fetchRecentJobs,
	});

	return (
		<section className="w-full h-dvh md:h-auto flex justify-center py-[150px] sm:py-20">
			<SectionWrapper>
				<div className="space-y-12">
					<div className="text-center">
						<h1 className="text-[50px] sm:text-[30px] font-semibold  text-slate-800 dark:text-slate-300">
							Recent Job Postings
						</h1>
						<p className="text-slate-500 dark:text-slate-700">
							Find you ideal job choice from the latest job postings
						</p>
					</div>
					<div className="w-full grid grid-cols-3 md:grid-cols-1 md:place-content-center gap-10">
						{isError ? (
							<div>
								<h1>something went wrong</h1>
							</div>
						) : (
							Array(6)
								.fill("")
								.map((_, index) => (
									<motion.div
										initial={{opacity: 0, translateY: 100}}
										whileInView={{opacity: 1, translateY: 0}}
										transition={{ease: "easeInOut", delay: index * 0.4}}
										viewport={{once: true}}
										key={index}>
										{isLoading ? (
											<div className="w-[400px] md:w-full h-fit rounded-[28px] shadow-xl py-4 px-8 space-y-5 border border-slate-300 dark:shadow-lg dark:shadow-slate-900 border-opacity-35 dark:border-slate-800">
												<div className="w-full flex gap-5 justify-items-start justify-between">
													<div className="flex items-center gap-5">
														<Skeleton className="w-8 h-8 bg-slate-500 dark:bg-slate-800 rounded-full" />
														<div className="space-y-2">
															<Skeleton className="w-24 h-5 bg-slate-500 dark:bg-slate-800" />
															<Skeleton className="w-24 h-5 bg-slate-500 dark:bg-slate-800" />
														</div>
													</div>
												</div>
												<div className="w-full flex gap-5">
													<Skeleton className="w-20 h-5 bg-slate-500 dark:bg-slate-800" />
													<Skeleton className="w-20 h-5 bg-slate-500 dark:bg-slate-800" />
													<Skeleton className="w-20 h-5 bg-slate-500 dark:bg-slate-800" />
												</div>
												<div className="w-full flex justify-between"></div>
											</div>
										) : (
											<JobCard key={index} />
										)}
									</motion.div>
								))
						)}
					</div>
					<br />
					<br />
					<br />
					<div className="w-full text-center">
						<Link
							className="bg-purple-500 py-2 px-5 rounded-xl text-base text-slate-50 hover:underline"
							href={"/search"}>
							See more
						</Link>
					</div>
				</div>
			</SectionWrapper>
		</section>
	);
};

export default RecentJobList;
