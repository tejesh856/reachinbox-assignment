import { IoIosArrowDown } from "react-icons/io";
import { MdReply } from "react-icons/md";

export default function Messages({ isDark, messagelist }) {
  if (messagelist) {
    function formatDate(dateStr) {
      const dateObj = new Date(dateStr);
      const now = new Date();

      // Clear the time portion to compare only dates
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      const oneDay = 24 * 60 * 60 * 1000;

      // Check if the date is today
      if (dateObj >= today && dateObj < today.getTime() + oneDay) {
        return "Today";
      }

      // Check if the date is yesterday
      if (dateObj >= yesterday && dateObj < today) {
        return "Yesterday";
      }

      // Otherwise, return the usual formatted date
      const day = dateObj.getDate();
      const month = dateObj.toLocaleString("en-US", { month: "short" });
      const year = dateObj.getFullYear();
      const hours = dateObj.getHours();

      return `${day} ${month} ${year}`;
    }

    function formatCustomDate(dateStr) {
      const dateObj = new Date(dateStr);

      // Extract day, month, and year
      const day = dateObj.getDate();
      const month = dateObj.toLocaleString("en-US", { month: "long" });
      const year = dateObj.getFullYear();

      // Extract hours and minutes
      let hours = dateObj.getHours();
      const minutes = dateObj.getMinutes().toString().padStart(2, "0");

      // Determine AM/PM
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert to 12-hour format

      return `${day} ${month} ${year} : ${hours}:${minutes}${ampm}`;
    }

    return (
      <div className={`w-full h-full ${isDark ? "bg-black" : "bg-white"}`}>
        <div className="flex flex-col h-full pb-4">
          <div
            className={`flex border-b-2 ${
              isDark ? " border-[#F8FAFC33]" : "border-[#E0E0E0]"
            } items-center justify-between px-6 py-4`}
          >
            <div className="flex flex-col">
              <h1
                className={`${
                  isDark ? "text-white" : "text-[#343A40]"
                } text-xl`}
              >
                {messagelist.name}
              </h1>

              <span
                className={`${
                  isDark ? "text-[#FFFFFF66]" : "text-[#343A40B2]"
                } text-sm`}
              >
                {messagelist.email}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`flex items-center border ${
                  isDark
                    ? "bg-[#1F1F1F] border-[#343A40]"
                    : "bg-white border-[#DFE3E8]"
                } mr-4 rounded gap-2 p-1`}
              >
                <div className="w-3 h-3 rounded-full bg-[#E6D162]"></div>
                <span
                  className={`${isDark ? "text-[#D3D7DB]" : "text-[#172B4D]"}`}
                >
                  Meeting Completed
                </span>
                <IoIosArrowDown
                  size={23}
                  className={`ml-2 cursor-pointer ${
                    isDark ? "text-[#A9AEB4]" : "text-[#172B4D]"
                  }`}
                />
              </button>
              <button
                className={` border ${
                  isDark
                    ? "bg-[#1F1F1F] border-[#343A40]"
                    : "bg-white border-[#DFE3E8]"
                }  rounded mr-4 p-1 flex items-center`}
              >
                <span
                  className={`${isDark ? "text-[#D3D7DB]" : "text-[#172B4D]"}`}
                >
                  Move
                </span>
                <IoIosArrowDown
                  size={23}
                  className={`ml-2 cursor-pointer ${
                    isDark ? "text-[#A9AEB4]" : "text-[#172B4D]"
                  }`}
                />
              </button>
              <button
                className={` border  rounded ${
                  isDark
                    ? "bg-[#1F1F1F] text-[#D3D7DB] border-[#343A40]"
                    : "bg-white border-[#DFE3E8] text-[#172B4D]"
                } p-1 flex items-center`}
              >
                ...
              </button>
            </div>
          </div>

          <div
            className={`flex flex-col h-full w-full p-6 scrollbar-thin scrollbar-thumb-[#5C7CFA] scrollbar-track-[#33383F] ${
              isDark ? "bg-black" : "bg-[#EEF1F4]"
            }`}
          >
            {messagelist.data.map((message, index) => (
              <div className="flex flex-col gap-4 px-4 py-3 mb-6">
                <div
                  className={`border ${
                    isDark ? "border-[#F8FAFC33]" : "border-[#77777733]"
                  } relative`}
                >
                  <div
                    className={`${
                      isDark
                        ? "bg-[#171819] text-white"
                        : "bg-[#EEF1F4] text-[#637381]"
                    } text-sm absolute -top-4 left-1/2 px-2 py-1 rounded`}
                  >
                    {formatDate(message.sentAt)}
                  </div>
                </div>
                <div
                  className={`flex flex-col gap-7 drop-shadow px-4 py-3 rounded border  ${
                    isDark
                      ? "bg-[#141517] border-[#343A40]"
                      : "bg-[#F9F9F9] border-[#E0E0E0]"
                  }`}
                >
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <h2
                        className={`text-xl ${
                          isDark ? "text-[#F8FAFC]" : "text-black"
                        }`}
                      >
                        {message.subject}
                      </h2>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`text-sm ${
                            isDark ? "text-[#AEAEAE]" : "text-[#637381]"
                          }`}
                        >
                          from :{message.fromEmail}
                        </span>
                        <span
                          className={`text-sm ${
                            isDark ? "text-[#AEAEAE]" : "text-[#637381]"
                          }`}
                        >
                          cc :{message.cc ? message.cc : ""}
                        </span>
                      </div>
                      <div
                        className={`text-sm mt-2 ${
                          isDark ? "text-[#AEAEAE]" : "text-[#637381]"
                        }`}
                      >
                        to :{message.toEmail}
                      </div>
                    </div>
                    <div
                      className={`${
                        isDark ? "text-[#7F7F7F]" : "text-[#637381]"
                      }`}
                    >
                      {formatCustomDate(message.sentAt)}
                    </div>
                  </div>
                  <div
                    className={`${
                      isDark ? "text-[#E1E0E0]" : "text-[#172B4D]"
                    }`}
                    dangerouslySetInnerHTML={{ __html: message.body }}
                  >
                    {/*message.body*/}
                  </div>
                </div>
              </div>
            ))}
            <div></div>
          </div>
          <button className="flex w-auto mx-6 mt-4 rounded self-start text-white items-center text-xl px-6 py-2 bg-gradient-to-r from-[#4B63DD] to-[#0524BF]">
            <MdReply size={25} className="text-[#F6F6F6] mr-2" />
            Reply
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`h-full w-full ${isDark ? "bg-black" : "bg-white"}`}
      ></div>
    );
  }
}
