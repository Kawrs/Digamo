"use client";

import { motion } from "framer-motion";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";

function StepSection() {
  const steps = [
    {
      title: "List Your Ingredients",
      description: "List your ingredients on the pantry section",
      icon: FormatListBulletedIcon,
      bgColor: "bg-mint",
      shadowHover: "hover:[text-shadow:_0px_4px_4px_rgb(184_212_200_/_1.00)]",
      number: "01",
    },
    {
      title: "AI Creates Magic",
      description:
        "Our AI analyzes your ingredients and generates delicious recipe combinations instantly.",
      icon: AutoFixHighIcon,
      bgColor: "bg-gold",
      shadowHover: "hover:[text-shadow:_0px_4px_4px_rgb(240_182_14_/_1.00)]",
      number: "02",
    },
    {
      title: "Start Cooking",
      description:
        "Get step-by-step instructions, cooking times, and nutritional information. Save favorites for later!",
      icon: OutdoorGrillIcon,
      bgColor: "bg-coral",
      shadowHover: "hover:[text-shadow:_0px_4px_4px_rgb(243_107_63_/_1.00)]",
      number: "03",
    },
  ];

  return (
    <div className="steps-section flex flex-col justify-center items-center min-h-screen w-full bg-gray-50 py-8 md:py-10">
      <div className="titles justify-center text-center space-y-3 px-6 md:px-8 max-w-4xl mx-auto mb-4 md:mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-montserrat leading-tight">
          How It Works
        </h1>
        <h2 className="text-lg tracking-wide font-montserrat">
          From pantry to plate in three simple steps
        </h2>
      </div>

      <div className="steps-container flex flex-col space-y-8 px-6 md:px-10 lg:px-7 w-full max-w-4xl">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: 100 }} // start 100px to the right
              whileInView={{ opacity: 1, x: 0 }} // slide to position
              viewport={{ once: false, amount: 0.3 }} // animate every time
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: index * 0.2,
              }}
              className="flex flex-col sm:flex-row items-center justify-start gap-6 sm:gap-8"
            >
              <div className="w-full max-w-[10rem] sm:w-40 aspect-[10/9] relative flex-shrink-0">
                <div
                  className={`absolute left-0 top-[5.56%] right-[10%] bottom-[11.11%] ${step.bgColor} rounded-lg flex items-center justify-center shadow-[2px_2px_6px_0px_rgba(0,0,0,0.10),0px_4px_6px_0px_rgba(0,0,0,0.10)] p-3`}
                >
                  <Icon sx={{ fontSize: "4rem" }} className="text-white" />
                </div>
                <div className="absolute right-0 top-0 w-[30%] aspect-[3/2] bg-white rounded-[30px] shadow-[2px_-2px_6px_0px_rgba(0,0,0,0.10),0px_4px_6px_0px_rgba(0,0,0,0.10)] flex items-center justify-center z-10">
                  <div className="text-black text-lg sm:text-xl font-normal font-montserrat">
                    {step.number}
                  </div>
                </div>
              </div>

              <div className="description text-center sm:text-left flex flex-col justify-center gap-2 sm:gap-3">
                <h2
                  className={`font-montserrat text-lg sm:text-xl lg:text-2xl font-bold leading-tight ${step.shadowHover}`}
                >
                  {step.title}
                </h2>
                <p className="font-montserrat text-base sm:text-lg text-gray-600 max-w-md leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default StepSection;
