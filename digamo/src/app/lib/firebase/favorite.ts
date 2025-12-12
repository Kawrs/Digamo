import { db, auth } from "./firebaseConfig";
import { doc, setDoc, deleteDoc, getDocs, collection } from "firebase/firestore";

type Recipe = {
  id: string;
  name: string;
  description?: string;
};

export async function addFavorite(recipe: Recipe) {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid, "favorites", recipe.id);

  await setDoc(ref, {
    recipeId: recipe.id,
    name: recipe.name,
    description: recipe.description ?? "",
    createdAt: new Date(),
  });
}

export async function removeFavorite(recipeId: string) {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid, "favorites", recipeId);
  await deleteDoc(ref);
}

export async function getFavorites() {
  const user = auth.currentUser;
  if (!user) return [];

  const ref = collection(db, "users", user.uid, "favorites");
  const snapshot = await getDocs(ref);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
}
