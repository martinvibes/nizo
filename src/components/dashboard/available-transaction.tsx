"use client";
import { useRef } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMessages } from "@/contexts/store";
import toast from "react-hot-toast";

function AvailabeFeatures() {
  const { setTransactionType } = useMessages();
  const cardRef = useRef<HTMLDivElement>(null);
  // const swapRef = useRef(null);
  // const balanceRef = useRef(null);
  // const histoyRef = useRef(null);
  useGSAP(() => {
    gsap.set(cardRef.current, { x: 400, scale: 0 });
    gsap.to(cardRef.current, {
      duration: 2,
      x: 0,
      ease: "circ.in",
      scale: 1,
      borderRadius: 2,
      visibility: "visible",
    });
    gsap.set(".btn", {
      opacity: 0,
    });
    gsap.to(".btn", {
      duration: 3,
      delay: 2,
      opacity: 1,
      stagger: 0.25,
    });
  });

  function transactionHandler(data: string) {
    if(data.includes("transaction")){
      toast.error("transaction features coming soon")
      return
    }
    setTransactionType(data);
  }

  return (
    <Card
      ref={cardRef}
      className="h-1/2 bg-[#1A1C24] rounded-md flex flex-col gap-3 pt-7 px-3 overflow-y-auto invisible"
    >
      <h1 className="text-base font-semibold text-white text-center">
        Action Tab
      </h1>
      <div className="grid gap-2">
        <Button
          onClick={() => transactionHandler("i want to swap ")}
          className="bg-[#13151D] border border-[#3D435C] text-[#51586D] text-base font-semibold btn"
        >
          Swap tokens
        </Button>
        <Button
          onClick={() => transactionHandler("check my balance ")}
          className="bg-[#13151D] border-[#3D435C] text-[#51586D] text-base font-semibold border btn"
        >
          Check balance
        </Button>
        <Button
          onClick={() => transactionHandler("check my transaction history ")}
          className="bg-[#13151D] border border-[#3D435C] text-[#51586D] text-base font-semibold btn"
        >
          View transactions
        </Button>
        <Button
          onClick={() => transactionHandler("Check price feeds")}
          className="bg-[#13151D] border border-[#3D435C] text-[#51586D] text-base font-semibold btn"
        >
          Check pricefeeds
        </Button>
      </div>
    </Card>
  );
}
export default AvailabeFeatures;
