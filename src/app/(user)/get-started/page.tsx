import Link from "next/link";

export default function Page() {
	return (
		<div className="w-full h-dvh flex">
			<div className="w-1/2 h-full bg-purple-600 animate-slide-rin"></div>
			<div className="w-1/2 h-full flex flex-col gap-4 items-center justify-center animate-slide-lin">
				<Link
					href={"/"}
					className="w-72 text-center bg-purple-500 text-slate-50 px-5 py-2 text-2xl">
					Looking for jobs
				</Link>
				<Link
					href={"/dashboard"}
					className="w-72 text-center bg-slate-50 text-purple-500 border border-purple-500 px-5 py-2 text-2xl">
					Hiring
				</Link>
			</div>
		</div>
	);
}
