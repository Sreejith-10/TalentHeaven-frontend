"use client";
import {Button} from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {StatusPill} from "@/components/ui/status-pill";
import {ReactTable} from "@/components/ui/table/react-table";
import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import Image from "next/image";

export default function JobApplications() {
	// const id = useRecruiterStore((state) => state.companyId);

	// const {data: applications} = useQuery<{
	// 	applications: {user_id: string; appliedFor: string}[];
	// }>({
	// 	queryKey: ["recent-user-applications", id],
	// 	queryFn: () => recentApplications(id!),
	// 	enabled: Boolean(id),
	// });

	const data = [
		{
			name: "sreejith ts",
			status: "applied",
		},
		{
			name: "srooraj",
			status: "accepted",
		},
		{
			name: "sreejith ts",
			status: "rejected",
		},
		{
			name: "sreejith ts",
			status: "applied",
		},
		{
			name: "srooraj",
			status: "accepted",
		},
		{
			name: "sreejith ts",
			status: "rejected",
		},
		{
			name: "sreejith ts",
			status: "applied",
		},
		{
			name: "srooraj",
			status: "accepted",
		},
		{
			name: "sreejith ts",
			status: "rejected",
		},
		{
			name: "sreejith ts",
			status: "applied",
		},
		{
			name: "srooraj",
			status: "accepted",
		},
	];

	const columns: ColumnDef<{name: string; status: string}>[] = [
		{
			accessorKey: "user_profile",
			header: () => {
				return <h1>Profile</h1>;
			},
			cell: ({row}) => (
				<Image
					src={row.getValue("user_profile") ?? "/icons/Default_pfp.svg.png"}
					alt="user profile"
					width={60}
					height={60}
				/>
			),
		},
		{
			accessorKey: "name",
			header: ({column}) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Name
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({row}) => <div className="lowercase">{row.getValue("name")}</div>,
		},
		{
			accessorKey: "status",
			header: ({column}) => (
				<Button
					variant="ghost"
					className="flex items-center justify-center gap-1"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Status
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			),
			cell: ({row}) => (
				<div className="text-center font-medium ">
					<StatusPill variant={row.getValue("status")}>
						{row.getValue("status")}
					</StatusPill>
				</div>
			),
		},
		{
			header: () => (
				<div>
					<h1>Actions</h1>
				</div>
			),
			id: "actions",
			enableHiding: false,
			cell: ({row}) => {
				const job = row.original;

				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem>Message</DropdownMenuItem>
							<DropdownMenuItem>View Profile</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];

	return (
		<div className="w-full h-full bg-slate-50 dark:bg-slate-900 dark:border dark:border-slate-800 rounded-2xl p-6 flex gap-5">
			<div className="w-1/2 h-auto space-y-6">
				<h1 className="font-bold text-4xl pb-6">Senior React Developer</h1>

				<div>
					<h2 className="font-semibold text-xl">Description</h2>
					<p className="text-slate-700 dark:text-slate-400">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia,
						enim. Eius, sed natus doloribus odit eligendi nostrum. Sequi, minima
						nihil. Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Aperiam officia placeat dicta possimus odio! Dolore.
					</p>
				</div>

				<div className="flex gap-20">
					<span>
						<h2 className="font-semibold text-xl">Job Mode</h2>
						<p className="text-slate-700 dark:text-slate-400">Remote</p>
					</span>

					<span>
						<h2 className="font-semibold text-xl">Job Type</h2>
						<p className="text-slate-700 dark:text-slate-400">full time</p>
					</span>
				</div>
				<div>
					<h2 className="font-semibold text-xl">Salary</h2>
					<p className="text-slate-700 dark:text-slate-400">2-4 LPA</p>
				</div>
				<div>
					<h2 className="font-semibold text-xl">Posted on</h2>
					<p className="text-slate-700 dark:text-slate-400">2023-24-2</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-semibold text-xl">Requirments</h2>
					<ul className="list-disc space-y-1">
						<li className="ml-6">Nothing specail</li>
					</ul>
				</div>

				<div className="space-y-4">
					<h2 className="font-semibold text-xl">Skills</h2>
					<ul className="flex flex-wrap gap-5">
						<li className="w-fit h-fit px-7 py-1 text-sm bg-slate-200 dark:bg-slate-700 rounded-full shadow-sm">
							Nothing
						</li>
						<li className="w-fit h-fit px-7 py-1 text-sm bg-slate-200 dark:bg-slate-700 rounded-full shadow-sm">
							Nothing
						</li>
						<li className="w-fit h-fit px-7 py-1 text-sm bg-slate-200 dark:bg-slate-700 rounded-full shadow-sm">
							Nothing
						</li>
						<li className="w-fit h-fit px-7 py-1 text-sm bg-slate-200 dark:bg-slate-700 rounded-full shadow-sm">
							Nothing
						</li>
					</ul>
				</div>
			</div>
			<div className="w-1/2 h-auto">
				<ReactTable
					columns={columns}
					data={data}
					page={7}
					showSelected={false}
				/>
			</div>
		</div>
	);
}
