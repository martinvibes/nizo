"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { CopyIcon, Wallet, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import ContactIcon from "../icons/contacts-icon";
import ContactList from "../contact-list/contact-list";

const NavBar = () => {
  const { setVisible } = useWalletModal();
  const { connected, disconnect, publicKey, wallet } = useWallet();
  // const { connection } = useConnection();
  // console.log(connection);
  const [slicedPublicKey, setSlicedPublicKey] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!publicKey) return setSlicedPublicKey("");

    const base58 = publicKey.toBase58();
    setSlicedPublicKey(base58.slice(0, 4) + ".." + base58.slice(-4));
  }, [publicKey]);

  function contactListHandle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <>
      {isOpen && <ContactList close={contactListHandle} />}
      <div className="border-b border-gray-800/50 backdrop-blur-xl">
        <div className="lg:max-w-7xl mx-auto p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 md:gap-8">
              <Link href={"/"}>
                <h1 className="text-xl md:text-[28px] font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  NIZO
                </h1>
              </Link>
            </div>

            <div>
              <Link href={"/price-feeds"}>
                <h2 className="text-base md:text-lg font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  Price feeds
                </h2>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              {connected ? <ContactIcon close={contactListHandle} /> : ""}
              
              {/* <WalletMultiButton /> */}
              {!connected && (
                <button
                  className="bg-gradient-to-r from-[#4A90E2] to-[#B6689E] hover:bg-[#B073FF] hover:bg-opacity-50 rounded-full py-3 px-5 text-white font-bold text-[16px]"
                  onClick={() => setVisible(true)}
                >
                  Connect Wallet
                </button>
              )}

              {/* {connected && (
              <button
                className="flex items-center gap-5 px-3 rounded-md bg-[#B073FF] hover:bg-[#B073FF] hover:bg-opacity-50 text-white font-bold text-[16px] h-[40px]"
                onClick={() => disconnect()}
              >
                <Image
                  src={wallet?.adapter.icon || ""}
                  height={24}
                  width={24}
                  alt="wallet icon"
                />
                {slicedPublicKey}
              </button>
            )} */}

              {connected && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-gradient-to-r from-[#4A90E2] to-[#B6689E] hover:bg-[#B073FF] hover:bg-opacity-50 rounded-full text-white font-bold text-[16px] py-6 px-5">
                      <Image
                        src={wallet?.adapter.icon || ""}
                        height={24}
                        width={24}
                        alt="wallet icon"
                      />
                      {slicedPublicKey}
                      <ChevronDown className="h-[16px] w-[16px]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 z-30 bg-[#18191B] rounded-lg border mt-2 border-neutral-800">
                    <DropdownMenuLabel className="text-sm text-neutral-500 px-3 py-2">
                      My Account
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="bg-neutral-800" />

                    <DropdownMenuGroup className="py-1">
                      <DropdownMenuItem
                        className="px-3 py-2 text-sm hover:bg-neutral-800 cursor-pointer flex items-center"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            publicKey?.toBase58() || ""
                          );
                        }}
                      >
                        <CopyIcon className="mr-2 h-4 w-4" />
                        <span>Copy Address</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="px-3 py-2 text-sm hover:bg-neutral-800 cursor-pointer flex items-center"
                        onClick={() => setVisible(true)}
                      >
                        <Wallet className="mr-2 h-4 w-4" />
                        <span>Change Wallet</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="px-3 py-2 text-sm hover:bg-neutral-800 cursor-pointer flex items-center"
                        onClick={() => disconnect()}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Disconnect</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
