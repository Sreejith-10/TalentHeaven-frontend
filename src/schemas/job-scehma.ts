import * as z from "zod";

export const jobScehma = z.object({
	role: z.string().min(3),
	vaccany: z.string().default("1"),
	job_type: z.string().default("full time"),
	job_mode: z.string().default("work from office"),
	job_description: z.string().optional(),
	job_requirements: z.array(z.string()),
	skill_rquired: z.array(z.string()),
	experience: z.string(),
	salary: z.string(),
	applications_end_date: z.string(),
});
