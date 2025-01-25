import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideNativeDateAdapter } from '@angular/material/core';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyBh8F1KMuCVlJouYFLPZJclI2QVyV1c2jM",
      authDomain: "onoair-3a09d.firebaseapp.com",
      projectId: "onoair-3a09d",
      storageBucket: "onoair-3a09d.firebasestorage.app",
      messagingSenderId: "242311591205",
      appId: "1:242311591205:web:c316ee6e1f626b250dd6cc",
      measurementId: "G-3WJG27X55P"
    })),
  ]
};