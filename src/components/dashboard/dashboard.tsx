"use client";
import { useState } from "react";
import Chat from "./chat";
import Transactions from "./transactions";
import UserData from "./user-data";
import NavBar from "../layout/navbar";

function Dashboard() {
  const [transactionHistory] = useState([
    "Swap tokens - 0.02 SOL to 150 DOGE",
    "Swap tokens - 0.05 SOL to 375 DOGE",
    "Swap tokens - 0.03 SOL to 225 DOGE",
  ]);

  // function addNewTransaction(newData:string) {
  //   setTransactionHistorry((data) => {
  //     return [...data, newData];
  //   });
  // }

  return (
    <>
      <NavBar />
      <section className="grid sm:grid-cols-[4fr_3fr] max-[480px]:grid-cols-[1fr]  md:grid-cols-[1.5fr_4fr_1.5fr] sm:gap-1 pt-4 mb-3">
        <UserData />
        <Chat />
        <Transactions transactions={transactionHistory} />
      </section>
    </>
  );
}

export default Dashboard;
