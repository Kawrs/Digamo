"use client";
import HeaderHome from "components/home-page/HeaderHome";
import DecorationLR from "components/home-page/DecorationLR";
import Carousel from "components/home-page/CarouselFeatures";

export default function HomePage() {
  return (
    <div className="min-h-screen w-screen flex flex-col overflow-x-hidden">
      <DecorationLR />
      <HeaderHome />
      <Carousel />
    </div>
  );
}
