"use client";

import {ReactNode, useLayoutEffect} from "react";
import Cookies from "js-cookie";
import {useMutation} from "@tanstack/react-query";
import {refreshToken} from "@/controllers/userAuthController";
import {useRouter} from "next/navigation";
import {AxiosError} from "axios";
import {useToast} from "@/components/ui/use-toast";
import {authStore} from "@/store/auth-store";

export const AuthProvider = ({children}: {children: ReactNode}) => {
	const {push} = useRouter();
	const {toast} = useToast();
	const updateAuth = authStore((state) => state.updateAuth);

	const {mutate, data, isPending} = useMutation({
		mutationFn: refreshToken,
		onSuccess: (res) => {
			updateAuth(true);
			toast({title: "Welcome back", description: res.data.data.name});
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
			updateAuth(true);
		}
	}, []);

	if (isPending) {
		return <div>loading</div>;
	}

	return <div>{children}</div>;
};
