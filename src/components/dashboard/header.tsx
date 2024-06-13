"use client";

import {Bell, User} from "lucide-react";
import {usePathname} from "next/navigation";
import {Toggle} from "../ui/toggle";

const Header = () => {
	const path = usePathname();
	return (
		<div className="w-full flex items-center justify-between">
			<div>
				<h1 className="font-semibold text-2xl">{path.replace("/", "")}</h1>
			</div>
			<div className="flex items-center gap-5">
				<Toggle size={30}/>
				<div className="relative">
					<span className="absolute -top-3 -right-1 bg-red-400 rounded-full w-5 h-5 grid place-content-center text-slate-50 p-2">
						1
					</span>
					<Bell size={30} />
				</div>
				<User size={30} />
			</div>
		</div>
	);
};

export default Header;
