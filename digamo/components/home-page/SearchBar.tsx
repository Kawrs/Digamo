import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import Link from "next/link";

export default function SearchBar() {
  return (
    <div>
      <form className="max-w-md mx-auto">
        <label
          htmlFor="search"
          className="block mb-2.5 text-sm font-medium text-heading sr-only "
        >
          Generate recipes here
        </label>
        <div className="relative">
          <input
            type="search"
            id="search"
            className="block w-full rounded-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium border-coral text-heading text-sm rounded-base focus:ring-coral shadow-xs placeholder:text-body appearance-none lg:focus:ring-1 focus:outline-none focus:border-coral"
            placeholder="Generate recipes here..."
            required
          />
          <Link href="#">
            <button
              type="button"
              className="absolute end-1.5 bottom-1.5 font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none cursor-pointer"
            >
              <ArrowCircleUpIcon className="focus:outline-none text-gray-600 dark:text-white" />
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
