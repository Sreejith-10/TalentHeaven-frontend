"use client";

import Image from "next/image";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {useToast} from "../ui/use-toast";
import {useMutation} from "@tanstack/react-query";
import {logOutUser} from "@/controllers/userAuthController";
import Cookie from "js-cookie";
import {authStore} from "@/store/auth-store";
import Link from "next/link";

const DropDown = () => {
	const {toast} = useToast();
	const updateAuth = authStore((state) => state.updateAuth);

	const {mutate} = useMutation({
		mutationFn: logOutUser,
		onError: () => {
			toast({
				title: "Error",
				description: "something went wrong",
				type: "foreground",
			});
		},
		onSuccess: () => {
			toast({
				title: "Success",
				description: "user logged out",
			});
			updateAuth(false);
			localStorage.removeItem("session_id");
			Cookie.remove("access_token");
		},
	});

	const logoutUser = () => {
		const session_id = JSON.parse(localStorage.getItem("session_id")!);
		mutate(session_id);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="cursor-pointer">
				<Image
					src={"/icons/Default_pfp.svg.png"}
					alt="user_icon"
					width={40}
					height={40}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mt-2 cursor-pointer">
				<DropdownMenuLabel>
					<Link href={"/account"}>My account</Link>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuLabel>Notifications</DropdownMenuLabel>
				<DropdownMenuLabel>Messages</DropdownMenuLabel>
				<DropdownMenuLabel>Settings</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuLabel onClick={logoutUser}>Logout</DropdownMenuLabel>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropDown;
