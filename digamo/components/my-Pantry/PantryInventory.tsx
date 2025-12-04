"use client";

import React, { useState } from "react";
import Table from "./Table";
import styles from "./PantryInventory.module.css";

export default function PantryInventory() {
  const [addItemFunction, setAddItemFunction] = useState<(() => void) | null>(
    null
  );

  const handleAddClick = () => {
    if (addItemFunction) {
      addItemFunction();
    }
  };

  return (
    <div className="w-full px-3 flex justify-center ">
      <div className="max-w-7xl h-435 w-full overflow-hidden">
        <div className={styles.bigCard}>
          <div>
            <p className={styles.titleSection}>Pantry Inventory </p>
            <p className={styles.description}>
              Manage your ingredients and condiments with expiry tracking
            </p>
          </div>
          <nav className="absolute top-4 right-4 hidden md:flex items-center">
            <button className="profile cursor-pointer">
              <div className="rounded-lg bg-white w-40 h-10 border border-gray-200 mr-2 flex items-center justify-center">
                <p className="text-lg text-gray-800 font-medium">Condiments</p>
              </div>
            </button>
            <button className="profile cursor-pointer" onClick={handleAddClick}>
              <div className="rounded-lg bg-[#030213] w-32 h-10 flex items-center justify-center">
                <p className="text-lg text-white font-medium">Add Item</p>
              </div>
            </button>
          </nav>
          <div>
            <Table onAdd={setAddItemFunction} />
          </div>
        </div>
      </div>
    </div>
  );
}
