import { bookings } from "../data/Bookings.js";
function displayBookings(bookings) {
    const container = document.getElementById("bookingsContainer");
    container.innerHTML = "";

    bookings.forEach(booking => {
        const bookingItem = document.createElement("div");
        bookingItem.className = "booking-item";

        const imageContainer = document.createElement("div");
        imageContainer.className = "image-container";
        const img = document.createElement("img");
        img.src = booking.imageUrl;
        img.alt = booking.destination;
        imageContainer.appendChild(img);

        const detailsContainer = document.createElement("div");
        detailsContainer.className = "details-container";

        const row1 = document.createElement("div");
        row1.className = "row";
        row1.innerHTML = `
            <label class="origin">Origin:</label><span>${booking.origin}</span>
            <label>Boarding:</label><span>${booking.boardingDateTime}</span>
        `;
        detailsContainer.appendChild(row1);

        const row2 = document.createElement("div");
        row2.className = "row";
        row2.innerHTML = `
            <label>Destination:</label><span>${booking.destination}</span>
            <label>Landing:</label><span>${booking.landingDateTime}</span>
        `;
        detailsContainer.appendChild(row2);

        const row3 = document.createElement("div");
        row3.className = "row";
        row3.innerHTML = `
            <label>No. of passengers:</label><span class="passenger">${booking.passengerCount}</span>
        `;
        detailsContainer.appendChild(row3);

        bookingItem.appendChild(imageContainer);
        bookingItem.appendChild(detailsContainer);
        container.appendChild(bookingItem);
    });
}

displayBookings(bookings);