// Import the Destination class to create destination instances
import { Destination } from "../classes/Destination.js";

// Array to store multiple destination instances, each created with specific data for name, airport, website, email, code, and image
export let destinations = [
    new Destination("Tel Aviv", "Ben Gurion Airport", "https://www.iaa.gov.il/en/", "info@ben-gurion.com", "TLV", "https://cdn.britannica.com/80/94380-050-F182700B/Tel-Aviv-Yafo-Israel.jpg"),
    new Destination("New York", "John F. Kennedy International Airport", "https://www.jfkairport.com/", "info@jfkairport.com", "JFK", "https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg"),
    new Destination("Krakow", "John Paul II International Airport Kraków–Balice", "https://www.krakowairport.pl/en", "info@krakow-airport.com", "KRK", "https://api.kopalnia.pl/storage/2022/51/originals/piWvvIgX91HQMfP4N93BGVL5mqinTr97GNgeaQKV.jpg"),
    new Destination("Zurich", "Zurich Airport", "https://www.zurich-airport.com/en", "info@zurich-airport.com", "ZRH", "https://switzerland-tour.com/storage/media/Zurich/fraumunster-church-in-zurich.jpg"),
    new Destination("Larnaca", "Larnaca International Airport", "https://www.hermesairports.com", "info@larnaca-airport.com", "LCA", "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/a5/dd/08/caption.jpg"),
    new Destination("Paris", "Charles de Gaulle Airport", "https://www.parisaeroport.fr/en", "info@paris-airport.com", "CDG", "https://149990825.v2.pressablecdn.com/wp-content/uploads/2023/09/Paris1.jpg"),
    new Destination("Tokyo", "Tokyo Narita Airport", "https://www.narita-airport.jp/en/", "info@narita-airport.jp", "NRT", "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/04/10/13/tokyo-main.jpg"),
    new Destination("Dubai", "Dubai International Airport", "https://www.dubaiairports.ae/", "info@dxb-airport.com", "DXB", "https://lp-cms-production.imgix.net/features/2017/09/dubai-marina-skyline-2c8f1708f2a1.jpg"),
    new Destination("Rome", "Leonardo da Vinci International Airport", "https://www.adr.it/web/aeroporti-di-roma-en-", "info@fco-airport.com", "FCO", "https://i.natgeofe.com/k/a6c9f195-de20-445d-9d36-745ef56042c5/OG_Colosseum_Ancient-Rome_KIDS_1122.jpg"),
    new Destination("Los Angeles", "Los Angeles International Airport", "https://www.flylax.com/", "info@lax-airport.com", "LAX", "https://ca-times.brightspotcdn.com/dims4/default/9ecfbed/2147483647/strip/true/crop/3000x2000+0+0/resize/2000x1333!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8f%2F9c%2F692f81e94d908d8492f513674f17%2Ffixing-downtown-la-illo-03.jpg"),
    new Destination("Berlin", "Berlin Brandenburg Airport", "https://www.berlin-airport.de/en/", "info@berlin-airport.de", "BER", "https://media.brate.com/images/europa/niemcy/berlin/berlin.jpg")
];