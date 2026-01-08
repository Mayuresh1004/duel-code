import Image from "next/image";
import {onBoardUser} from "@/modules/auth/actions/index"
import { Navbar } from "@/components/ui/resizable-navbar";
import { NavbarHome } from "@/modules/home/components/Navbar";

export default async function Home() {

  await onBoardUser();

  return (
   <div>
    <div className="">
      sdad
    </div>
   </div>
  );
}
