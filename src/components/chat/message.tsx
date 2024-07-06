"use client";

import {useRecruiterStore} from "@/store/useRecruiterStore";
import Image from "next/image";

const Message = ({
	message,
}: {
	message: {
		sender_id: string;
		message: string;
		date: number;
	};
}) => {
	const id = useRecruiterStore((state) => state.recuiterId);

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
					<p className="w-fit text-[12px] float-right">10:24</p>
				</div>
			</div>
		</div>
	);
};

export default Message;
