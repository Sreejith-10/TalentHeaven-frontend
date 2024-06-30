"use client";

import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {InputOTPPattern} from "@/components/ui/opt-input-box";
import {useEffect, useState} from "react";

export default function OTP() {
	const [valid, setValid] = useState(true);
	const [time, setTime] = useState(59);

	useEffect(() => {
		const interval = setInterval(() => {
			if (time <= 0) return;

			setTime(time - 1);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [time]);

	const resendOtp = () => {
		setTime(59);
	};

	return (
		<div className="border border-slate-200 rounded-xl shadow-xl p-10">
			<h1 className="font-semibold text-xl text-center py-3">OTP</h1>
			<Label>OTP has sent to your mail</Label>
			<br />
			<br />
			<div className="text-center pb-4">{time}</div>
			<div className="w-full grid place-content-center">
				<InputOTPPattern />
			</div>
			<br />
			<div className="w-full flex items-start justify-between gap-10">
				<button
					disabled={time !== 0}
					onClick={resendOtp}
					className={`underline cursor-pointer ${
						time !== 0 ? "text-slate-500" : "text-slate-800"
					}`}>
					resend otp
				</button>
				<Button>Submit</Button>
			</div>
		</div>
	);
}
