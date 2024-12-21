"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import logo from "./logo.svg";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { Chatpage } from "./chat-page";
// import { ChatInput } from "./chatinput";
import { Chatinputdiv } from "./chat-input";

const poppins = Poppins({ weight: ["400"], subsets: ["latin"] });

function Chat() {
  const chatRef = useRef(null);
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
    <main ref={chatRef} className="invisible px-7 bg-black">
      <div className="flex flex-col items-center gap-2 border-white">
        <Image
          width="40"
          height="40"
          src={logo.src}
          className=" rounded-full border-white"
          alt="langchain logo"
        />
        <p className={`${poppins.className} text-center text-sm`}>
          Chat with <b className="bold text-lg">NIZO</b> AI{" "}
        </p>
        <hr className="border-[#3D435C] border w-full" />
      </div>
      <br />
      <div className="flex gap-2 flex-col">
        {/* chat page */}
        <Chatpage />

        {/* chat input */}
       <Chatinputdiv />
      </div>
    </main>
  );
}
export default Chat;
