import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyBgRhH5mXbwX0JA5dehgzIhoriahr69Qbw",
      authDomain: "frontedcourse-onoair.firebaseapp.com",
      projectId: "frontedcourse-onoair",
      storageBucket: "frontedcourse-onoair.firebasestorage.app",
      messagingSenderId: "1021529028497",
      appId: "1:1021529028497:web:b014bcec3df2e57a5e0c30",
      measurementId: "G-C70RQXQGP9"
    })),
  ]
};