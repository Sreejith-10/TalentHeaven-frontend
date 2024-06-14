"use client";

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
import {Label} from "@/components/ui/label";
import {accountSchema} from "@/schemas/account-setup-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import * as z from "zod";
import Cookie from "js-cookie";
import {jwtDecode} from "jwt-decode";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {createUser} from "@/controllers/userAuthController";
import {AxiosError} from "axios";

export default function MultiStepForm() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const {toast} = useToast();
	const {push} = useRouter();

	const {mutate, isPending} = useMutation({
		mutationFn: createUser,
		onSuccess: (res) => {
			push("/");
			toast({
				title: "account setup complete",
				description: res.data.message,
				duration: 3000,
			});
		},
		onError: (error) => {
			const err = error as AxiosError<{message: string; err: any}>;
			toast({
				variant: "destructive",
				title: "Error",
				description: err.response?.data.message,
				duration: 3000,
			});
		},
	});

	const form = useForm<z.infer<typeof accountSchema>>({
		resolver: zodResolver(accountSchema),
		defaultValues: {
			fname: "",
			lname: "",
			phone: "",
			email: "",
			skills: [""],
			experience: [
				{company_name: "", position: "", end_date: "", start_date: ""},
			],
			education: [
				{
					institute: "",
					education_type: "",
					stream: "",
					start_date: "",
					end_date: "",
				},
			],
		},
	});

	const {
		fields: educationFields,
		append: educationFieldAppend,
		remove: educationFieldRemove,
	} = useFieldArray({
		name: "education",
		control: form.control,
	});

	const {
		fields: experienceFields,
		append: experienceFieldAppend,
		remove: experienceFieldRemove,
	} = useFieldArray({
		name: "experience",
		control: form.control,
	});

	const submitHandler = (values: z.infer<typeof accountSchema>) => {
		const token = Cookie.get("access_token");
		const decoded = jwtDecode(token!);

		//@ts-expect-error type jwt data
		const id = decoded.id;

		createUser({values, user_id: id});
	};

	return (
		<div className="w-full min-h-dvh grid place-content-center py-10">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(submitHandler)}
					className="space-y-4 w-[500px] border border-slate-300 dark:border-slate-800 shadow-md rounded-xl py-10 px-8">
					{currentIndex === 0 && (
						<div className="space-y-4">
							<h1 className="font-semibold text-[25px]">Personal Details</h1>
							<br />
							<FormField
								control={form.control}
								name="fname"
								render={({field}) => (
									<FormItem>
										<FormLabel className="font-bold">Fisrt name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="lname"
								render={({field}) => (
									<FormItem>
										<FormLabel className="font-bold">Last name</FormLabel>
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
								name="phone"
								render={({field}) => (
									<FormItem>
										<FormLabel className="font-bold">Phone number</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<br />
							<div className="w-full flex justify-end">
								<Button
									onClick={() => {
										setCurrentIndex((prev) => prev + 1);
									}}
									className="bg-blue-500 hover:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-400">
									Next
								</Button>
							</div>
						</div>
					)}

					{currentIndex === 1 && (
						<div>
							<h1 className="font-semibold text-[25px]">Skills</h1>
							<p>Provide your skills if any</p>
							<input type="text" />

							<div className="w-full flex justify-between">
								<Button
									onClick={() => setCurrentIndex((prev) => prev - 1)}
									className="bg-red-500 hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-400">
									Prev
								</Button>
								<Button
									onClick={() => setCurrentIndex((prev) => prev + 1)}
									className="bg-blue-500 hover:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-400">
									Next
								</Button>
							</div>
						</div>
					)}

					{currentIndex === 2 && (
						<div className="space-y-5">
							<h1 className="font-semibold text-[25px]">Educational Details</h1>
							{educationFields.map((item, index) => {
								return (
									<div key={index} className="space-y-4">
										<h1>Education #{index + 1}</h1>

										<div>
											<Label className="font-bold">Institue</Label>
											<Input
												type="text"
												{...form.register(`education.${index}.institute`)}
											/>
										</div>

										<div>
											<Label className="font-bold">Qualification</Label>
											<Input
												type="text"
												{...form.register(`education.${index}.education_type`)}
											/>
										</div>

										<div>
											<Label className="font-bold">Stream</Label>
											<Input
												type="text"
												{...form.register(`education.${index}.stream`)}
											/>
										</div>

										<div className="flex w-full justify-between gap-5">
											<div className="w-1/2">
												<Label className="font-bold">Start Date</Label>
												<Input
													className="w-full"
													type="date"
													{...form.register(`education.${index}.start_date`)}
												/>
											</div>

											<div className="w-1/2">
												<Label className="font-bold">End Date</Label>
												<Input
													className="w-full"
													type="date"
													{...form.register(`education.${index}.end_date`)}
												/>
											</div>
										</div>

										<br />
										<div className="w-full flex justify-between">
											{index >= 1 && (
												<Button
													onClick={() => {
														educationFieldRemove(index);
													}}>
													Remove
												</Button>
											)}
											<Button
												onClick={() => {
													educationFieldAppend({
														institute: "",
														education_type: "",
														stream: "",
														start_date: "",
														end_date: "",
													});
												}}>
												Add Education
											</Button>
										</div>
									</div>
								);
							})}

							<br />
							<div className="w-full flex justify-between">
								<Button
									onClick={() => setCurrentIndex((prev) => prev - 1)}
									className="bg-red-500 hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-400">
									Prev
								</Button>
								<Button
									onClick={() => setCurrentIndex((prev) => prev + 1)}
									className="bg-blue-500 hover:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-400">
									Next
								</Button>
							</div>
						</div>
					)}

					{currentIndex === 3 && (
						<div className="space-y-5">
							<h1 className="font-semibold text-[25px]">Experience</h1>
							{experienceFields.map((item, index) => {
								return (
									<div key={index} className="space-y-4">
										<h1>Comapny #{index + 1}</h1>

										<div>
											<Label className="font-bold">Company name</Label>
											<Input
												type="text"
												{...form.register(`experience.${index}.company_name`)}
											/>
										</div>

										<div>
											<Label className="font-bold">Position</Label>
											<Input
												type="text"
												{...form.register(`experience.${index}.position`)}
											/>
										</div>

										<div className="flex w-full justify-between gap-5">
											<div className="w-1/2">
												<Label className="font-bold">Start Date</Label>
												<Input
													className="w-full"
													type="date"
													{...form.register(`experience.${index}.start_date`)}
												/>
											</div>

											<div className="w-1/2">
												<Label className="font-bold">End Date</Label>
												<Input
													className="w-full"
													type="date"
													{...form.register(`experience.${index}.end_date`)}
												/>
											</div>
										</div>

										<br />
										<div className="w-full flex justify-between">
											{index >= 1 && (
												<Button
													onClick={() => {
														experienceFieldRemove(index);
													}}>
													Remove
												</Button>
											)}
											<Button
												onClick={() => {
													experienceFieldAppend({
														company_name: "",
														position: "",
														start_date: "",
														end_date: "",
													});
												}}>
												Add Experience
											</Button>
										</div>
									</div>
								);
							})}

							<br />
							<div className="w-full flex justify-between">
								<Button
									onClick={() => setCurrentIndex((prev) => prev - 1)}
									className="bg-red-500 hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-400">
									Prev
								</Button>
								<Button
									type="submit"
									className="bg-emerald-500 hover:bg-emerald-400 dark:bg-emerald-500 dark:hover:bg-emerald-400">
									Submit
								</Button>
							</div>
						</div>
					)}
				</form>
			</Form>
		</div>
	);
}
