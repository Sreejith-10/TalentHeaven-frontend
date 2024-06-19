"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useParams} from "next/navigation";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Eye, EyeOffIcon} from "lucide-react";
import {useState} from "react";

const recruiterSchema = z.object({
	recruiter_name: z.string().min(3),
	recuiter_email: z.string().email(),
	recruiter_phone_number: z.string().optional(),
	password: z.string().min(6),
});

export default function RecruiterRegister() {
	const {id} = useParams();
	const [show, setShow] = useState(false);

	const form = useForm<z.infer<typeof recruiterSchema>>({
		resolver: zodResolver<typeof recruiterSchema>(recruiterSchema),
		defaultValues: {
			recruiter_name: "",
			recuiter_email: "",
			recruiter_phone_number: "",
			password: "",
		},
	});

	const handleSubmit = () => {};

	return (
		<div className="w-[400px] h-auto py-12 px-9 flex flex-col gap-10 shadow-xl rounded-2xl border border-slate-200 border-opacity-30 dark:border dark:border-input">
			<div>
				<h1 className="font-bold text-[1.5rem]">Registration</h1>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="recruiter_name"
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
						name="recuiter_email"
						render={({field}) => (
							<FormItem>
								<FormLabel className="font-bold">User email</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="recruiter_phone_number"
						render={({field}) => (
							<FormItem>
								<FormLabel className="font-bold">
									User phone number(optional)
								</FormLabel>
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
									<div className="w-full h-auto relative">
										<Input {...field} type={show ? "text" : "password"} />
										<div className="absolute top-1/2 translate-y-[-50%] right-3">
											{show ? (
												<Eye
													onClick={() => setShow(false)}
													size={22}
													className="cursor-pointer"
												/>
											) : (
												<EyeOffIcon
													onClick={() => setShow(true)}
													size={22}
													className="cursor-pointer"
												/>
											)}
										</div>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type="submit"
						className="bg-purple-600 hover:bg-purple-400 dark:bg-transparent dark:hover:bg-purple-600 dark:text-white dark:border dark:border-input">
						Register
					</Button>
				</form>
			</Form>
		</div>
	);
}
