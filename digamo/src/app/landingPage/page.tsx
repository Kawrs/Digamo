export default function landingPage() {
  return (
<<<<<<< Updated upstream
    <div className="container min-w-full max-h-full flex flex-row">
      <header className="getStartedbtn flex items-center justify-between w-full py-5 px-10">
        <h3 className="font-bold text-lg">Digamo</h3>
        <button className="py-2.5 px-5 mb-2 text-sm bg-black text-white border border-gray-200 focus:ring-gray-100 cursor-pointer">
          Get Started
        </button>
      </header>
=======
    <div className="min-h-screen w-screen flex flex-col overflow-x-hidden scroll-smooth">
      <HeaderNav />

      <section id="hero">
        <HeroSection />
      </section>

      <section id="features">
        <FeatureSection />
      </section>

      <section id="steps">
        <StepSection />
      </section>

      <section id="samples">
        <SamplesSection />
      </section>
>>>>>>> Stashed changes
    </div>
  );
}
