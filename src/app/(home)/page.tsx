import CategorySection from "@/components/home/sections/category-section";
import GetStarted from "@/components/home/sections/get-started";
import Hero from "@/components/home/sections/hero";
import RecentJobList from "@/components/home/sections/recent-job-list";
import RegisterSection from "@/components/home/sections/register-section";
import Testimonials from "@/components/home/sections/testimonails";

export default function Home() {
	return (
		<>
			<Hero />
			<CategorySection />
			<RecentJobList />
			<RegisterSection />
			<Testimonials />
			<GetStarted />
		</>
	);
}
