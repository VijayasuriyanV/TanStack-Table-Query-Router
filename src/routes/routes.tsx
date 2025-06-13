import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
} from "@tanstack/react-router";
import {RootComponent} from "./__root";
import Table from "../Components/UserTable";
const Home = lazyRouteComponent(() => import("../Components/Home"));
const rootRoute = createRootRoute({
  component: RootComponent,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: Home,
});
const tableRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Table,
});

const routeTree = rootRoute.addChildren([homeRoute, tableRoute]);
export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});
