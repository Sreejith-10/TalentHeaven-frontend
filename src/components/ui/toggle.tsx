"use client";

import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";

export function Toggle() {
	const {theme,setTheme} = useTheme();

	return theme === "dark" ? (
		<Sun onClick={() => setTheme("light")} />
	) : (
		<Moon onClick={() => setTheme("dark")} />
	);
}
