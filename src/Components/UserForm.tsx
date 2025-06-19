import { useState } from "react";
import type { User, Role } from "./types/table.types";
import { isValidEmail } from "../utils/validation";
import { toast } from "react-toastify";

interface Props {
	editForm: Omit<User, "id">;
	onChange: (form: Omit<User, "id">) => void;
	onCancel: () => void;
	onSave: () => void;
}

const UserForm = ({ editForm, onChange, onCancel, onSave }: Props) => {
	const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors: { name?: string; email?: string } = {};
		if (!editForm.name.trim()) newErrors.name = "Name is required";
		if (!editForm.email.trim()) newErrors.email = "Email is required";
		else if (!isValidEmail(editForm.email))
			newErrors.email = "Invalid email format";

		setErrors(newErrors);

		if (Object.keys(newErrors).length > 0) {
			toast.error("Please fix validation errors.");
			return;
		}

		onSave();
		toast.success("Saved successfully");
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-2 p-4 border rounded"
		>
			<div>
				<input
					className="border px-2 py-1 w-full"
					value={editForm.name}
					onChange={(e) => onChange({ ...editForm, name: e.target.value })}
					placeholder="Name"
				/>
				{errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
			</div>

			<div>
				<input
					className="border px-2 py-1 w-full"
					value={editForm.email}
					onChange={(e) => onChange({ ...editForm, email: e.target.value })}
					placeholder="Email"
				/>
				{errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
			</div>

			<select
				className="border px-2 py-1"
				value={editForm.role}
				onChange={(e) =>
					onChange({ ...editForm, role: e.target.value as Role })
				}
			>
				<option value="Admin">Admin</option>
				<option value="Editor">Editor</option>
				<option value="Viewer">Viewer</option>
			</select>

			<div className="flex gap-2 mt-2">
				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-1 rounded"
				>
					Save
				</button>
				<button
					type="button"
					onClick={onCancel}
					className="bg-gray-300 px-4 py-1 rounded"
				>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default UserForm;
