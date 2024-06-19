"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import SectionWrapper from "@/components/wrapper/section-wrapper";
import {fetchUser} from "@/controllers/userAuthController";
import {useMutation} from "@tanstack/react-query";
import {Download, Upload} from "lucide-react";
import Image from "next/image";
import {useLayoutEffect} from "react";
import Cookie from "js-cookie";
import {jwtDecode} from "jwt-decode";
import {AxiosError} from "axios";
import {useRouter} from "next/navigation";

export default function Account() {
	const {push} = useRouter();

	const {mutate, isPending} = useMutation({
		mutationFn: fetchUser,
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (err) => {
			const error = err as AxiosError;
			if (error.response?.status === 404) {
				console.log(error.response);
				push("/account-setup");
			}
		},
	});

	useLayoutEffect(() => {
		const token = Cookie.get("access_token");
		const decoded = jwtDecode(token!);

		//@ts-expect-error type jwt data
		const id = decoded.id;
		mutate(id);
	}, []);

	if (isPending) {
		return <div>loading..</div>;
	}
	return (
		<div className="w-full h-full flex items-center justify-center">
			<SectionWrapper>
				<div className="w-full h-auto flex gap-5 items-center py-10">
					<div className="w-[40%] h-full bg-slate-50 dark:bg-slate-900 border border-slate-400 border-opacity-20 rounded-xl p-8 flex items-center flex-col gap-5 justify-center">
						<Image
							src={"/icons/Default_pfp.svg.png"}
							width={150}
							height={150}
							alt="avatr"
						/>
						<div>
							<h1 className="font-semibold text-xl">Username</h1>
							<h2 className="text-lg text-center">Profession</h2>
						</div>

						<p className="text-slate-600 text-center">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Repellendus voluptatum quam voluptas accusamus quisquam
							asperiores, ad praesentium, quae eveniet dolorum dicta tempora,
							laborum dolorem temporibus ex similique quo. Numquam alias eaque
							natus ipsum doloremque accusantium praesentium, delectus id
							cupiditate voluptates!
						</p>

						<h2 className="font-semibold text-xl">Skills</h2>
						<div className="flex gap-5">
							<span className="text-sm bg-slate-400 dark:bg-slate-800 rounded-md px-3 py-1 font-semibold">
								HTML
							</span>
							<span className="text-sm bg-slate-400 dark:bg-slate-800 rounded-md px-3 py-1 font-semibold">
								JS
							</span>
							<span className="text-sm bg-slate-400 dark:bg-slate-800 rounded-md px-3 py-1 font-semibold">
								CSS
							</span>
						</div>
					</div>
					<div className="w-[60%] h-full space-y-4">
						<div className="bg-slate-50 dark:bg-slate-900 border border-slate-400 border-opacity-20 rounded-xl space-y-4 p-8">
							<div>
								<h1 className="font-semibold text-lg">Basic Information</h1>
							</div>
							<div className="w-full h-auto grid grid-cols-3 gap-5">
								<div>
									<h1 className="text-slate-600 text-[15px]">First name</h1>
									<h3 className="font-semibold">Random</h3>
								</div>
								<div>
									<h1 className="text-slate-600 text-[15px]">Last name</h1>
									<h3 className="font-semibold">Random</h3>
								</div>
								<div>
									<h1 className="text-slate-600 text-[15px]">Email</h1>
									<h3 className="font-semibold">Random@gmail.com</h3>
								</div>
								<div>
									<h1 className="text-slate-600 text-[15px]">Phone number</h1>
									<h3 className="font-semibold">+91 93883829823</h3>
								</div>
							</div>
							<div className="space-x-8">
								<Button className="space-x-2">
									<Download />
									<span>Download Resume</span>
								</Button>

								<Button className="space-x-2">
									<Upload />
									<span>Upload Resume</span>
								</Button>
							</div>
						</div>

						<div className="bg-slate-50 dark:bg-slate-900 border border-slate-400 border-opacity-20 rounded-xl space-y-4 p-8">
							<Accordion type="multiple">
								<AccordionItem className="border-none" value="item-1">
									<AccordionTrigger className="font-semibold text-lg">
										Education
									</AccordionTrigger>
									<AccordionContent>
										<ul className="space-y-4">
											<li className="border-b border-slate-300 dark:border-slate-700 p-2 last:border-none">
												<h1 className="font-bold text-blue-600 text-lg">
													Institute name
												</h1>
												<h2 className="font-semibold text-base">Position</h2>
												<p className="text-slate-600">
													12-oct-2024 - 12 dec-2023
												</p>
											</li>
											<li className="border-b border-slate-300 dark:border-slate-700 p-2 last:border-none">
												<h1 className="font-bold text-blue-600 text-lg">
													Institute name
												</h1>
												<h2 className="font-semibold text-base">Position</h2>
												<p className="text-slate-600">
													12-oct-2024 - 12 dec-2023
												</p>
											</li>
											<li className="border-b border-slate-300 dark:border-slate-700 p-2 last:border-none">
												<h1 className="font-bold text-blue-600 text-lg">
													Institute name
												</h1>
												<h2 className="font-semibold text-base">Position</h2>
												<p className="text-slate-600">
													12-oct-2024 - 12 dec-2023
												</p>
											</li>
										</ul>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>

						<div className="bg-slate-50 dark:bg-slate-900 border border-slate-400 border-opacity-20 rounded-xl space-y-4 p-8">
							<Accordion type="multiple">
								<AccordionItem className="border-none" value="item-1">
									<AccordionTrigger>Experience</AccordionTrigger>
									<AccordionContent>
										<ul className="space-y-4">
											<li className="border-b border-slate-300 dark:border-slate-700 p-2 last:border-none">
												<h1 className="font-bold text-blue-600 text-lg">
													Institute name
												</h1>
												<h2 className="font-semibold text-base">Position</h2>
												<p className="text-slate-600">
													12-oct-2024 - 12 dec-2023
												</p>
											</li>
											<li className="border-b border-slate-300 dark:border-slate-700 p-2 last:border-none">
												<h1 className="font-bold text-blue-600 text-lg">
													Institute name
												</h1>
												<h2 className="font-semibold text-base">Position</h2>
												<p className="text-slate-600">
													12-oct-2024 - 12 dec-2023
												</p>
											</li>
											<li className="border-b border-slate-300 dark:border-slate-700 p-2 last:border-none">
												<h1 className="font-bold text-blue-600 text-lg">
													Institute name
												</h1>
												<h2 className="font-semibold text-base">Position</h2>
												<p className="text-slate-600">
													12-oct-2024 - 12 dec-2023
												</p>
											</li>
										</ul>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>

						<div className="bg-slate-50 dark:bg-slate-900 border border-slate-400 border-opacity-20 rounded-xl space-y-4 p-8">
							<Accordion type="multiple">
								<AccordionItem className="border-none" value="item-1">
									<AccordionTrigger>Cirtificates</AccordionTrigger>
									<AccordionContent>
										<ul className="space-y-4">
											<li className="border-b border-slate-300 dark:border-slate-700 p-2 last:border-none">
												<h1 className="font-bold text-blue-600 text-lg">
													Institute name
												</h1>
												<h2 className="font-semibold text-base">Position</h2>
												<p className="text-slate-600">
													12-oct-2024 - 12 dec-2023
												</p>
											</li>
											<li className="border-b border-slate-300 dark:border-slate-700 p-2 last:border-none">
												<h1 className="font-bold text-blue-600 text-lg">
													Institute name
												</h1>
												<h2 className="font-semibold text-base">Position</h2>
												<p className="text-slate-600">
													12-oct-2024 - 12 dec-2023
												</p>
											</li>
											<li className="border-b border-slate-300 dark:border-slate-700 p-2 last:border-none">
												<h1 className="font-bold text-blue-600 text-lg">
													Institute name
												</h1>
												<h2 className="font-semibold text-base">Position</h2>
												<p className="text-slate-600">
													12-oct-2024 - 12 dec-2023
												</p>
											</li>
										</ul>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
					</div>
				</div>
			</SectionWrapper>
		</div>
	);
}
