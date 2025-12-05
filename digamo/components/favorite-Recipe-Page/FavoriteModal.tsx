"use client";
import { IoTimeOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { BiSolidBowlRice } from "react-icons/bi";
import CustomBullet from "./CustomBullet";

const FavoriteModal = () => {
  return (
    <div className="flex flex-col justify-center p-10 gap-5 mt-15 w-full max-w-5xl mx-auto">
        <section>
            <div className=" bg-gradient-to-r from-[#F7931E]/50 to-white/0 z-0 w-3/4 rounded-2xl w-full dark:bg-gradient-to-r dark:from-[#F0B60E] dark:to-black/0 shadow-xl dark:shadow-[0_5px_5px_rgba(255,255,255,0.5)]  ">
                <div className="bg-gradient-to-l from-[#F7931E]/20 from-50 to-white to-100 w-full z-10 p-5 relative left-2 rounded-2xl 
                dark:bg-gradient-to-l dark:from-[#F0B60E] dark:from-50 dark:to-white dark:to-100">
                    <div className="bg-[#F7931E]/20 gap-4 rounded-xl flex flex-row w-1/5 p-2 items-center">
                        <BiSolidBowlRice className="text-[#595959]"/>
                        <h1 className="font-monserrat font-light text-md text-[#595959]">Favorite Recipe</h1>
                    </div>
                    <h1 className="font-monsterrat font-bold text-5xl text-[#F7931E] mt-4">Title</h1>
                    <h2 className="mb-5 text-xl font-light text-[#595959]">Description</h2>
                    <div className="flex flex-row gap-10">
                        <div className="gap-2 flex items-center">
                            <IoTimeOutline className="text-[#595959]"/>
                            <h3 className="text-[#595959] font-light">Duration Time: 30 mins total</h3>
                        </div>
                        <div className="gap-2 flex items-center">
                            <BsPeople className="text-[#595959]"/>
                            <h3 className="text-[#595959] font-light">Serves 5</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div className="border-1 border-[#F7931E] dark:border-3 p-5 rounded-2xl bg-white shadow-xl dark:shadow-[0_5px_5px_rgba(255,255,255,0.5)]">
                <h1 className="font-monsterrat font-bold text-4xl dark:text-black">Ingredients</h1>
                <h2 className="font-light text-[#595959] text-sm">For 5 Serving</h2>
                <ul className="list-disc marker:text-[#F7931E] text-md mt-5 gap-2 ml-8 dark:text-black">
                    <li>Ingredient 1</li>
                    <li>Ingredient 2</li>
                </ul>
            </div>
        </section>
        <section>
            <div className="border-1 border-[#F7931E] dark:border-3 p-5 rounded-2xl bg-white shadow-xl dark:shadow-[0_5px_5px_rgba(255,255,255,0.5)]">
                <h1 className="font-monsterrat font-bold text-4xl dark:text-black">Steps</h1>
                <h2 className="font-light text-[#595959] text-sm mb-5">Follow the steps while you cook</h2>
                <ul className="list-none space-y-2 dark:text-black">
                    {["Step 1", "Step 2", "Step 3"].map((item, idx) => (
                        <li key={idx}>
                        <CustomBullet index={idx}>{item}</CustomBullet>
                        </li>
                    ))}
                    </ul>
            </div>
        </section>
    </div>
  );
}
export default FavoriteModal;