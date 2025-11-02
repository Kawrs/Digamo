"use client";

import { motion } from "framer-motion";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";

function FeaturesSection() {
  const features = [
    {
      title: "Smart Pantry Scan",
      description:
        "Simply list what's in your fridge and pantry. Our AI understands ingredients and suggests the best combinations.",
      icon: KitchenOutlinedIcon,
    },
    {
      title: "AI Powered Recipes",
      description:
        "Get instant, personalized recipe suggestions that make the most of what you already have at home.",
      icon: AutoAwesomeOutlinedIcon,
    },
    {
      title: "Save Time and Money",
      description:
        "No more emergency grocery runs or food waste. Use what you have and discover creative new dishes.",
      icon: AccessTimeOutlinedIcon,
    },
  ];

  return (
    <div className="features min-h-screen flex flex-col w-full bg-white dark:bg-black/50 py-20 md:py-24 lg:py-32 justify-center items-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="titles justify-center text-center space-y-6 px-6 md:px-8 max-w-4xl mx-auto mb-16 md:mb-20"
      >
        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-montserrat leading-tight">
          Everything You Need To Cook Smarter
        </h1>
        <h2 className="text-lg tracking-wide font-montserrat text-gray-300">
          Our intelligent platform makes meal planning effortless and fun
        </h2>
      </motion.div>

      <div className="w-full flex justify-center px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: index * 0.15,
                }}
                className="bg-gradient-to-br from-gold/20 to-mint/20 hover:from-gold/40 hover:to-mint/40 
                           p-8 rounded-xl text-left shadow-md transition-transform duration-300 hover:scale-[1.02] dark:from-gold/40 dark:to-mint/40 dark:hover:from-gold/60 dark:hover:to-mint/60"
              >
                <Icon className="text-orange-500 w-10 h-10 mb-4 dark:text-gold" />
                <h3 className="text-lg tracking-wide font-montserrat font-semibold dark:text-white text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm light:text-black font-montserrat tracking-wide dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;
