import {JobServiceInstance} from "@/lib/axios";
import {JobType} from "@/lib/types";

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

export const getJob = async () => {
	const {data} = await JobServiceInstance.get("/get-jobs");
	return data;
};

export const getJobById = async (id: any) => {
	const {queryKey} = id
	const {data}: {data: {job: JobType}} = await JobServiceInstance.get(
		"/get-job/" + queryKey[1]
	);
	return data.job;
};

export const getJobsByCompanyId = async (id: string) => {
	const {data}: {data: {jobList: JobType[]}} = await JobServiceInstance.get(
		"/get-company-jobs/" + id
	);
	return data.jobList;
};

export const applyForJob = async (ids: {job_id: string; user_id: string}) => {
	const {job_id, user_id} = ids;
	const {data} = await JobServiceInstance.post(
		"/apply",
		{job_id, user_id},
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
	return data.applications.flat(1);
};

export const rejectApplication = async (args: {
	job_id: string;
	user_id: string;
}) => {
	const {job_id, user_id} = args;
	const {data} = await JobServiceInstance.post("/reject", {job_id, user_id});
	return data;
};
