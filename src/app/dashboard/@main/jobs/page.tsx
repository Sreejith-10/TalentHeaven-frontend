"use client";

import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {ReactTable} from "@/components/ui/table/react-table";
import {getJobsByCompanyId} from "@/controllers/jobController";
import {JobType} from "@/lib/types";
import {useRecruiterStore} from "@/store/useRecruiterStore";
import {useQuery} from "@tanstack/react-query";
import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function Jobs() {
	const {push} = useRouter();
	const id = useRecruiterStore((state) => state.companyId);

	const {data} = useQuery({
		queryKey: ["joblist", id],
		queryFn: () => getJobsByCompanyId(id!),
	});

	const columns: ColumnDef<JobType>[] = [
		{
			id: "select",
			header: ({table}) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({row}) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: "role",
			header: ({column}) => {
				return (
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}>
						Job Role
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({row}) => <div className="lowercase">{row.getValue("role")}</div>,
		},
		{
			accessorKey: "vaccancy",
			header: ({column}) => (
				<div
					className="flex items-center gap-1"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Vaccancy
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</div>
			),
			cell: ({row}) => (
				<div className="text-start font-medium ">
					{row.getValue("vaccancy")}
				</div>
			),
		},
		{
			accessorKey: "status",
			header: () => <div className="text-right">Status</div>,
			cell: ({row}) => (
				<div className="text-right font-medium">{row.getValue("status")}</div>
			),
		},
		{
			accessorKey: "applications",
			header: () => <div className="text-right">Applications</div>,
			cell: ({row}) => {
				const len: [] = row.getValue("applications");

				return <div className="text-right font-medium">{len.length}</div>;
			},
		},
		{
			accessorKey: "applications_end_date",
			header: () => <div className="text-right">End date</div>,
			cell: ({row}) => (
				<div className="text-right font-medium">
					{row.getValue("applications_end_date")}
				</div>
			),
		},

		{
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

							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => {
									push("/dashboard/applications/" + job._id);
								}}>
								View applications
							</DropdownMenuItem>
							<DropdownMenuItem>View payment details</DropdownMenuItem>
							<DropdownMenuItem>Stop accecpting applications</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];

	return (
		<div className="w-full h-full bg-slate-50 dark:bg-slate-900 dark:border dark:border-slate-800 rounded-2xl p-6 flex flex-col gap-5">
			<div className="w-full h-fit flex justify-between">
				<h1 className="font-semibold text-2xl">Job Lists</h1>
				<Link
					href={"/dashboard/jobs/create"}
					className="w-fit bg-blue-500 text-slate-50 py-3 px-4 rounded-xl">
					Post Job
				</Link>
			</div>
			<div>
				{data ? (
					<ReactTable data={data} columns={columns} />
				) : (
					<h1>Loading .. . </h1>
				)}
			</div>
		</div>
	);
}
