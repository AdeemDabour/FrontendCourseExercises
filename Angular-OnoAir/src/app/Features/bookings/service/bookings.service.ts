import { Injectable } from '@angular/core';
import { Booking } from '../model/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookings: Booking[] = [
    {
      bookingCode: "ABC123",
      origin: "Tel Aviv",
      destination: "Krakow",
      boarding: new Date("2025-07-16 20:00"),
      landing: new Date("2025-07-17 01:00"),
      passengerCount: 5,
      imageUrl: "https://api.kopalnia.pl/storage/2022/51/originals/piWvvIgX91HQMfP4N93BGVL5mqinTr97GNgeaQKV.jpg",
    },
    {
      bookingCode: "DEF456",
      origin: "Krakow",
      destination: "Larnaca",
      boarding: new Date("2024-05-20 20:00"),
      landing: new Date("2024-05-21 02:00"),
      passengerCount: 6,
      imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/a5/dd/08/caption.jpg?w=500&h=400&s=1",
    },
    {
      bookingCode: "GHI789",
      origin: "Paris",
      destination: "New York",
      boarding: new Date("2025-10-15 14:00"),
      landing: new Date("2025-10-15 22:00"),
      passengerCount: 3,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg",
    },
    {
      bookingCode: "JKL012",
      origin: "Berlin",
      destination: "Rome",
      boarding: new Date("2024-12-10 08:00"),
      landing: new Date("2024-12-10 10:30"),
      passengerCount: 2,
      imageUrl: "https://i.natgeofe.com/k/a6c9f195-de20-445d-9d36-745ef56042c5/OG_Colosseum_Ancient-Rome_KIDS_1122.jpg",
    },
    {
      bookingCode: "MNO345",
      origin: "Tel Aviv",
      destination: "London",
      boarding: new Date("2024-03-30 06:00"),
      landing: new Date("2024-03-30 10:30"),
      passengerCount: 4,
      imageUrl: "https://ynet-pic1.yit.co.il/cdn-cgi/image/f=auto,w=740,q=75/picserver5/crop_images/2018/08/11/8709989/8709989_0_0_1000_563_0_x-large.jpg",
    },
    {
      bookingCode: "PQR678",
      origin: "Dubai",
      destination: "Bangkok",
      boarding: new Date("2025-01-12 22:00"),
      landing: new Date("2025-01-13 07:30"),
      passengerCount: 2,
      imageUrl: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/25/b5/62.jpg",
    },
    {
      bookingCode: "STU901",
      origin: "Zurich",
      destination: "Paris",
      boarding: new Date("2024-11-22 09:00"),
      landing: new Date("2024-11-22 12:00"),
      passengerCount: 6,
      imageUrl: "https://149990825.v2.pressablecdn.com/wp-content/uploads/2023/09/Paris1.jpg",
    },
    {
      bookingCode: "VWX234",
      origin: "Rome",
      destination: "Dubai",
      boarding: new Date("2025-02-12 15:00"),
      landing: new Date("2025-02-12 22:00"),
      passengerCount: 3,
      imageUrl: "https://lp-cms-production.imgix.net/features/2017/09/dubai-marina-skyline-2c8f1708f2a1.jpg?auto=compress&fit=crop&format=auto&q=50&w=1200&h=800",
    },
    {
      bookingCode: "YZA567",
      origin: "Bangkok",
      destination: "Tokyo",
      boarding: new Date("2025-06-15 23:30"),
      landing: new Date("2025-06-16 08:00"),
      passengerCount: 3,
      imageUrl: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/04/10/13/tokyo-main.jpg",
    },
    {
      bookingCode: "BCD890",
      origin: "Tokyo",
      destination: "Los Angeles",
      boarding: new Date("2025-08-20 10:00"),
      landing: new Date("2025-08-20 17:30"),
      passengerCount: 2,
      imageUrl: "https://ca-times.brightspotcdn.com/dims4/default/9ecfbed/2147483647/strip/true/crop/3000x2000+0+0/resize/2000x1333!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8f%2F9c%2F692f81e94d908d8492f513674f17%2Ffixing-downtown-la-illo-03.jpg",
    },
  ];
  public getBookings(): Booking[] {
    return this.bookings;
  }
  public getBookingByCode(bookingCode: string): Booking | undefined {
    return this.bookings.find(booking => booking.bookingCode === bookingCode);
  }
}