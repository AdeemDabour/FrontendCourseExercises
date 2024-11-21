class Destination {
    constructor(name, airport, website, code, image) {
        this.name = name;
        this.airport = airport;
        this.website = website;
        this.code = code;
        this.image = image;
    }
}


let destinations = [
    {
        name: "Tel Aviv",
        airport: "Ben Gurion Airport",
        website: "https://www.iaa.gov.il/en/",
        code: "TLV",
        image: "https://cdn.britannica.com/80/94380-050-F182700B/Tel-Aviv-Yafo-Israel.jpg?w=300"
    },
    {
        name: "New York",
        airport: "John F. Kennedy International Airport",
        website: "https://www.jfkairport.com/",
        code: "JFK",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg"
    },
    {
        name: "Krakow",
        airport: "John Paul II International Airport Kraków–Balice",
        website: "https://www.krakowairport.pl/en",
        code: "KRK",
        image: "https://api.kopalnia.pl/storage/2022/51/originals/piWvvIgX91HQMfP4N93BGVL5mqinTr97GNgeaQKV.jpg"
    },
    {
        name: "Zurich",
        airport: "Zurich Airport",
        website: "https://www.zurich-airport.com/en",
        code: "ZRH",
        image: "https://switzerland-tour.com/storage/media/Zurich/fraumunster-church-in-zurich.jpg"
    },
    {
        name: "Larnaca",
        airport: "Larnaca International Airport",
        website: "https://www.hermesairports.com",
        code: "LCA",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/a5/dd/08/caption.jpg?w=500&h=400&s=1"
    },
    {
        name: "Paris",
        airport: "Charles de Gaulle Airport",
        website: "https://www.parisaeroport.fr/en",
        code: "CDG",
        image: "https://149990825.v2.pressablecdn.com/wp-content/uploads/2023/09/Paris1.jpg"
    },
    {
        name: "Tokyo",
        airport: "Tokyo Narita Airport",
        website: "https://www.narita-airport.jp/en/",
        code: "NRT",
        image: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/04/10/13/tokyo-main.jpg"
    },
    {
        name: "Dubai",
        airport: "Dubai International Airport",
        website: "https://www.dubaiairports.ae/",
        code: "DXB",
        image: "https://lp-cms-production.imgix.net/features/2017/09/dubai-marina-skyline-2c8f1708f2a1.jpg?auto=compress&fit=crop&format=auto&q=50&w=1200&h=800"
    },
    {
        name: "Rome",
        airport: "Leonardo da Vinci International Airport",
        website: "https://www.adr.it/web/aeroporti-di-roma-en-",
        code: "FCO",
        image: "https://i.natgeofe.com/k/a6c9f195-de20-445d-9d36-745ef56042c5/OG_Colosseum_Ancient-Rome_KIDS_1122.jpg"
    },
    {
        name: "Los Angeles",
        airport: "Los Angeles International Airport",
        website: "https://www.flylax.com/",
        code: "LAX",
        image: "https://ca-times.brightspotcdn.com/dims4/default/9ecfbed/2147483647/strip/true/crop/3000x2000+0+0/resize/2000x1333!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8f%2F9c%2F692f81e94d908d8492f513674f17%2Ffixing-downtown-la-illo-03.jpg"
    },
    {
        name: "Berlin",
        airport: "Berlin Brandenburg Airport",
        website: "https://www.berlin-airport.de/en/",
        code: "BER",
        image: "https://media.brate.com/images/europa/niemcy/berlin/berlin.jpg?tr=n-hero"
    }
];

// פונקציה ליצירת טבלה דינמית
function createTable(data) {
    // בניית טבלת HTML
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Airport Name</th>
                    <th>Airport Website</th>
                    <th>Destination Code</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
    `;

    // מעבר על כל היעדים והוספת שורות לטבלה
    data.forEach(destination => {
        tableHTML += `
            <tr>
                <td>${destination.name}</td>
                <td>${destination.airport}</td>
                <td><a href="${destination.website}" target="_blank">Visit Website</a></td>
                <td>${destination.code}</td>
                <td><img src="${destination.image}" alt="${destination.name}" width="200"></td>
            </tr>
        `;
    });

    // סיום הטבלה
    tableHTML += `
            </tbody>
        </table>
    `;

    // הכנסת הטבלה ל-HTML
    document.getElementById("tableContainer").innerHTML = tableHTML;
}

// קריאה לפונקציה עם הנתונים
createTable(destinations);