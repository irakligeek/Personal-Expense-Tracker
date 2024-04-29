"use client";
import { BiSpreadsheet } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { useContext } from "react";
import { HeaderContext } from "../context/context";
export default function HeaderMain() {
  const { isMobileMenuOpen, setMobileMenuOpen } = useContext(HeaderContext);

  return (
    
      <header
        className="min-h-14 bg-primary text-zinc-200
          flex flex-row items-center gap-2 py-2 px-4 justify-between
          border border-b border-zinc-200"
      >
        {/* Mobile nav */}
        <button
          onClick={() => {
            setMobileMenuOpen(!isMobileMenuOpen);
          }}
          className="md:hidden h-full
       flex justify-center items-center "
        >
          <AiOutlineMenu className="text-3xl font-bold" />
        </button>

        {/* Logo */}
        <div className="flex flex-row gap-2 items-center">
          <Link href="/" className="text-white flex gap-2 items-center">
            <BiSpreadsheet className="text-[1.5rem]" />{" "}
            <h1 className="text-lg font-normal tracking-widest">
              Expense Tracker
            </h1>
          </Link>
        </div>
        {/* User info */}
        <div className="flex gap-2 text-sm">
          <div className="flex flex-col justify-start">
            <span>Hello John</span>
            <Link className="text-accent text-sm" href="user/profile">
              View Profile
            </Link>
          </div>

          <button className=" text-sm">
            <span>
              <MdLogout />
            </span>
          </button>
        </div>
      </header>
    
  );
}
