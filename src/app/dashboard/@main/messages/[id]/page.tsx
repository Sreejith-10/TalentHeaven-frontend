"use client";

import MessageSection from "@/components/chat/message-section";
import UserList from "@/components/chat/user-list";
import {useParams} from "next/navigation";

export default function Messages() {
	const {id}: {id: string} = useParams();

	return (
		<div className="w-full h-full bg-slate-50 dark:bg-slate-900 dark:border dark:border-slate-800 rounded-2xl flex cursor-pointer">
			<div className="w-[30%] h-full border-r border-slate-300 dark:border-slate-700">
				<UserList id={id} />
			</div>
			<div className="w-[70%] h-full">
				<MessageSection />
			</div>
		</div>
	);
}
