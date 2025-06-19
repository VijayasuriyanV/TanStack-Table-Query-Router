import {
	createRootRoute,
	createRoute,
	createRouter,
	lazyRouteComponent,
} from "@tanstack/react-router";
import { RootComponent } from "./__root";
import ErrorBoundary from "../ErrorBoundary";
import TableWrapper from "../Components/TableWrapper";
const Home = lazyRouteComponent(() => import("../Components/Home"));
const rootRoute = createRootRoute({
	component: () => (
		<ErrorBoundary>
			<RootComponent />
		</ErrorBoundary>
	),
});

// const rootRoute = createRootRoute({
//   component: RootComponent,
//   errorComponent: ({children}) => <ErrorBoundary>{children}</ErrorBoundary>,
// });

const homeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: Home,
});
const tableRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/table",
	component: TableWrapper,
});

const routeTree = rootRoute.addChildren([homeRoute, tableRoute]);
export const router = createRouter({
	routeTree,
	defaultPreload: "intent",
});
