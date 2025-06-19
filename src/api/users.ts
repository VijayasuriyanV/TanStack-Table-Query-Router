import axios from "axios";
import type { User } from "../Components/types/table.types";

const API = import.meta.env.VITE_API_URL;

export const fetchUsers = async (): Promise<User[]> => {
	const { data } = await axios.get(API);
	return data;
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
	const { data } = await axios.post(API, user);
	return data;
};

export const updateUser = async (user: User): Promise<User> => {
	const { data } = await axios.put(`${API}/${user.id}`, user);
	return data;
};

export const deleteUser = async (id: number): Promise<void> => {
	await axios.delete(`${API}/${id}`);
};
