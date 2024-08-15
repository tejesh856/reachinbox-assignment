export default function Deletemodal({
  setshowdeletemodal,
  showdeletemodal,
  isDark,
}) {
  return (
    <div
      className={`${
        showdeletemodal ? "block" : "hidden"
      } z-50 flex items-center justify-center bg-[#8484847D] absolute top-0 left-0 w-full h-full`}
    >
      <div
        className="py-6 px-10 border rounded-lg flex flex-col items-center gap-10"
        style={{
          background: "linear-gradient(180deg, #141517 0%, #232528 100%)",
          borderImage: "linear-gradient(180deg, #484E53 0%, #2F3338 100%) 1",
        }}
      >
        <h1 className="text-white text-xl">Are you sure?</h1>
        <span className="text-sm text-[#E8E8E8]">
          Your selected email will be deleted.
        </span>
        <div className="flex items-center justify-between gap-10">
          <button
            className="px-4 py-2 text-white bg-[#25262B]"
            onClick={() => setshowdeletemodal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white"
            style={{
              background:
                "linear-gradient(91.73deg, #FA5252 -2.99%, #A91919 5.8%)",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
