import React from "react";
import Home from "./Home";
import OwnItems from "./OwnItems";
import Charts from "./Charts";
import Donation from "./Donation";

function Layout() {
  return (
    <div className=" h-full">
      <Home />
      <OwnItems />
      <Charts />
      <Donation />
    </div>
  );
}

export default Layout;
