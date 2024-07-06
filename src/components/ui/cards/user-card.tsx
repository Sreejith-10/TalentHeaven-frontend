import {fetchUser} from "@/controllers/userController";
import {UserType} from "@/lib/types";
import {useQuery} from "@tanstack/react-query";
import {Checkbox} from "../checkbox";
import Image from "next/image";
import {EllipsisVertical} from "lucide-react";

export default function UserCard({
	app,
	onclickhandler,
}: {
	app: {
		user_id: string;
		applied_on: number;
		status: string;
	};
	onclickhandler: (data: UserType) => void;
}) {
	const {data: user} = useQuery({
		queryKey: ["user-data", app.user_id],
		queryFn: () => fetchUser(app.user_id),
	});

	return (
		<div
			onClick={() => onclickhandler(user!)}
			className="w-full relative flex gap-3 items-center bg-slate-100 dark:bg-slate-900 py-2 px-5 rounded-xl border border-slate-500 border-opacity-30 cursor-pointer">
			{/* <Checkbox /> */}
			<Image
				src={"/icons/Default_pfp.svg.png"}
				width={60}
				height={60}
				alt="user-icon"
			/>
			<div>
				<h1 className="font-semibold">
					{user?.fname} {user?.lname}
				</h1>
				<h2 className="text-slate-600 text-[14px]">{user?.profession}</h2>
				<p className="text-slate-600 text-[14px]">
					{new Date(app?.applied_on).toLocaleDateString()}
				</p>
			</div>
			<EllipsisVertical className="absolute right-5 cursor-pointer text-slate-600" />
		</div>
	);
}
