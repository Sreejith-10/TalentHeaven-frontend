import SectionWrapper from "../../wrapper/section-wrapper";
import JobCard from "@/components/ui/cards/job-card";

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
								<JobCard index={index} key={index} />
							))}
					</div>
				</div>
			</SectionWrapper>
		</section>
	);
};

export default RecentJobList;
