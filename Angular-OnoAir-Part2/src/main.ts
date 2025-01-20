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
        apiKey: "AIzaSyBh8F1KMuCVlJouYFLPZJclI2QVyV1c2jM",
        authDomain: "onoair-3a09d.firebaseapp.com",
        projectId: "onoair-3a09d",
        storageBucket: "onoair-3a09d.firebasestorage.app",
        messagingSenderId: "242311591205",
        appId: "1:242311591205:web:c316ee6e1f626b250dd6cc",
        measurementId: "G-3WJG27X55P"
      })
    ), // Initialize Firebase with configuration
    provideFirestore(() => getFirestore()), // Initialize Firestore
    provideRouter(routes),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));