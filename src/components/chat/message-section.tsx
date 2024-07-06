"use client";

import {EllipsisVertical} from "lucide-react";
import Image from "next/image";
import KeyBoard from "./keyboard";
import Message from "./message";
import {useSearchParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {getChat} from "@/controllers/chatController";
import {io} from "socket.io-client";
import {useEffect, useRef} from "react";

const socket = io("http://localhost:3006");

const MessageSection = () => {
	const query = useSearchParams();
	const q = query.get("q");

	const chatRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		socket.on("connection_success", (d) => {
			console.log(d.message);
		});

		socket.emit("join_chat", {id: q});

		socket.on("recieve_chat_message", (d) => {
			console.log(d);
			// setRececentChats((prev) => [...prev, d.content]);
		});
	}, []);

	const {data: chats} = useQuery({
		queryKey: ["recruiterchats", q],
		queryFn: () => getChat(q),
		enabled: Boolean(query.size),
	});

	useEffect(() => {
		chatRef.current?.scrollTo({
			top: chatRef.current.scrollHeight,
			behavior: "smooth",
		});
	}, [chats]);

	return (
		<div className="w-full h-[820px] flex flex-col items-center justify-between ">
			<div className="w-full h-fit flex items-center justify-between px-6 py-3 border-b border-slate-300 dark:border-slate-700">
				<div className="flex items-center gap-4">
					<div>
						<Image
							src={"/icons/Default_pfp.svg.png"}
							width={40}
							height={40}
							alt="avatar"
						/>
					</div>
					<div>
						<h1 className="font-semibold text-lg">User name</h1>
					</div>
				</div>
				<div>
					<EllipsisVertical className="size-6" />
				</div>
			</div>
			<div
				className="w-full h-full px-4 py-3 overflow-auto bg-purple-100"
				ref={chatRef}>
				<div className="w-full space-y-6 ">
					{chats?.messages?.map((item, index) => (
						<Message message={item} key={index} />
					))}
				</div>
			</div>
			<div className="w-full h-fit border-t border-slate-300 dark:border-slate-700">
				<KeyBoard />
			</div>
		</div>
	);
};

export default MessageSection;
