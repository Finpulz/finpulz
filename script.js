// Theme Toggle
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  toggleBtn.textContent = body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
});

// Load Data Based on Page
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname;

  // --- Load News (index.html and news.html) ---
  if (currentPage.endsWith("/") || currentPage.endsWith("index.html") || currentPage.includes("news.html")) {
    const newsURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhqLVaG4H4nW0xC-OZYKHFPDTp62onC4HJRiWV-gfPWm2dWfw4KKMLp6RkihEeSWPMZpT54Q1kv09J/pub?output=csv';

    fetch(newsURL)
      .then(res => res.text())
      .then(text => {
        const rows = text.trim().split("\n").slice(1); // remove header
        const newsData = rows.map(row => {
          const [title, description] = row.split(",");
          return { title, description };
        });

        const newsContainer = document.getElementById("news-cards");
        if (newsContainer) {
          newsData.forEach(news => {
            const card = document.createElement("div");
            card.className = "card";

            const h3 = document.createElement("h3");
            h3.textContent = news.title;

            const p = document.createElement("p");
            p.textContent = news.description;

            card.appendChild(h3);
            card.appendChild(p);
            newsContainer.appendChild(card);
          });
        }

        const latestNews = document.getElementById("latest-news");
        if (latestNews) {
          const latestThree = newsData.slice(-3).reverse();
          latestThree.forEach(news => {
            const card = document.createElement("div");
            card.className = "card";

            const h3 = document.createElement("h3");
            h3.textContent = news.title;

            const p = document.createElement("p");
            p.textContent = news.description;

            card.appendChild(h3);
            card.appendChild(p);
            latestNews.appendChild(card);
          });
        }
      })
      .catch(err => console.error("Failed to load news:", err));
  }

  // --- Load Explainers (fin101.html) ---
  if (currentPage.includes("fin101.html")) {
    const explainersURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQJ6fWangE_y3uK6K9c1enqV3Tfm6hSxKSlyY94VrSEf1iq1rr-ivft4kFawV2Ff_UuNouPoy6VKtl9/pub?output=csv';

    fetch(explainersURL)
      .then(res => res.text())
      .then(text => {
        const rows = text.trim().split("\n").slice(1); // remove header
        const explainerData = rows.map(row => {
          const [title, description] = row.split(",");
          return { title, description };
        });

        const explainerContainer = document.getElementById("explainer-cards");
        if (explainerContainer) {
          explainerData.forEach(item => {
            const card = document.createElement("div");
            card.className = "explainer-card";

            const h3 = document.createElement("h3");
            h3.textContent = item.title;

            const p = document.createElement("p");
            p.textContent = item.description;

            card.appendChild(h3);
            card.appendChild(p);
            explainerContainer.appendChild(card);
          });
        }
      })
      .catch(err => console.error("Failed to load explainers:", err));
  }
});
