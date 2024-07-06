import { ChatType, CompanyType, RecruiterType } from "@/lib/types"
import { create } from "zustand"

type ChatStore = {
    sender:{
        comapny:CompanyType | undefined,
        recruiter:RecruiterType | undefined
    },
    recentChats:ChatType[] | [],
    updateSender:(company:CompanyType,recruiter:RecruiterType)=>void,
    updateRecentChats:(chat:ChatType)=>void
}

export const useChatStore = create<ChatStore>((set)=>({
    sender:{
        comapny:undefined
        ,recruiter:undefined
    },
    recentChats:[],
    updateSender:(company,recruiter)=>{
        set({sender:{comapny:company,recruiter:recruiter}})
    },
    updateRecentChats:(chat)=>set({recentChats:[chat]})
}))