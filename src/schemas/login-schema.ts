import * as z from "zod"

export const loginSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6,{message:"Password shoule be atleast 6 char long"})
})