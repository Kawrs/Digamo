"use client";
import React from "react";
import HeaderHome from "components/home-page/HeaderHome";
import Tab from "components/my-Pantry/Tab";
import Card from "components/my-Pantry/Card";
import PantryInventory from "components/my-Pantry/PantryInventory";

type PantryItem = {
  id: string;
  name: string;
  qty?: string;
  note?: string;
};

export default function MyPantryPage() {
  const [items, setItems] = React.useState<PantryItem[]>([
    { id: "1", name: "Tomatoes", qty: "4" },
    { id: "2", name: "Onion", qty: "2" },
    { id: "3", name: "Eggs", qty: "12" },
  ]);
  const [query, setQuery] = React.useState("");
  const [name, setName] = React.useState("");
  const [qty, setQty] = React.useState("");

  function addItem(e?: React.FormEvent) {
    e?.preventDefault();
    if (!name.trim()) return;
    setItems((s) => [
      {
        id: String(Date.now()),
        name: name.trim(),
        qty: qty.trim() || undefined,
      },
      ...s,
    ]);
    setName("");
    setQty("");
  }

  function removeItem(id: string) {
    setItems((s) => s.filter((it) => it.id !== id));
  }

  const filtered = items.filter((it) =>
    it.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen w-screen flex flex-col overflow-x-hidden relative bg-gradient-to-l from-[#f5db83] to-[#B8D4C8] bg-homepage-bg bg-cover bg-center bg-no-repeat">
      <HeaderHome />
      {/* 
      <div className="w-full px-8 py-6 flex justify-center">
        <Tab />
      </div> */}

      <div className="w-full px-6 flex justify-center mt-25">
        <div className="max-w-7xl w-full grid grid-cols-3 gap-6 mb-5">
          <Card title="7" subtitle="Total Items" description="" />
          <Card title="5" subtitle="Ingredients" description="" />
          <Card title="1" subtitle="Expiring Soon" description="" />
        </div>
      </div>
      <PantryInventory />
    </div>
  );
}
