import { Injectable } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, setDoc, getDocs, collectionData } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Flight, Status } from '../model/flight';
import { FlightConverter } from '../model/flight-converter';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private collectionName = 'flights';
  private flightsSubject = new BehaviorSubject<Flight[]>([]);
  flights$ = this.flightsSubject.asObservable();

  constructor(private firestore: Firestore) {
    this.loadFlights();
  }

  private getFlightsCollection() {
    return collection(this.firestore, this.collectionName).withConverter(FlightConverter);
  }

  async loadFlights(): Promise<void> {
  try {
    const flights = await this.refreshFlights();
    this.flightsSubject.next([]); // Clear existing data
    this.flightsSubject.next(flights); // Replace with fresh data
  } catch (error) {
    console.error('Error loading flights:', error);
  }
}


  async addFlight(newFlight: Flight): Promise<void> {
    try {
      const flightsCollection = collection(this.firestore, this.collectionName);
  
    const querySnapshot = await getDocs(flightsCollection);
    const ids = querySnapshot.docs.map(doc => parseInt(doc.id)).filter(id => !isNaN(id));
  
    const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
  
    const flightDoc = doc(this.firestore, this.collectionName, nextId.toString());
    await setDoc(flightDoc, { ...newFlight, id: nextId.toString() });
  
    console.log(`Flight: ${newFlight.flightNo} added with ID: ${nextId}`);
    } catch (error) {
      console.error('Error adding flight:', error);
    }
  }

  async removeFlight(flightId: string): Promise<void> {
    try {
      const docRef = doc(this.getFlightsCollection(), flightId);
      await deleteDoc(docRef);
      console.log(`Flight ${flightId} removed successfully`);
      await this.loadFlights();
    } catch (error) {
      console.error('Error removing flight:', error);
    }
  }

  async updateFlight(flightId: string, updatedFlight: Flight): Promise<void> {
    try {
      const docRef = doc(this.getFlightsCollection(), flightId);
      await setDoc(docRef, updatedFlight);
      console.log(`Flight ${updatedFlight.flightNo} updated successfully`);
    } catch (error) {
      console.error('Error updating flight:', error);
    }
  }

  async createUniqueId(): Promise<string> {
    try {
      const collectionRef = this.getFlightsCollection();
      const snapshot = await getDocs(collectionRef);
      const ids = snapshot.docs.map((doc) => parseInt(doc.id, 10));
      const maxId = Math.max(...ids, 0);
      return (maxId + 1).toString();
    } catch (error) {
      console.error('Error generating unique ID:', error);
      throw error;
    }
  }

  getFlightById(flightId: string): Flight | undefined {
    const flights = this.flightsSubject.getValue();
    return flights.find((flight) => flight.id === flightId);
  }

  getFlightByNumber(flightNo: string): Observable<Flight | undefined> {
    const normalizedInput = flightNo.trim().toLowerCase();
    return this.flights$.pipe(
      map((flights) =>
        flights.find((flight) => flight.flightNo.trim().toLowerCase() === normalizedInput)
      )
    );
  }

  listFlightNames(): string[] {
    const flights = this.flightsSubject.getValue();
    return flights.map((flight) => flight.flightNo);
  }

  getFlightStatus(flightNo: string): Status {
    const flights = this.flightsSubject.getValue();
    const flight = flights.find((flight) => flight.flightNo === flightNo);
    return flight ? flight.status : Status.Active;
  }

  async refreshFlights(): Promise<Flight[]> {
    try {
      const collectionRef = this.getFlightsCollection();
      const querySnapshot = await getDocs(collectionRef);
  
      // Fetch flights and update BehaviorSubject
      const flights = querySnapshot.docs.map((doc) => doc.data());
      this.flightsSubject.next(flights); // Update with fresh data
      return flights;
    } catch (error) {
      console.error('Error refreshing flights:', error);
      this.flightsSubject.next([]); // Clear subject on error
      throw error;
    }
  }

  getFlightsThisWeek(): Observable<Flight[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + 7);

    return this.flights$.pipe(
      map((flights) =>
        flights.filter((flight) => {
          return flight.boarding >= today && flight.boarding <= endOfWeek;
        })
      )
    );
  }
  getFutureFlights(): Observable<Flight[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to midnight for date-only comparison
  
    return new Observable<Flight[]>((observer) => {
      this.refreshFlights()
        .then((flights) => {
          const futureFlights = flights.filter((flight) => {
            const boardingDate = new Date(flight.boarding); // Ensure valid Date object
            return boardingDate >= today; // Include flights boarding today or later
          });
          observer.next(futureFlights);
          observer.complete();
        })
        .catch((error) => {
          console.error('Error fetching future flights:', error);
          observer.error(error);
        });
    });
  }
  
  

  listFlights(): Observable<Flight[]> {
    return this.flights$;
  }
}

