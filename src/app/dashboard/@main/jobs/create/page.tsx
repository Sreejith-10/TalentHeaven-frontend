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
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {jobScehma} from "@/schemas/job-scehma";
import {zodResolver} from "@hookform/resolvers/zod";
import {X} from "lucide-react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";

export default function CreateJob() {
	const [skills, setSkills] = useState<string[] | []>([]);
	const [requirements, setRequirements] = useState<string[] | []>([]);

	const form = useForm<z.infer<typeof jobScehma>>({
		resolver: zodResolver(jobScehma),
		defaultValues: {
			role: "",
			job_description: "",
			job_mode: "work form office",
			job_reqruiements: [],
			job_type: "full-time",
			min_salary: "",
			max_salary: "",
			min_experience: "",
			max_experience: "",
			skill_rquired: [],
		},
	});

	const submitHandler = (values: z.infer<typeof jobScehma>) => {
		console.log(values);
	};

	return (
		<div className="w-full h-full bg-slate-50 dark:bg-slate-900 dark:border dark:border-slate-800 rounded-2xl p-6 flex gap-5 overflow-auto hide-scroll-bar">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(submitHandler)}
					className="w-full grid grid-cols-2 gap-10">
					<div className="space-y-4">
						{/* role */}
						<FormField
							control={form.control}
							name="role"
							render={({field}) => (
								<FormItem>
									<FormLabel className="font-bold">Role</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* job-description */}
						<FormField
							control={form.control}
							name="job_description"
							render={({field}) => (
								<FormItem>
									<FormLabel className="font-bold">Job Decription</FormLabel>
									<FormControl>
										<Textarea {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Job requirements */}
						<div className="space-y-2">
							<Label className="font-semibold">Job Requirements</Label>
							<Input
								type="text"
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										const req = e.currentTarget.value;
										setRequirements((prev) => [...prev, req]);
										form.setValue("skill_rquired", [...skills, req]);
										e.currentTarget.value = "";
									}
								}}
							/>
							<br />

							<div className="w-full h-auto flex flex-wrap gap-5">
								{requirements?.map((item, index) => (
									<span
										className="bg-slate-200 w-fit px-3 py-3 rounded-md flex justify-between gap-5"
										key={index}>
										<p className="font-semibold text-sm text-slate-700">
											{item}
										</p>
										<X
											size={20}
											className="hover:cursor-pointer"
											onClick={() => {
												setRequirements((prev) =>
													prev.filter((_, ind) => {
														if (ind !== index) {
															return item;
														}
													})
												);
											}}
										/>
									</span>
								))}
							</div>
							<br />
						</div>
					</div>

					<div className="space-y-4">
						{/* job-mode */}
						<FormField
							control={form.control}
							name="job_mode"
							render={({field}) => (
								<FormItem>
									<FormLabel className="font-bold">Job Mode</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue="work from office">
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="select a value" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value={"work from office"}>
												Work from office
											</SelectItem>
											<SelectItem value={"work from home"}>
												Work from home
											</SelectItem>
											<SelectItem value={"remote"}>Remote</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* job-type */}
						<FormField
							control={form.control}
							name="job_type"
							render={({field}) => (
								<FormItem>
									<FormLabel className="font-bold">Job Type</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue="full time">
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="select a value" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value={"full time"}>Full-time</SelectItem>
											<SelectItem value={"part time"}>Part-time</SelectItem>
											<SelectItem value={"internship"}>Internship</SelectItem>
											<SelectItem value={"contract"}>Contract</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* skills */}
						<div className="space-y-2">
							<Label className="font-semibold">Skills</Label>
							<Input
								type="text"
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										const skill = e.currentTarget.value;
										setSkills((prev) => [...prev, skill]);
										form.setValue("skill_rquired", [...skills, skill]);
										e.currentTarget.value = "";
									}
								}}
							/>
							<br />

							<div className="w-full h-auto flex flex-wrap gap-5">
								{skills?.map((item, index) => (
									<span
										className="bg-slate-200 w-fit px-3 py-3 rounded-md flex justify-between gap-5"
										key={index}>
										<p className="font-semibold text-sm text-slate-700">
											{item}
										</p>
										<X
											size={20}
											className="hover:cursor-pointer"
											onClick={() => {
												setSkills((prev) =>
													prev.filter((iem, ind) => {
														if (ind !== index) {
															return item;
														}
													})
												);
											}}
										/>
									</span>
								))}
							</div>
							<br />
						</div>
					</div>

					{/* salary max and min in lpa */}
					<FormField
						control={form.control}
						name="min_salary"
						render={({field}) => (
							<FormItem>
								<FormLabel className="font-bold">
									Minimum Salary(in lpa)
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
						name="max_salary"
						render={({field}) => (
							<FormItem>
								<FormLabel className="font-bold">
									Maximus Salary(in lpa)
								</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Experience */}
					<FormField
						control={form.control}
						name="min_experience"
						render={({field}) => (
							<FormItem>
								<FormLabel className="font-bold">
									Minimum Experience(In years)
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
						name="max_experience"
						render={({field}) => (
							<FormItem>
								<FormLabel className="font-bold">
									Maximus Experience(In years)
								</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
}
