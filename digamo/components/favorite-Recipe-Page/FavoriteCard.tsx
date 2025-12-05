"use client";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";

const FavoriteRecipePage = () => {
     const [liked, setLiked] = useState(false);
    return (
        <div className=" bg-gradient-to-tl from-[#F0B60E]/30 to-[#B8D4C8]/30 
        w-full h-full rounded-2xl p-5 flex flex-col justify-between shadow-xl
        dark:shadow-[0_5px_5px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-200">
            <div className="flex items-end justify-end mb-2">
                {/*Favorite button */}
                <button onClick={() => setLiked(!liked)}
                    className="hover:cursor-pointer">
                    {liked ? (
                        <FaRegHeart className="text-lg" />
                    ) : (
                        <FaHeart className="text-[#F36B3F] text-lg" />
                    )}
                </button>
            </div>
            {/*Title*/}
            <h1 className="text-[#F7931E] text-2xl font-monserrat font-bold break-words mt-5 mr-5">Testing</h1>
            
            {/*Date and view recipe button*/}
            <div className="flex flex-row justify-between items-end mt-10">
                <h2 className="text-md font-extralight dark:text-white text-black">Date: 1/3/25</h2>
                <Link href="/favoriteRecipePage/FavoriteRecipe">
                <button className="w-30 h-10 ml-5 bg-gray-500 rounded-2xl bg-gradient-to-l from-[#EF4444] to-[#F36B3F]
                border border-white hover:cursor-pointer active:translate-y-1 transition-all font-monserrat
                hover:bg-gradient-to-l hover:from-[#F36B3F] hover:to-[#F7931E] text-white shadow-[0_5px_5px_rgba(0,0,0,0.2)]
                ">View Recipe</button>
                </Link>
            </div>
        </div>
    );
}

export default FavoriteRecipePage;