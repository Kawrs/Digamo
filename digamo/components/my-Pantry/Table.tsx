import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface PantryItem {
  id: number;
  name: string;
  quantity: string;
  expiry: string;
  status: string;
  isIngredient: boolean;
}

interface PantryTableProps {
  onAdd?: React.Dispatch<React.SetStateAction<(() => void) | null>>;
}

export default function PantryTable({ onAdd }: PantryTableProps) {
  const [items, setItems] = useState<PantryItem[]>([
    {
      id: 1,
      name: "Chicken Breast",
      quantity: "600g",
      expiry: "10/20/2025",
      status: "use-soon",
      isIngredient: true,
    },
    {
      id: 2,
      name: "Rice",
      quantity: "2kg",
      expiry: "3/15/2026",
      status: "fresh",
      isIngredient: true,
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<PantryItem | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "ingredients">("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "fresh":
        return "bg-green-100 text-green-700";
      case "use-soon":
        return "bg-yellow-100 text-yellow-700";
      case "expiring-soon":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "fresh":
        return "Fresh";
      case "use-soon":
        return "Use Soon";
      case "expiring-soon":
        return "Expiring Soon";
      default:
        return status;
    }
  };

  const handleEdit = (item: PantryItem) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const handleSave = () => {
    if (!editForm) return;
    setItems(items.map((item) => (item.id === editingId ? editForm : item)));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleAddItem = () => {
    const newItem = {
      id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
      name: "New Item",
      quantity: "0",
      expiry: new Date().toLocaleDateString("en-US"),
      status: "fresh",
      isIngredient: activeTab === "ingredients",
    };
    setItems([...items, newItem]);
  };

  React.useEffect(() => {
    if (onAdd) {
      onAdd(() => handleAddItem);
    }
  }, [onAdd]);

  const filteredItems =
    activeTab === "all" ? items : items.filter((item) => item.isIngredient);

  const ingredientCount = items.filter((item) => item.isIngredient).length;

  return (
    <div className="w-full">
      <div className="w-max-full flex justify-center mb-6">
        <div className=" inline-flex bg-gray-100 rounded-lg p-1 ">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2 rounded-md transition-all  ${
              activeTab === "all"
                ? "bg-white text-gray-900 shadow-sm font-medium "
                : "text-gray-600 hover:text-gray-900 hover:cursor-pointer"
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setActiveTab("ingredients")}
            className={`px-6 py-2 rounded-md transition-all ${
              activeTab === "ingredients"
                ? "bg-white text-gray-900 shadow-sm font-medium"
                : "text-gray-600 hover:text-gray-900 hover:cursor-pointer"
            }`}
          >
            Ingredients ({ingredientCount})
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-white border-b border-gray-200">
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
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                {editingId === item.id ? (
                  <>
                    <td className="py-4 px-6">
                      <input
                        type="text"
                        value={editForm?.name || ""}
                        onChange={(e) =>
                          editForm &&
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <input
                        type="text"
                        value={editForm?.quantity || ""}
                        onChange={(e) =>
                          editForm &&
                          setEditForm({ ...editForm, quantity: e.target.value })
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <input
                        type="text"
                        value={editForm?.expiry || ""}
                        onChange={(e) =>
                          editForm &&
                          setEditForm({ ...editForm, expiry: e.target.value })
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={editForm?.status || "fresh"}
                        onChange={(e) =>
                          editForm &&
                          setEditForm({ ...editForm, status: e.target.value })
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      >
                        <option value="fresh">Fresh</option>
                        <option value="use-soon">Use Soon</option>
                        <option value="expiring-soon">Expiring Soon</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={handleSave}
                        className="text-green-600 hover:text-green-700 font-medium mr-3"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
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
                    <td className="py-4 px-6 text-gray-600">{item.quantity}</td>
                    <td className="py-4 px-6 text-gray-600">{item.expiry}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          item.status
                        )}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {getStatusText(item.status)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-gray-600 hover:text-blue-600 transition mr-3 hover:cursor-pointer"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-gray-600 hover:text-red-600 transition hover:cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
