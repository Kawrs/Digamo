"use client";

import HeaderHome from "components/home-page/HeaderHome";
import SearchBar from "components/home-page/SearchBar";
import { Suspense } from "react";

export default function SearchingPage() {
  return (
    <div className="flex flex-col min-h-screen w-screen p-2 justify-center items-center">
      <HeaderHome />

      <div className="container-answer h-screen w-screen"></div>
      <div className="fixed bottom-20 w-full p-2">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchBar />
        </Suspense>
      </div>
    </div>
  );
}
