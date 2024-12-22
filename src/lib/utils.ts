import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export type data={
  name:string;
  address:string;
}[];

// interface contacts {
//   data:data
// }

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocalSstorageAddress (){
  const storgedata = localStorage.getItem("contact");
  if(storgedata !== null){
    const fetchData = JSON.parse(storgedata ?? "");
    return fetchData
  }
  else{
    return []
  }
}

export function setLocalStorageAddress(data:data){
  localStorage.setItem("contact", JSON.stringify(data));
}