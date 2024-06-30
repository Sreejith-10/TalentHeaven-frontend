"use client";

import {ReactNode, useLayoutEffect} from "react";
import Cookies from "js-cookie";
import {useMutation} from "@tanstack/react-query";
import {refreshToken} from "@/controllers/userAuthController";
import {useRouter} from "next/navigation";
import {AxiosError} from "axios";
import {useToast} from "@/components/ui/use-toast";
import {useAuthStore} from "@/store/auth-store";
import {jwtDecode} from "jwt-decode";
import {useUserStore} from "@/store/userStore";
import Loader from "@/components/loader";

export const AuthProvider = ({children}: {children: ReactNode}) => {
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
		},
		onError: (err) => {
			updateAuth(false);
			const error = err as AxiosError;
			if (error.status === 401) push("/login");
		},
	});

	useLayoutEffect(() => {
		const token = Cookies.get("access_token");
		let session_id;

		if (!token) {
			session_id = JSON.parse(localStorage.getItem("session_id")!);
			mutate(session_id);
		} else {
			const payload = jwtDecode(token);
			//@ts-expect-error typo
			updateAuth(payload.admin ? false : true);
			//@ts-expect-error typo
			updateUserId(payload.id);
		}
	}, []);

	if (isPending) {
		return <Loader />;
	}

	return <div>{children}</div>;
};
