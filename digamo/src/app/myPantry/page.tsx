"use client";
import React, { useState, useEffect, useMemo } from "react";
import HeaderHome from "components/home-page/HeaderHome";
import { useRouter } from 'next/navigation';
import Table from "components/my-Pantry/Table";
import Card from "components/my-Pantry/Card";
import PantryInventory from "components/my-Pantry/PantryInventory";

import { Auth, User, signOut, onAuthStateChanged, signInWithCustomToken } from "firebase/auth";
import {addDoc, updateDoc, deleteDoc, doc, collection, serverTimestamp, onSnapshot, setLogLevel, getDoc, setDoc, Firestore, CollectionReference, DocumentData} from "firebase/firestore"; 
import{db, auth} from "@app/lib/firebase/firebaseConfig";

//
declare global {
    const __app_id: string;
    const __initial_auth_token: string;
}


// Definitions ---
type PantryItem = {
    id: string;
    name: string;
    qty?: string;
    expiryDate?: string; 
    status: 'Fresh' | 'Use Soon' | 'Expiring Soon';
    timestamp?: any;
};

const GLOBAL_APP_ID = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const GLOBAL_USER_COLLECTION_PATH = `inventory/${GLOBAL_APP_ID}/public/data/user_profiles`;


// --- Main Page Component (Data Controller) ---
export default function MyPantryPage() {
    // State Initialization
    const [items, setItems] = useState<PantryItem[]>([]);
    const [username, setUsername] = useState<string | null>(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [userId, setUserId] = useState<string | null>(null); 
    const [error, setError] = useState('');
    const [newItemIdToEdit, setNewItemIdToEdit] = useState<string | null>(null); 
    
    // Global Constants
    const appId = useMemo(() => GLOBAL_APP_ID, []);
    const userCollectionPath = useMemo(() => GLOBAL_USER_COLLECTION_PATH, []);


    // --- Auth & Firestore Initialization and State Management ---
    useEffect(() => {
        if (!auth || !db) {
            setError("Firebase services are not initialized. Check @app/lib/firebase/firebaseConfig.");
            setIsAuthReady(true);
            return;
        }
        
        setLogLevel('debug');
        let authUnsubscribe;

        const handleAuth = async (user: User | null) => {
            if (user) {
                const currentUserId = user.uid;
                setUserId(currentUserId); 
                
                // 1. Fetch/Create Username Profile
                const userDocRef = doc(db as Firestore, userCollectionPath, currentUserId);
                const userDoc = await getDoc(userDocRef); 

                if (userDoc.exists()) {
                    setUsername(userDoc.data().username);
                } else {
                    const defaultUsername = `Guest_${currentUserId.substring(0, 6)}`;
                    await setDoc(userDocRef, { username: defaultUsername, uid: currentUserId, createdAt: serverTimestamp() });
                    setUsername(defaultUsername);
                }
            } else {
                // 2. Auto-Sign In 
                try {
                    const initialToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
                    if (initialToken) {
                        await signInWithCustomToken(auth as Auth, initialToken);
                    } else {
                      ;
                    }
                } catch (e) {
                    console.error("Auto sign-in error:", e);
                    setError('Authentication failed during login attempt.');
                }
            }
            setIsAuthReady(true);
        };

        authUnsubscribe = onAuthStateChanged(auth as Auth, handleAuth);

        return () => {
            if (authUnsubscribe) authUnsubscribe();
        };
    }, [auth, db, userCollectionPath]);


    // --- Real-time Data Fetching (Read Operation) ---
    useEffect(() => {
        if (!isAuthReady || !db || !userId) {
            setItems([]); 
            return;
        }

        const collectionRef = collection(db as Firestore, `inventory/${appId}/users/${userId}/pantry_items`);
        
        const unsubscribe = onSnapshot(collectionRef as CollectionReference<PantryItem>, (snapshot) => {
            const newItems: PantryItem[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data() as PantryItem;
                // FIX for Error 2783 (ID Overwrite): Extract 'id' first
                const { id: _, ...restOfData } = data; 
                newItems.push({ id: doc.id, ...restOfData, status: data.status || 'Fresh' });
            });

            newItems.sort((a, b) => {
                const timeA = a.timestamp?.seconds || 0;
                const timeB = b.timestamp?.seconds || 0;
                return timeB - timeA;
            });

            setItems(newItems);
        }, (e) => {
            console.error("Firestore Snapshot Error:", e);
            setError('Could not fetch real-time data. Check security rules.');
        });

        return () => unsubscribe();
    }, [isAuthReady, db, userId, appId]);


    // --- CRUD Handlers ---
    const handleSignOut = async () => {
        if (auth) {
            try {
                await signOut(auth as Auth);
                setUserId(null);
                setUsername(null);
                setItems([]);
                setError('');
                setNewItemIdToEdit(null);
            } catch (e) {
                console.error("Sign Out Error:", e);
                setError('Failed to sign out.');
            }
        }
    };

    // Create Operation
    const addItem = async () => {
        if (!db || !userId) {
            setError('Database not ready.');
            return;
        }
        
        const collectionRef = collection(db as Firestore, `inventory/${appId}/users/${userId}/pantry_items`);
        const newItem: Omit<PantryItem, 'id'> = { name: 'New Item', qty: '', expiryDate: '', status: 'Fresh', timestamp: serverTimestamp() };

        try {
            const docRef = await addDoc(collectionRef as CollectionReference<DocumentData>, newItem as DocumentData);
            setNewItemIdToEdit(docRef.id);
        } catch (e) {
            console.error("Error adding placeholder document: ", e);
            setError('Failed to add new row. Check security rules.');
        }
    };
    
    // Update Operation
    const updateItem = async (id: string, newName: string, newQty: string, newExpiryDate: string, newStatus: string) => {
        if (!newName.trim() || !db || !userId) {
            if (!db || !userId) setError('Database not ready.');
            return;
        }
        
        try {
            const docRef = doc(db as Firestore, `inventory/${appId}/users/${userId}/pantry_items`, id);
            await updateDoc(docRef, { name: newName.trim(), qty: newQty.trim() || undefined, expiryDate: newExpiryDate.trim() || undefined, status: newStatus });
            if (id === newItemIdToEdit) setNewItemIdToEdit(null); 
        } catch (e) {
            console.error("Error updating document: ", e);
            setError('Failed to update item. Check security rules.');
        }
    };

    // Delete Operation
    const removeItem = async (id: string) => {
        if (!db || !userId) {
            setError('Database not ready.');
            return;
        }
        
        try {
            const docRef = doc(db as Firestore, `inventory/${appId}/users/${userId}/pantry_items`, id);
            await deleteDoc(docRef);
            if (id === newItemIdToEdit) setNewItemIdToEdit(null); 
        } catch (e) {
            console.error("Error removing document: ", e);
            setError('Failed to remove item. Check security rules.');
        }
    };
    
    // --- Stats Calculation ---
    const stats = useMemo(() => {
        const total = items.length;
        const expiring = items.length > 0 ? Math.max(1, Math.floor(items.length * 0.1)) : 0; 
        return { total, expiring };
    }, [items]);


    // --- Render UI ---
    return (
        <div className="min-h-screen w-screen flex flex-col overflow-x-hidden relative bg-gray-100 font-inter">
            {/* Type assertion applied here to satisfy strict prop checking against IntrinsicAttributes */}
            <HeaderHome 
                {...{ username: username, handleSignOut: handleSignOut } as any} 
            />

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg m-4 max-w-7xl mx-auto w-full shadow-md" role="alert">
                    <p className="font-bold">Application Error</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {isAuthReady && userId ? (
                <>
                    <div className="w-full px-6 flex justify-center mt-8">
                    <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                        <Card title={String(stats.total)} subtitle="Total Inventory" description="" />
                        <Card title={String(stats.total)} subtitle="Current Inventory" description="" />
                        <Card title={String(stats.expiring)} subtitle="Expiring Soon" description="" />
                    </div>
                    </div>
                    
                    <PantryInventory
                        items={items}
                        removeItem={removeItem}
                        updateItem={updateItem}
                        addItem={addItem}
                        newItemIdToEdit={newItemIdToEdit}
                    />
                </>
            ) : (
                <div className="text-center p-20 text-gray-500 text-xl flex flex-col items-center justify-center">
                    <svg className="animate-spin h-8 w-8 text-indigo-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    {error ? "Authentication required, see error details above." : "Loading Application and Authenticating..."}
                </div>
            )}
            
            <footer className="mt-12 p-4 text-center text-sm text-gray-500">
                Powered by React, Next.js, and Google Firestore.
            </footer>
        </div>
    );
}