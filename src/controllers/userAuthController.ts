import {AuthServiceInstance} from "@/lib/axios";

export const loginUser = async (values: {email: string; password: string}) => {
	const {data} = await AuthServiceInstance.post("/login", values, {
		headers: {"Content-Type": "application/json"},
	});

	return data;
};

export const refreshToken = async (id: string) => {
	const {data} = await AuthServiceInstance.get("/refresh/" + id);
	return data;
};

export const logOutUser = async (id: string) => {
	const {data} = await AuthServiceInstance.get("/logout/" + id);
	return data;
};


export const sendMail = async (mail: string) => {
	const {data} = await AuthServiceInstance.post(
		"/forgot-password",
		{mail},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	return data;
};

type ValType = {
	otp: number;
	mail: string;
};

export const sendOtp = async (val: ValType) => {
	const {otp, mail} = val;
	const {data} = await AuthServiceInstance.post(
		"/otp",
		{otp, mail},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	return data;
};

export const updatePassword = async (newPass: string) => {
	await AuthServiceInstance.post(
		"/reset-password",
		{newPass},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
};
