function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-sm z-50 shadow-sm">
      <div className="flex items-center justify-between py-3 px-8 sm:px-10 lg:px-24">
        <h3 className="font-bold text-xl text-black font-montserrat tracking-wide">
          Digamo
        </h3>
        <div className="flex items-center space-x-3">
          <button className="py-2.5 px-8 text-sm font-semibold text-gray-700 font-montserrat hover:bg-mint/80 hover:text-white transition-colors rounded-lg tracking-wide cursor-pointer">
            Login
          </button>
          <button className="py-2.5 px-6 text-sm font-semibold bg-orange text-white font-montserrat border border-gray-200 hover:bg-coral transition-colors rounded-lg tracking-wide cursor-pointer shadow-md hover:shadow-lg">
            Register
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
