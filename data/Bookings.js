let bookings = [
    new Booking(
        "Tel Aviv",
        "Krakow",
        "16/7/2025 20:00",
        "17/7/2025 01:00",
        5,
        "https://api.kopalnia.pl/storage/2022/51/originals/piWvvIgX91HQMfP4N93BGVL5mqinTr97GNgeaQKV.jpg"
    ),
    new Booking(
        "Krakow",
        "Larnaca",
        "20/5/2024 20:00",
        "21/5/2024 02:00",
        6,
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/a5/dd/08/caption.jpg?w=500&h=400&s=1"
    ),
    new Booking(
        "New York",
        "Paris",
        "10/12/2025 15:00",
        "11/12/2025 07:00",
        3,
        "https://cdn.getyourguide.com/img/tour/5c7857b75d31b.jpeg/99.jpg"
    ),
    new Booking(
        "Paris",
        "Tokyo",
        "15/8/2025 23:00",
        "16/8/2025 14:00",
        4,
        "https://www.japan.travel/resource/jnto/multimedia/JapanNationalTourismOrganizationLand.jpg"
    ),
    new Booking(
        "Berlin",
        "Rome",
        "5/6/2024 11:00",
        "5/6/2024 13:00",
        2,
        "https://upload.wikimedia.org/wikipedia/commons/a/a8/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg"
    ),
    new Booking(
        "Sydney",
        "Melbourne",
        "18/9/2024 09:00",
        "18/9/2024 10:30",
        1,
        "https://media.timeout.com/images/105800989/image.jpg"
    ),
    new Booking(
        "London",
        "Dubai",
        "25/12/2024 20:00",
        "26/12/2024 05:00",
        5,
        "https://images.adsttc.com/media/images/5ef5/6403/b357/6539/1200/016f/large_jpg/Burj_Khalifa.jpg"
    ),
    new Booking(
        "Dubai",
        "Bangkok",
        "12/1/2025 22:00",
        "13/1/2025 07:30",
        2,
        "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/25/b5/62.jpg"
    ),
    new Booking(
        "Tel Aviv",
        "London",
        "30/3/2024 06:00",
        "30/3/2024 10:30",
        4,
        "https://cdn.londonandpartners.com/asset/big-ben-ae09e65082c312f7bc855195dbff8745.jpg"
    ),
    new Booking(
        "Rome",
        "Athens",
        "10/7/2024 14:00",
        "10/7/2024 16:30",
        3,
        "https://www.greeka.com/photos/greece/acropolis/acropolis-1000.jpg"
    )
];


// פונקציה ליצירת טבלת הזמנות
function createBookingsTable(data) {
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Boarding Date & Time</th>
                    <th>Landing Date & Time</th>
                    <th>Number of Passengers</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(booking => {
        tableHTML += `
            <tr>
                <td>${booking.origin}</td>
                <td>${booking.destination}</td>
                <td>${booking.boardingDateTime}</td>
                <td>${booking.landingDateTime}</td>
                <td>${booking.passengerCount}</td>
                <td><img src="${booking.imageUrl}" alt="${booking.destination}" width="200"></td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;

    document.getElementById("bookingsTableContainer").innerHTML = tableHTML;
}

// קריאה לפונקציה עם הנתונים
createBookingsTable(bookings);

