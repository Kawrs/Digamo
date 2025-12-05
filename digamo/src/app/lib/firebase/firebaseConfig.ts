// src/app/lib/firebase/firebaseClient.ts
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || '',
};

// Only initialize Firebase on client-side and when config is available
let app: ReturnType<typeof initializeApp> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;
let analytics: ReturnType<typeof getAnalytics> | undefined;

const initFirebase = () => {
  // Skip initialization during SSR or build
  if (typeof window === 'undefined') return;
  
  // Check if required config exists
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
    // Don't throw during build - just return
    return;
  }

  try {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    
    isSupported().then(ok => { 
      if (ok && app) analytics = getAnalytics(app); 
    });
  } catch (error) {
    // Silently fail during build, log in development
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      console.error('Firebase initialization error:', error);
    }
  }
};

// Initialize on client-side only
if (typeof window !== 'undefined') {
  initFirebase();
}

// Export with null checks
export { app, auth, db, analytics };