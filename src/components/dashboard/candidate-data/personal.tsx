import {UserType} from "@/lib/types";

const Personal = ({user}: {user?: UserType | undefined}) => {
	return (
		<div className="flex gap-5 flex-col">
			<div className="border-b border-slate-300 dark:border-slate-800 py-3">
				<h1 className="font-semibold">General information</h1>
			</div>
			<div className="border-b border-slate-300 dark:border-slate-800 py-3">
				<h1 className="font-medium text-slate-500">
					First name :
					<span className="font-bold text-slate-800 dark:text-slate-400">
						{user?.fname}{" "}
					</span>
				</h1>
				<h1 className="font-medium text-slate-500">
					Last name :{" "}
					<span className="font-bold text-slate-800 dark:text-slate-400">
						{user?.lname}
					</span>
				</h1>
			</div>
			<div className="space-x-3 flex border-b border-slate-300 dark:border-slate-800 py-3">
				<h1 className="font-medium text-slate-500">Email Address</h1>{" "}
				<span className="font-bold text-slate-800 dark:text-slate-400">
					{user?.email}
				</span>
			</div>
			<div className="space-x-3 flex border-b border-slate-300 dark:border-slate-800 py-3">
				<h1 className="font-medium text-slate-500">Phone number</h1>{" "}
				<span className="font-bold text-slate-800 dark:text-slate-400">
					{user?.phone}{" "}
				</span>
			</div>

			<div className="space-y-3 border-b border-slate-300 dark:border-slate-800 py-3">
				<h1 className="font-semibold">Skills</h1>
				<div className="flex gap-5 flex-wrap">
					{user?.skills?.map((skill, index) => (
						<span
							key={index}
							className="text-sm bg-slate-400 dark:bg-slate-800 rounded-md px-3 py-1 font-semibold">
							{skill}
						</span>
					))}
				</div>
			</div>
			<div className="border-b border-slate-300 dark:border-slate-800 py-3 last:border-none">
				<h1 className="font-semibold">Socials</h1>
			</div>
		</div>
	);
};

export default Personal;
