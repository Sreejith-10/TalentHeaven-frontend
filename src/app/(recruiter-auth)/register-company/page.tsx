"use client";

import {Button} from "@/components/ui/button";
import {
	Form,
	FormField,
	FormMessage,
	FormControl,
	FormLabel,
	FormItem,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
	SelectItem,
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {useToast} from "@/components/ui/use-toast";
import {registerCompany} from "@/controllers/recruiterController";
import {comapnyRegistrationSchema} from "@/schemas/company-registration-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";

export default function RegisterCompany() {
	const {push} = useRouter();
	const {toast} = useToast();

	const form = useForm<z.infer<typeof comapnyRegistrationSchema>>({
		resolver: zodResolver(comapnyRegistrationSchema),
		defaultValues: {
			company_name: "",
			company_about: "",
			company_country: "",
			company_state: "",
			company_city: "",
			company_address: "",
			reference: "",
			phone_number: "",
		},
	});

	const [searchCountry, setSearchCountry] = useState("");
	const [searchState, setSearchState] = useState("");
	const [searchCity, setSearchCity] = useState("");

	const {mutate} = useMutation({
		mutationFn: registerCompany,
		onSuccess: ({data}) => {
			const {message, company_id} = data;
			push("/recruiter-register/" + company_id);
		},
		onError: (err) => {
			const error = err as AxiosError<{message: string; err: any}>;
			toast({
				title: "error",
				description: error.message,
			});
		},
	});

	const countryList = ["America", "India", "USA", "France", "Gana"];

	const submitHandler = (values: z.infer<typeof comapnyRegistrationSchema>) => {
		mutate(values);
	};

	return (
		<div className="w-auto h-auto py-12 px-9 flex flex-col gap-10 shadow-xl rounded-2xl border border-slate-200 border-opacity-30 dark:border dark:border-input">
			<div>
				<h1 className="font-bold text-[1.5rem]">Registration</h1>
				<p className="font-medium text-slate-600">
					Register your company in Talent Heaven
				</p>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(submitHandler)}
					className="grid grid-cols-2 place-content-start gap-10">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="company_name"
							render={({field}) => (
								<FormItem>
									<FormLabel className="font-bold">Company Name</FormLabel>
									<FormControl>
										<Input {...field} className="w-[300px]" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="company_about"
							render={({field}) => (
								<FormItem>
									<FormLabel className="font-bold">About</FormLabel>
									<FormControl>
										<Textarea {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="phone_number"
							render={({field}) => (
								<FormItem>
									<FormLabel className="font-bold">Telephone</FormLabel>
									<FormControl>
										<Input {...field} required />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="reference"
							render={({field}) => (
								<FormItem>
									<FormLabel className="font-bold">
										Reference{" "}
										<span className="text-slate-600">
											(like website,linkdin)
										</span>
									</FormLabel>
									<FormControl>
										<Input {...field} required />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="space-y-4">
						<FormField
							control={form.control}
							name="company_country"
							render={({field}) => (
								<FormItem className="m-0">
									<FormLabel className="font-bold">Country</FormLabel>
									<Select onValueChange={field.onChange} defaultValue="">
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="select a country" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<Input
												value={searchCountry}
												onChange={(e) => setSearchCountry(e.target.value)}
												placeholder="Search ..."
												className="focus:ring-transparent focus:outline-none focus-visible:ring-0"
											/>
											{countryList
												.filter((item) => {
													if (item.toLowerCase().includes(searchCountry))
														return item;
												})
												.map((item, index) => (
													<SelectItem value={item} key={index}>
														{item}
													</SelectItem>
												))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="company_state"
							render={({field}) => (
								<FormItem className="m-0">
									<FormLabel className="font-bold">State</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="company_city"
							render={({field}) => (
								<FormItem className="m-0">
									<FormLabel className="font-bold">City</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="company_address"
							render={({field}) => (
								<FormItem className="m-0">
									<FormLabel className="font-bold">Full Address</FormLabel>
									<FormControl>
										<Textarea {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button
						type="submit"
						className="bg-purple-600 col-span-2 hover:bg-purple-400 dark:bg-transparent dark:hover:bg-purple-600 dark:text-white dark:border dark:border-input">
						Register
					</Button>
				</form>
			</Form>
		</div>
	);
}
