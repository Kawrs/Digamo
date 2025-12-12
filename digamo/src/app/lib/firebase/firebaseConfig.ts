// lib/firebase/firebaseConfig.ts
import { getApp, getApps, initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || '',
};

// After the firebaseConfig object
console.log('=== Firebase Config Check ===');
console.log('API Key exists:', !!firebaseConfig.apiKey);
console.log('Auth Domain:', firebaseConfig.authDomain);
console.log('Project ID:', firebaseConfig.projectId);
console.log('App ID exists:', !!firebaseConfig.appId);

// Initialize Firebase app with explicit type
let app: FirebaseApp;
try {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
} catch (error) {
  console.error('Firebase initialization error:', error);
  // Fallback: try to initialize with a new app
  app = initializeApp(firebaseConfig);
}

// Initialize and export auth (always available, not nullable)
export const auth: Auth = getAuth(app);

// Initialize and export firestore (always available, not nullable)
export const db: Firestore = getFirestore(app);

// Analytics (optional, only in browser)
let analytics: Analytics | undefined;
if (typeof window !== 'undefined') {
  isSupported().then(ok => {
    if (ok) {
      analytics = getAnalytics(app);
    }
  }).catch(err => {
    console.error('Analytics initialization error:', err);
  });
}

export { app, analytics };