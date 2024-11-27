// Importing the destinations data from an external module
import { destinations } from "../data/Destinations.js";

// Log the destinations array to verify the data is being imported correctly
console.log(destinations);

// Function to dynamically create and display a table for destinations data
function createDestinationsTable(data) {
    const container = document.getElementById("destinationsTableContainer"); // Get the container for the table

    const table = document.createElement("table"); // Create the table element

    // Create the table header section with column names
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = ["Name", "Airport Name", "Airport Website", "Destination Code", "Image"];
    
    // Loop through each header text and create a header cell for the table
    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow); // Append the header row to the table header
    table.appendChild(thead); // Append the header section to the table

    // Create the table body section to hold the rows of destination data
    const tbody = document.createElement("tbody");

    // Loop through the destinations data to create a table row for each destination
    data.forEach(destination => {
        const row = document.createElement("tr");

        // Create each cell in the row and append the corresponding data
        const nameCell = document.createElement("td");
        nameCell.textContent = destination.name;
        row.appendChild(nameCell);

        const airportCell = document.createElement("td");
        airportCell.textContent = destination.airport;
        row.appendChild(airportCell);

        // Create a cell with a clickable link to the airport website
        const websiteCell = document.createElement("td");
        const link = document.createElement("a");
        link.href = destination.website;
        link.target = "_blank";
        link.textContent = "Visit Website";
        websiteCell.appendChild(link);
        row.appendChild(websiteCell);

        // Create a cell for the destination code
        const codeCell = document.createElement("td");
        codeCell.textContent = destination.code;
        row.appendChild(codeCell);

        // Create a cell for the destination image and display it
        const imageCell = document.createElement("td");
        const img = document.createElement("img");
        img.src = destination.image;
        img.alt = destination.name;
        img.width = 200;
        imageCell.appendChild(img);
        row.appendChild(imageCell);

        // Append the row to the table body
        tbody.appendChild(row);
    });

    // Append the table body to the table and the table to the container
    table.appendChild(tbody);
    container.appendChild(table);
}

// Call the function to create and display the table with the destinations data
createDestinationsTable(destinations);