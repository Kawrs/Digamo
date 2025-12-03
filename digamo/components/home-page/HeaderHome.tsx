import { useState } from "react";
import NavButtons from "./NavButtons";

function HeaderHome() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-sm z-50 shadow-sm dark:bg-black/50 dark:border-b dark:backdrop-blur-sm dark:shadow-sm">
      <div className="navigation flex items-center justify-between py-5 px-6 sm:px-10 lg:px-24">
        <h3 className="font-bold text-xl text-black font-montserrat tracking-wide dark:text-white">
          Digamo
        </h3>

        <nav className="hidden md:flex items-center space-x-3 icons-container">
          <NavButtons />
        </nav>

        <nav className="hidden md:flex items-center space-x-3 icons-container">
          <div className="profile cursor-pointer">
            {/* ilisdanan pani para dynamic */}
            <div className="rounded-full bg-red p-4"></div>
          </div>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-gray-700 hover:bg-gray-100 rounded-lg transition"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden p-5 flex flex-col space-y-4 font-montserrat">
            <div className="flex flex-col gap-4">
              <NavButtons />
            </div>
            {/* ilisdanan pani para dynamic */}
            <div className="profile mt-4">
              <div className="rounded-full bg-red p-4 w-1"></div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default HeaderHome;
