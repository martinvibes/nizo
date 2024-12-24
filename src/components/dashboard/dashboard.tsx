"use client";
import { useState } from "react";
import Chat from "./chat";
import Transactions from "./transactions";
import UserData from "./user-data";
import NavBar from "../layout/navbar";

function Dashboard() {
  const [transactionHistory] = useState([
    "Nothing Here Yet",
  ]);

  // function addNewTransaction(newData:string) {
  //   setTransactionHistorry((data) => {
  //     return [...data, newData];
  //   });
  // }

  return (
    <div>
      <NavBar />
      <section className="grid sm:grid-cols-[4fr_3fr] max-[480px]:grid-cols-[1fr]  md:grid-cols-[1.5fr_4fr_1.5fr] sm:gap-1 pt-4 mb-3">
        <UserData />
        <Chat />
        <Transactions transactions={transactionHistory} />
      </section>
    </div>
  );
}

export default Dashboard;
