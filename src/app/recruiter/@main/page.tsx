import RecruitmentProgress from "@/components/dashboard/recruitment-progress";
import Todo from "@/components/dashboard/todo";
import {Calendar} from "@/components/ui/calendar";
import {Progress} from "@/components/ui/progress";
import {Mail, Phone} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Main() {
	return (
		<div className="w-full h-full flex gap-5">
			<div className="w-[70%] flex gap-5 flex-col">
				<div className="w-full bg-purple-600 h-48 rounded-2xl p-5 flex justify-between relative">
					<div className="w-[65%] space-y-3">
						<h1 className="text-slate-50 text-[30px] font-bold">
							Welcome back!
						</h1>
						<p className="text-slate-50 text-wrap">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nemo
							voluptatum voluptatibus totam recusandae neque aut illo corporis
							quod. Dicta.
						</p>
					</div>
					<div className="absolute right-7 top-[-38px]">
						<Image
							src={"/blogger.png"}
							width={100}
							height={100}
							alt="hero-image"
							className="w-[230px] h-[230px]"
						/>
					</div>
				</div>
				<div className="w-full h-1/2 flex gap-5">
					<RecruitmentProgress />
					<Todo />
				</div>
				<div className="w-full h-auto">
					<div className="flex p-5 justify-between items-center">
						<h1 className="font-semibold text-xl">Currentyl hiring</h1>
						<Link href={""} className="hover:underline text-slate-700">
							see all
						</Link>
					</div>
					<div className="flex gap-5">
						<div className="w-1/2 bg-slate-50 rounded-2xl flex items-center justify-between p-5">
							<div className="flex items-center gap-5">
								<span className="text-[40px]">1</span>
								<div>
									<h1 className="text-[20px]">Node Js Developer</h1>
									<p>(10 candidates)</p>
								</div>
							</div>
							<div className="font-bold text-center">40%</div>
						</div>
						<div className="w-1/2 bg-slate-50 rounded-2xl flex items-center justify-between p-5">
							<div className="flex items-center gap-5">
								<span className="text-[40px]">1</span>
								<div>
									<h1 className="text-[20px]">Go Developer</h1>
									<p>(10 candidates)</p>
								</div>
							</div>
							<div className="font-bold text-center">40%</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-[30%] h-full flex flex-col gap-5">
				<div className="w-full h-[40%]">
					<Calendar
						className="bg-slate-50 w-full h-full rounded-2xl shadow-sm cursor-pointer"
						classNames={{
							months:
								"flex w-full flex-col sm:flex-col space-y- 4 sm:space-x-4 sm:space-y-0 flex-1 font-bold",
							month: "w-full space-y-4 w-full flex flex-col",
							table: "w-full h-full border-collapse space-y-1",
							row: "w-full mt-2",
							head_row: "",
						}}
					/>
				</div>
				<div className="w-full h-[55%] bg-slate-50 shadow-sm rounded-2xl flex flex-col overflow-auto hide-scroll-bar">
					<div className="flex justify-between sticky top-0 bg-slate-100 p-5">
						<h1 className="font-semibold text-xl">New Applications</h1>
						<Link href={""} className="hover:underline text-slate-700">
							see all
						</Link>
					</div>
					<div className="h-full flex flex-col gap-3 p-5">
						{Array(10)
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
									<div className="flex gap-4">
										<Mail className="bg-blue-400 w-10 h-10 rounded-full p-2" />
										<Phone className="bg-emerald-400 w-10 h-10 rounded-full p-2" />
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
