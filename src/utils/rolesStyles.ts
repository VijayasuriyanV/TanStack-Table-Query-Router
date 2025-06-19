export const getRoleStyle = (role: string) => {
	return (
		{
			Admin: "text-red-600 font-bold",
			Editor: "text-blue-600 font-bold",
			Viewer: "text-green-600 font-bold",
		}[role] || ""
	);
};
