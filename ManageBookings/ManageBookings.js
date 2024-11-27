// Import the bookings data from a separate module
import { bookings } from "../data/Bookings.js";

// Function to create a sparkle animation effect within a specified container
function createSparkles(container) {
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 2}s`;
        sparkle.style.animationDuration = `${Math.random() * 1.5 + 0.5}s`;
        container.appendChild(sparkle);
    }
}

// Function to display a list of bookings in the "bookingsContainer" element
function displayBookings(bookings) {
    const container = document.getElementById("bookingsContainer"); // Get the container for displaying bookings
    container.innerHTML = ""; // Clear existing content in the container

    // Loop through the bookings array and create elements for each booking
    bookings.forEach(booking => {
        const bookingItem = document.createElement("div"); // Create the main container for a booking
        bookingItem.className = "booking-item"; // Add a class for styling

        // Create a container for the booking image and add the image element
        const imageContainer = document.createElement("div");
        imageContainer.className = "image-container";
        const img = document.createElement("img");
        img.src = booking.imageUrl;
        img.alt = booking.destination;
        imageContainer.appendChild(img);

        // Create a container for the booking details
        const detailsContainer = document.createElement("div");
        detailsContainer.className = "details-container";

        // Add a row for origin and boarding time
        const row1 = document.createElement("div");
        row1.className = "row";
        row1.innerHTML = `
            <label class="origin">Origin:</label><span>${booking.origin}</span>
            <label>Boarding:</label><span>${booking.boardingDateTime}</span>
        `;
        detailsContainer.appendChild(row1);

        // Add a row for destination and landing time
        const row2 = document.createElement("div");
        row2.className = "row";
        row2.innerHTML = `
            <label>Destination:</label><span>${booking.destination}</span>
            <label>Landing:</label><span>${booking.landingDateTime}</span>
        `;
        detailsContainer.appendChild(row2);

        // Add a row for the number of passengers
        const row3 = document.createElement("div");
        row3.className = "row";
        row3.innerHTML = `
            <label>No. of passengers:</label><span class="passenger">${booking.passengerCount}</span>
        `;
        detailsContainer.appendChild(row3);

        // Append the image and details containers to the booking item container
        bookingItem.appendChild(imageContainer);
        bookingItem.appendChild(detailsContainer);

        // Add the booking item to the main bookings container
        container.appendChild(bookingItem);

        // Add sparkle animation to the image container
        createSparkles(imageContainer);
    });
}

// Call the function to display all bookings on the page
displayBookings(bookings);