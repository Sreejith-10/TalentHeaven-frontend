import SectionWrapper from "@/components/wrapper/section-wrapper";
import HeroSeachBar from "../hero-search-bar";

const Hero = () => {
	return (
		<section className="w-full h-auto py-[200px] flex justify-center relative">
			<div className="w-[300px] h-[360px] sm:w-[200px] sm:h-[150px] bg-purple-600 dark:bg-purple-950 blur-3xl absolute top-[30%] left-[20%] md:top-[10%] -z-10 bb"></div>
			<SectionWrapper>
				<div className="w-full flex flex-col items-center justify-center">
					<h1 className="text-[120px] font-semibold md:text-cente sm:text-3xl">
						Talent <span className="text-purple-600">Heaven</span>
					</h1>
					<h2 className="text-[50px] font-semibold sm:text-xl">
						{" "}
						Finding a Job You Deserve
					</h2>
					<br />
					<p className="text-slate-500 font-medium">
						1,80,570 jobs listed here! find your dream job
					</p>
					<br />
					<br />
					<br />

					<HeroSeachBar />
				</div>
			</SectionWrapper>
		</section>
	);
};

export default Hero;
