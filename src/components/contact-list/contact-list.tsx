/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Xmark from "../icons/xmark";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "../ui/button";
import AddContact from "./add-contact-form";
import { data, getLocalSstorageAddress } from "@/lib/utils";
interface close {
  close: () => void;
}

function ContactList(props: close) {
  const [contact, setContact] = useState<data>([]);
  const containerRef = useRef(null);
  const [isFormOpen,setIsFormOpen] = useState(false)
  const storgedata: data = getLocalSstorageAddress();
  const storeContact = useMemo(()=>storgedata,[storgedata.length])
  function formModalHandler(){
    setIsFormOpen(data=>!data)
  }
  useGSAP(() => {
    gsap.set(containerRef.current, { y: -100, scale: 0 });
    gsap.to(containerRef.current, {
      duration: 1,
      y: 0,
      //delay: 0.5,
      // ease: "circ.in",
      scale: 1,
      borderRadius: 2,
      stagger: 1.2,
    });
    gsap.set(".li", {
      opacity: 0,
    });
    gsap.to(".li", {
      duration: 3,
      delay: 8,
      opacity: 1,
      stagger: 0.25,
    });
  });
  //console.log("active")
  useEffect(() => {
    console.log(storeContact.length,contact.length)
    if (storeContact.length > contact.length) {
      setContact(storeContact);
    } 
  }, [setContact, contact,storeContact]);

  return (
    <>
      {isFormOpen && <AddContact close={formModalHandler} />}
      <section
        ref={containerRef}
        className="bg-[#2B2B2B] h-3/4 w-[300px] p-3 scrollbar-hide overflow-y-auto fixed right-2 z-50 top-24 rounded-md py-8"
      >
        <div className="absolute right-6 top-3" onClick={() => props.close()}>
          <Xmark />
        </div>
        <div className="">
          <h1 className="text-base font-semibold text-white text-center capitalize">
            contact address
          </h1>
          <div className="grid gap-10">
            <ul className="pt-3">
              {contact.map((data, index) => {
                return (
                  <li key={index}>
                    <h3 className="capitalize">
                      {data?.name}:
                      <span className="lowercase pl-2 text-[#51586D]">
                        {` ${data?.address.slice(0, 5)}...${data?.address.slice(-5)}`}
                      </span>
                    </h3>
                  </li>
                );
              })}
            </ul>
            <Button
              className="bg-[#13151D] border border-[#3D435C] text-[#51586D] text-base font-semibold capitalize"
              onClick={formModalHandler}
            >
              add new address
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
export default ContactList;
