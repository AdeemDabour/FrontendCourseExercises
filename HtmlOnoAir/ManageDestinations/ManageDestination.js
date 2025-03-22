import { destinations } from "../data/Destinations.js";

console.log("Destinations Array: ", destinations);

function createDestinationsTable(data) {
    const container = document.getElementById("destinationsTableContainer");
    if (!container) {
        console.error("Container with ID 'destinationsTableContainer' not found.");
        return;
    }

    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = ["Name", "Airport Name", "Airport Website", "Email", "Destination Code", "Image"];

    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    data.forEach(destination => {
        if (!destination.name || !destination.airport || !destination.email) {
            console.warn("Incomplete data for destination:", destination);
            return;
        }

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = destination.name;
        row.appendChild(nameCell);

        const airportCell = document.createElement("td");
        airportCell.textContent = destination.airport;
        row.appendChild(airportCell);

        const websiteCell = document.createElement("td");
        const link = document.createElement("a");
        link.href = destination.website;
        link.target = "_blank";
        link.textContent = "Visit Website";
        websiteCell.appendChild(link);
        row.appendChild(websiteCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = destination.email;
        row.appendChild(emailCell);

        const codeCell = document.createElement("td");
        codeCell.textContent = destination.code;
        row.appendChild(codeCell);

        const imageCell = document.createElement("td");
        const img = document.createElement("img");
        img.src = destination.image;
        img.alt = destination.name;
        img.width = 200;
        imageCell.appendChild(img);
        row.appendChild(imageCell);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);
}

createDestinationsTable(destinations);