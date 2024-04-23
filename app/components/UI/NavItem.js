import { IoSettingsOutline } from "react-icons/io5";
import {
  MdOutlineFileCopy,
} from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { BiCoinStack } from "react-icons/bi";
import { usePathname } from "next/navigation";

import Link from "next/link";
export default function SideBarMenuItem({ children, link }) {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <li className="">
      <Link
        href={link}
        className={`font-semibold flex items-center gap-2
          transition-colors duration-200 ease-in-out ${
            isActive
              ? "text-blue-500 hover:text-blue-400"
              : " hover:text-zinc-500 text-zinc-800"
          }`}
      >
        {children === "Dashboard" && <TbBrandGoogleAnalytics className="text-xl" />}
        {children === "Settings" && <IoSettingsOutline className="text-xl" />}
        {children === "Expenses" && <MdOutlineFileCopy className="text-xl" />}
        {children === "Budget" && <BiCoinStack className="text-xl" />}
        {children === "Categories" && <BiCategoryAlt className="text-xl" />}
        <span>{children}</span>
      </Link>
    </li>
  );
}
