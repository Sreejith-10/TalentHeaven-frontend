import {Button} from "@/components/ui/button";
import SectionWrapper from "@/components/wrapper/section-wrapper";
import Link from "next/link";

export default function GetStarted() {
	return (
		<section className="w-full h-auto bg-purple-100 dark:bg-slate-900/30 py-[100px]">
			<SectionWrapper>
				<div className="w-full h-auto bg-yellow-200 py-[100px] grid place-content-center rounded-md">
					<div className="w-full h-full flex flex-col gap-5 items-center">
						<h1 className="font-semibold text-[40px] dark:text-slate-700">
							Kick Start you Career with Talent Heaven
						</h1>
						<Link href={"#"} className="dark:text-slate-500">
							Learn More
						</Link>
						<Button className="dark:text-slate-700">Get Started</Button>
					</div>
				</div>
			</SectionWrapper>
		</section>
	);
}
