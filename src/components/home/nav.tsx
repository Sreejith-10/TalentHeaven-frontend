"use client";

import {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {useScrollDirection} from "@/hooks/userScrollDirection";
import Link from "next/link";
import {Toggle} from "../ui/toggle";
import DropDown from "./drop-down";
import {authStore} from "@/store/auth-store";

const Nav = () => {
	const [isAtTop, setIsAtTop] = useState(true);
	const isAuthenticated = authStore((state) => state.isAuthenticated);

	const navigations = [
		{link: "Home", to: "/"},
		{link: "Find Jobs", to: "/search"},
		{link: "Recruiter", to: "/recruiter"},
		{link: "Companies", to: "/companies"},
		{link: "Contact", to: "/contact"},
	];
	const [currentIndex, setCurrentIndex] = useState(0);

	const parentRef = useRef<HTMLUListElement>(null);
	const listsRef = useRef<HTMLLIElement[] | null[]>([]);

	const scrollDirection = useScrollDirection();

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
			className={`w-full h-[100px] ease-in-out duration-100 z-[99] flex items-center justify-evenly justify-items-center fixed top-0 left-0 ${
				isAtTop ? "bg-transparent" : "bg-slate-50 dark:bg-slate-900"
			}`}>
			<div className="text-center">
				<p className="text-[1.8rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
					TalentHeaven
				</p>
			</div>
			<nav>
				<ul ref={parentRef} className="flex items-center gap-5 relative">
					<div
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
					/>
					{navigations.map((item, index) => (
						<li
							//@ts-expect-error ref error
							ref={(li) => (listsRef.current[index] = li)}
							key={index}
							onClick={() => setCurrentIndex(index)}
							className={`${
								currentIndex === index ? "text-white hover:text-slate-50" : ""
							} font-medium cursor-pointer hover:text-purple-400 transition-all px-2 py-1 z-10`}>
							<Link href={item.to}>{item.link}</Link>
						</li>
					))}
				</ul>
			</nav>
			<div className="space-x-5 flex items-center">
				<Toggle />
				{isAuthenticated ? (
					<DropDown />
				) : (
					<div className="flex items-center gap-2">
						<Link
							href={"/register"}
							className="text-purple-600 text-lg border border-purple-600 px-4 py-2">
							Register
						</Link>
						<Link
							href={"/login"}
							className="bg-purple-600 text-white px-8 py-3">
							Login
						</Link>
					</div>
				)}
			</div>
		</motion.div>
	);
};

export default Nav;
