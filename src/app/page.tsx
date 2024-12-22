"use client";
import React, { useEffect, useRef, useState } from "react";
import Section from "@/components/section";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRightIcon } from "lucide-react";

export default function Home() {
  const containerRef = useRef(null);
  const text = "Simplify DeFi Action with Nizo AI";
  const character = text.split("");

  const [response, setResponse] = useState("");
  const [count, setCount] = useState(0);

  useGSAP(() => {
    gsap.set(containerRef.current, { opacity: 0, scale: 0 });
    gsap.to(containerRef.current, {
      duration: 2,
      opacity: 1,
      delay: 2,
      ease: "expo",
      scale: 1,
      visibility: "visible",
    });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < character.length) {
        setResponse((prev) => prev + character[count]); // Append the current character
        setCount((prev) => prev + 1); // Move to the next character
        console.log(character[count]);
      } else {
        clearInterval(interval); // Clear the interval once all characters are processed
      }
    }, 50);

    return () => clearInterval(interval);
  }, [count, character]);
  return (
    <div className="px-4">
      <section className="md:px-24">
        <header className="grid gap-3 place-content-center text-[#F9F9F9] h-3/5 items-center text-center py-24">
          <h1 className="font-semibold text-base sm:text-xl">NIZO AI</h1>
          <h1 className="font-semibold text-3xl sm:text-4xl sm:text-[50px]">
            {response}
          </h1>
          <div className="grid gap-4 invisible" ref={containerRef}>
            <h2 className="font-semibold text-xl">
              Swap, check balance and send to address easily.
            </h2>
            <Link
              href="/dashboard"
              className="rounded-full bg-[#4A90E2] py-2 px-6 w-fit mx-auto text-[#F9F9F9] hover:text-gray-700 flex items-center gap-1 hover:bg-[#FFFCFC]"
            >
              Get started <ArrowUpRightIcon />
            </Link>
          </div>
        </header>
        <div className="grid gap-y-12 md:gap-y-20 pb-10">
          <Section text="Swap from and to supported tokens " />
          <Section text="Stay informed on token balance with the Check balance feature " />
          <Section text="Send tokens easily with NIZO" />
        </div>
      </section>
    </div>
  );
}
