"use client";
import Link from "next/link";
import Image from "next/image";
const signin = () => {
  return (
    <div className='hidden md:block w-full md:w-2/5 bg-gradient-to-tl from-[#F0B60E] to-[50%] to-[#B8D4C8] rounded-l-2xl z-0 relative'>
          <div className='flex flex-col items-center justify-center h-full w-full'>
            <div className=' m-10'>
              <h1 className='text-[#4F4F4F] text-4xl font-montagu font-bold'>Welcome!</h1>
              <h2 className='text-[#F36B3F] text-xl font-montagu'>To Digamo Fellow chefs</h2>
              <h2 className='text-[#F36B3F] text-xl font-montagu'>Chefs</h2>
              <Image
                src="/chef's-head.png"
                alt="Digamo Logo"
                width={700}
                height={670}
                loading="lazy"
                className="h-55 w-45 ml-2"
              />

              {/* Sign in Button */}
              <Link href="/auth/login">
                <button className=' text-white rounded-2xl h-8 w-50 mt-5 
                        border border-white shadow-2xl bg-gradient-to-r from-[#F7931E] to-[#F36B3F]
                        hover:cursor-pointer hover:from-[#F36B3F] hover:to-[#EF4444]
                        active:translate-y-1 transition-all duration-200'>
                  Sign in
                </button>
              </Link>
            </div>
          </div>
        </div>
  )
}

export default signin;