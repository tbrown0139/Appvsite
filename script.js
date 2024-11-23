document.addEventListener("DOMContentLoaded", async () => {
    const cardsContainer = document.getElementById("cards-container");
    const searchBar = document.getElementById("search-bar");
    const defaultIcon = "https://via.placeholder.com/60"; // Default icon URL
    const dataUrl = "./sites.json"; // File is in the same directory

    let sites = [];

    try {
        const response = await fetch(dataUrl);
        sites = await response.json();
        displaySites(sites);
    } catch (error) {
        console.error("Error fetching sites:", error);
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
});
