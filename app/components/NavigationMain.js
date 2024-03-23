"use client";
import NavItem from "./UI/NavItem";
import { useContext } from "react";
import { HeaderContext } from "../context/context";

export default function NavigationMain() {

    // We need to use header context here to toggle the mobile menu
    const { isMobileMenuOpen } = useContext(HeaderContext);

  return (
    <>
      <nav
        className={`bg-backgroundDark py-8 px-8 border-r border-zinc-200
     md:relative md:px-16 md:top-auto md:left-auto md:w-auto md:h-auto md:translate-x-0
     transition-transform duration-300 ease-in-out 
     fixed left-0 top-14 h-full w-[280px] z-50 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-[-280px]'}`
  }
      >
        <ul className="flex flex-col gap-8">
          <NavItem link="/">Home</NavItem>
          <NavItem link="user/settings">Settings</NavItem>
          <NavItem link="user/reports">Expenses</NavItem>
        </ul>
      </nav>
    </>
  );
}
