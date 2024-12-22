import React, { useRef } from "react";
import Xmark from "../icons/xmark";
import { Button } from "../ui/button";
import { data, getLocalSstorageAddress, setLocalStorageAddress } from "@/lib/utils";


interface close {
  close: () => void;
}
function AddContact(props: close) {
  const name = useRef<HTMLInputElement>(null);
  const address = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const checker = name?.current?.value && address?.current?.value;
    const data:data = getLocalSstorageAddress();
    const nameInput = name?.current?.value || ""
    const addressInput = address?.current?.value || ""

    const filter = data.filter(data=>data.name==nameInput || data.address == addressInput)
    console.log(filter)
    if (filter.length > 0) {
      console.log("contact exist already")
    }
    if (checker && filter.length === 0) {
      const updateData:data = [
        ...data,
        {
          name:nameInput,
          address: addressInput,
        },
      ];
      setLocalStorageAddress(updateData);
      props.close()
    }
  }
  return (
    <>
      <div
        className="absolute w-full h-screen bg-[#2B2B2B]/50 z-[60] backdrop-blur-md m-0"
        onClick={() => props.close()}
      />
      <form
        className="bg-[#2B2B2B] absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] rounded-md p-4 py-10  grid gap-5 w-[60%] min-w-80  md:w-[40%] max-w-xl z-[70]"
        onClick={(e) => handleSubmit(e)}
      >
        <div
          className="absolute right-6 top-3 w-fit"
          onClick={() => props.close()}
        >
          <Xmark />
        </div>
        <div className="flex flex-col gap-1">
          <label className="capitalize" htmlFor="name">
            name
          </label>
          <input
            required
            ref={name}
            type="text"
            name="name"
            id="name"
            className="border-[#3D435C] border outline-none p-3 rounded-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="address" className="capitalize">
            addresss
          </label>
          <input
            required
            ref={address}
            type="text"
            name="address"
            id="address"
            className="border-[#3D435C] border outline-none p-3 rounded-sm"
          />
          <Button type="submit" className="bg-[#13151D] border border-[#3D435C] text-[#51586D] text-base font-semibold capitalize mt-4 py-5">
            add address
          </Button>
        </div>
      </form>
    </>
  );
}
export default AddContact;
