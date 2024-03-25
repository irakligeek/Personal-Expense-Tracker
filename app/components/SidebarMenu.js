"use client";

import SideBarMenuItem from "./UI/NavItem";
import { useContext } from "react";
import { HeaderContext } from "../context/context";
import { IoCloseOutline } from "react-icons/io5";

export default function SidebarMenu() {
  // We need to use header context here to toggle the mobile menu
  const { isMobileMenuOpen, setMobileMenuOpen } = useContext(HeaderContext);

  return (
    <>
      <nav
        className={`bg-backgroundDark pb-8 pt-16 px-8 border-r border-zinc-200
     md:relative md:px-16 md:top-auto md:left-auto md:w-auto md:h-auto md:translate-x-0
     transition-transform duration-300 ease-in-out 
     fixed left-0 top-0 h-full w-[280px] z-50 ${
       isMobileMenuOpen ? "translate-x-0" : "translate-x-[-280px]"
     }`}
      >
        <button
          className="block md:hidden border border-zinc-200 p-2 absolute top-4 right-4"
          onClick={() => setMobileMenuOpen(false)}
        >
          <IoCloseOutline className="text-xl" />
        </button>
        <ul className="flex flex-col gap-8">
          <SideBarMenuItem link="/">Home</SideBarMenuItem>
          <SideBarMenuItem link="/user/settings">Settings</SideBarMenuItem>
          <SideBarMenuItem link="/user/reports">Expenses</SideBarMenuItem>
        </ul>
      </nav>
    </>
  );
}
