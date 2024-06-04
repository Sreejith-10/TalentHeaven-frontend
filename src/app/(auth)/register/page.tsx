"use client";

import GoogleLogin from "@/components/google-login";
import {Button} from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useToast} from "@/components/ui/use-toast";
import {AuthServiceInstance} from "@/lib/axios";
import {RegisterSchema} from "@/schemas/register-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {AxiosError} from "axios";
import Link from "next/link";
import {title} from "process";
import {useForm} from "react-hook-form";
import * as z from "zod";

export default function Register() {
	const {toast} = useToast();

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const handleSubmit = async (values: z.infer<typeof RegisterSchema>) => {
		try {
			await AuthServiceInstance.post("/register", values, {
				headers: {"Content-Type": "application/json"},
			});
			toast({title: "Succes", description: "Account created"});
		} catch (error) {
			const err = error as AxiosError<{message: string}>;
			console.log(err?.response?.data);
			toast({
				variant: "destructive",
				title: "Error",
				description: err.response?.data.message,
			});
		}
	};

	return (
		<div className="w-[400px] h-auto py-12 px-9 flex flex-col gap-10 shadow-xl rounded-2xl dark:border dark:border-input">
			<div>
				<h1 className="font-bold text-[1.5rem]">New accout</h1>
				<p className="font-medium text-slate-600">Creating a new account</p>
			</div>
			<GoogleLogin />

			<div className="w-full h-auto grid place-content-center">
				<p className="w-fit h-fit p-1 font-bold text-[12px] text-slate-500 border border-slate-500 rounded-full relative before:content-[''] before:absolute before:w-[130px] before:left-[40px] before:h-[2px] before:bg-slate-300 before:top-0 before:bottom-0 before:my-auto after:content-[''] after:absolute after:w-[130px] after:right-[40px] after:h-[2px] after:bg-slate-300 after:top-0 after:bottom-0 after:my-auto">
					OR
				</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="name"
						render={({field}) => (
							<FormItem>
								<FormLabel className="font-bold">Username</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({field}) => (
							<FormItem>
								<FormLabel className="font-bold">Email</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({field}) => (
							<FormItem>
								<FormLabel className="font-bold">Password</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="w-full pb-3">
						<Link
							className="float-right hover:text-emerald-600 ease-in-out duration-700"
							href={"/login"}>
							already have an account?
						</Link>
					</div>
					<Button
						type="submit"
						className="hover:bg-blue-500 dark:hover:bg-blue-500 ease-in-out duration-700 dark:bg-transparent dark:text-white dark:border dark:border-input">
						Signup
					</Button>
				</form>
			</Form>
		</div>
	);
}
