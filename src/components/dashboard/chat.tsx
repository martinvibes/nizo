"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

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
  return <main ref={chatRef} className="border invisible"></main>;
}
export default Chat;
