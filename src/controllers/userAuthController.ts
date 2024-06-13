import {AuthServiceInstance} from "@/lib/axios";

export const loginUser = async (values: {email: string; password: string}) => {
	const res = await AuthServiceInstance.post("/login", values, {
		headers: {"Content-Type": "application/json"},
	});

	return res;
};

export const refreshToken = async (id: string) => {
	const data = await AuthServiceInstance.get("/refresh/" + id);
	return data;
};

export const logOutUser = async (id: string) => {
	const data = await AuthServiceInstance.get("/logout/" + id);
	return data;
};
