"use client";

import {fetchCompany} from "@/controllers/recruiterController";
import {useQuery} from "@tanstack/react-query";
import {Link2} from "lucide-react";
import {useRecruiterStore} from "@/store/useRecruiterStore";
import Link from "next/link";

export default function Company() {
	const company_id = useRecruiterStore((state) => state.companyId);

	const {data, isPending, isSuccess, isError} = useQuery({
		queryKey: ["company", company_id],
		queryFn: () => fetchCompany(company_id),
	});

	if (isPending) {
		return <div>loading ...</div>;
	}

	if (isSuccess)
		return (
			<div className="w-full h-full bg-slate-50 dark:bg-slate-900 dark:border dark:border-slate-800 rounded-2xl p-6 flex flex-col gap-5">
				<div className="w-full h-fit relative">
					<div className="w-full h-56 bg-purple-600 rounded-tl-md rounded-tr-md"></div>
					<div className="w-44 h-44 rounded-full bg-slate-600 absolute bottom-[-35%] left-10"></div>
				</div>
				<div className="mt-[80px] flex flex-col gap-8">
					<div className="flex gap-5 items-center">
						<h1 className="text-xl font-semibold">{data?.company_name}</h1>
						<span className="flex items-center gap-3 text-blue-500 hover:underline">
							<Link2 />
							<Link href={"#"}>{data?.reference}</Link>
						</span>
					</div>
					<p className="max-w-[1000px]">{data?.company_about}</p>
				</div>
			</div>
		);
}
