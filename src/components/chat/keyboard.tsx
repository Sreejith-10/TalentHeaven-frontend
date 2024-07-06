"use client";

import {sendMessage} from "@/controllers/chatController";
import {useRecruiterStore} from "@/store/useRecruiterStore";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Paperclip, Send, Smile} from "lucide-react";
import {useState} from "react";

const KeyBoard = () => {
	const queryClient = useQueryClient();

	const url = new URL(window.location.href);
	const search = new URLSearchParams(url.search);
	const id = useRecruiterStore((state) => state.recuiterId);

	const [text, setText] = useState("");

	const {mutate} = useMutation({
		mutationFn: sendMessage,
		onSuccess: (data) => {
			setText("");
		},
	});

	const clickHandler = () => {
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

export default KeyBoard;
