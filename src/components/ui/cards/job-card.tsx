"use client";

import Image from "next/image";
import {motion} from "framer-motion";
import {Heart} from "lucide-react";
import Link from "next/link";

const JobCard = ({index}: {index: number}) => {
	return (
		<motion.div
			initial={{opacity: 0, translateY: 100}}
			whileInView={{opacity: 1, translateY: 0}}
			transition={{ease: "easeInOut", delay: index * 0.4}}
			viewport={{once: true}}
			className="w-[400px] h-fit rounded-[28px] shadow-xl py-4 px-8 space-y-5 border border-slate-300 dark:shadow-lg dark:shadow-slate-900 border-opacity-35">
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
						<h1 className="font-semibold">front end developer</h1>
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
		</motion.div>
	);
};
export default JobCard;
