import {AuthServiceInstance, UserInstance} from "@/lib/axios";

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

type UserInputType = {
	values: {
		fname?: string | undefined;
		lname?: string | undefined;
		phone?: string | undefined;
		email?: string | undefined;
		skills?: string[] | undefined;
		education?:
			| {
					institute: string;
					education_type: string;
					stream: string;
					start_date: string;
					end_date: string;
			  }[]
			| undefined;
	};
	user_id: string;
};

export const createUser = async (userInputs: UserInputType) => {
	const data = await UserInstance.post("/create-user", {userInputs});
	return data;
};
