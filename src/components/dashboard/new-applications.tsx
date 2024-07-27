import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewApplications = () => {
	return (
		<div className="w-full h-full bg-slate-50 dark:bg-slate-900 dark:border dark:border-slate-800 shadow-sm rounded-2xl flex flex-col overflow-auto hide-scroll-bar">
			<div className="flex justify-between sticky top-0 dark:bg-slate-900 dark:border dark:border-slate-800 bg-slate-100 p-5">
				<h1 className="font-semibold text-xl">New Applications</h1>
				<Link href={""} className="hover:underline text-slate-700">
					see all
				</Link>
			</div>
			<div className="h-auto flex flex-col p-4 gap-5">
				{Array(7)
					.fill("")
					.map((_, index) => (
						<div
							key={index}
							className="w-full flex items-center justify-between">
							<div className="flex gap-2">
								<Image
									src={"/icons/Default_pfp.svg.png"}
									alt="user_icon"
									width={50}
									height={50}
								/>
								<div>
									<h1 className="font-semibold text-[16px]">User name</h1>
									<p className="text-slate-600 text-sm">Profession</p>
								</div>
							</div>
							<div className="flex flex-col gap-1">
								<h1 className="text-sm font-normal">Applied for:</h1>
								<h1 className="font-semibold text-base">
									Full Stack Developer
								</h1>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default NewApplications;
