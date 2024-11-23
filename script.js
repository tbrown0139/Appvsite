document.addEventListener("DOMContentLoaded", async () => {
    const cardsContainer = document.getElementById("cards-container");
    const searchBar = document.getElementById("search-bar");
    const googleSheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT93cBbDNQmVKKzM8plXrz4jwFKfMwYU5HtU2q-FIJUGVuSIsEn3ricsv9IsmmHtt_taw8-s9-pE4Ge/pub?gid=0&single=true&output=csv";
    const defaultIcon = "https://via.placeholder.com/60"; // Default icon

    let sites = [];

    try {
        const response = await fetch(googleSheetUrl);
        const csvText = await response.text();
        sites = parseCSV(csvText);
        displaySites(sites);
    } catch (error) {
        console.error("Error fetching Google Sheet:", error);
    }

    searchBar.addEventListener("input", () => {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredSites = sites.filter(site =>
            site.title.toLowerCase().includes(searchTerm)
        );
        displaySites(filteredSites);
    });

    function displaySites(sites) {
        cardsContainer.innerHTML = "";
        sites.forEach(site => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <img src="${site.icon || defaultIcon}" alt="${site.title} Icon">
                <div class="card-title">${site.title}</div>
            `;
            card.onclick = () => window.open(site.url, "_blank");
            cardsContainer.appendChild(card);
        });
    }

    function parseCSV(csv) {
        const rows = csv.split("\n").slice(1); // Remove header row
        return rows.map(row => {
            const [title, url, icon] = row.split(",").map(cell => cell.trim());
            return { title, url, icon };
        });
    }
});
