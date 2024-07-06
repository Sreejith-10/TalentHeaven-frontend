"use client";

import ChatList from "@/components/chat/chat-list";
import Messages from "@/components/chat/messages";
import {useUserStore} from "@/store/userStore";

export default function Chats() {
	const id = useUserStore((state) => state.userId);

	return (
		<div className="w-full h-full bg-slate-50 border border-slate-400 dark:bg-slate-900 dark:border dark:border-slate-800 rounded-2xl flex">
			<div className="w-[30%] h-auto bg-purple-500 rounded-2xl border-r border-slate-300 dark:border-slate-700 rounded-tr-none rounded-br-none">
				<ChatList id={id!} />
			</div>
			<div className="w-[70%] h-full">
				<Messages />
			</div>
		</div>
	);
}
