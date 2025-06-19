import { useCallback, useMemo, useState } from "react";
import type { Row } from "@tanstack/react-table";

import {
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	getPaginationRowModel,
	flexRender,
	createColumnHelper,
	type SortingState,
} from "@tanstack/react-table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, deleteUser, updateUser, createUser } from "../api/users";
import type { User } from "./types/table.types";
import { getRoleStyle } from "../utils/rolesStyles";
import UserForm from "./UserForm";

const columnHelper = createColumnHelper<User>();

const UserTable = () => {
	// throw new Error("TabLE");
	const queryClient = useQueryClient();
	const [sorting, setSorting] = useState<SortingState>([]);
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState<Omit<User, "id">>({
		name: "",
		email: "",
		role: "Viewer",
	});

	const {
		data: users = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers,
		retry: false,
	});

	const deleteMutation = useMutation({
		mutationFn: deleteUser,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
	});

	const updateMutation = useMutation({
		mutationFn: updateUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			cancelEdit();
		},
	});

	const createMutation = useMutation({
		mutationFn: createUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			cancelEdit();
		},
	});

	const handleEdit = useCallback((user: User) => {
		setEditingUser(user);
		setFormData({ name: user.name, email: user.email, role: user.role });
		setShowForm(true);
	}, []); // no dependencies – stable reference

	const cancelEdit = () => {
		setEditingUser(null);
		setShowForm(false);
		setFormData({ name: "", email: "", role: "Viewer" });
	};

	const handleSave = () => {
		if (editingUser) updateMutation.mutate({ ...editingUser, ...formData });
		else createMutation.mutate(formData);
	};

	const columns = useMemo(
		() => [
			columnHelper.accessor("id", {
				header: () => "ID",
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor("name", {
				header: () => "Name",
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor("email", {
				header: () => "Email",
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor("role", {
				header: () => "Role",
				cell: (info) => (
					<span className={getRoleStyle(info.getValue())}>
						{info.getValue()}
					</span>
				),
			}),
			{
				id: "actions",
				header: () => "Actions",
				cell: ({ row }: { row: Row<User> }) => (
					<div className="flex gap-2">
						<button
							type="button"
							onClick={() => handleEdit(row.original)}
							className="bg-yellow-400 text-white px-2 py-1 rounded"
						>
							Edit
						</button>
						<button
							type="button"
							onClick={() => deleteMutation.mutate(row.original.id)}
							className="bg-red-500 text-white px-2 py-1 rounded"
						>
							Delete
						</button>
					</div>
				),
			},
		],
		[deleteMutation.mutate, handleEdit],
	);

	const table = useReactTable({
		data: users,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<div className="p-4">
			<h2 className="text-xl font-bold mb-4 text-center">Users Table</h2>

			<div className="mb-4 flex justify-end">
				<button
					type="button"
					onClick={() => {
						setShowForm(true);
						setEditingUser(null);
					}}
					className="bg-green-600 text-white px-4 py-1 rounded"
				>
					+ Add User
				</button>
			</div>

			{showForm && (
				<UserForm
					editForm={formData}
					onChange={setFormData}
					onCancel={cancelEdit}
					onSave={handleSave}
				/>
			)}

			{isLoading ? (
				<div className="flex justify-center items-center py-20">
					<div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid" />
				</div>
			) : isError ? (
				<div className="text-center text-red-500 py-10">
					Failed to load users.
				</div>
			) : users.length === 0 ? (
				<div className="text-center py-10 text-gray-500">No users found.</div>
			) : (
				<div className="overflow-auto">
					<table className="w-full border border-collapse">
						<thead className="bg-gray-200">
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<th
											key={header.id}
											className="border px-4 py-2 text-left cursor-pointer select-none"
											onClick={header.column.getToggleSortingHandler()}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
											<span className="ml-1">
												{header.column.getIsSorted() === "asc"
													? "↑"
													: header.column.getIsSorted() === "desc"
														? "↓"
														: ""}
											</span>
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody>
							{table.getRowModel().rows.map((row: Row<User>) => (
								<tr key={row.id} className="border-t">
									{row.getVisibleCells().map((cell) => (
										<td key={cell.id} className="border px-4 py-2">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>

					<div className="flex justify-center mt-4 items-center gap-4">
						<button
							type="button"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
							className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
						>
							Prev
						</button>
						<span>
							Page {table.getState().pagination.pageIndex + 1} of{" "}
							{table.getPageCount()}
						</span>
						<button
							type="button"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
							className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
						>
							Next
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserTable;
