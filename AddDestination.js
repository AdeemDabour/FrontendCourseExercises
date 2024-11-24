// מאזין לאירוע הגשת הטופס
document.getElementById("addDestinationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // מניעת רענון הדף

    // קבלת הערכים מהשדות
    const code = document.getElementById("destinationCode").value;
    const name = document.getElementById("destinationName").value;
    const airport = document.getElementById("airportName").value;
    const url = document.getElementById("airportUrl").value;
    const image = document.getElementById("imageUrl").value;

    // יצירת אובייקט יעד חדש
    const newDestination = new Destination(code, name, airport, url, image);

    // הוספת היעד למערך
    destinations.push(newDestination);

    // הודעה למשתמש
    alert("Destination added successfully!");

    // ניקוי השדות בטופס
    this.reset();
});
