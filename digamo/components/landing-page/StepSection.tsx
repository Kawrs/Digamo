import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";

function StepSection() {
  return (
    <div className="steps-section min-h-screen flex flex-col w-full bg-gray-50 py-10 md:py-14 lg:py-16 justify-center items-center">
      <div className="titles justify-center text-center space-y-4 px-6 md:px-8 max-w-4xl mx-auto mb-10 md:mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-montserrat leading-tight">
          How It Works
        </h1>
        <h2 className="text-lg tracking-wide font-montserrat">
          From pantry to plate in three simple steps
        </h2>
      </div>
      <div className="steps-container flex flex-col space-y-8 px-6 md:px-10 lg:px-7 pt-6 md:pt-8 lg:pt-10 w-full max-w-4xl">
        <div className="step1 flex flex-col sm:flex-row items-center justify-start gap-6 sm:gap-8">
          <div className="w-full max-w-[10rem] sm:w-40 aspect-[10/9] relative flex-shrink-0">
            <div className="absolute left-0 top-[5.56%] right-[10%] bottom-[11.11%] bg-mint rounded-lg flex items-center justify-center shadow-[2px_2px_6px_0px_rgba(0,0,0,0.10),0px_4px_6px_0px_rgba(0,0,0,0.10)] p-3">
              <FormatListBulletedIcon
                sx={{ fontSize: "4rem" }}
                className="text-white"
              />
            </div>
            <div className="absolute right-0 top-0 w-[30%] aspect-[3/2] bg-white rounded-[30px] shadow-[2px_-2px_6px_0px_rgba(0,0,0,0.10),0px_4px_6px_0px_rgba(0,0,0,0.10)] flex items-center justify-center z-10">
              <div className="text-black text-lg sm:text-xl font-normal font-montserrat">
                01
              </div>
            </div>
          </div>

          <div className="description text-center sm:text-left flex flex-col justify-center gap-2 sm:gap-3">
            <h2 className="font-montserrat text-xl sm:text-2xl lg:text-3xl font-bold leading-tight hover:[text-shadow:_0px_4px_4px_rgb(184_212_200_/_1.00)]">
              List Your Ingredients
            </h2>
            <p className="font-montserrat text-base sm:text-lg text-gray-600 max-w-md leading-relaxed">
              List your ingredients on the pantry section
            </p>
          </div>
        </div>
        <div className="step2 flex flex-col sm:flex-row items-center justify-start gap-6 sm:gap-8">
          <div className="w-full max-w-[10rem] sm:w-40 aspect-[10/9] relative flex-shrink-0">
            <div className="absolute left-0 top-[5.56%] right-[10%] bottom-[11.11%] bg-gold rounded-lg flex items-center justify-center shadow-[2px_2px_6px_0px_rgba(0,0,0,0.10),0px_4px_6px_0px_rgba(0,0,0,0.10)] p-3">
              <AutoFixHighIcon
                sx={{ fontSize: "4rem" }}
                className="text-white"
              />
            </div>

            <div className="absolute right-0 top-0 w-[30%] aspect-[3/2] bg-white rounded-[30px] shadow-[2px_-2px_6px_0px_rgba(0,0,0,0.10),0px_4px_6px_0px_rgba(0,0,0,0.10)] flex items-center justify-center z-10">
              <div className="text-black text-lg sm:text-xl font-normal font-montserrat">
                02
              </div>
            </div>
          </div>

          <div className="description text-center sm:text-left flex flex-col justify-center gap-2 sm:gap-3">
            <h2 className="font-montserrat text-xl sm:text-2xl lg:text-3xl font-bold leading-tight hover:[text-shadow:_0px_4px_4px_rgb(240_182_14_/_1.00)]">
              AI Creates Magic
            </h2>
            <p className="font-montserrat text-base sm:text-lg text-gray-600 max-w-md leading-relaxed">
              Our AI analyzes your ingredients and generates delicious recipe
              combinations instantly.
            </p>
          </div>
        </div>
        <div className="step3 flex flex-col sm:flex-row items-center justify-start gap-6 sm:gap-8">
          <div className="w-full max-w-[10rem] sm:w-40 aspect-[10/9] relative flex-shrink-0">
            <div className="absolute left-0 top-[5.56%] right-[10%] bottom-[11.11%] bg-coral rounded-lg flex items-center justify-center shadow-[2px_2px_6px_0px_rgba(0,0,0,0.10),0px_4px_6px_0px_rgba(0,0,0,0.10)] p-3">
              <OutdoorGrillIcon
                sx={{ fontSize: "4rem" }}
                className="text-white"
              />
            </div>

            <div className="absolute right-0 top-0 w-[30%] aspect-[3/2] bg-white rounded-[30px] shadow-[2px_-2px_6px_0px_rgba(0,0,0,0.10),0px_4px_6px_0px_rgba(0,0,0,0.10)] flex items-center justify-center z-10">
              <div className="text-black text-lg sm:text-xl font-normal font-montserrat">
                03
              </div>
            </div>
          </div>

          <div className="description text-center sm:text-left flex flex-col justify-center gap-2 sm:gap-3">
            <h2 className="font-montserrat text-xl sm:text-2xl lg:text-3xl font-bold leading-tight hover:[text-shadow:_0px_4px_4px_rgb(243_107_63_/_1.00)]  ">
              Start Cooking
            </h2>
            <p className="font-montserrat text-base sm:text-lg text-gray-600 max-w-md leading-relaxed">
              Get step-by-step instructions, cooking times, and nutritional
              information. Save favorites for later!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepSection;
