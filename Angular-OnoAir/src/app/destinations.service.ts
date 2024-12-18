import { Injectable } from '@angular/core';
export interface Destination {
  name: string;
  airportName: string;
  airportWebsite: string;
  email: string;
  code: string;
  imageUrl: string;
}
@Injectable({
  providedIn: 'root'
})

export class DestinationService {
  private destinations: Destination[] = [
  {
    name: "Tel Aviv",
    airportName: "Ben Gurion Airport",
    airportWebsite: "https://www.iaa.gov.il/en/",
    email: "info@ben-gurion.com",
    code: "TLV",
    imageUrl: "https://cdn.britannica.com/80/94380-050-F182700B/Tel-Aviv-Yafo-Israel.jpg",
  },
  {
    name: "New York",
    airportName: "John F. Kennedy International Airport",
    airportWebsite: "https://www.jfkairport.com/",
    email: "info@jfkairport.com",
    code: "JFK",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg",
  },
  {
    name: "Krakow",
    airportName: "John Paul II International Airport Kraków–Balice",
    airportWebsite: "https://www.krakowairport.pl/en",
    email: "info@krakow-airport.com",
    code: "KRK",
    imageUrl: "https://api.kopalnia.pl/storage/2022/51/originals/piWvvIgX91HQMfP4N93BGVL5mqinTr97GNgeaQKV.jpg",
  },
  {
    name: "Zurich",
    airportName: "Zurich Airport",
    airportWebsite: "https://www.zurich-airport.com/en",
    email: "info@zurich-airport.com",
    code: "ZRH",
    imageUrl: "https://switzerland-tour.com/storage/media/Zurich/fraumunster-church-in-zurich.jpg",
  },
  {
    name: "Larnaca",
    airportName: "Larnaca International Airport",
    airportWebsite: "https://www.hermesairports.com",
    email: "info@larnaca-airport.com",
    code: "LCA",
    imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/a5/dd/08/caption.jpg",
  },
  {
    name: "Paris",
    airportName: "Charles de Gaulle Airport",
    airportWebsite: "https://www.parisaeroport.fr/en",
    email: "info@paris-airport.com",
    code: "CDG",
    imageUrl: "https://149990825.v2.pressablecdn.com/wp-content/uploads/2023/09/Paris1.jpg",
  },
  {
    name: "Tokyo",
    airportName: "Tokyo Narita Airport",
    airportWebsite: "https://www.narita-airport.jp/en/",
    email: "info@narita-airport.jp",
    code: "NRT",
    imageUrl: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/04/10/13/tokyo-main.jpg",
  },
  {
    name: "Dubai",
    airportName: "Dubai International Airport",
    airportWebsite: "https://www.dubaiairports.ae/",
    email: "info@dxb-airport.com",
    code: "DXB",
    imageUrl: "https://lp-cms-production.imgix.net/features/2017/09/dubai-marina-skyline-2c8f1708f2a1.jpg",
  },
  {
    name: "Rome",
    airportName: "Leonardo da Vinci International Airport",
    airportWebsite: "https://www.adr.it/web/aeroporti-di-roma-en-",
    email: "info@fco-airport.com",
    code: "FCO",
    imageUrl: "https://i.natgeofe.com/k/a6c9f195-de20-445d-9d36-745ef56042c5/OG_Colosseum_Ancient-Rome_KIDS_1122.jpg",
  },
  {
    name: "Los Angeles",
    airportName: "Los Angeles International Airport",
    airportWebsite: "https://www.flylax.com/",
    email: "info@lax-airport.com",
    code: "LAX",
    imageUrl: "https://ca-times.brightspotcdn.com/dims4/default/9ecfbed/2147483647/strip/true/crop/3000x2000+0+0/resize/2000x1333!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8f%2F9c%2F692f81e94d908d8492f513674f17%2Ffixing-downtown-la-illo-03.jpg",
  },
  {
    name: "Berlin",
    airportName: "Berlin Brandenburg Airport",
    airportWebsite: "https://www.berlin-airport.de/en/",
    email: "info@berlin-airport.de",
    code: "BER",
    imageUrl: "https://media.brate.com/images/europa/niemcy/berlin/berlin.jpg",
  }
]
public getDestinations(): Destination[] {
  return this.destinations;
}
};