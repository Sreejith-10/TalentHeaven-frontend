"use client";

import {getChat, sendMessage} from "@/controllers/chatController";
import {useChatStore} from "@/store/useChatStore";
import {useUserStore} from "@/store/userStore";
import {timeDifference} from "@/utils/time-difference";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {EllipsisVertical, Paperclip, Send, Smile} from "lucide-react";
import Image from "next/image";
import {useParams, useSearchParams} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";

const socket = io("http://localhost:3006");

const Messages = () => {
	const param = useSearchParams();

	const queryClient = useQueryClient();

	const q = param.get("q");

	const sender = useChatStore((state) => state.sender);
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

	const {data: chats, refetch} = useQuery({
		queryKey: ["candidatechats", q],
		queryFn: () => getChat(q),
		enabled: Boolean(param.size),
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
						<h1 className="font-semibold text-lg">
							{sender?.comapny?.company_name}
						</h1>
						<h1 className="font-semibold text-base">
							{sender?.recruiter?.recruiter_name}
						</h1>
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
						<div key={index}>
							{/* <h1>{timeDifference(item.date)}</h1> */}
							<Chat message={item} />
						</div>
					))}
				</div>
				{!chats ? <button onClick={() => refetch()}>Refetch</button> : ""}
			</div>
			<div className="w-full h-fit border-t border-slate-300 dark:border-slate-700">
				<BottomKey />
			</div>
		</div>
	);
};

export default Messages;

const Chat = ({
	message,
}: {
	message: {
		sender_id: string;
		message: string;
		date: number;
	};
}) => {
	const id = useUserStore((state) => state.userId);

	return (
		<div className={`w-full flex ${message.sender_id !== id && "justify-end"}`}>
			<div
				className={`w-fit h-auto flex gap-4 items-start float-right ${
					message.sender_id !== id && "flex-row-reverse"
				}`}>
				<div>
					<Image
						src={"/icons/Default_pfp.svg.png"}
						width={40}
						height={40}
						alt="avatar"
					/>
				</div>
				<div
					className={`flex flex-col
						${
							message.sender_id === id
								? "bg-purple-700 text-slate-50 rounded-tl-none"
								: "bg-slate-100 text-slate-800 rounded-tr-none"
						} px-4 py-1 rounded-xl `}>
					<h2>{message.message}</h2>
					<p className="w-fit text-[12px] float-right">
						{new Date(message.date).toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
							hour12: true,
						})}
					</p>
				</div>
			</div>
		</div>
	);
};

const BottomKey = () => {
	const id = useUserStore((state) => state.userId);

	const [text, setText] = useState("");

	const {mutate} = useMutation({
		mutationFn: sendMessage,
		onSuccess: (data) => {
			setText("");
		},
	});

	const clickHandler = () => {
		const url = new URL(window.location.href);
		const search = new URLSearchParams(url.search);
		const chat_id = search.get("q");
		mutate({chat_id: chat_id!, sender_id: id, message: text});
	};
	return (
		<div className="w-full flex gap-5 items-center justify-between px-8 py-4">
			<div className="w-full">
				<input
					value={text}
					onChange={(e) => setText(e.target.value)}
					className="w-full h-8 outline-none font-semibold bg-transparent break-words"
					placeholder="Write a message"
				/>
			</div>
			<div className="flex gap-5 cursor-pointer">
				<Paperclip />
				<Smile />
				<Send onClick={clickHandler} />
			</div>
		</div>
	);
};
