"use client";
import FavoriteModal from "components/favorite-Recipe-Page/FavoriteModal";
import Header from "components/home-page/HeaderHome";
const FavoriteRecipe = () => {
    return (
        <div className="min-h-screen flex items-center justify-center flex-col w-full overlay-scroll">
            <Header />
            <FavoriteModal />
        </div>
    );
}

export default FavoriteRecipe;