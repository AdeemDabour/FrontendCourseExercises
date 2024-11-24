// פונקציה ליצירת טבלת יעדים
function createDestinationsTable(data) {
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

    tableHTML += `
            </tbody>
        </table>
    `;

    document.getElementById("destinationsTableContainer").innerHTML = tableHTML;
}

// קריאה לפונקציה עם הנתונים
createDestinationsTable(destinations);