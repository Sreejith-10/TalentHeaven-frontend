"use client";

import {useEffect, useState} from "react";

export default function OTP() {
	const [valid, setValid] = useState(true);

	const [time, setTime] = useState(30);

	(function timer() {
		let interval;

		if (interval && time <= 0) clearInterval(interval);

		setTimeout(() => {
			setTime((prev) => prev - 1);
		}, 10000);
	})(); 

	console.log(time);

	return <div>{time}</div>;
}
