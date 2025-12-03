"use client";
import Header from "components/home-page/HeaderHome";
import FavoriteCard from "components/favorite-Recipe-Page/FavoriteCard";
import BackButton from "components/favorite-Recipe-Page/BackButton";
const FavoriteRecipePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <Header />
      <div className="mt-20">
        <BackButton />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:m-50">
        <FavoriteCard />
        <FavoriteCard />
        <FavoriteCard />
        <FavoriteCard />
      </div>
    </div>
  );
}

export default FavoriteRecipePage;