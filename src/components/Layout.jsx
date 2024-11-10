import React from "react";
import Home from "./Home";
import OwnItems from "./OwnItems";
import Charts from "./Charts";
import Donation from "./Donation";
import Map from "./Map";
import Footer from "./Footer";
import RecipeOfTheDay from "./RecipeOfTheDay";
import WasteRecommendations from "./Recom";

function Layout() {
  return (
    <div className=" h-full">
      <Home />
      <OwnItems />
      <Charts />
      <Donation />
      <RecipeOfTheDay />
      <WasteRecommendations />
      <Footer />
    </div>
  );
}

export default Layout;
