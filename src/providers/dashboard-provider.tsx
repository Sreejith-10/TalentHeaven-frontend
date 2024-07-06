"use client";

import {Fragment, ReactNode, useLayoutEffect, useState} from "react";
import Cookie from "js-cookie";
import {useRecruiterStore} from "@/store/useRecruiterStore";
import {jwtDecode} from "jwt-decode";
import {useMutation} from "@tanstack/react-query";
import {refresh} from "@/controllers/recruiterController";
import {useRouter} from "next/navigation";
import {AxiosError} from "axios";

export const ProtectedRoute = ({children}: {children: ReactNode}) => {
	const {push} = useRouter();
	const [load, setLoad] = useState(true);
	const auth = useRecruiterStore((state) => state.isRecruiterAuthenticated);
	const setAuth = useRecruiterStore((state) => state.updateRecruiterAuth);
	const setCompanyId = useRecruiterStore((state) => state.updateCompanyId);
	const setId = useRecruiterStore((state) => state.updateRecruiterId);

	const {mutate} = useMutation({
		mutationFn: refresh,
		onSuccess: ({data}) => {
			console.log(data);
		},
		onError: (err) => {
			const error = err as AxiosError;
			if (error.response?.status === 401) return push("/recruiter-login");
		},
	});

	useLayoutEffect(() => {
		if (auth) {
			setLoad(false);
		}

		const access = Cookie.get("access_token");

		if (access) {
			const payload = jwtDecode(access);
			//@ts-expect-error typo
			setCompanyId(payload.cmp_id);
			//@ts-expect-error typo
			setId(payload.id);

			//@ts-expect-error typo
			if (payload.admin) {
				setAuth(true);
				setLoad(false);
			}
		} else {
			const id = JSON.parse(localStorage.getItem("session_id")!);

			if (!id) return push("/recruiter-login");

			console.log(id);

			mutate(id);
		}
	}, []);

	if (load) return <div>loading...</div>;

	return <Fragment>{children}</Fragment>;
};
