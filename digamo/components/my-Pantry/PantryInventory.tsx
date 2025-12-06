"use client";
import React, { useState, useEffect } from "react";
import Table from "./Table";
import styles from "./PantryInventory.module.css";
import { Plus, Sparkles } from "lucide-react";

//definitions -- page
type PantryItem = {
    id: string;
    name: string;
    qty?: string;
    expiryDate?: string;
    status: 'Fresh' | 'Use Soon' | 'Expiring Soon';
    timestamp?: any;
    category?: string; // NEW FIELD
};

// Component must accept all C.R.U.D. props from MyPantryPage
export default function PantryInventory({ items, removeItem, updateItem, addItem, newItemIdToEdit }: {
    items: PantryItem[],
    removeItem: (id: string) => Promise<void>,
    updateItem: (id: string, name: string, qty: string, expiryDate: string, status: string) => Promise<void>,
    addItem: () => Promise<void>,
    newItemIdToEdit: string | null
}) {
    // --- Inline Editing State and Handlers ---
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState('');
    const [editQty, setEditQty] = useState('');
    const [editExpiryDate, setEditExpiryDate] = useState(''); 
    const [editStatus, setEditStatus] = useState<'Fresh' | 'Use Soon' | 'Expiring Soon'>('Fresh');
    

    // Effect to automatically start editing the new item when it appears in the list
    useEffect(() => {
        if (newItemIdToEdit && newItemIdToEdit !== editingId) {
            const newItem = items.find(item => item.id === newItemIdToEdit);
            if (newItem) {
                handleEditClick(newItem);
            }
        }
    }, [newItemIdToEdit, items]); 

    const handleEditClick = (item: PantryItem) => {
        setEditingId(item.id);
        setEditName(item.name);
        setEditQty(item.qty || '');
        setEditExpiryDate(item.expiryDate || '');
        setEditStatus(item.status || 'Fresh');
        
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editName.trim() || !editingId) return;
        
        await updateItem(editingId, editName, editQty, editExpiryDate, editStatus);
        setEditingId(null); 
    };

    const handleCancel = () => {
        if (editingId) {
            const item = items.find(i => i.id === editingId);
            if (item && item.name === 'New Item') { 
                removeItem(editingId); 
            }
        }
        setEditingId(null);
    };
    
    const getStatusClasses = (status: 'Fresh' | 'Use Soon' | 'Expiring Soon') => {
        switch (status) {
            case 'Expiring Soon': return 'bg-red-100 text-red-700 border-red-300';
            case 'Use Soon': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            default: return 'bg-green-100 text-green-700 border-green-300';
        }
    };
    
    const getStatusText = (status: string) => {
        // Translate internal status codes to display text matching the Digamo style
        switch (status) {
            case 'Stocked': return 'Fresh';
            case 'Low': return 'Use Soon';
            case 'Expired': return 'Expiring';
            default: return status;
        }
    };


    // Dedicated handler for type-safe status update
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEditStatus(e.target.value as 'Fresh' | 'Use Soon' | 'Expiring Soon');
    };
    // --- End of Inline Editing Logic ---


    return (
        <div className="w-full px-6 flex justify-center pb-12">
            {/* Main Card Container */}
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-6 space-y-4 border border-gray-200 relative" style={{boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '14px'}}>
                
                {/* Header Section (Replicating Digamo style) */}
                <div className="flex justify-between items-center py-2">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Pantry Inventory</h2>
                        <p className="text-sm text-gray-500">Manage your ingredients and condiments with expiry tracking</p>
                    </div>
                    
                    {/* Navigation Buttons */}
                    <nav className="flex items-center space-x-2">
                         {/* Condiments Button (Matches Add Item style, just different color) */}
                        <button className="rounded-lg h-10 border border-gray-200 flex items-center justify-center gap-2 text-gray-800 font-medium text-sm transition hover:bg-gray-50 active:scale-95 px-3 shadow-sm">
                            {/* Sparkles Icon SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2a1 1 0 01.993.843l.794 3.97L16.29 8.23a1 1 0 01.353 1.053l-.994 4.97a1 1 0 01-1.053.848L10 16.993l-4.796.71a1 1 0 01-1.053-.848l-.994-4.97a1 1 0 01.353-1.053l4.503-3.417.794-3.97A1 1 0 0110 2z" />
                            </svg>
                            Condiments
                        </button>
                        
                        {/* Add Row Button */}
                        <button 
                            className="rounded-lg h-10 flex items-center justify-center gap-2 font-medium text-sm transition duration-150 active:scale-95 bg-indigo-600 text-white hover:bg-indigo-700 shadow-md px-3"
                            onClick={addItem}
                        >
                            {/* Plus Icon SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                            Add Row
                        </button>
                    </nav>
                </div>
                
                {/* Inventory Table/List (Replicating Digamo Table structure) */}
                <div className="bg-white rounded-xl overflow-hidden mt-4 border border-gray-200">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr className="text-left text-sm font-semibold text-gray-700">
                                <th className="py-3 px-4 w-1/5">Item Name</th>
                                <th className="py-3 px-4 w-[15%]">Quantity</th>
                                
                                <th className="py-3 px-4 w-1/5">Expiry Date</th>
                                <th className="py-3 px-4 w-1/5">Status</th>
                                <th className="py-3 px-4 w-[15%] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {items.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50 transition">
                                    {editingId === item.id ? (
                                        // Edit View (Inline Form)
                                        <td colSpan={6} className="p-0">
                                            <form onSubmit={handleSave} className="grid grid-cols-12 items-center w-full p-2 space-x-1">
                                                {/* Name (3 cols) */}
                                                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="col-span-3 p-1 border rounded text-sm focus:ring-indigo-500" required />
                                                {/* Qty (1 col) */}
                                                <input type="text" value={editQty} onChange={(e) => setEditQty(e.target.value)} className="col-span-1 p-1 border rounded text-sm" />
                                                {/* Category (2 cols) */}
                                               
                                                {/* Expiry Date (3 cols) */}
                                                <input type="date" value={editExpiryDate} onChange={(e) => setEditExpiryDate(e.target.value)} className="col-span-3 p-1 border rounded text-sm" />
                                                {/* Status (2 cols) */}
                                                <select 
                                                    value={editStatus} 
                                                    onChange={handleStatusChange} 
                                                    className={`col-span-2 p-1 border rounded text-sm appearance-none ${getStatusClasses(editStatus)}`}
                                                >
                                                    <option value="Stocked">Fresh</option>
                                                    <option value="Low">Use Soon</option>
                                                    <option value="Expired">Expiring Soon</option>
                                                </select>
                                                {/* Actions (1 col) */}
                                                <div className="col-span-1 flex justify-end space-x-1 pl-2">
                                                    <button type="submit" className="text-green-600 hover:text-green-800 p-1 transition" title="Save">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                                    </button>
                                                    <button type="button" onClick={handleCancel} className="text-gray-500 hover:text-gray-700 p-1 transition" title="Cancel">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                                    </button>
                                                </div>
                                            </form>
                                        </td>
                                    ) : (
                                        // Read-Only View - Match Digamo Table Style
                                        <>
                                            <td className="py-3 px-4 font-medium text-gray-900">{item.name}</td>
                                            <td className="py-3 px-4 text-gray-600">{item.qty || '-'}</td>
                                            <td className="py-3 px-4 text-gray-600">{item.category || 'N/A'}</td>
                                            <td className="py-3 px-4 text-gray-600">{item.expiryDate || '-'}</td>
                                            <td className="py-3 px-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(item.status)}`}>
                                                    {getStatusText(item.status)}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-right flex justify-end space-x-1">
                                                <button onClick={() => handleEditClick(item)} className="text-gray-400 hover:text-indigo-600 p-1 transition" title="Edit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-1.414 4.318l-.707.707L10.382 10.38l-.707.707-4.12 4.12a2 2 0 00-.586 1.414V17a1 1 0 001 1h.707a2 2 0 001.414-.586l4.12-4.12.707-.707 1.414-1.414.707-.707 1.414-1.414.707-.707z" /></svg>
                                                </button>
                                                <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-600 p-1 transition" title="Delete">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 112 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
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
        </div>
    );
};