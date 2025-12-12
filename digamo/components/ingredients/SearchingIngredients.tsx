"use client";

import { main } from "framer-motion/client";
import { SetStateAction, useState, useEffect } from "react";
import { db, auth } from "@/app/lib/firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
// import SearchIcon from "@mui/icons-material/Search";

interface PantryItem {
  id: string;
  name: string;
  quantity: string;
  expiry: any; // Firestore timestamp or string
  status: string;
}

type SearchingIngredientsProps = {
  onCancel: () => void;
  onConfirm: (selectedNames: string[]) => void;
  initialSelectedNames: string[];
};

export default function SearchingIngredients({
  onCancel,
  onConfirm,
  initialSelectedNames,
}: SearchingIngredientsProps) {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Get User ID
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  // 2. Fetch Data
  useEffect(() => {
    if (!userId) return;

    const fetchPantry = async () => {
      try {
        const q = query(
          collection(db, "users", userId, "pantry"),
          where("userId", "==", userId)
        );
        const snapshot = await getDocs(q);
        const fetchedItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as PantryItem[];
        
        setItems(fetchedItems);

        if (initialSelectedNames.length > 0) {
          const idsToSelect = new Set<string>();
          
          fetchedItems.forEach((item) => {
            // Case-insensitive match (e.g., "egg" matches "Egg")
            const isMatch = initialSelectedNames.some(
              (name) => name.toLowerCase().trim() === item.name.toLowerCase().trim()
            );
            if (isMatch) {
              idsToSelect.add(item.id);
            }
          });
          
          setSelectedIds(idsToSelect);
        }

      } catch (error) {
        console.error("Error fetching pantry:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPantry();
  }, [userId]);

  const handleCheckboxChange = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };
  
  const getStatusColor = (status: string) => {
    const s = (status || "").toLowerCase().replace(/_/g, "-");
    if (s === "fresh") return "bg-green-100 text-green-700";
    if (s === "use-soon") return "bg-yellow-100 text-yellow-700";
    if (s === "expiring-soon") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  const formatDate = (expiry: any) => {
    if (!expiry) return "No Date";
    if (expiry.toDate) return expiry.toDate().toLocaleDateString(); // Firestore Timestamp
    return new Date(expiry).toLocaleDateString(); // String
  };
  const handleConfirmClick = () => {
    const selectedNames = items
    .filter((item) => selectedIds.has(item.id))
    .map((item) => item.name);
    onConfirm(selectedNames);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex gap-4 flex-col w-full">
      {/* searchbar ni dri */}
      <input
        type="text"
        placeholder="Search ingredients..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-9 py-3 border-gold w-full rounded-lg dark:text-white border-2 focus:outline-none text-gray-90"
      />

      {/* ang ubos kay sa lista with title and checkbox */}
     <h1 className="font-semibold text-gray-700 dark:text-gray-300">
        Pantry Items &#40;{selectedIds.size}/{filteredItems.length}&#41;
      </h1>

      
      <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto pr-2">
        {loading ? (
          <div className="text-center py-4">Loading pantry...</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No items found.</div>
        ) : (
          filteredItems.map((item) => {
            const isChecked = selectedIds.has(item.id);
            return (
              <div
                key={item.id}
                onClick={() => handleCheckboxChange(item.id)} // Allow clicking anywhere on the card
                className={`py-3 px-4 bg-white dark:bg-black border-2 rounded-lg flex flex-row gap-4 justify-between items-center cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-900 ${
                  isChecked ? "border-amber-400 bg-amber-50/50" : "border-gray-200"
                }`}
              >
                {/* Left Side: Checkbox + Info */}
                <div className="flex flex-row gap-4 items-center flex-1">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="cursor-pointer w-5 h-5 text-amber-500 rounded focus:ring-amber-500"
                  />
                  
                  <div className="flex flex-col dark:text-white">
                    <label className="font-bold text-lg cursor-pointer">
                      {item.name}
                    </label>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>

                {/* Right Side: Date + Status */}
                <div className="flex flex-col items-end gap-2 text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Exp: {formatDate(item.expiry)}
                  </p>
                  <div
                    className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status || "Unknown"}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* buttons ang ubos for confirm and cancel */}
      <div className="right-0 px-9 flex flex-row gap-4 justify-end">
        <button
          className="text-orange border-2 border-gold px-3 rounded-sm cursor-pointer hover:text-orange/80"
          onClick={() => onCancel()}
        >
          Cancel
        </button>
        <button className=" bg-gold px-3 rounded-sm text-white cursor-pointer hover:bg-gold/80"
          onClick={handleConfirmClick}
          >
          Confirm
        </button>
      </div>
    </div>
  );
}
