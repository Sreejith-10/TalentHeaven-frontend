import {ChatServiceInstance} from "@/lib/axios";

export const getChatLists = async (id: string) => {
	const {data}: {data: {chatList: {user_id: string; chat_list: string[]}}} =
		await ChatServiceInstance.get("/get-chatlist/" + id);
	return data.chatList;
};

type ChatType = {
	chat_id: string;
	messages: {
		sender_id: string;
		message: string;
		date: number;
	}[];
};

export const getChat = async (query: any) => {
	const {data}: {data: {chats:ChatType}} = await ChatServiceInstance.get(
		"/get-chats/" + query
	);
	return data.chats;
};

export const addToChatList = async (values: {
	uid: string;
	rid: string | undefined;
}) => {
	const {data} = await ChatServiceInstance.post("/add-to-chat", {
		user_id: values.uid,
		r_id: values.rid,
	});
	return data;
};

export const sendMessage = async (values: {
	chat_id: string;
	sender_id: string | undefined;
	message: string;
}) => {
	const {data} = await ChatServiceInstance.post(
		"/send-message",
		{...values},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	return data;
};
