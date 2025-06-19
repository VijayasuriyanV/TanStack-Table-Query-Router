import { useState } from "react";

const Home = () => {
	const [Crash, setCrash] = useState(false);

	if (Crash) {
		throw new Error("It is Freaking Error thrown by You 😡");
	}

	return (
		<div className="min-h-[80vh] flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800 px-4 py-10">
			<div className="max-w-2xl text-center">
				<h1 className="text-4xl font-bold mb-4">Welcome to the Table Home </h1>

				<p className="text-lg leading-relaxed">
					This is your starting point. Blah blah blah... explore the user table,
					manage records, and navigate using the menu above.
				</p>
				<div className="mt-6">
					<a
						href="/table"
						className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition duration-200"
					>
						Go to Table
					</a>
				</div>
				<button
					type="button"
					className="mt-3 rounded-md bg-green-700 px-6 py-2 font-bold text-white"
					onClick={() => setCrash(true)}
				>
					Click to Crash 👽😂😂
				</button>
			</div>
		</div>
	);
};

export default Home;
