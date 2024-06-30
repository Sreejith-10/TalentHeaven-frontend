import * as z from "zod";

export const comapnyRegistrationSchema = z.object({
    company_name:z.string().min(3),
    company_about:z.string(),
    company_country:z.string(),
    company_state:z.string(),
    company_city:z.string(),
    company_address:z.string(),
    reference:z.string(),
    phone_number:z.string()
})