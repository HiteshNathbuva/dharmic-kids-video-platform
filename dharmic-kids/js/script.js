/*
  Shared data + helpers for Dharmic Kids pages.
  This script controls category rendering, video cards, search, theme toggling,
  page-to-page video loading, and basic scroll reveal animations.
*/

const categories = [
  { id: "ramayana", name: "Ramayana Stories", icon: "🏹", thumb: "images/thumbnails/ramayana.svg" },
  { id: "mahabharata", name: "Mahabharata Stories", icon: "⚔️", thumb: "images/thumbnails/mahabharata.svg" },
  { id: "krishna", name: "Krishna Stories", icon: "🦚", thumb: "images/thumbnails/krishna.svg" },
  { id: "hanuman", name: "Hanuman Stories", icon: "🐒", thumb: "images/thumbnails/hanuman.svg" },
  { id: "moral", name: "Moral Stories", icon: "🌟", thumb: "images/thumbnails/moral.svg" }
];

const videos = [
  { id: "wUWhfHEA6RA", category: "ramayana", title: "Rama and Sita's Journey", desc: "A gentle retelling of Rama, Sita, and Lakshmana's forest adventure.", thumb: "images/thumbnails/ramayana.svg" },
  { id: "vEsw4xQ6-pw", category: "ramayana", title: "Hanuman Finds Sita", desc: "Watch the brave leap of Hanuman in Lanka.", thumb: "images/thumbnails/hanuman.svg" },
  { id: "2R4Oot8XJYQ", category: "mahabharata", title: "Young Pandavas", desc: "Meet the Pandavas and learn about courage and unity.", thumb: "images/thumbnails/mahabharata.svg" },
  { id: "Z9AqQ3fmbJY", category: "mahabharata", title: "Krishna's Wisdom", desc: "An introduction to Krishna's guidance in difficult times.", thumb: "images/thumbnails/krishna.svg" },
  { id: "ZL8M4m6nR8Q", category: "krishna", title: "Little Krishna and Butter", desc: "Fun childhood story about Krishna's playful side.", thumb: "images/thumbnails/krishna.svg" },
  { id: "vQ7Qf4r2k7s", category: "krishna", title: "Kaliya Mardan", desc: "See how Krishna protects friends with courage.", thumb: "images/thumbnails/krishna.svg" },
  { id: "CGJz8f5n7AA", category: "hanuman", title: "Birth of Hanuman", desc: "A colorful story of Hanuman's divine birth.", thumb: "images/thumbnails/hanuman.svg" },
  { id: "L8M9eN6xYxY", category: "hanuman", title: "Hanuman Lifts Mountain", desc: "Sanjeevani adventure with strength and devotion.", thumb: "images/thumbnails/hanuman.svg" },
  { id: "Yx8Wj5b8zEo", category: "moral", title: "Speak the Truth", desc: "A short moral tale on honesty and kindness.", thumb: "images/thumbnails/moral.svg" },
  { id: "rj4X8mV8S5w", category: "moral", title: "Helping Friends", desc: "Why teamwork and compassion make us stronger.", thumb: "images/thumbnails/moral.svg" }
];

const page = document.body.dataset.page;

function setupThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  const storedTheme = localStorage.getItem("dharmic-theme");

  if (storedTheme === "dark") {
    document.body.classList.add("dark");
    toggle.textContent = "☀️";
  }

  toggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const dark = document.body.classList.contains("dark");
    localStorage.setItem("dharmic-theme", dark ? "dark" : "light");
    toggle.textContent = dark ? "☀️" : "🌙";
  });
}

function buildCategoryCards() {
  const categoryGrid = document.getElementById("categoryGrid");
  if (!categoryGrid) return;

  categoryGrid.innerHTML = categories
    .map((cat) => `
      <article class="category-card reveal-on-scroll">
        <div class="category-icon">${cat.icon}</div>
        <h3>${cat.name}</h3>
        <p>Animated dharmic stories for kids.</p>
      </article>
    `)
    .join("");
}

function createVideoCard(video) {
  return `
    <article class="video-card reveal-on-scroll">
      <img class="video-thumb" src="${video.thumb}" alt="${video.title} thumbnail" />
      <div class="video-content">
        <h4>${video.title}</h4>
        <p>${video.desc}</p>
        <button class="watch-btn" data-video-id="${video.id}">▶ Watch</button>
      </div>
    </article>
  `;
}

function buildCategoryVideoSections(filterText = "") {
  const container = document.getElementById("videoSectionContainer");
  if (!container) return;

  const query = filterText.trim().toLowerCase();
  container.innerHTML = "";

  categories.forEach((cat) => {
    const filteredVideos = videos.filter((video) => {
      const inCategory = video.category === cat.id;
      const matchesSearch = video.title.toLowerCase().includes(query);
      return inCategory && matchesSearch;
    });

    if (filteredVideos.length === 0) return;

    const section = document.createElement("section");
    section.className = "section";
    section.innerHTML = `
      <h2>${cat.icon} ${cat.name}</h2>
      <div class="video-grid">${filteredVideos.map(createVideoCard).join("")}</div>
    `;
    container.appendChild(section);
  });

  if (!container.children.length) {
    container.innerHTML = `<p style="text-align:center;">No videos found. Try another search name.</p>`;
  }

  attachWatchButtonHandlers();
  observeRevealItems();
}

function attachWatchButtonHandlers() {
  document.querySelectorAll(".watch-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const videoId = btn.dataset.videoId;
      window.location.href = `video.html?id=${videoId}`;
    });
  });
}

function loadVideoPage() {
  if (page !== "video") return;

  const params = new URLSearchParams(window.location.search);
  const videoId = params.get("id") || videos[0].id;
  const selected = videos.find((video) => video.id === videoId) || videos[0];

  const card = document.getElementById("videoPlayerCard");
  card.innerHTML = `
    <h1>${selected.title}</h1>
    <iframe src="https://www.youtube.com/embed/${selected.id}" title="${selected.title}" allowfullscreen></iframe>
    <p>${selected.desc}</p>
  `;

  const recommended = videos.filter((v) => v.id !== selected.id).slice(0, 5);
  document.getElementById("recommendedList").innerHTML = recommended
    .map((item) => `
      <a class="recommend-item" href="video.html?id=${item.id}">
        <img src="${item.thumb}" alt="${item.title}" />
        <h4>${item.title}</h4>
      </a>
    `)
    .join("");
}

function setupSearch() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;
  searchInput.addEventListener("input", (e) => buildCategoryVideoSections(e.target.value));
}

function observeRevealItems() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
}

function init() {
  setupThemeToggle();
  buildCategoryCards();
  buildCategoryVideoSections();
  setupSearch();
  loadVideoPage();
  observeRevealItems();
}

init();
