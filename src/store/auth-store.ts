import {create} from "zustand";

type AuthStore = {
	isAuthenticated: boolean;
	updateAuth: (val: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	isAuthenticated: false,
	updateAuth: (val: boolean) => {
		set({isAuthenticated: val});
	},
}));
