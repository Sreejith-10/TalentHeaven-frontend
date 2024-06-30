"use client";

import {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {useScrollDirection} from "@/hooks/userScrollDirection";
import Link from "next/link";
import {Toggle} from "../ui/toggle";
import DropDown from "./drop-down";
import {useAuthStore} from "@/store/auth-store";
import {Menu, X} from "lucide-react";
import Image from "next/image";

const Nav = () => {
	const [isAtTop, setIsAtTop] = useState(true);
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const [sidebar, setSidebar] = useState(false);

	const navigations = [
		{link: "Home", to: "/"},
		{link: "Find Jobs", to: "/search?query=all"},
		{link: "Hire", to: "/dashboard"},
		{link: "Companies", to: "/companies"},
		{link: "Contact", to: "/contact"},
	];
	const [currentIndex, setCurrentIndex] = useState(0);

	const parentRef = useRef<HTMLUListElement>(null);
	const listsRef = useRef<HTMLLIElement[] | null[]>([]);
	const navRef = useRef<HTMLDivElement>(null);

	const scrollDirection = useScrollDirection();

	useEffect(() => {
		document.body.style.overflow = sidebar ? "hidden" : "auto";
	}, [sidebar]);

	useEffect(() => {
		const onscroll = () => {
			setIsAtTop(window.scrollY === 0);
		};

		window.addEventListener("scroll", onscroll);

		return () => {
			removeEventListener("scroll", onscroll);
		};
	}, []);

	return (
		<>
			<motion.div
				variants={{
					start: {
						y: -100,
						opacity: 0,
					},
					end: {
						y: 0,
						opacity: 1,
					},
				}}
				initial="end"
				animate={scrollDirection === "down" ? "start" : "end"}
				id="parent"
				ref={navRef}
				className={`w-full h-[100px] ease-in-out duration-100 z-20 flex items-center justify-evenly justify-items-center fixed top-0 left-0 ${
					isAtTop ? "bg-transparent" : "bg-slate-50 dark:bg-slate-900"
				}`}>
				<div className="text-center relative md:w-full sm:w-full lg:w-full">
					<div className="absolute left-8 sm:left-2 top-1/2 translate-y-[-50%] hidden md:block lg:block">
						<Menu
							onClick={() => setSidebar(true)}
							size={40}
							className="sm:size-8"
						/>
					</div>
					<p className="text-[1.8rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
						TalentHeaven
					</p>
					<div className="absolute right-8 sm:right-2 top-1/2 translate-y-[-50%] hidden md:block lg:block">
						<Toggle size={40} />
					</div>
				</div>
				<nav className="lg:hidden md:hidden sm:hidden">
					<ul ref={parentRef} className="flex items-center gap-5 relative">
						{/* <div
							style={{
								width: `${
									listsRef.current[currentIndex]
										? listsRef.current[currentIndex]?.clientWidth
										: 62
								}px`,
								height: `${
									listsRef.current[currentIndex]
										? listsRef.current[currentIndex]?.offsetHeight
										: 32
								}px`,
								position: "absolute",
								zIndex: "1",
								top: "50%",
								left: `${listsRef.current[currentIndex]?.offsetLeft}px`,
								transform: "translateY(-50%)",
								transition: "ease-in-out .4s",
							}}
							className="bg-purple-600"
						/> */}
						{navigations.map((item, index) => (
							<li
								//@ts-expect-error ref error
								ref={(li) => (listsRef.current[index] = li)}
								key={index}
								onClick={() => setCurrentIndex(index)}
								className={`${
									currentIndex === index
										? "text-purple-600 hover:text-purple-500"
										: ""
								} font-medium cursor-pointer hover:text-purple-400 transition-all px-2 py-1 z-10`}>
								<Link href={item.to}>{item.link}</Link>
							</li>
						))}
					</ul>
				</nav>
				<div className="space-x-5 flex items-center md:hidden lg:hidden">
					<Toggle />
					{isAuthenticated ? (
						<DropDown />
					) : (
						<div className="flex items-center gap-2">
							<Link
								href={"/register"}
								className="text-purple-600 text-lg border border-purple-600 px-4 py-1 rounded-md">
								Register
							</Link>
							<Link
								href={"/login"}
								className="bg-purple-600 text-white px-8 py-2 rounded-md">
								Login
							</Link>
						</div>
					)}
				</div>
			</motion.div>
			<motion.div
				variants={{
					initial: {
						translateX: "-1000px",
						zIndex: -99,
					},
					slide: {
						translateX: 0,
						zIndex: 999,
					},
				}}
				animate={sidebar ? "slide" : "initial"}
				className={`w-[500px] hidden lg:block sm:w-[300px] h-dvh bg-slate-100 dark:bg-slate-900 absolute p-5 md:flex flex-col justify-between`}>
				<div className="px-4">
					<div className="w-full flex justify-end">
						<X
							onClick={() => setSidebar(false)}
							size={40}
							className="sm:size-6"
						/>
					</div>
					<br />
					<br />
					<div className="">
						<ul className="space-y-4 w-full">
							{navigations.map((item, index) => (
								<li
									//@ts-expect-error ref error
									ref={(li) => (listsRef.current[index] = li)}
									key={index}
									onClick={() => setCurrentIndex(index)}
									className={`${
										currentIndex === index
											? "text-slate-800 dark:text-slate-300 hover:text-slate-500"
											: ""
									} font-medium cursor-pointer text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md transition-all px-2 py-1 z-10`}>
									<Link href={item.to} className="text-2xl">
										{item.link}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="flex items-center gap-5 p-5">
					<Image
						src={"/icons/Default_pfp.svg.png"}
						width={50}
						height={50}
						alt="avatar"
					/>
					<p className="font-semibold text-xl">Tim cook</p>
				</div>
			</motion.div>
		</>
	);
};

export default Nav;
