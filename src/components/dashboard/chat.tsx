"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import logo from "./logo.svg";
import sendbtn from "./sendbtn.svg";

import Image from "next/image";
import { Poppins } from "next/font/google";

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
  const [input, setInput] = useState("");
  const handleInputSubmit = () => {
    console.log("input submitted");
    messages.push({
      id: messages.length + 1,
      sender: "user",
      content: input,
    });
  }
  const hanldeEnterKey = (e: any) => {
    if (e.key === "Enter") {
      handleInputSubmit();
    }
  }

  const messages = [
    {
      id: 1,
      sender: "agent",
      content: "Chat box showing response from NIZO AI",
    },
    {
      id: 2,
      sender: "user",
      content: "I'm good, thanks! What about you?",
    },
    {
      id: 3,
      sender: "agent",
      content: "Do you want to proceed or cancel?",
    },
  ];
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
        <div
          className={`${poppins.className} text chat-texts h-[720px] w-full mx-auto p-4 rounded-lg space-y-4 flex flex-col-reverse overflow-y-auto scrollbar-hide scroll-smooth`}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-center ${
                message.sender === "user" ? "justify-end" : ""
              }`}
            >
              <div
                className={`${
                  message.sender === "user"
                    ? "bg-[#B6689E]"
                    : "bg-[#645BE2]"
                } px-4 py-3 rounded-[24px] max-w-[70%]`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        {/* chat input */}
        <div
          className="border-2 rounded-[48px] h-16 grid grid-cols-2 gap-4 px-4 py-3"
          style={{ gridTemplateColumns: "90% 10%" }}
        >
          <input onKeyDown={hanldeEnterKey} value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message here"
            className=" italic focus:outline-none focus:border-none"
            type="text"
          />
          <button onClick={handleInputSubmit} className=" flex items-center justify-center">
            <Image
              width="35"
              height="35"
              src={sendbtn.src}
              className=" rounded-full"
              alt="send btn"
            />
          </button>
        </div>
      </div>
    </main>
  );
}
export default Chat;
