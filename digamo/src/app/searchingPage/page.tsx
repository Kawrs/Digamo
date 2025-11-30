"use client";

import HeaderHome from "components/home-page/HeaderHome";
import SearchBar from "components/home-page/SearchBar";
export const dynamic = "force-dynamic";

export default function SearchingPage() {
  return (
    <div className="flex flex-col min-h-screen w-screen p-2 justify-center items-center">
      <HeaderHome />

      <div className="container-answer h-screen w-screen"></div>
      <div className="fixed bottom-20 w-full p-2">
        <SearchBar />
      </div>
    </div>
  );
}
