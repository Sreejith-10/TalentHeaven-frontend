import Link from "next/link";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { EllipsisVertical } from "lucide-react";

const RecruitmentProgress = () => {
	return (
		<div className="w-1/2 bg-slate-50 h-full rounded-2xl">
			<div className="flex p-5 justify-between items-center">
				<h1 className="font-semibold text-xl">Recuitment progress</h1>
				<Link
					href={""}
					className="bg-purple-600 py-1 px-3 text-slate-50 rounded-md">
					see all
				</Link>
			</div>
			<div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Position</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Employrers</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="font-medium">
								Full Stack Developer
							</TableCell>
							<TableCell>Reume Filtering</TableCell>
							<TableCell>2000</TableCell>
							<TableCell>
								<EllipsisVertical
									className="text-slate-600 cursor-pointer"
									size={20}
								/>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default RecruitmentProgress;
