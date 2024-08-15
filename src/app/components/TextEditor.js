import { FaXmark } from "react-icons/fa6";
import { FaRegSmile } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdLink } from "react-icons/io";
import { AiFillThunderbolt } from "react-icons/ai";
import { LuEye, LuChevronsLeftRight } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdPhoto, MdPersonRemoveAlt1 } from "react-icons/md";

export default function TextEditor({ isDark, showreply, setshowreply }) {
  return (
    <div
      className={`${!showreply ? "hidden" : "block"} ${
        isDark ? "bg-[#141517] border-[#4A5055]" : "bg-white border-gray-300"
      } border rounded-xl h-full w-full`}
    >
      <div className="h-full w-full">
        <div className="flex flex-col h-[85%] w-full">
          <div className="flex flex-col">
            <div
              className={`flex px-4 py-2 rounded border-b-[1px] justify-between items-center ${
                isDark
                  ? "bg-[#23272C] border-[#41464B] text-[#BAB9BD]"
                  : "bg-gray-100 border-gray-300 text-gray-900"
              }`}
            >
              <h2>Reply</h2>
              <FaXmark
                size={20}
                onClick={() => setshowreply(false)}
                className={`${
                  isDark ? "text-white" : "text-black"
                } cursor-pointer`}
              />
            </div>
            <div
              className={`flex items-center justify-center gap-2 border-b-[1px] ${
                isDark ? "border-[#34383D]" : "border-gray-300"
              }`}
            >
              <span
                className={`pl-6 text-sm ${
                  isDark ? "text-[#BAB9BD]" : "text-gray-900"
                }`}
              >
                To:
              </span>
              <input
                type="text"
                name="toemail"
                id="toemail"
                className={`w-full mr-6 py-2 text-sm outline-none border-none bg-transparent ${
                  isDark ? "text-[#E7E7E7]" : "text-gray-900"
                }`}
              />
            </div>
            <div
              className={`flex items-center justify-center gap-2 border-b-[1px] ${
                isDark ? "border-[#34383D]" : "border-gray-300"
              }`}
            >
              <span
                className={`pl-6 text-sm ${
                  isDark ? "text-[#BAB9BD]" : "text-gray-900"
                }`}
              >
                From:
              </span>{" "}
              <input
                type="text"
                name="fromemail"
                id="fromemail"
                className={`w-full mr-6 py-2 text-sm outline-none border-none bg-transparent ${
                  isDark ? "text-[#E7E7E7]" : "text-gray-900"
                }`}
              />
            </div>
            <div
              className={`flex items-center justify-center gap-2 border-b-[1px] ${
                isDark ? "border-[#34383D]" : "border-gray-300"
              }`}
            >
              <span
                className={`pl-6 text-sm ${
                  isDark ? "text-[#BAB9BD]" : "text-gray-900"
                }`}
              >
                Subject:
              </span>{" "}
              <input
                type="text"
                name="subject"
                id="subjectemail"
                className={`w-full mr-6 py-2 text-sm outline-none border-none bg-transparent ${
                  isDark ? "text-[#E7E7E7]" : "text-gray-900"
                }`}
              />
            </div>
          </div>

          <div className="w-full h-full px-6 py-4">
            <textarea
              name="body"
              id="body"
              className={`w-full resize-none h-full focus:outline-none bg-transparent ${
                isDark ? "text-[#E7E7E7]" : "text-gray-900"
              }`}
              placeholder="Enter body"
              draggable="false"
            ></textarea>
          </div>
        </div>

        <div
          className={`flex w-full items-center border-t-2 gap-5 px-6 py-2 ${
            isDark ? "border-[#2E3236]" : "border-gray-300"
          }`}
        >
          <button className="flex gap-4 items-center px-4 py-2 rounded text-white bg-gradient-to-r from-[#4B63DD] to-[rgba(5,36,191,0.99)]">
            Send <IoMdArrowDropdown size={20} />
          </button>
          <button
            className={`flex items-center gap-2 ${
              isDark ? "text-[#ADADAD]" : "text-gray-700"
            }`}
          >
            <AiFillThunderbolt size={20} /> Variables
          </button>
          <button
            className={`flex gap-2 ${
              isDark ? "text-[#ADADAD]" : "text-gray-700"
            }`}
          >
            <LuEye size={20} /> Preview Email
          </button>
          <button
            className={`flex ${isDark ? "text-[#ADADAD]" : "text-gray-700"}`}
          >
            A<BsThreeDotsVertical size={20} />
          </button>
          <button
            className={`flex gap-2 ${
              isDark ? "text-[#ADADAD]" : "text-gray-700"
            }`}
          >
            <IoMdLink size={20} />
          </button>
          <button
            className={`flex gap-2 ${
              isDark ? "text-[#ADADAD]" : "text-gray-700"
            }`}
          >
            <MdPhoto size={20} />
          </button>
          <button
            className={`flex gap-2 ${
              isDark ? "text-[#ADADAD]" : "text-gray-700"
            }`}
          >
            <FaRegSmile size={20} />
          </button>
          <button
            className={`flex gap-2 ${
              isDark ? "text-[#ADADAD]" : "text-gray-700"
            }`}
          >
            <MdPersonRemoveAlt1 size={20} />
          </button>
          <button
            className={`flex gap-2 ${
              isDark ? "text-[#ADADAD]" : "text-gray-700"
            }`}
          >
            <LuChevronsLeftRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
