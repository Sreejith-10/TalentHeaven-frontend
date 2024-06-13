"use client";

import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";

export function Toggle({size}: {size?: number}) {
	const {theme, setTheme} = useTheme();

	return theme === "dark" ? (
		<Sun
			size={size}
			onClick={() => setTheme("light")}
			className="cursor-pointer"
		/>
	) : (
		<Moon
			size={size}
			onClick={() => setTheme("dark")}
			className="cursor-pointer"
		/>
	);
}
