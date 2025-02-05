import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, getDocs } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
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
      this.flightsSubject.next([]);
      this.flightsSubject.next(flights);
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

      const updatedFlights = [...this.flightsSubject.getValue(), { ...newFlight, id: nextId.toString() }];
      this.flightsSubject.next(updatedFlights);

    } catch (error) {
      console.error('Error adding flight:', error);
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
      this.flightsSubject.next(flights);
      return flights;
    } catch (error) {
      console.error('Error refreshing flights:', error);
      this.flightsSubject.next([]);
      throw error;
    }
  }


  getFlightsThisWeek(): Observable<Flight[]> {
    const now = new Date();

    const endOfWeek = new Date();
    endOfWeek.setDate(now.getDate() + 7);

    return this.flights$.pipe(
      map((flights) =>
        flights.filter((flight) => {
          const flightBoarding = new Date(flight.boarding);

          return (
            flight.status === Status.Active &&
            flightBoarding >= now &&
            flightBoarding <= endOfWeek
          );
        })
      )
    );
  }

  getFutureFlights(): Observable<Flight[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return new Observable<Flight[]>((observer) => {
      this.refreshFlights()
        .then((flights) => {
          const futureFlights = flights.filter((flight) => {
            const boardingDate = new Date(flight.boarding);
            return (
              flight.status === Status.Active && 
              boardingDate >= today
            );
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
  async getActiveFlightsByDestination(destinationName: string): Promise<Flight[]> {
    try {
        const collectionRef = this.getFlightsCollection();
        const querySnapshot = await getDocs(collectionRef);

        if (querySnapshot.empty) {
            return [];
        }
        return querySnapshot.docs
            .map(doc => doc.data() as Flight)
            .filter(flight => 
                flight.status === Status.Active && 
                (flight.origin.toLowerCase() === destinationName.toLowerCase() || 
                 flight.destination.toLowerCase() === destinationName.toLowerCase())
            );

    } catch (error) {
        console.error('Error checking flights for destination:', error);
        return []; // Return empty array in case of error
    }
}

  async updateSeatsForFlight(flightNo: string, seatChange: number): Promise<void> {
    try {
      // Fetch the flight details
      const flight = await firstValueFrom(this.getFlightByNumber(flightNo));

      if (!flight) {
        console.error(`🚨 Flight ${flightNo} not found.`);
        return;
      }

      // Convert seats from string to number for calculations
      const currentSeats = parseInt(flight.seats, 10);

      if (isNaN(currentSeats)) {
        console.error(`🚨 Invalid seats value for flight ${flightNo}:`, flight.seats);
        return;
      }

      // Update available seats
      const updatedSeats = currentSeats + seatChange;

      // Convert back to string before updating in the database
      flight.seats = updatedSeats.toString();
      await this.updateFlight(flight.id, flight);

      console.log(`✅ Flight ${flightNo} seats updated: ${currentSeats} → ${updatedSeats}`);
    } catch (error) {
      console.error(`🚨 Error updating seats for flight ${flightNo}:`, error);
    }
  }
}