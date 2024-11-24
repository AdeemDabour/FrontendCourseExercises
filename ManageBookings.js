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