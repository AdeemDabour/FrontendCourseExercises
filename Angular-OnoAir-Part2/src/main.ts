import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: "AIzaSyBgRhH5mXbwX0JA5dehgzIhoriahr69Qbw",
        authDomain: "frontedcourse-onoair.firebaseapp.com",
        projectId: "frontedcourse-onoair",
        storageBucket: "frontedcourse-onoair.firebasestorage.app",
        messagingSenderId: "1021529028497",
        appId: "1:1021529028497:web:b014bcec3df2e57a5e0c30",
        measurementId: "G-C70RQXQGP9"
      })
    ), // Initialize Firebase with configuration
    provideFirestore(() => getFirestore()), // Initialize Firestore
    provideRouter(routes),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));