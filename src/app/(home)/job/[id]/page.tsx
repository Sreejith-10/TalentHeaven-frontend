"use client";

import {Button} from "@/components/ui/button";
import JobCard from "@/components/ui/cards/job-card";
import {useToast} from "@/components/ui/use-toast";
import {
	applyForJob,
	getJobById,
	getJobsByCompanyId,
} from "@/controllers/jobController";
import {fetchCompany} from "@/controllers/recruiterController";
import {
	fetchSavedJobs,
	fetchUserJob,
	removeSaved,
	saveJob,
} from "@/controllers/userController";
import {useUserStore} from "@/store/userStore";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {
	Banknote,
	Bookmark,
	BookmarkCheck,
	Calendar,
	Clock,
	Compass,
} from "lucide-react";
import Image from "next/image";
import {useParams, useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Job() {
	const {id}: {id: string} = useParams();
	const {push} = useRouter();
	const user = useUserStore((state) => state.userId);
	const {toast} = useToast();

	const queryClient = useQueryClient();

	const {mutate} = useMutation({
		mutationFn: applyForJob,
		onSuccess: (res) => {
			toast({title: res.message});
		},
		onError: (err) => {
			const error = err as AxiosError;
			console.log(error);
		},
	});

	const {data: job, isLoading} = useQuery({
		queryKey: ["job", id],
		queryFn: getJobById,
	});

	const {data: company, error} = useQuery({
		queryKey: ["company", job?.company_id],
		queryFn: () => fetchCompany(job?.company_id!),
		enabled: !!job?.company_id,
	});

	const {data: userStatus} = useQuery({
		queryKey: ["user-data", {id, uid: user}],
		queryFn: () => fetchUserJob({id, uid: user}),
		enabled: !!user,
	});

	const {data: saved} = useQuery({
		queryKey: ["saved", user],
		queryFn: () => fetchSavedJobs(user),
	});

	const {data: moreJobs} = useQuery({
		queryKey: ["other-jobs", company],
		queryFn: () => getJobsByCompanyId(company?.company_id!),
		enabled: Boolean(company?.company_id),
	});

	const {mutate: save} = useMutation({
		mutationFn: saveJob,
		onSuccess: (res) => {
			toast({title: res.message, variant: "success"});
			queryClient.invalidateQueries(saved);
		},
		onError: (err) => {
			console.log(err);
		},
	});

	const {mutate: unsave} = useMutation({
		mutationFn: removeSaved,
		onSuccess: (res) => {
			queryClient.invalidateQueries(saved);
			toast({title: res.message, variant: "success"});
		},
		onError: (err) => {
			console.log(err);
		},
	});

	const apply = () => {
		if (user) {
			mutate({company_id: company?.company_id!, job_id: id, user_id: user});
		} else {
			push("/login");
		}
	};

	if (isLoading) {
		return (
			<div className="w-full h-dvh flex flex-col">
				<div className="mx-[10%] xl:mx-[5%] flex flex-col py-10 px-20">
					loading . . .
				</div>
			</div>
		);
	}

	return (
		<div className="w-full h-auto flex flex-col">
			<div className="mx-[10%] xl:mx-[5%] flex flex-col py-10 px-20">
				<div className="w-full h-52 bg-gradient-to-br from-yellow-400 to-pink-600 rounded-xl relative">
					<div className="bg-slate-50 w-fit h-fit p-8 rounded-full absolute bottom-0 translate-y-[50%] left-10">
						<Image
							src={"/google.png"}
							alt="company_logo"
							width={50}
							height={50}
						/>
					</div>
				</div>
				<br />
				<br />
				<br />
				<div className="w-full px-10 flex gap-5">
					<div className="w-[70%]">
						<div>
							<h1 className="font-bold text-3xl">{job?.role}</h1>
							<h1 className="font-semibold text-xl">{company?.company_name}</h1>
							<p className="text-slate-500 mt-3">{company?.company_address}</p>
						</div>
						<br />
						<br />
						<div>
							<h2 className="font-semibold text-lg">About the job</h2>
							<p className="font-medium">{job?.job_description}</p>
						</div>
						<br />
						<div className="space-y-4">
							<h2 className="font-semibold text-lg">Requirements:</h2>
							<ul className="list-disc ml-5">
								{job?.job_requirements.map((req, index) => (
									<li
										key={index}
										className="text-slate-700 dark:text-slate-500 font-medium">
										{req}
									</li>
								))}
							</ul>
						</div>
						<br />
						<div className="space-y-4">
							<h2 className="font-semibold text-lg">Skills:</h2>
							<ul className="flex flex-wrap gap-5">
								{job?.skill_rquired.map((req, index) => (
									<li
										key={index}
										className="bg-slate-200 dark:bg-slate-500 text-slate-700 dark:text-slate-800 px-4 py-1 rounded-md w-fit">
										{req}
									</li>
								))}
							</ul>
						</div>
						<br />
						<div className="space-y-4">
							<h2 className="font-semibold text-lg">Experience</h2>
							<p className="bg-slate-200 dark:bg-slate-500 text-slate-700 dark:text-slate-800 px-4 py-1 rounded-md w-fit">
								1 - 2 years
							</p>
						</div>
						<br />
					</div>
					<div className="w-[30%]">
						<div className="w-full flex gap-5 mb-10">
							{saved?.saved_jobs?.includes(id) ? (
								<div
									onClick={() => {
										unsave({job_id: id, user_id: user!});
									}}
									className="bg-emerald-600 text-slate-50 dark:bg-emerald-600 dark:border-2 dark:border-slate-100 rounded-full w-1/2 font-semibold flex items-center justify-center gap-3 cursor-pointer">
									<BookmarkCheck />
									Saved
								</div>
							) : (
								<div
									onClick={() => {
										save({job_id: id, user_id: user!});
									}}
									className="bg-slate-200 dark:bg-slate-900 dark:border-2 dark:border-slate-800 rounded-full w-1/2 font-semibold flex items-center justify-center gap-3 cursor-pointer">
									<Bookmark />
									Save
								</div>
							)}
							<div className="rounded-full w-1/2 font-semibold flex items-center justify-center gap-3 cursor-pointer">
								<Button
									onClick={apply}
									disabled={userStatus === "rejected"}
									className="w-full h-full py-3 rounded-full bg-purple-600 hover:bg-purple-500 dark:text-slate-200">
									{userStatus ? "Applied" : "Apply now"}
								</Button>
							</div>
						</div>
						<div className="w-full h-auto bg-slate-100 dark:bg-slate-900 dark:border-2 dark:border-slate-800 rounded-xl p-5">
							<div className="w-full flex">
								<div className="w-3/12 grid place-content-center">
									<Banknote className="size-8" />
								</div>
								<div className="w-3/4 flex flex-col items-start">
									<h2 className="font-semibold text-lg dark:text-slate-300">
										Salary
									</h2>
									<p className="">1 - 2 LPA</p>
								</div>
							</div>
							<br />
							<div className="w-full flex">
								<div className="w-3/12 grid place-content-center">
									<Compass className="size-8" />
								</div>
								<div>
									<h2 className="font-semibold text-lg dark:text-slate-300">
										Job mode
									</h2>
									<h3>Remote</h3>
								</div>
							</div>
							<br />
							<div className="w-full flex">
								<div className="w-3/12 grid place-content-center">
									<Clock className="size-8" />
								</div>
								<div>
									<h2 className="font-semibold text-lg dark:text-slate-300">
										Job type
									</h2>
									<h3>Full time</h3>
								</div>
							</div>
							{job?.job_type === "internship" && (
								<>
									<br />
									<div className="w-full flex">
										<div className="w-3/12 grid place-content-center">
											<Calendar className="size-8" />
										</div>
										<div>
											<h2 className="font-semibold text-lg dark:text-slate-300">
												Duration
											</h2>
											<h3>{job?.duration} month</h3>
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				</div>

				<div className="mt-10">
					<h1 className="font-semibold text-2xl">
						Other jobs from {company?.company_name}
					</h1>
					<div className="grid grid-cols-3 gap-5 py-5">
						{moreJobs
							?.filter((job) => job._id !== id)
							.slice(0, 9)
							.map((job, index) => (
								<JobCard job={job} key={index} className="w-full" />
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
