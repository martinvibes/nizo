"use client";
import SwitchboardPriceFeed from "@/components/dashboard/switch-board-price-feeds";
import NavBar from "../../components/layout/navbar";

function Dashboard() {
  return (
    <div>
      <NavBar />
      <SwitchboardPriceFeed />
    </div>
  );
}

export default Dashboard;
