"use client";

import {MapPinnedIcon, Search} from "lucide-react";
import {Button} from "../ui/button";
import {useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";

const SerachBar = () => {
	const params = useSearchParams();

	const [jobTitle, setJobTitle] = useState(params.get("q"));
	const [jobLocation, setJobLocation] = useState(params.get("location"));

	const {push} = useRouter();

	const clickHandler = () => {
		push(`/search?q=${jobTitle}&location=${jobLocation}`);
	};

	return (
		<div className="w-fit h-[60px] flex items-center gap-5 px-4 rounded-full box-shadow dark:dark-box-shadow">
			<div className="flex gap-5 items-center justify-center">
				<Search />
				<input
					name="job-title"
					value={jobTitle ? jobTitle : ""}
					onChange={(e) => setJobTitle(e.target.value)}
					type="text"
					className="h-[30px] p-2 outline-none bg-transparent font-semibold placeholder:font-medium"
					placeholder="Job title or keyword"
				/>
			</div>
			<span className="inline-block w-[2px] h-[30px] bg-slate-300" />
			<div className="flex gap-5">
				<MapPinnedIcon />
				<input
					name="job-location"
					value={jobLocation ? jobLocation : ""}
					onChange={(e) => setJobLocation(e.target.value)}
					type="text"
					className="h-[30px] p-2 outline-none bg-transparent font-semibold placeholder:font-medium"
					placeholder="Prefred location (optional)"
				/>
			</div>
			<Button
				onClick={() => {
					setJobTitle("");
					setJobLocation("");
				}}
				className="rounded-full bg-white hover:bg-white text-slate-900 dark:bg-inherit dark:text-slate-50">
				Clear
			</Button>
			<Button
				onClick={clickHandler}
				className="rounded-full bg-purple-600 hover:bg-purple-400 dark:text-slate-50">
				Search
			</Button>
		</div>
	);
};

export default SerachBar;
