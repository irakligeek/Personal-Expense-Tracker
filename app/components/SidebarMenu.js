"use client";

import SideBarMenuItem from "./ui/NavItem";
import { useContext } from "react";
import { HeaderContext } from "../context/context";
import { IoCloseOutline } from "react-icons/io5";
import CloseButton from "./ui/CloseButton";

export default function SidebarMenu() {
  // We need to use header context here to toggle the mobile menu
  const { isMobileMenuOpen, setMobileMenuOpen } = useContext(HeaderContext);

  return (
    <>
      <nav
        className={`pb-8 border-r border-zinc-200 bg-white
     md:relative md:top-auto md:h-auto md:translate-x-0
     transition-transform duration-300 ease-in-out 
     fixed left-0 top-auto h-full z-50 w-[120px] ${
       isMobileMenuOpen ? "translate-x-0" : "translate-x-[-120px]"
     }`}
      >   
        <ul className="flex flex-col">
          <SideBarMenuItem link="/">Dashboard</SideBarMenuItem>
          <SideBarMenuItem link="/budget">Budget</SideBarMenuItem>
          <SideBarMenuItem link="/categories">Categories</SideBarMenuItem>
          <SideBarMenuItem link="/reoccuring-expenses">Reoccuring</SideBarMenuItem>
        </ul>
      </nav>
    </>
  );
}
