"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
// import img1 from "../../../public/photo.png"
// import img2 from "../../../public/9306614.jpg";
// import img3 from "../../../public/9334176.jpg";
// import img4 from "../../../public/androgynous-avatar-non-binary-queer-person.jpg";
import img6 from "../../../public/07771d2836880217ff2c85ae66cf6086.jpg";
import img7 from "../../../public/268f2e1880d50ce1d3fae26914a48fc0.jpg";
import img8 from "../../../public/b3fc7c6be2886d92faa00a378cdb5b1f.jpg";
import img9 from "../../../public/e718b71961850ab945d39a3d2f2d72d6.jpg";

import { cn } from "@/lib/utils";
import Image from "next/image";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

function AvatarDemo() {
  const array = [img6, img7, img8, img9];

  const randomNumber = Math.floor(Math.random() * array.length);
  console.log(randomNumber);
  return (
    <Avatar className="w-[200px] h-[200px] mx-auto">
      {/* <AvatarImage src="../../../public/photo.png" alt="Colm Tuite" /> */}
      <Image src={array[randomNumber]} priority alt="avatar" />
      {/* <AvatarFallback className="AvatarFallback" delayMs={600}>
        user
      </AvatarFallback> */}
    </Avatar>
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarDemo };
