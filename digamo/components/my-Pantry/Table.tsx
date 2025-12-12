"use client";

import React, { useEffect, useState } from "react";
import { PantryItem } from "../../types/gemini";
import { db, auth } from "@/app/lib/firebase/firebaseConfig";
import { Pencil, Trash2 } from "lucide-react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { calculateExpiryStatus } from "@/app/myPantry/utils";

interface PantryTableProps {
  onAdd?: React.Dispatch<React.SetStateAction<(() => void) | null>>;
  onStatsChange?: (stats: {
    total: number;
    ingredients: number;
    expiringSoon: number;
  }) => void;
}

export default function PantryTable({
  onAdd,
  onStatsChange,
}: PantryTableProps) {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editForm, setEditForm] = useState<PantryItem | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "ingredients">(
    "ingredients"
  );

  const [userId, setUserId] = useState<string | null>(null);

  // Track user login
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUserId(user ? user.uid : null);
    });
  }, []);

  const pantryCollection = userId
    ? collection(db, "users", userId, "pantry")
    : null;

  // Load items
  async function loadItems() {
    if (!userId || !pantryCollection) return;

    try {
      const q = query(pantryCollection, where("userId", "==", userId));
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((snap) => {
        const d = snap.data() as {
          name: string;
          quantity: string;
          expiry: string | Date | { toDate: () => Date };
          status?: string;
          expiryStatus?: string;
          isIngredient?: boolean;
          userId: string;
        };

        return {
          id: snap.id,
          name: d.name,
          quantity: d.quantity,
          expiry:
            typeof d.expiry === "object" && "toDate" in d.expiry
              ? d.expiry.toDate()
              : d.expiry,
          status: d.status,
          expiryStatus: d.expiryStatus,
          isIngredient: d.isIngredient ?? false,
          userId: d.userId,
        } as PantryItem;
      });

      setItems(data);

      if (onStatsChange) {
        const total = data.length;
        const ingredients = data.filter((i) => i.isIngredient).length;
        const expiringSoon = data.filter((i) => {
          const s = (i.expiryStatus || i.status || "")
            .toString()
            .replace(/_/g, "-")
            .toLowerCase();
          return s === "expiring-soon";
        }).length;

        onStatsChange({ total, ingredients, expiringSoon });
      }
    } catch (err) {
      console.error("Error loading items:", err);
    }
  }

  useEffect(() => {
    loadItems();
  }, [userId]);

  const normalize = (raw: string | undefined) =>
    raw ? raw.replace(/_/g, "-").toLowerCase() : "";

  const getStatusColor = (raw: string | undefined) => {
    const s = normalize(raw);
    if (s === "fresh") return "bg-green-100 text-green-700";
    if (s === "use-soon") return "bg-yellow-100 text-yellow-700";
    if (s === "expiring-soon") return "bg-orange-100 text-orange-700";
    return "bg-gray-100 text-gray-700";
  };

  const getStatusText = (raw: string | undefined) => {
    const s = normalize(raw);
    if (s === "fresh") return "Fresh";
    if (s === "use-soon") return "Use Soon";
    if (s === "expiring-soon") return "Expiring Soon";
    return raw ?? "";
  };

  // Edit item
  const handleEdit = (item: PantryItem) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  // Save edited item
  const handleSave = async () => {
    if (!editForm || !userId) return;

    try {
      const ref = doc(db, "users", userId, "pantry", String(editForm.id));
      const expiryDate = new Date(editForm.expiry);

      await updateDoc(ref, {
        ...editForm,
        expiry: editForm.expiry,
        expiryStatus: calculateExpiryStatus(expiryDate),
        userId,
      });

      setEditingId(null);
      setEditForm(null);
      await loadItems();
    } catch (err) {
      console.error("Error saving item:", err);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!userId) return;

    try {
      const ref = doc(db, "users", userId, "pantry", String(id));
      await deleteDoc(ref);
      await loadItems();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleAddItem = async () => {
    if (!userId) return;

    const newItem = {
      name: "New Item",
      quantity: "0",
      expiry: new Date().toISOString().split("T")[0],
      status: "fresh",
      isIngredient: activeTab === "ingredients",
      expiryStatus: calculateExpiryStatus(new Date()),
      userId,
    };

    try {
      await addDoc(pantryCollection!, newItem);
      await loadItems();
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  useEffect(() => {
    if (onAdd) onAdd(() => handleAddItem);
  }, [onAdd, activeTab, userId]);

  const filtered =
    activeTab === "all" ? items : items.filter((i) => i.isIngredient);

  const ingredientCount = items.filter((i) => i.isIngredient).length;

  // ---------------- UI ----------------
  return (
    <div className="w-full mx-auto justify-center items-center p-4 ">
      <div className="max-w-full h-10 mx-auto grid grid-cols-2 gap-0 bg-gray-100/70 rounded-lg overflow-hidden mt-7">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-8 py-3 text-sm font-medium transition-colors flex items-center justify-center 
          ${
            activeTab === "all"
              ? "bg-white text-gray-900 rounded-xl h-8 mt-1 mb-1 ml-1 mr-1"
              : "text-gray-600 hover:bg-gray-50 hover:cursor-pointer"
          } 
    ${activeTab === "ingredients" ? "rounded-l-md" : ""}`}
        >
          All Items
        </button>

        <button
          onClick={() => setActiveTab("ingredients")}
          className={`px-8 py-2 text-sm font-medium transition-colors ${
            activeTab === "ingredients"
              ? "bg-white text-gray-900 rounded-xl h-8 mt-1 mb-1 ml-1 mr-1 "
              : "text-gray-600 hover:bg-gray-50 hover:cursor-pointer"
          } ${activeTab === "all" ? "rounded-lg" : ""}`}
        >
          Ingredients ({ingredientCount})
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-y-auto max-h-96 mt-6 border-gray-200 border-2">
        <table className="w-full">
          <thead className="bg-white border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Item Name
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Quantity
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Expiry Date
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filtered.map((item) => {
              const expiryString = item.expiry
                ? new Date(item.expiry).toLocaleDateString()
                : "—";

              return (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  {editingId === item.id ? (
                    <>
                      <td className="py-4 px-6">
                        <input
                          type="text"
                          value={editForm?.name || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm!, name: e.target.value })
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>

                      <td className="py-4 px-6">
                        <input
                          type="text"
                          value={editForm?.quantity || ""}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm!,
                              quantity: e.target.value,
                            })
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>

                      <td className="py-4 px-6">
                        <input
                          type="date"
                          value={
                            editForm?.expiry
                              ? new Date(editForm.expiry)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            setEditForm({
                              ...editForm!,
                              expiry: e.target.value,
                            })
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>

                      <td className="py-4 px-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {getStatusText(item.expiryStatus || item.status)}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={handleSave}
                          className="text-green-600 hover:text-green-700 font-medium mr-3"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-gray-600 hover:text-gray-700 font-medium"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-4 px-6 font-medium text-gray-900">
                        {item.name}
                      </td>

                      <td className="py-4 px-6 text-gray-600">
                        {item.quantity}
                      </td>

                      <td className="py-4 px-6 text-gray-600">
                        {expiryString}
                      </td>

                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            item.expiryStatus || item.status
                          )}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {getStatusText(item.expiryStatus || item.status)}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-gray-600 hover:text-blue-600 mr-3"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-gray-600 hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
