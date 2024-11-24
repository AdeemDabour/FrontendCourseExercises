let bookings = [
    new Booking("Tel Aviv", "Krakow", "16/7/2025 20:00", "17/7/2025 1:00", 5, "https://api.kopalnia.pl/storage/2022/51/originals/piWvvIgX91HQMfP4N93BGVL5mqinTr97GNgeaQKV.jpg"),
    new Booking("Krakow", "Larnaca", "20/5/2024 20:00", "21/5/2024 2:00", 6, "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/a5/dd/08/caption.jpg?w=500&h=400&s=1"),
    new Booking("Paris", "New York", "15/10/2025 14:00", "15/10/2025 22:00", 3, "https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg"),
    new Booking("Berlin", "Rome", "10/12/2024 08:00", "10/12/2024 10:30", 2, "https://i.natgeofe.com/k/a6c9f195-de20-445d-9d36-745ef56042c5/OG_Colosseum_Ancient-Rome_KIDS_1122.jpg"),
    new Booking("Tel Aviv", "London", "30/3/2024 06:00", "30/3/2024 10:30", 4, "https://ynet-pic1.yit.co.il/cdn-cgi/image/f=auto,w=740,q=75/picserver5/crop_images/2018/08/11/8709989/8709989_0_0_1000_563_0_x-large.jpg"),
    new Booking("Dubai", "Bangkok", "12/1/2025 22:00", "13/1/2025 07:30", 2, "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/25/b5/62.jpg"),
    new Booking("Zurich", "Paris", "22/11/2024 09:00", "22/11/2024 12:00", 6, "https://149990825.v2.pressablecdn.com/wp-content/uploads/2023/09/Paris1.jpg"),
    new Booking("Rome", "Dubai", "12/2/2025 15:00", "12/2/2025 22:00", 7, "https://lp-cms-production.imgix.net/features/2017/09/dubai-marina-skyline-2c8f1708f2a1.jpg?auto=compress&fit=crop&format=auto&q=50&w=1200&h=800"),
    new Booking("Bangkok", "Tokyo", "15/6/2025 23:30", "16/6/2025 08:00", 3, "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/04/10/13/tokyo-main.jpg"),
    new Booking("Tokyo", "Los Angeles", "20/8/2025 10:00", "20/8/2025 17:30", 2, "https://ca-times.brightspotcdn.com/dims4/default/9ecfbed/2147483647/strip/true/crop/3000x2000+0+0/resize/2000x1333!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8f%2F9c%2F692f81e94d908d8492f513674f17%2Ffixing-downtown-la-illo-03.jpg")
];

// פונקציה להצגת ההזמנות
function displayBookings(bookings) {
    const container = document.getElementById("bookingsContainer");
    container.innerHTML = ""; // מנקה את הקונטיינר לפני שמוסיפים נתונים

    bookings.forEach(booking => {
        const bookingItem = `
            <div class="booking-item">
                <div class="image-container">
                    <img src="${booking.imageUrl}" alt="${booking.destination}">
                </div>
                <div class="details-container">
                    <div class="row">
                        <label class="origin">Origin:</label>
                        <span>${booking.origin}</span>
                        <label>Boarding:</label>
                        <span>${booking.boardingDateTime}</span>
                    </div>
                    <div class="row">
                        <label>Destination:</label>
                        <span>${booking.destination}</span>
                        <label>Landing:</label>
                        <span>${booking.landingDateTime}</span>
                    </div>
                    <div class="row">
                        <label>No. of passengers:</label>
                        <span class="passenger">${booking.passengerCount}</span>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += bookingItem;
    });
}

// קריאה לפונקציה להצגת ההזמנות (להחליף בהתאם למיקום ה-Bookings.js)
displayBookings(bookings);
