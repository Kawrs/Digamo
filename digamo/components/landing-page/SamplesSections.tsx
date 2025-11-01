"use client";
import { motion } from "framer-motion";

function SamplesSection() {
  const desc = [
    {
      ingredients: ["Eggs", "Malunggay", "Tomatoes", "Alugbati"],
      title: "Scrambled Egg with Veggies",
      img: "/ex1.png",
    },
    {
      ingredients: [
        "Chicken",
        "Soy Sauce",
        "Black Leaves",
        "Black Peppercorns",
      ],
      title: "Chicken Adobo",
      img: "/ex2.png",
    },
    {
      ingredients: ["Pork", "Potatoes", "Carrots", "Peas"],
      title: "Pork Stew",
      img: "/ex3.png",
    },
  ];

  return (
    <div className="steps-section min-h-screen flex flex-col w-full bg-gray-50 py-10 md:py-14 lg:py-16 justify-center items-center">
      <div className="titles justify-center text-center space-y-4 px-6 md:px-8 max-w-4xl mx-auto mb-10 md:mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-montserrat leading-tight">
          Recipe Examples
        </h1>
        <h2 className="text-lg tracking-wide font-montserrat">
          See what others are cooking with ingredients they already had
        </h2>
      </div>

      <div className="samples w-full flex justify-center px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl">
          {desc.map((desc, index) => (
            <motion.div
              key={desc.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: index * 0.15,
              }}
              className="max-w-sm border border-gray-200 rounded-lg shadow-sm bg-red hover:scale-[1.02] transition-transform duration-300"
            >
              <img className="rounded-t-lg" src={desc.img} alt={desc.title} />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                  {desc.title}
                </h5>
                <div className="flex flex-row flex-wrap gap-2 mt-4 justify-center items-center">
                  {desc.ingredients.map((ingredients) => (
                    <span
                      key={ingredients}
                      className="bg-white text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {ingredients}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SamplesSection;
