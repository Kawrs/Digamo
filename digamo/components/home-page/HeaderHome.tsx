import { useState } from "react";

function HeaderHome() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-sm z-50 shadow-sm dark:bg-black/50 dark:border-b dark:backdrop-blur-sm dark:shadow-sm">
      <div className="navigation flex items-center justify-between py-3 px-6 sm:px-10 lg:px-24">
        <h3 className="font-bold text-xl text-black font-montserrat tracking-wide dark:text-white">
          Digamo
        </h3>

        <div className="hidden md:flex items-center space-x-3 icons-container">
          hj
        </div>

        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden p-5 flex flex-col space-y-4 font-montserrat"></div>
        )}
      </div>
    </header>
  );
}

export default HeaderHome;
