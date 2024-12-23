"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import img1 from "../../../public/photo.png"
import img2 from "../../../public/9306614.jpg";
import img3 from "../../../public/9334176.jpg";
import img4 from "../../../public/androgynous-avatar-non-binary-queer-person.jpg";
import img5 from "../../../public/freepik__background__67797.png";
import img6 from "../../../public/freepik__expand__16969.png";

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
  const array = [img1, img2, img3, img4,img5,img6];

  const randomNumber = Math.floor(Math.random() * 5) + 1;
  console.log(randomNumber);
  return (
    <Avatar className="w-[200px] h-[200px] mx-auto">
      {/* <AvatarImage src="../../../public/photo.png" alt="Colm Tuite" /> */}
      <Image src={array[randomNumber]} alt="avatar"  />
      <AvatarFallback className="AvatarFallback" delayMs={600}>
        CT
      </AvatarFallback>
    </Avatar>
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarDemo };
