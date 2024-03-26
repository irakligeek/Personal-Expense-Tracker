"use client";

import SideBarMenuItem from "./UI/NavItem";
import { useContext } from "react";
import { HeaderContext } from "../context/context";
import { IoCloseOutline } from "react-icons/io5";
import CloseButton from "./UI/CloseButton";

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
        <CloseButton onClick={() => setMobileMenuOpen(false)}/>
          
        <ul className="flex flex-col gap-8">
          <SideBarMenuItem link="/">Home</SideBarMenuItem>
          <SideBarMenuItem link="/settings">Settings</SideBarMenuItem>
          <SideBarMenuItem link="/reports">Expenses</SideBarMenuItem>
        </ul>
      </nav>
    </>
  );
}
