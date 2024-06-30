import { create } from "zustand";

type RecruiterStore = {
	isRecruiterAuthenticated: boolean;
    companyId:string | undefined;
	updateRecruiterAuth: (val: boolean) => void;
    updateCompanyId:(id:string)=>void
};

export const useRecruiterStore = create<RecruiterStore>((set)=>({
    isRecruiterAuthenticated:false,
    companyId:undefined,
    updateRecruiterAuth:(val:boolean)=>{
        set({isRecruiterAuthenticated:val})
    },
    updateCompanyId:(id:string)=>{
        set({companyId:id})
    }
}))