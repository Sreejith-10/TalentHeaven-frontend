import * as z from "zod";

export const comapnyRegistrationSchema = z.object({
    company_name:z.string().min(3),
    comapny_about:z.string(),
    company_country:z.string(),
    company_state:z.string(),
    comapny_city:z.string(),
    company_address:z.string(),
    refrence:z.string(),
    phone_number:z.string()
})