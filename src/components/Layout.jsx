import React from "react";
import Home from "./Home";
import OwnItems from "./OwnItems";
import Charts from "./Charts";
import Donation from "./Donation";
import Map from "./Map";
import Footer from "./Footer";

function Layout() {
  return (
    <div className=" h-full">
      <Home />
      <OwnItems />
      <Charts />
      <Donation />
      <Map/>
    
    </div>
  );
}

export default Layout;
