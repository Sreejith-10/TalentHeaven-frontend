"use client";

import {useRef, useState} from "react";
import {Checkbox} from "../ui/checkbox";
import AddTodo from "../ui/forms/add-todo";

const Todo = () => {
	return (
		<div className="w-1/2 h-full bg-slate-50 dark:bg-slate-900 dark:border dark:border-slate-800 rounded-2xl overflow-auto hide-scroll-bar">
			<div className="w-full h-auto bg-slate-50 dark:bg-slate-900 flex items-center justify-between p-3 sticky top-0">
				<h1 className="font-semibold text-xl">Taks</h1>
				<AddTodo />
			</div>
			<div className="w-full h-auto">
				<div className="w-full h-full px-5 py-3 flex flex-col gap-5">
					{Array(5)
						.fill("")
						.map((item, index) => (
							<TodoItem key={index} />
						))}
				</div>
			</div>
		</div>
	);
};

export default Todo;

const TodoItem = () => {
	const [check, setCheck] = useState(false);

	return (
		<div className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-900 dark:border dark:border-slate-800 shadow-md">
			<div>
				<h1
					className={`font-semibold text-xl ${
						check && "line-through text-slate-500"
					}`}>
					Title
				</h1>
				<p className="text-slate-500">12 - Now - 2024, 10 : 34</p>
			</div>
			<div>
				<Checkbox
					onCheckedChange={(e: boolean) => setCheck(e)}
					className="group w-6 h-6 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500/50 data-[state=checked]:text-slate-500 "
				/>
			</div>
		</div>
	);
};
