function HeroSection() {
  return (
    <div className="hero w-full min-h-screen flex flex-col py-2 lg:flex-row items-center justify-center gap-8 lg:gap-12 bg-gradient-to-tl from-gold/20 to-mint/30 pt-24 pb-12 lg:pt-0 overflow-x-hidden ">
      <div className="titles flex-1 space-y-4 lg:space-y-6 text-center lg:text-left w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 pt-20">
        <div className="title space-y-2 sm:space-y-3">
          <h1 className="font-montagu text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-gray font-bold tracking-wide ">
            Add Your Pantry.
          </h1>
          <h1 className="font-montagu text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-coral font-bold tracking-wide ">
            Get A Recipe.
          </h1>
          <h1 className="font-montagu text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-gray font-bold tracking-wide ">
            Start Cooking.
          </h1>
        </div>
        <div className="subtitles py-4 lg:py-5">
          <h2 className="text-black text-base sm:text-lg lg:text-xl tracking-wide leading-relaxed font-montserrat">
            No more wondering "what&apos;s for dinner?" Just tell us what you
            have, and we&apos;ll create personalized recipes that match your
            ingredients.
          </h2>
        </div>
        <button className="py-3 px-8 sm:px-10 text-lg sm:text-xl font-montserrat font-bold bg-coral rounded-lg hover:bg-orange cursor-pointer transition-colors text-white tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] duration-300">
          Generate Recipes Now
        </button>
      </div>

      <div className="character flex-1 flex items-center justify-center lg:justify-end w-full px-6 sm:px-8 md:px-12 lg:px-16">
        <img
          src="/hero-character.png"
          alt="Hero Character"
          className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 max-w-full object-contain"
        />
      </div>
    </div>
  );
}
export default HeroSection;
