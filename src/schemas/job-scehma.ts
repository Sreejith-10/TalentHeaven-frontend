import * as z from "zod"

export const jobScehma = z.object({
    role:z.string().min(3),
    job_type:z.string().default("full time"),
    job_mode:z.string().default("work from office"),
    job_description:z.string().optional(),
    job_requirments:z.array(z.string()),
    skill_rquired:z.array(z.string()),
    min_experience:z.string().default("0"),
    max_experience:z.string(),
    min_salary:z.string(),
    max_salary:z.string(),
})