"use client";
import Header from "components/home-page/HeaderHome";
import FavoriteCard from "components/favorite-Recipe-Page/FavoriteCard";
const FavoriteRecipePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-50">
        <FavoriteCard />
        <FavoriteCard />
        <FavoriteCard />
        <FavoriteCard />
      </div>
    </div>
  );
}

export default FavoriteRecipePage;