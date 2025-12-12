"use client";

import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

import { PantryItem } from "../../../../types/gemini";
import { calculateExpiryStatus } from "@/app/myPantry/utils";

// Get user's pantry_items collection
function getPantryCollection(userId: string | null) {
  if (!db || !userId) return null;
  return collection(db, "pantry", userId, "pantry_items");
}

// Fetch items
export async function fetchPantryItems(userId: string): Promise<PantryItem[]> {
  const pantryCol = getPantryCollection(userId);
  if (!pantryCol) return [];

  const snapshot = await getDocs(pantryCol);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<PantryItem, "id">),
  }));
}

// Add item
export async function addPantryItemToDB(
  userId: string,
  item: Omit<PantryItem, "id" | "expiryStatus">
) {
  const pantryCol = getPantryCollection(userId);
  if (!pantryCol) return;

  const expiryStatus = calculateExpiryStatus(new Date(item.expiry));

  return addDoc(pantryCol, { ...item, expiryStatus });
}

// Update
export async function updatePantryItemInDB(userId: string, item: PantryItem) {
  const ref = doc(db!, "users", userId, "pantry", item.id);

  return updateDoc(ref, {
    ...item,
    expiryStatus: calculateExpiryStatus(new Date(item.expiry)),
  });
}

// Delete
export async function deletePantryItemInDB(userId: string, id: string) {
  const ref = doc(db!, "users", userId, "pantry", id);
  return deleteDoc(ref);
}
