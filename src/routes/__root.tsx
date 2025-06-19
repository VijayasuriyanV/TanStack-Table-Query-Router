import { Outlet } from "@tanstack/react-router";
import Navbar from "../Components/common/Navbar";
import Footer from "../Components/common/Footer";

export function RootComponent() {
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
