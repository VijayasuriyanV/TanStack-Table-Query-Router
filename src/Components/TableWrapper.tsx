import ErrorBoundary from "../ErrorBoundary";
import UserTable from "./UserTable";

const TableWrapper = () => {
	return (
		<ErrorBoundary
			fallback={
				<div>
					<p>🧨 Custom fallback UI!</p>
					<button type="button" onClick={() => window.location.reload()}>
						Reload
					</button>
				</div>
			}
		>
			<UserTable />
		</ErrorBoundary>
	);
};

export default TableWrapper;
