import {JobServiceInstance} from "@/lib/axios";
import {JobType} from "@/lib/types";
import {delay} from "@/utils/delay";

export const searchJob = async (searchParams: any) => {
	try {
		const url = new URL(window.location.href);
		const search = new URLSearchParams(url.search);

		const {data} = await JobServiceInstance.get("/search", {params: search});
		return data.jobList;
	} catch (error) {
		throw new Error("failed");
	}
};

export const createJob = async (inputs: {values: any; id: any}) => {
	try {
		const {values, id} = inputs;
		const {data} = await JobServiceInstance.post(
			"/create-job",
			{jobData: values, company_id: id},
			{headers: {"Content-Type": "application/json"}}
		);
		return data;
	} catch (error) {
		throw new Error("failed");
	}
};

export const fetchRecentJobs = async () => {
	const {data} = await JobServiceInstance.get("/recent-jobs");
	return data;
};

export const getJob = async () => {
	const {data} = await JobServiceInstance.get("/get-jobs");
	return data;
};

export const getJobById = async ({queryKey}: {queryKey: string[]}) => {
	const {data}: {data: {job: JobType}} = await JobServiceInstance.get(
		"/get-job/" + queryKey[1]
	);
	return data.job;
};

export const getApplicationsByJobId = async (id: string) => {
	const {data} = await JobServiceInstance.get(
		"/get-applications-by-jobid/" + id
	);
	return data.applications;
};

export const getJobsByCompanyId = async (id: string) => {
	const {data}: {data: {jobList: JobType[]}} = await JobServiceInstance.get(
		"/get-company-jobs/" + id
	);
	return data.jobList;
};

export const applyForJob = async (ids: {
	company_id: string;
	job_id: string;
	user_id: string;
}) => {
	const {company_id, job_id, user_id} = ids;
	const {data} = await JobServiceInstance.post(
		"/apply",
		{company_id, job_id, user_id},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	return data;
};

export const getAllApplications = async (id: string) => {
	const {data}: {data: {applications: []}} = await JobServiceInstance(
		"/get-all-applications/" + id
	);
	return data.applications;
};

export const rejectApplication = async (args: {
	job_id: string;
	user_id: string;
}) => {
	const {job_id, user_id} = args;
	const {data} = await JobServiceInstance.post("/reject", {job_id, user_id});
	return data;
};

export const updateApplicationStatus = async ({
	job_id,
	user_id,
	new_status,
}: {
	job_id: string;
	user_id: string;
	new_status: "viewed" | "applied" | "rejected" | "hired" | "interviewing";
}) => {
	const {data} = await JobServiceInstance.post("/update-application-status",{job_id,user_id,new_status});
	return data;
};
