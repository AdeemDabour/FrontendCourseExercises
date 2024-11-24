class Booking {
    constructor(origin, destination, boardingDateTime, landingDateTime, passengerCount, imageUrl) {
        this.origin = origin; // מוצא
        this.destination = destination; // יעד
        this.boardingDateTime = boardingDateTime; // תאריך ושעת המראה
        this.landingDateTime = landingDateTime; // תאריך ושעת נחיתה
        this.passengerCount = passengerCount; // מספר נוסעים
        this.imageUrl = imageUrl; // כתובת תמונה של היעד
    }
}
