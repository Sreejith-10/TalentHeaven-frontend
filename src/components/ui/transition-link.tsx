"use client";

import Link, {LinkProps} from "next/link";
import {useRouter} from "next/navigation";
import {MouseEvent, ReactNode} from "react";

interface TransitionLinkProps extends LinkProps {
	children: ReactNode;
	href: string;
}

const delay = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

const TransitionLink = ({children, href, ...props}: TransitionLinkProps) => {
	const {push} = useRouter();
	const onTransition = async (
		e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
	) => {
		e.preventDefault();
		const body = document.querySelector("body");

		if (window.location.pathname !== href) {
			body?.classList.add("page-transistion");
			await delay(1000);
			push(href);
			await delay(1000);
			body?.classList.remove("page-transistion");
		}
	};

	return (
		<Link href={href} {...props} onClick={onTransition}>
			{children}
		</Link>
	);
};

export default TransitionLink;
