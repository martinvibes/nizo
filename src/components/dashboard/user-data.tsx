"use client";
import { useRef } from "react";
import { AvatarDemo } from "../ui/avatar";
import { Button } from "../ui/button";
//import {motion} from "motion/react"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function UserData() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(containerRef.current, { x: -400, scale: 0 });
    gsap.to(containerRef.current, {
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

  return (
    <div
      className=" bg-[#2B2B2B] flex-col gap-8 pt-10 px-3 hidden md:flex invisible"
      ref={containerRef}
    >
      <AvatarDemo />
      <div className="grid gap-2">
        <Button className="bg-[#13151D] border border-[#3D435C] text-[#51586D] text-base font-semibold btn">
          Lorem
        </Button>
        <Button className="bg-[#13151D] border-[#3D435C] text-[#51586D] text-base font-semibold border btn">
          Lorem
        </Button>
      </div>
    </div>
  );
}
export default UserData;
