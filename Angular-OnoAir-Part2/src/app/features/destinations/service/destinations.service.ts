import { Injectable } from '@angular/core';
import { Destination } from '../model/destination';
@Injectable({
  providedIn: 'root'
})

export class DestinationService {
  private destinations: Destination[] = [
    new Destination(1, "Tel Aviv", "Ben Gurion Airport", "https://www.iaa.gov.il/en/", "info@ben-gurion.com", "TLV", "https://cdn.britannica.com/80/94380-050-F182700B/Tel-Aviv-Yafo-Israel.jpg"),
    new Destination(2, "New York", "John F. Kennedy International Airport", "https://www.jfkairport.com/", "info@jfkairport.com", "JFK", "https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg"),
    new Destination(3, "Krakow", "John Paul II International Airport Kraków–Balice", "https://www.krakowairport.pl/en", "info@krakow-airport.com", "KRK", "https://api.kopalnia.pl/storage/2022/51/originals/piWvvIgX91HQMfP4N93BGVL5mqinTr97GNgeaQKV.jpg"),
    new Destination(4, "Zurich", "Zurich Airport", "https://www.zurich-airport.com/en", "info@zurich-airport.com", "ZRH", "https://switzerland-tour.com/storage/media/Zurich/fraumunster-church-in-zurich.jpg"),
    new Destination(5, "Larnaca", "Larnaca International Airport", "https://www.hermesairports.com", "info@larnaca-airport.com", "LCA", "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/a5/dd/08/caption.jpg"),
    new Destination(6, "Paris", "Charles de Gaulle Airport", "https://www.parisaeroport.fr/en", "info@paris-airport.com", "CDG", "https://media.reshet.tv/image/upload/t_image_article_800/v1625650119/shutterstock_667548661_u8pqe8.webp"),
    new Destination(7, "Tokyo", "Tokyo Narita Airport", "https://www.narita-airport.jp/en/", "info@narita-airport.jp", "NRT", "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/04/10/13/tokyo-main.jpg"),
    new Destination(8, "Dubai", "Dubai International Airport", "https://www.dubaiairports.ae/", "info@dxb-airport.com", "DXB", "https://lp-cms-production.imgix.net/features/2017/09/dubai-marina-skyline-2c8f1708f2a1.jpg"),
    new Destination(9, "Rome", "Leonardo da Vinci International Airport", "https://www.adr.it/web/aeroporti-di-roma-en-", "info@fco-airport.com", "FCO", "https://i.natgeofe.com/k/a6c9f195-de20-445d-9d36-745ef56042c5/OG_Colosseum_Ancient-Rome_KIDS_1122.jpg"),
    new Destination(10, "Los Angeles", "Los Angeles International Airport", "https://www.flylax.com/", "info@lax-airport.com", "LAX", "https://ca-times.brightspotcdn.com/dims4/default/9ecfbed/2147483647/strip/true/crop/3000x2000+0+0/resize/2000x1333!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8f%2F9c%2F692f81e94d908d8492f513674f17%2Ffixing-downtown-la-illo-03.jpg"),
    new Destination(11, "Berlin", "Berlin Brandenburg Airport", "https://www.berlin-airport.de/en/", "info@berlin-airport.de", "BER", "https://media.brate.com/images/europa/niemcy/berlin/berlin.jpg"),
    new Destination(12, "London", "Heathrow Airport", "https://www.heathrow.com/", "info@heathrow.com", "LHR", "https://cdn.goodlifetv.co.il/wp-content/uploads/2022/03/09182452/%D7%9C%D7%95%D7%A0%D7%93%D7%95%D7%9F-755.jpg"),
    new Destination(13, "Madrid", "Adolfo Suárez Madrid–Barajas Airport", "https://www.aena.es/en/madrid-barajas.html", "info@madrid-airport.com", "MAD", "https://www.metailimbaolam.com/wp-content/uploads/2022/04/%D7%9E%D7%93%D7%A8%D7%99%D7%93-%D7%A2%D7%9D-%D7%99%D7%9C%D7%93%D7%99%D7%9D-%D7%9E%D7%93%D7%A8%D7%99%D7%9A1.jpg"),
    new Destination(14, "Chicago", "Chicago O'Hare International Airport", "https://www.flychicago.com/", "info@ohare-airport.com", "ORD", "https://www.elal.com/magazine/wp-content/uploads/2017/01/ThinkstockPhotos-147533498.jpg"),
    new Destination(15, "Doha", "Hamad International Airport", "https://dohahamadairport.com/", "info@hamad-airport.com", "DOH", "https://www.travelawaits.com/wp-content/uploads/2020/03/Doha-Qatar.jpg?resize=800%2C739"),
    new Destination(16, "Singapore", "Singapore Changi Airport", "https://www.changiairport.com/", "info@changi-airport.com", "SIN", "https://www.state.gov/wp-content/uploads/2023/07/shutterstock_1932196766v2.jpg"),
    new Destination(17, "Istanbul", "Istanbul Airport", "https://www.istairport.com/en", "info@ist-airport.com", "IST", "https://ychef.files.bbci.co.uk/624x351/p0j759k4.jpg"),
    new Destination(18, "Bangkok", "Suvarnabhumi Airport", "https://www.bangkokairportonline.com/", "info@bangkok-airport.com", "BKK", "https://www.sarahdegheselle.com/wp-content/uploads/2024/07/big-b-bangkok-1-scaled.jpeg"),
    new Destination(19, "Lisbon", "Lisbon Humberto Delgado Airport", "https://www.aeroportolisboa.pt/en", "info@lisbon-airport.com", "LIS", "https://blog.winetourismportugal.com/hs-fs/hubfs/social-suggested-images/RESTRICTED-imageGalleryItem0-PortugalsDouroValleytoLisbonforSoloTravellers-xlarge.png?width=955&name=RESTRICTED-imageGalleryItem0-PortugalsDouroValleytoLisbonforSoloTravellers-xlarge.png"),
    new Destination(20, "San Francisco", "San Francisco International Airport", "https://www.flysfo.com/", "info@sfo-airport.com", "SFO", "https://media.istockphoto.com/id/476881195/photo/bay-bridge-and-san-francisco-skyline-at-sunset.jpg?s=612x612&w=0&k=20&c=dBeGdmYS8eOufXGT_YdRkuvKfLKUHFYwVaL9gHbkSXo="),
    new Destination(21, "Dallas", "Dallas/Fort Worth International Airport", "https://www.dfwairport.com/", "info@dfw-airport.com", "DFW", "https://dallas.culturemap.com/media-library/dallas-skyline-with-reflection.jpg?id=31484298&width=2000&height=1500&quality=65&coordinates=55%2C0%2C55%2C0"),
    new Destination(22, "Miami", "Miami International Airport", "https://www.miami-airport.com/", "info@miami-airport.com", "MIA", "https://www.hellolanding.com/blog/wp-content/uploads/2022/11/miami-florida-skyline-an.jpg")
  ]


  constructor() { }

  listDestinations(): Destination[] {
    return this.destinations;
  }
  getDestinationByNameOrCode(identifier: string): Destination | undefined {
    return this.destinations.find(
      destination =>
        destination.name.toLowerCase() === identifier.toLowerCase() ||
        destination.code.toLowerCase() === identifier.toLowerCase()
    )
  }
  getDestinationImage(nameOrCode: string): string {
    const destination = this.getDestinationByNameOrCode(nameOrCode);
    return destination?.imageUrl || 'fallback-image.jpg';
  }

  addDestination(destination: Destination) {
    this.destinations.push(destination);  
  }

};