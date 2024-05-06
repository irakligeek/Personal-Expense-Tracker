"use client";
import { BiSpreadsheet } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { useContext } from "react";
import { HeaderContext } from "../context/context";
import Image from "next/image";

export default function HeaderMain() {
  const { isMobileMenuOpen, setMobileMenuOpen } = useContext(HeaderContext);

  return (
    <header
      className="min-h-14 text-zinc-200 bg-white
          flex flex-row items-center gap-2 py-2 px-4 justify-between
          border border-b border-zinc-200"
    >
      <button
        onClick={() => {
          setMobileMenuOpen(!isMobileMenuOpen);
        }}
        className="md:hidden h-full
       flex justify-center items-center "
      >
        <AiOutlineMenu className="text-3xl font-bold text-zinc-700" />
      </button>


      <Link href="/" className="text-white flex gap-2 items-center">
        <Image
          src="/itrackmoney-logo-dark.png" // Path to your logo
          alt="iTrackMoney Logo"
          width={150} // Desired width
          height={150} // Desired height
        />
      </Link>
      
      <div className="flex gap-2 text-sm">
        <div className="flex flex-col justify-start text-zinc-700">
          <span className="">Hello John</span>
          <Link className=" text-sm" href="user/profile">
            View Profile
          </Link>
        </div>

        <button className=" text-sm text-zinc-700">
          <span>
            <MdLogout />
          </span>
        </button>
      </div>
    </header>
  );
}
