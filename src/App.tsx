import "./App.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

function App() {
	const queryClient = new QueryClient();
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
				<ToastContainer theme="dark" />
			</QueryClientProvider>
		</>
	);
}

export default App;
