export type Role = "Admin" | "Editor" | "Viewer";

export interface User {
	id: number;
	name: string;
	email: string;
	role: Role;
}
