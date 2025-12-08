//all imports ref for DB INTEGRATION  - mypantry - will have to check if can go with page.tsx / separated for better checking of error 
import { updatePantryItemQuantity, calculateExpiryStatus } from "./utils";
import {db} from "@/app/lib/firebase/firebaseConfig";
import{collection, getDocs,doc, addDoc, updateDoc, deleteDoc, query, serverTimestamp} from "firebase/firestore";
import{PantryItem, ExpiryStatus, PantryCategory} from "../../../types/gemini";

const FALLBACK_DATE = new Date('2099-12-31'); // used when no expiry date selected 

const DEFAULT_CATEGORY: PantryCategory =  PantryCategory.INGREDIENT; // default as ingredient -- will check as user dont have a choice to choose category -- for changes or improvements later 
//reference for pantry_item subcollection

const getpantryitemCollectionRef = (userId: string) => {
    
    if(!db)
    {
        throw new Error("Firebase not initializ");
    }
    // deployyy
    //firebase collection pantry-pantry_item thru userId doc
    return collection(db, "pantry", userId, "pantry_item");
}

//fetch the pantry_items under each user's pantry
export const fetchpantryItem = async(userId:string): Promise<PantryItem[] > => {

    try{

    const pantryReference = getpantryitemCollectionRef(userId);
    const q = query(pantryReference);
    const snapshot = await getDocs(q);

    return snapshot.docs.map(mapDocToPantryItem);
    }
    catch(error)
    {
        console.error("Error fetching pantry items", error);
        return[];
    }
}


const mapDocToPantryItem = (document: any): PantryItem =>{
    const data = document.data();
    //TIMESTAMP
    const expiryDateValue: Date = data.expiryDate  ? data.expiryDate.toDate() : FALLBACK_DATE;

    const expiryStatus: ExpiryStatus = calculateExpiryStatus(expiryDateValue);


    return{
        id: document.id,
        name: data.name,
        quantity: data.quantity,
        expiryDate: expiryDateValue,
        category:  DEFAULT_CATEGORY,
        expiryStatus: expiryStatus,

    } as PantryItem; //pantryitemdetails 
}

//CRUD OPERATIONS

/* Add a new item */
export const addPantryItem = async (userId: string, item: Omit<PantryItem, "id" | "category">  ): Promise<PantryItem> => {
    try {
        //declaeration-
        const pantryRef = getpantryitemCollectionRef(userId); 
        
        const dateToStore: Date = item.expiryDate || FALLBACK_DATE;
        const categoryToStore: PantryCategory = DEFAULT_CATEGORY; 
        
        //calculation
        const expiryStatusCalculated: ExpiryStatus = calculateExpiryStatus(dateToStore);

        // being written or added to db 
        const itemData = { 
            // user input (name, quantity, expiryDate, expiryStatus)
            ...item, 
            
            
            category: categoryToStore,
            expiryDate: dateToStore,
            
            
            expiryStatus: expiryStatusCalculated, 
            
           
            expiryStatusUser: item.expiryStatus, 
            
            createdAt: serverTimestamp(),
        }; 

        //adding item to write na
        const docRef = await addDoc(pantryRef, itemData); 
        
        
        return { 
            ...item, 
            id: docRef.id, 
            category: categoryToStore,
            expiryDate: dateToStore,
            expiryStatus: expiryStatusCalculated 
        } as PantryItem;
        
    } catch(error) {
        console.error("Unable to add item. Please try again", error);
        throw error;
    }
}

// update an item
export const updatePantryItem = async (userId: string, item: PantryItem): Promise<void> => {
    try {
        if (!db) throw new Error("Firestore not initialized.");
        
        const docRef = doc(db, "pantry", userId, "pantry_item", item.id );
        
        //calculated staus based on expiry
        const calculatedStatus = calculateExpiryStatus(item.expiryDate);

        const updateData = {
            name: item.name, 
            quantity: item.quantity, 
            expiryDate: item.expiryDate,
            category: item.category,
            
            //automatic referecing utils
            expiryStatus: calculatedStatus, 
        };

        await updateDoc(docRef, updateData);
    } catch (error) {
        console.error(`Error updating item ${item.id}:`, error);
        throw error; 
    }
};

//delete and item
export const deletePantryItem = async (
    userId: string, 
    id: string //id of item idelete ref
): Promise<void> => {
    try {
        if (!db) {
            throw new Error("Firestore not initialized.");
        }
        
        // Build the specific document reference - will have to check FB 
        const docRef = doc(db,  "pantry", userId,  "pantry_item", id );
        await deleteDoc(docRef);
    } catch (error) {
        console.error(`Error deleting pantry item ${id}:`, error);
        throw error; 
    }
};


