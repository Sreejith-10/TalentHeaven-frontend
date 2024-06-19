import Link from "next/link";

export default function Jobs() {
	return (
		<div className="w-full h-full bg-slate-50 dark:bg-slate-900 dark:border dark:border-slate-800 rounded-2xl p-6 flex gap-5">
			<div className="w-full h-fit flex justify-between">
				<h1 className="font-semibold text-2xl">Job Lists</h1>
				<Link
					href={"/dashboard/jobs/create"}
					className="w-fit bg-blue-500 text-slate-50 py-3 px-4 rounded-xl">
					Post Job
				</Link>
			</div>
		</div>
	);
}
