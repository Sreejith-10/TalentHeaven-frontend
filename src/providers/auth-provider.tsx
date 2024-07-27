"use client";

import {ReactNode, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useMutation} from "@tanstack/react-query";
import {refreshToken} from "@/controllers/userAuthController";
import {useRouter} from "next/navigation";
import {AxiosError} from "axios";
import {useToast} from "@/components/ui/use-toast";
import {useAuthStore} from "@/store/auth-store";
import {jwtDecode} from "jwt-decode";
import {useUserStore} from "@/store/userStore";
import Loader from "@/components/ui/loaders/loader";

export const AuthProvider = ({children}: {children: ReactNode}) => {
	const [initial, setInitial] = useState(true);

	const {push} = useRouter();
	const {toast} = useToast();
	const updateAuth = useAuthStore((state) => state.updateAuth);
	const updateUserId = useUserStore((state) => state.updateUserId);

	const {mutate, data, isPending} = useMutation({
		mutationFn: refreshToken,
		onSuccess: (res) => {
			updateAuth(true);
			updateUserId(res.data.id);
			toast({title: "Welcome back", description: res.data.name});
			setInitial(false);
		},
		onError: (err) => {
			updateAuth(false);
			const error = err as AxiosError;
			if (error.message === "Network Error") {
				toast({title:"Bad network",description:"network is bad or slow",variant:"info"})
				setInitial(false);
			}
			if (error?.response?.status === 404) {
				return push("/get-started");
			}
			if (error.status === 401) {
				push("/login");
				setInitial(false);
				return;
			}
		},
	});

	useEffect(() => {
		const token = Cookies.get("access_token");
		const session_id = Cookies.get("session_id");

		if (!token && !session_id) {
			setInitial(false);
		}

		if (!token) {
			//TODO: if a recruiter is logged in the the logic should be differ from normal user
			mutate(session_id!);
		} else {
			const payload = jwtDecode(token);
			//@ts-expect-error typo
			updateAuth(payload.admin ? false : true);
			//@ts-expect-error typo
			updateUserId(payload.id);
			setInitial(false);
		}
	}, []);

	if (initial) {
		return <Loader />;
	}

	if (isPending) {
		return <Loader />;
	}

	return <div>{children}</div>;
};
