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

	render() {
		if (this.state.hasError) {
			if (this.props.fallback)
				return (
					<div className="h-screen w-full flex flex-col items-center justify-center bg-red-50 text-red-700 px-4 text-center">
						<h1 className="text-3xl font-extrabold mb-2">
							⚠️ Oops, something went wrong.
						</h1>
						<h2 className="text-2xl font-bold mb-2 text-black">
							{this.props.fallback ?? "Please try again later."}
						</h2>
					</div>
				);

			return (
				<div className="h-screen w-full flex flex-col items-center justify-center bg-red-50 text-red-700 px-4 text-center">
					<h1 className="text-3xl font-extrabold mb-2">
						⚠️ Oops, something went wrong.
					</h1>
					<h2 className="text-2xl font-bold mb-2 text-red-950">
						{this.props.message ?? "Please try again later."}
					</h2>
				</div>
			);
		}

		return this.props.children;
	}
}
