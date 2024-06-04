"use client";

import {AuthServiceInstance} from "@/lib/axios";
import {useEffect} from "react";

export default function Home() {
	useEffect(() => {
		const session_id = JSON.parse(localStorage.getItem("session_id")!);
		AuthServiceInstance.get("/verify/" + session_id)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return <main>main</main>;
}
