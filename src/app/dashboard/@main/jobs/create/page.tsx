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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {createJob} from "@/controllers/jobController";
import {jobScehma} from "@/schemas/job-scehma";
import {useRecruiterStore} from "@/store/useRecruiterStore";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {X} from "lucide-react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";

export default function CreateJob() {
	const id = useRecruiterStore((state) => state.companyId);
	const [skills, setSkills] = useState<string[] | []>([]);
	const [requirements, setRequirements] = useState<string[] | []>([]);

	const form = useForm<z.infer<typeof jobScehma>>({
		resolver: zodResolver(jobScehma),
		defaultValues: {
			role: "",
			vaccany: "1",
			job_description: "",
			job_mode: "work form office",
			job_requirements: [""],
			job_type: "full-time",
			experience: "fresher",
			salary: "",
			skill_rquired: [],
			applications_end_date: "",
		},
	});

	const {mutate} = useMutation({
		mutationFn: createJob,
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (err) => {
			console.log(err);
		},
	});

	const submitHandler = (values: z.infer<typeof jobScehma>) => {
		console.log(values);
		mutate({values, id});
		form.reset();
		setSkills([]);
		setRequirements([]);
	};

	return (
		<div className="w-full h-full bg-slate-50 dark:bg-slate-900 dark:border dark:border-slate-800 rounded-2xl p-6 flex gap-5 overflow-auto hide-scroll-bar">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(submitHandler)}
					className="w-full grid grid-cols-2 gap-10 overflow-auto px-4">
					{/* role */}
					<div className="space-y-4">
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
										const req = e.currentTarget.value.trim();
										setRequirements((prev) => [...prev, req]);
										form.setValue("job_requirements", [...requirements, req]);
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

					{/* job-mode */}
					<div className="space-y-4">
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
											<SelectItem value={"on site"}>On site</SelectItem>
											<SelectItem value={"hybrid"}>Hybrid</SelectItem>
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

					{/* salary*/}
					<FormField
						control={form.control}
						name="salary"
						render={({field}) => (
							<FormItem>
								<FormLabel className="font-bold">Salary</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue="work from office">
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="select a value" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value={"0 - 2 LPA"}>0 - 2 LPA</SelectItem>
										<SelectItem value={"2 - 5 LPA"}>2 - 5 LPA</SelectItem>
										<SelectItem value={"5 - 10 LPA"}>5 - 10 LPA</SelectItem>
										<SelectItem value={"10 - 20 LPA"}>10 - 20 LPA</SelectItem>
										<SelectItem value={"20+ LPA"}>20+ LPA</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Experience */}
					<FormField
						control={form.control}
						name="experience"
						render={({field}) => (
							<FormItem>
								<FormLabel className="font-bold">Experience Required</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue="work from office">
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="select a value" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value={"any"}>Any Experience</SelectItem>
										<SelectItem value={"fresher"}>Fresher</SelectItem>
										<SelectItem value={"0 - 1 Year"}>0 - 1 Year</SelectItem>
										<SelectItem value={"1 - 3 Years"}>1 - 3 Years</SelectItem>
										<SelectItem value={"3 - 5 Years"}>3 - 5 Years</SelectItem>
										<SelectItem value={"5 - 10 Years"}>5 - 10 Years</SelectItem>
										<SelectItem value={"10+ Years"}>10+ Years</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* vaccany */}
					<FormField
						control={form.control}
						name="vaccany"
						render={({field}) => (
							<FormItem>
								<FormLabel className="font-bold">Number of vaccancy</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Application_end_date */}
					<FormField
						control={form.control}
						name="applications_end_date"
						render={({field}) => (
							<FormItem>
								<FormLabel className="font-bold">
									Application end date
								</FormLabel>
								<FormControl>
									<Input {...field} type="date" />
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
