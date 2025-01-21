import { Injectable } from '@angular/core';
import { Flight, Status } from '../model/flight';
import {  Timestamp, where } from 'firebase/firestore';
import { Firestore, collection, deleteDoc, doc, setDoc, collectionData, getDocs } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { FlightConverter } from '../model/flight-converter';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class FlightsService {
  private collectionName = 'flights';
  private flightsSubject = new BehaviorSubject<Flight[]>([]);
  flights$ = this.flightsSubject.asObservable();

  constructor(private firestore: Firestore) {
    this.loadFlights();
  }

  async loadFlights(): Promise<void> {
    const flights = await this.refreshFlights(); // Fetch flights directly
    this.flightsSubject.next(flights); // Update the BehaviorSubject
  } 

  async addFlight(newFlight: Flight): Promise<void> {
    const flightDoc = doc(this.firestore, this.collectionName, newFlight.id);
    await setDoc(flightDoc, { ...newFlight });
    console.log(`Flight ${newFlight.flightNo} added successfully`);
    await this.loadFlights();
  }

  async removeFlight(flightId: string): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, flightId);
    await deleteDoc(docRef);
    console.log(`Flight ${flightId} removed successfully`);
    await this.loadFlights();
  }
  

  async updateFlight(flightId: string, updatedFlight: Flight): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, flightId);
    await setDoc(docRef, updatedFlight);
  }

  async createUniqueId(): Promise<string> {
    const collectionRef = collection(this.firestore, this.collectionName);
    const snapshot = await getDocs(collectionRef);
    const ids = snapshot.docs.map((doc) => parseInt(doc.id, 10));
    const maxId = Math.max(...ids, 0);
    return (maxId + 1).toString();
  }
  
  
getFlightById(flightId: string): Flight | undefined {
  const flights = this.flightsSubject.getValue(); // Get the current value of flights
  return flights.find(flight => flight.id === flightId);
}

getFlightByNumber(flightNo: string): Observable<Flight | undefined> {
  const normalizedInput = flightNo.trim().toLowerCase();

  return this.flights$.pipe(
    map(flights =>
      flights.find(flight => flight.flightNo.trim().toLowerCase() === normalizedInput)
    )
  );
}

  listFlightNames(): string[] {
    const flights = this.flightsSubject.getValue(); // Get the current value of flights
    return flights.map(flight => flight.flightNo);
  }

  getFlightStatus(flightNo: string): Status {
    const flights = this.flightsSubject.getValue(); // Get the current value of flights
    const flight = flights.find(flight => flight.flightNo === flightNo);
    return flight ? flight.status : Status.Active;
  }

  async refreshFlights(): Promise<Flight[]> {
    const collectionRef = collection(this.firestore, this.collectionName);
    const querySnapshot = await getDocs(collectionRef);
  
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return new Flight(
        doc.id, // Document ID as flight ID
        data["flightNo"],
        data["origin"],
        data["destination"],
        data["boarding"],
        data["landing"],
        data["seats"],
        data["status"]
      );
    });
  }
  
  getFlightsThisWeek(): Observable<Flight[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + 7);
  
    return this.flights$.pipe(
      map(flights =>
        flights.filter(flight => {
          const boardingDate = flight.boarding.toDate();
          return boardingDate >= today && boardingDate <= endOfWeek;
        })
      )
    );
  }

  listFlights(): Observable<Flight[]> {
    return this.flights$;
  }
  
}