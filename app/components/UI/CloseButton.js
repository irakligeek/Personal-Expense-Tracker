import { IoCloseOutline } from "react-icons/io5";
export default function CloseButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className=" hover:text-zinc-700 block md:hidden border border-zinc-200 p-2 absolute top-4 right-4"
    >
      <IoCloseOutline />
    </button>
  );
}
