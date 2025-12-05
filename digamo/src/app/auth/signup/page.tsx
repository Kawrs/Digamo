"use client";
import SignupForm from "components/Sign-up/signupform";
import Signin from "components/Sign-up/Signin";
import React from 'react';
const SignupPage = () => {


  return (
    <div className="w-full min-h-screen h-full py-15 grid place-items-center">

      {/*Desktop*/}
      <section className="hidden md:block">
        {/* container */}
      <div className="h-full w-[90vw] max-w-[1400px] flex md:flex-row flex-col m-auto rounded-2xl shadow-2xl justify-center">
        {/* left side*/}
          <Signin />
        {/* right side*/}
          <SignupForm />
      </div>
      </section>
      {/*Mobile*/}
      <section className="block md:hidden">
        <SignupForm />
      </section>
    </div>
  );
};

export default SignupPage;
