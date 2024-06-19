import * as z from "zod"

const educationSchema = z.object({
    institute:z.string(),
    education_type:z.string(),
    marks:z.string(),
    stream:z.string(),
    start_date:z.string(),
    end_date:z.string()
})

const experienceSchema = z.object({
    company_name:z.string(),
    position:z.string(),
    start_date:z.string(),
    end_date:z.string()
})


export const accountSchema = z.object({
    fname:z.string().min(3),
    lname:z.string(),
    phone:z.string().optional(),
    email:z.string().email().optional(),
    skills:z.array(z.string()).optional(),
    education:z.array(educationSchema).optional(),
    experience:z.array(experienceSchema).optional()
})



