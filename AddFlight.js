// מאזין לאירוע הגשת הטופס
document.getElementById("addFlightForm").addEventListener("submit", function (event) {
    event.preventDefault(); // מניעת רענון הדף

    // שליפת הערכים מהטופס
    const flightNo = document.getElementById("flightNo").value;
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;
    const boardingDate = document.getElementById("boardingDate").value;
    const boardingTime = document.getElementById("boardingTime").value;
    const arrivalDate = document.getElementById("arrivalDate").value;
    const arrivalTime = document.getElementById("arrivalTime").value;
    const seats = parseInt(document.getElementById("seats").value);

    // יצירת אובייקט טיסה חדש
    const newFlight = new Flight(flightNo, origin, destination, boardingDate, boardingTime, arrivalDate, arrivalTime, seats);

    // הוספת הטיסה למערך flights
    flights.push(newFlight);

    // הודעה למשתמש
    alert("Flight added successfully!");

    // ניקוי הטופס
    this.reset();
});