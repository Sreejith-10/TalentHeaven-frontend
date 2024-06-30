"use client";

import Link from "next/link";
import SectionWrapper from "../../wrapper/section-wrapper";
import JobCard from "@/components/ui/cards/job-card";
import {motion} from "framer-motion";

const RecentJobList = () => {
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
						{Array(6)
							.fill("")
							.map((_, index) => (
								<motion.div
									initial={{opacity: 0, translateY: 100}}
									whileInView={{opacity: 1, translateY: 0}}
									transition={{ease: "easeInOut", delay: index * 0.4}}
									viewport={{once: true}}
									key={index}>
									<JobCard key={index} />
								</motion.div>
							))}
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
