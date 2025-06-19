import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
	children: ReactNode;
	fallback?: ReactNode;
	message?: string;
};

type State = {
	hasError: boolean;
	error: Error | null;
};

export default class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Error caught in ErrorBoundary:", error, errorInfo);
	}

	handleReload = () => {
		// Reload the app or navigate to home
		window.location.href = "/"; // or use window.location.reload();
	};

	render() {
		if (this.state.hasError) {
			return (
				<div className="h-screen w-full flex flex-col items-center justify-center bg-red-50 text-red-700 px-4 text-center">
					<h1 className="text-3xl font-extrabold mb-2">
						⚠️ Oops, something went wrong.
					</h1>
					<h2 className="text-2xl font-bold mb-4 text-black">
						{this.props.fallback ??
							this.props.message ??
							"Please try again later."}
					</h2>
					<button
						type="button"
						onClick={this.handleReload}
						className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
					>
						Go to Home
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}
