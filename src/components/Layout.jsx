import React from "react";
import Home from "./Home";
import OwnItems from "./OwnItems";
import Charts from "./Charts";

function Layout() {
  return (
    <div className=" h-full">
      <Home />
      <OwnItems />
      <Charts />
    </div>
  );
}

export default Layout;
