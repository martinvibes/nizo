"use client";
import { useRef } from "react";
import { Card } from "../ui/card";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
interface transactionHistory {
  transactions:string[]
}

function TransactionsHistory(props:transactionHistory) {
  const cardRef = useRef(null);
  useGSAP(() => {
    gsap.set(cardRef.current, { x: 400, scale: 0 });
    gsap.to(cardRef.current, {
      duration: 2,
      x: 0,
      delay: 0.5,
      ease: "circ.in",
      scale: 1,
      borderRadius: 2,
      stagger: 1.2,
      visibility: "visible",
    });
    gsap.set("li", {
      opacity: 0,
    });
    gsap.to("li", {
      duration: 3,
      delay: 2,
      opacity: 1,
      stagger: 0.25,
    });
  });
  return (
    <Card
      ref={cardRef}
      className="h-1/2 bg-[#2B2B2B] rounded-md flex flex-col gap-3 py-7 px-6 overflow-y-auto scrollbar-hide invisible"
    >
      <h1 className="text-base font-semibold text-white text-center">
        Action Tab
      </h1>
      <ul className="list-disc marker:text-white grid gap-y-2">
        {props.transactions.map((data, index) => {
          return (
            <li className="text-sm font-semibold text-[#51586D] animate-fade-up" key={index}>
              {data}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
export default TransactionsHistory;
