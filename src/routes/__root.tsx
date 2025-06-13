import * as React from "react";
import {Outlet} from "@tanstack/react-router";
import Navbar from "../Components/common/Navbar";
import Footer from "../Components/common/Footer";

export function RootComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow" role="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
