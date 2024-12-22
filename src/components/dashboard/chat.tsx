"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
// import DonutChart from "../ui/chart";

function Chat() {
  const chatRef = useRef(null);
  // declare text with let when you want to use
  const text = "";
  const character =text.split("");

  const [response,setResponse] = useState("")
  const [count, setCount] = useState(0);
  //  const [data] = useState([
  //    { name: "USDT", value: 1150 },
  //    { name: "USDC", value: 1750 },
  //    { name: "ETH", value: 800 },
  //    { name: "STRK", value: 500 },
  //    { name: "SOL", value: 500 },
  //  ]);

    useEffect(() => {
      const interval = setInterval(() => {
        if (count < character.length) {
          setResponse((prev) => prev + character[count]); // Append the current character
          setCount((prev) => prev + 1); // Move to the next character
        } else {
          clearInterval(interval); // Clear the interval once all characters are processed
        }
      }, 10);

      return () => clearInterval(interval);
    }, [count, character]);
    // total balance
    // const total = data.reduce((acc, item) => acc + item.value, 0);
  console.log(response,text); 
  useGSAP(() => {
    gsap.set(chatRef.current, { y: -400, scale: 0 });
    gsap.to(chatRef.current, {
      duration: 2,
      y: 0,
      delay: 2,
      ease: "expo",
      scale: 1,
      borderRadius: 2,
      visibility: "visible",
    });
  });
  return (
    <main ref={chatRef} className="border invisible">
      {/* <DonutChart data={data} total={total} /> */}
    </main>
  );
}
export default Chat;
