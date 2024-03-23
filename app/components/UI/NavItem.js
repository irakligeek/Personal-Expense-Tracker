import { AiOutlineHome } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineFileCopy } from "react-icons/md";

import Link from "next/link";
export default function NavItem({ children, link }) {
  return (
    <li className="">
      <Link
        href={link}
        className="text-zinc-800 font-semibold flex items-center gap-2
         hover:text-zinc-500 transition-colors duration-200 ease-in-out"
      >
        {children === 'Home' && <AiOutlineHome className="text-xl"/> }
        {children === 'Settings' && <IoSettingsOutline className="text-xl"/> }
        {children === 'Expenses' && <MdOutlineFileCopy className="text-xl"/> }
        <span>{children}</span>
      </Link>
    </li>
  );
}
