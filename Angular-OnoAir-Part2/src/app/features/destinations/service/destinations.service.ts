import { Injectable } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, setDoc, collectionData, getDocs } from '@angular/fire/firestore';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Destination, Status } from '../model/destination';
import { destinationConverter } from '../model/destination-converter';
import { ManageDestinationsComponent } from '../pages/manage-destinations/manage-destinations.component';
@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  private collectionName = 'destinations';
  private destinationsSubject = new BehaviorSubject<Destination[]>([]);
  destinations$ = this.destinationsSubject.asObservable();

  constructor(private firestore: Firestore) {
    this.loadDestinations();
  }

  public async loadDestinations(): Promise<void> {
    const destinations = await this.refreshDestinations(); // Fetch destinations directly
    this.destinationsSubject.next(destinations); // Update the BehaviorSubject
  }

  async addDestination(newDestination: Destination): Promise<void> {
    const destinationsCollection = collection(this.firestore, this.collectionName);
  
    const querySnapshot = await getDocs(destinationsCollection);
    const ids = querySnapshot.docs.map(doc => parseInt(doc.id)).filter(id => !isNaN(id));
  
    const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
  
    const destinationDoc = doc(this.firestore, this.collectionName, nextId.toString());
    await setDoc(destinationDoc, { ...newDestination, id: nextId.toString() });
  
    console.log(`Destination added with ID: ${nextId}`);
  }

  async removeDestination(id: string): Promise<void> {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    await deleteDoc(docRef);
  }

  async updateDestination(id: string, updatedDestination: Destination): Promise<void> {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`).withConverter(destinationConverter);
    await setDoc(docRef, updatedDestination);
  }

  async createUniqueId(): Promise<string> {
    const collectionRef = collection(this.firestore, this.collectionName);
    const snapshot = await getDocs(collectionRef);
    const ids = snapshot.docs.map((doc) => parseInt(doc.id, 10));
    const maxId = Math.max(...ids, 0);
    return (maxId + 1).toString();
  }

  async getDestinationById(id: string): Promise<Destination | undefined> {
    const collectionRef = collection(this.firestore, this.collectionName).withConverter(destinationConverter);
    const querySnapshot = await getDocs(collectionRef);
  
    const destinationDoc = querySnapshot.docs.find((doc) => doc.id === id);
    if (destinationDoc) {
      return destinationDoc.data();
    } else {
      console.error(`Destination with ID ${id} not found.`);
      return undefined;
    }
  }
  
  
  getDestinationByNameOrCode(nameOrCode: string): Observable<Destination | undefined> {
    const normalizedInput = nameOrCode.trim().toLowerCase();
  
    return this.destinations$.pipe(
      map(destinations =>
        destinations.find(destination =>
          destination.name.trim().toLowerCase() === normalizedInput ||
          destination.code.trim().toLowerCase() === normalizedInput
        )
      )
    );
  }
  
  getDestinationByName(name: string): Destination | undefined {
    const destinations = this.destinationsSubject.getValue(); // Get the current value of destinations
    return destinations.find(destination => destination.name === name);
  }
  
  listDestinationNames(): string[] {
    const destinations = this.destinationsSubject.getValue(); // Get the current value of destinations
    return destinations.map(destination => destination.name);
  }
  
  getDestinationImage(nameOrCode: string): Observable<string> {
    return this.getDestinationByNameOrCode(nameOrCode).pipe(
      map(destination => {
        if (destination) {
          return destination.imageUrl;
        } else {
          return ''; // Return an empty string if no destination is found
        } 
    }));
  }
   
  getDestinationStatus(code: string): Status {
    const destinations = this.destinationsSubject.getValue(); // Get the current value of destinations
    const destination = destinations.find(d => d.code.toLowerCase() === code.toLowerCase());
    return destination ? destination.status : Status.Active;
  }
  async refreshDestinations(): Promise<Destination[]> {
    const collectionRef = collection(this.firestore, this.collectionName).withConverter(destinationConverter);
    const querySnapshot = await getDocs(collectionRef);
    
    return querySnapshot.docs
      .map((doc) => doc.data())
      .sort((a, b) => parseInt(a.id) - parseInt(b.id)); // Sort by numeric ID
  }
  async getLastAddedDestination(): Promise<Destination | undefined> {
    try {
      const collectionRef = collection(this.firestore, this.collectionName).withConverter(destinationConverter);
      const querySnapshot = await getDocs(collectionRef);
  
      // Find the destination with the highest numeric ID
      const destinations = querySnapshot.docs.map((doc) => doc.data());
      if (destinations.length === 0) {
        console.log('No destinations found.');
        return undefined;
      }
  
      const lastDestination = destinations.reduce((prev, current) => {
        return parseInt(prev.id, 10) > parseInt(current.id, 10) ? prev : current;
      });
  
      return lastDestination;
    } catch (error) {
      console.error('Error fetching the last added destination:', error);
      return undefined;
    }
  }
  
}