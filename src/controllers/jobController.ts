import { JobInstance } from "@/lib/axios"

export const searchJob = async(searchParams:{q:string,l:string}) =>{
    const data = await JobInstance.get(`/search/${searchParams.q}/${searchParams.l}`)
    return data
}