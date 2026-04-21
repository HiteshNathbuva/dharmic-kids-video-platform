/*
  Shared data + helpers for Dharmic Kids pages.
  This script controls auth, global animations, category rendering,
  favorites, watch history, quizzes, profile dashboard, and interactions.
*/

const categories = [
  {
    id: "krishna",
    name: "Krishna Stories",
    icon: "🦚",
    thumb: "images/thumbnails/krishna.webp",
    illustration: "images/thumbnails/krishna.webp",
    description: "Playful and divine stories of Krishna’s childhood and wisdom."
  },
  {
    id: "hanuman",
    name: "Hanuman Stories",
    icon: "🐒",
    thumb: "images/thumbnails/ShriHanuman.webp",
    illustration: "images/thumbnails/ShriHanuman.webp",
    description: "Brave adventures of Hanuman showing strength and devotion."
  },
  {
    id: "ramayana",
    name: "Ramayana Stories",
    icon: "🏹",
    thumb: "images/thumbnails/ShriRamayan.webp",
    illustration: "images/thumbnails/ShriRamayan.webp",
    description: "Epic journey of Lord Rama teaching truth and duty."
  },
  {
    id: "mahabharata",
    name: "Mahabharata Stories",
    icon: "⚔️",
    thumb: "images/thumbnails/ShriMahabharat.webp",
    illustration: "images/thumbnails/ShriMahabharat.webp",
    description: "Great stories of courage, dharma, and life lessons."
  },
  {
    id: "moral",
    name: "Moral Stories",
    icon: "🌟",
    thumb: "images/thumbnails/Children.webp",
    illustration: "images/thumbnails/Children.webp",
    description: "Simple everyday stories that build kindness, honesty, and good habits."
  }
];

const videos = [
  { id: "wUWhfHEA6RA", category: "ramayana", title: "Rama and Sita's Journey", desc: "A gentle retelling of Rama, Sita, and Lakshmana's forest adventure.", thumb: "images/thumbnails/ShriRamayan.webp" },
  { id: "vEsw4xQ6-pw", category: "ramayana", title: "Hanuman Finds Sita", desc: "Watch the brave leap of Hanuman in Lanka.", thumb: "images/thumbnails/ShriHanuman.webp" },
  { id: "2R4Oot8XJYQ", category: "mahabharata", title: "Young Pandavas", desc: "Meet the Pandavas and learn about courage and unity.", thumb: "images/thumbnails/ShriMahabharat.webp" },
  { id: "Z9AqQ3fmbJY", category: "mahabharata", title: "Krishna's Wisdom", desc: "An introduction to Krishna's guidance in difficult times.", thumb: "images/thumbnails/krishna.webp" },
  { id: "ZL8M4m6nR8Q", category: "krishna", title: "Little Krishna and Butter", desc: "Fun childhood story about Krishna's playful side.", thumb: "images/thumbnails/krishna.webp" },
  { id: "vQ7Qf4r2k7s", category: "krishna", title: "Kaliya Mardan", desc: "See how Krishna protects friends with courage.", thumb: "images/thumbnails/krishna.webp" },
  { id: "hG1uV6m9kQ8", category: "krishna", title: "Govardhan Story", desc: "Krishna teaches villagers to trust dharma and protect nature with faith.", thumb: "images/thumbnails/krishna.webp" },
  { id: "aL4mT9wQ2nR", category: "krishna", title: "Krishna and Sudama", desc: "A touching friendship story showing humility, love, and gratitude.", thumb: "images/thumbnails/krishna.webp" },
  { id: "pD8sN3xL7fY", category: "krishna", title: "Krishna Lifting Govardhan", desc: "The young Lord lifts a mountain to shelter everyone from heavy rains.", thumb: "images/thumbnails/krishna.webp" },
  { id: "CGJz8f5n7AA", category: "hanuman", title: "Birth of Hanuman", desc: "A colorful story of Hanuman's divine birth.", thumb: "images/thumbnails/ShriHanuman.webp" },
  { id: "L8M9eN6xYxY", category: "hanuman", title: "Hanuman Lifts Mountain", desc: "Sanjeevani adventure with strength and devotion.", thumb: "images/thumbnails/ShriHanuman.webp" },
  { id: "kS5vB2qM9cH", category: "hanuman", title: "Hanuman and Sun", desc: "Little Hanuman leaps toward the sun, showing fearless energy and wonder.", thumb: "images/thumbnails/ShriHanuman.webp" },
  { id: "jR7nW4dP1xZ", category: "hanuman", title: "Hanuman meets Rama", desc: "A beautiful meeting where devotion begins and destiny unfolds.", thumb: "images/thumbnails/ShriHanuman.webp" },
  { id: "uQ6mE3tV8bK", category: "hanuman", title: "Hanuman in Lanka", desc: "Hanuman enters Lanka bravely to find Sita and serve Rama's mission.", thumb: "images/thumbnails/ShriHanuman.webp" },
  { id: "nC2yH8pL5mJ", category: "ramayana", title: "Rama Exile", desc: "Rama accepts exile with calm obedience, honoring truth and duty.", thumb: "images/thumbnails/ShriRamayan.webp" },
  { id: "qM9tK4vB7dF", category: "ramayana", title: "Sita Haran", desc: "The turning point where Sita is taken, calling for courage and resolve.", thumb: "images/thumbnails/ShriRamayan.webp" },
  { id: "sP3wL6nC1rT", category: "ramayana", title: "Bridge to Lanka", desc: "Vanara heroes build a mighty bridge through teamwork and devotion.", thumb: "images/thumbnails/ShriRamayan.webp" },
  { id: "bX4dR7mK2qN", category: "mahabharata", title: "Bhishma Vow", desc: "Bhishma's great promise shows sacrifice, discipline, and responsibility.", thumb: "images/thumbnails/ShriMahabharat.webp" },
  { id: "tV8cJ5pD3mQ", category: "mahabharata", title: "Arjuna and Krishna", desc: "Krishna guides Arjuna to choose righteousness with a clear mind.", thumb: "images/thumbnails/ShriMahabharat.webp" },
  { id: "yN1kF6sH4wR", category: "mahabharata", title: "Abhimanyu Story", desc: "Young Abhimanyu's bravery teaches dedication and warrior spirit.", thumb: "images/thumbnails/ShriMahabharat.webp" },
  { id: "Yx8Wj5b8zEo", category: "moral", title: "Speak the Truth", desc: "A short moral tale on honesty and kindness.", thumb: "images/thumbnails/Children.webp" },
  { id: "rj4X8mV8S5w", category: "moral", title: "Helping Friends", desc: "Why teamwork and compassion make us stronger.", thumb: "images/thumbnails/Children.webp" }
];

const quizByVideo = {
  default: [
    { q: "What value did this story teach?", choices: ["Kindness", "Being rude", "Ignoring friends"], answer: 0 },
    { q: "Who is a true hero?", choices: ["Someone who helps others", "Someone who lies", "Someone who is selfish"], answer: 0 },
    { q: "What should we do after learning a good lesson?", choices: ["Practice it at home", "Forget it", "Make fun of it"], answer: 0 }
  ],
  "wUWhfHEA6RA": [
    { q: "Who went to the forest with Rama?", choices: ["Sita and Lakshmana", "Only Hanuman", "Only Bharata"], answer: 0 },
    { q: "What quality shines in this journey?", choices: ["Loyalty", "Anger", "Greed"], answer: 0 }
  ],
  "vEsw4xQ6-pw": [
    { q: "Where did Hanuman find Sita?", choices: ["In Lanka", "In Ayodhya", "In Mathura"], answer: 0 },
    { q: "Hanuman shows us to be...", choices: ["Brave and devoted", "Lazy", "Dishonest"], answer: 0 }
  ],
  "ZL8M4m6nR8Q": [
    { q: "Little Krishna loved...", choices: ["Butter", "Stone", "Rain"], answer: 0 },
    { q: "This story teaches joyful...", choices: ["Innocence", "Pride", "Fear"], answer: 0 }
  ]
};

const page = document.body.dataset.page;
const protectedPages = new Set(["home", "categories", "video", "about", "profile", "quiz", "krishna-ai"]);
const FAVORITES_KEY = "favorites";
const HISTORY_KEY = "watchHistory";
const QUIZ_PROGRESS_KEY = "quizProgress";
const KRISHNA_AI_HISTORY_KEY = "krishnaAiExperienceHistory";
const KRISHNA_AI_TOPIC_KEY = "krishnaAiExperienceTopic";
let activeUtterance = null;

function safeReadArray(key) {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function safeWriteArray(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function safeReadObject(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getStoredUser() {
  return safeReadObject("dharmicUser");
}

function getVideoById(id) {
  return videos.find((video) => video.id === id);
}

function ensureUniqueVideos() {
  const seen = new Set();
  return videos.every((video) => {
    if (!video.id || seen.has(video.id)) return false;
    seen.add(video.id);
    return true;
  });
}

function getFavorites() {
  return safeReadArray(FAVORITES_KEY).filter((item) => item?.id && item?.title && item?.image);
}

function getFavoriteIds() {
  return new Set(getFavorites().map((item) => item.id));
}

function isFavorite(videoId) {
  return getFavoriteIds().has(videoId);
}

function toggleFavorite(video) {
  if (!video?.id) return false;

  const favorites = getFavorites();
  const exists = favorites.some((item) => item.id === video.id);

  if (exists) {
    safeWriteArray(FAVORITES_KEY, favorites.filter((item) => item.id !== video.id));
    return false;
  }

  favorites.push({
    id: video.id,
    title: video.title,
    image: video.thumb,
    category: video.category
  });
  safeWriteArray(FAVORITES_KEY, favorites);
  return true;
}

function getWatchHistory() {
  return safeReadArray(HISTORY_KEY).filter((item) => item?.id);
}

function markVideoWatched(video) {
  if (!video?.id) return;

  const history = getWatchHistory();
  const watchedEntry = {
    id: video.id,
    title: video.title,
    image: video.thumb,
    category: video.category,
    timestamp: new Date().toISOString()
  };

  const next = [watchedEntry, ...history.filter((item) => item.id !== video.id)];
  safeWriteArray(HISTORY_KEY, next);
}

function removeHistoryItem(videoId) {
  const history = getWatchHistory().filter((item) => item.id !== videoId);
  safeWriteArray(HISTORY_KEY, history);
}

function clearHistory() {
  safeWriteArray(HISTORY_KEY, []);
}

function getQuizProgress() {
  return safeReadArray(QUIZ_PROGRESS_KEY).filter((item) => item?.videoId);
}

function setQuizProgress(videoId, score, totalQuestions) {
  const progress = getQuizProgress();
  const nextEntry = {
    videoId,
    score,
    totalQuestions,
    completed: true,
    updatedAt: new Date().toISOString()
  };

  const existingIndex = progress.findIndex((item) => item.videoId === videoId);
  if (existingIndex >= 0) {
    progress[existingIndex] = nextEntry;
  } else {
    progress.push(nextEntry);
  }
  safeWriteArray(QUIZ_PROGRESS_KEY, progress);
}

function formatCategory(categoryId) {
  const found = categories.find((cat) => cat.id === categoryId);
  return found ? found.name : "Dharmic Story";
}

function showAuthMessage(message, type = "error") {
  const authMessage = document.getElementById("authMessage");
  if (!authMessage) return;
  authMessage.textContent = message;
  authMessage.classList.remove("success", "error");
  authMessage.classList.add(type);
}

function guardRoutes() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (protectedPages.has(page) && !isLoggedIn) {
    window.location.href = "login.html";
    return false;
  }

  if ((page === "login" || page === "signup") && isLoggedIn) {
    window.location.href = "index.html";
    return false;
  }

  return true;
}

function setupActiveNavLinks() {
  const navMap = {
    home: "index.html",
    categories: "categories.html",
    video: "categories.html",
    quiz: "quiz.html",
    about: "about.html",
    "krishna-ai": "krishna-ai.html",
    profile: "profile.html"
  };
  const activeHref = navMap[page];
  if (!activeHref) return;

  document.querySelectorAll(".navbar nav a").forEach((link) => {
    const isActive = link.getAttribute("href") === activeHref;
    link.classList.toggle("active", isActive);
  });
}

function setupSignupForm() {
  const form = document.getElementById("signupForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("signupName")?.value.trim();
    const email = document.getElementById("signupEmail")?.value.trim().toLowerCase();
    const password = document.getElementById("signupPassword")?.value;
    const confirmPassword = document.getElementById("signupConfirmPassword")?.value;

    if (!name || !email || !password || !confirmPassword) return showAuthMessage("Please fill all fields before signing up.");
    if (password !== confirmPassword) return showAuthMessage("Passwords do not match. Please try again.");

    localStorage.setItem("dharmicUser", JSON.stringify({ name, email, password }));
    showAuthMessage("Signup successful! Redirecting to login...", "success");
    setTimeout(() => { window.location.href = "login.html"; }, 900);
  });
}

function setupLoginForm() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail")?.value.trim().toLowerCase();
    const password = document.getElementById("loginPassword")?.value;
    const user = getStoredUser();

    if (!email || !password) return showAuthMessage("Please enter email and password.");
    if (!user || user.email !== email || user.password !== password) return showAuthMessage("Invalid login details. Please check and try again.");

    localStorage.setItem("isLoggedIn", true);
    showAuthMessage("Login successful! Welcome back 🌟", "success");
    setTimeout(() => { window.location.href = "index.html"; }, 700);
  });
}

function setupLogoutButton() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
  });
}

function setupGlobalBackground() {
  const scene = document.createElement("div");
  scene.className = "bg-scene";
  const sky = document.createElement("div");
  sky.className = "floating-sky";
  const canvas = document.createElement("canvas");
  canvas.className = "particle-canvas";

  document.body.prepend(canvas);
  document.body.prepend(sky);
  document.body.prepend(scene);

  for (let i = 0; i < 7; i += 1) {
    const cloud = document.createElement("span");
    cloud.className = "float-cloud";
    cloud.style.top = `${Math.random() * 90}%`;
    cloud.style.left = `${Math.random() * 80 - 20}%`;
    cloud.style.animationDuration = `${32 + Math.random() * 24}s`;
    cloud.style.animationDelay = `${-Math.random() * 25}s`;
    sky.appendChild(cloud);
  }

  const icons = ["✨", "⭐", "🌟"];
  for (let i = 0; i < 18; i += 1) {
    const star = document.createElement("span");
    star.className = i % 2 === 0 ? "float-star" : "float-sparkle";
    star.textContent = icons[i % icons.length];
    star.style.top = `${Math.random() * 95}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDuration = `${18 + Math.random() * 20}s`;
    star.style.animationDelay = `${-Math.random() * 15}s`;
    sky.appendChild(star);
  }

  startParticles(canvas);
}

function startParticles(canvas) {
  const ctx = canvas.getContext("2d");
  const particles = [];

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  for (let i = 0; i < 48; i += 1) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.4 + 0.8,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.24,
      a: Math.random() * 0.7 + 0.25
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -20) p.x = canvas.width + 20;
      if (p.x > canvas.width + 20) p.x = -20;
      if (p.y < -20) p.y = canvas.height + 20;
      if (p.y > canvas.height + 20) p.y = -20;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(189, 221, 255, ${p.a})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = "rgba(160, 213, 255, 0.8)";
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

function buildCategoryCards() {
  const categoryGrid = document.getElementById("categoryGrid");
  if (!categoryGrid) return;

  categoryGrid.innerHTML = categories.map((cat, index) => `
    <article class="category-card reveal-on-scroll" style="animation-delay:${index * 0.08}s">
      <img class="category-illustration" src="${cat.illustration}" alt="${cat.name} cute cartoon illustration" loading="lazy" />
      <h3>${cat.name}</h3>
      <p>${cat.description}</p>
    </article>
  `).join("");
}

function createVideoCard(video) {
  const favoritedClass = isFavorite(video.id) ? "is-favorite" : "";
  return `
    <article class="video-card reveal-on-scroll" data-video-card-id="${video.id}">
      <img class="video-thumb" src="${video.thumb}" alt="${video.title} thumbnail" loading="lazy" />
      <button class="favorite-btn ${favoritedClass}" data-favorite-id="${video.id}" aria-label="Toggle favorite for ${video.title}">❤️</button>
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
    const filteredVideos = videos.filter((video) => video.category === cat.id && video.title.toLowerCase().includes(query));
    if (!filteredVideos.length) return;

    const section = document.createElement("section");
    section.className = "video-row-section reveal-on-scroll";
    section.style.maxWidth = "1160px";
    section.style.marginInline = "auto";
    section.innerHTML = `
      <div class="video-row-header">
        <h2>${cat.icon} ${cat.name}</h2>
      </div>
      <div class="video-row-shell">
        <button class="row-btn prev" aria-label="Scroll left">◀</button>
        <div class="video-row">${filteredVideos.map(createVideoCard).join("")}</div>
        <button class="row-btn next" aria-label="Scroll right">▶</button>
      </div>
    `;
    container.appendChild(section);
  });

  if (!container.children.length) container.innerHTML = `<p style="text-align:center;">No videos found. Try another search name.</p>`;

  attachWatchButtonHandlers();
  attachFavoriteButtonHandlers();
  attachRowScrollHandlers();
  setupCardTiltEffects();
  observeRevealItems();
}

function attachRowScrollHandlers() {
  document.querySelectorAll(".video-row-shell").forEach((shell) => {
    const row = shell.querySelector(".video-row");
    const prev = shell.querySelector(".prev");
    const next = shell.querySelector(".next");
    if (!row || !prev || !next) return;

    const updateButtons = () => {
      const maxScrollLeft = Math.max(0, row.scrollWidth - row.clientWidth);
      const leftEdge = row.scrollLeft <= 2;
      const rightEdge = row.scrollLeft >= maxScrollLeft - 2;
      prev.disabled = leftEdge;
      next.disabled = rightEdge;
    };

    prev.addEventListener("click", () => row.scrollBy({ left: -340, behavior: "smooth" }));
    next.addEventListener("click", () => row.scrollBy({ left: 340, behavior: "smooth" }));
    row.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    window.requestAnimationFrame(updateButtons);
  });
}

function setupCardTiltEffects() {
  document.querySelectorAll(".video-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${px * 6}deg) rotateX(${py * -6}deg) scale(1.04)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });
}

function attachWatchButtonHandlers() {
  document.querySelectorAll(".watch-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedVideo = getVideoById(btn.dataset.videoId);
      if (selectedVideo) markVideoWatched(selectedVideo);
      window.location.href = `video.html?id=${btn.dataset.videoId}`;
    });
  });
}

function animateHeart(button) {
  button.classList.add("burst");
  setTimeout(() => button.classList.remove("burst"), 300);
}

function attachFavoriteButtonHandlers() {
  document.querySelectorAll(".favorite-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const video = getVideoById(btn.dataset.favoriteId);
      if (!video) return;
      const isNowFavorite = toggleFavorite(video);
      btn.classList.toggle("is-favorite", isNowFavorite);
      animateHeart(btn);

      if (page === "profile") renderProfileSections();
    });
  });
}

function speakStory(selected) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(`${selected.title}. ${selected.desc}`);
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find((voice) => /female|child|kids/i.test(voice.name)) || voices[0];
  if (preferred) utterance.voice = preferred;
  utterance.rate = 0.95;
  utterance.pitch = 1.12;
  activeUtterance = utterance;

  const status = document.getElementById("speechStatus");
  if (status) status.textContent = "Reading story...";

  utterance.onend = () => { if (status) status.textContent = "Finished reading. Great listening! 🎉"; };
  window.speechSynthesis.speak(utterance);
}

function loadVideoPage() {
  if (page !== "video") return;

  const params = new URLSearchParams(window.location.search);
  const videoId = params.get("id") || videos[0].id;
  const selected = getVideoById(videoId) || videos[0];

  const card = document.getElementById("videoPlayerCard");
  if (!card) return;

  card.innerHTML = `
    <h1>${selected.title}</h1>
    <iframe src="https://www.youtube.com/embed/${selected.id}" title="${selected.title}" allowfullscreen></iframe>
    <p>${selected.desc}</p>
    <div class="story-controls">
      <button id="listenStoryBtn" class="story-btn">🔊 Listen Story</button>
      <button id="pauseStoryBtn" class="story-btn secondary">⏸ Pause / Resume</button>
      <button class="story-btn favorite-story-btn ${isFavorite(selected.id) ? "is-favorite" : ""}" data-favorite-id="${selected.id}">❤️ Favorite</button>
    </div>
    <p id="speechStatus">Tap listen to hear this story aloud.</p>
  `;

  markVideoWatched(selected);

  document.getElementById("listenStoryBtn")?.addEventListener("click", () => speakStory(selected));
  document.getElementById("pauseStoryBtn")?.addEventListener("click", () => {
    if (!("speechSynthesis" in window) || !activeUtterance) return;
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    else window.speechSynthesis.pause();
  });

  const recommended = videos.filter((v) => v.id !== selected.id).slice(0, 5);
  const recommendedList = document.getElementById("recommendedList");
  if (!recommendedList) return;

  recommendedList.innerHTML = recommended.map((item) => `
    <article class="recommend-item">
      <img src="${item.thumb}" alt="${item.title}" loading="lazy" />
      <div>
        <h4>${item.title}</h4>
        <div class="recommend-actions">
          <button class="watch-btn" data-video-id="${item.id}">▶ Watch</button>
          <button class="favorite-btn ${isFavorite(item.id) ? "is-favorite" : ""}" data-favorite-id="${item.id}">❤️</button>
        </div>
      </div>
    </article>
  `).join("");

  attachWatchButtonHandlers();
  attachFavoriteButtonHandlers();
}

function getQuestionSet(videoId) {
  return quizByVideo[videoId] || quizByVideo.default.slice(0, 3);
}

function renderQuizPage() {
  if (page !== "quiz") return;
  const quizGrid = document.getElementById("quizGrid");
  if (!quizGrid) return;

  const quizProgress = getQuizProgress();

  quizGrid.innerHTML = videos.map((video) => {
    const questions = getQuestionSet(video.id);
    const progress = quizProgress.find((item) => item.videoId === video.id);

    return `
      <article class="quiz-box reveal-on-scroll" data-quiz-video-id="${video.id}">
        <h3>${video.title}</h3>
        <p class="quiz-subtext">${formatCategory(video.category)}</p>
        ${questions.map((question, qIndex) => `
          <article class="quiz-item" data-question-index="${qIndex}">
            <p>${qIndex + 1}. ${question.q}</p>
            <div class="quiz-choices">
              ${question.choices.map((choice, cIndex) => `<button class="choice-btn" data-choice="${cIndex}">${choice}</button>`).join("")}
            </div>
          </article>
        `).join("")}
        <button class="story-btn submit-quiz-btn">Submit Quiz</button>
        <p class="quiz-feedback">${progress?.completed ? `Last score: ${progress.score}/${progress.totalQuestions} 🎯` : "Choose one answer per question, then submit."}</p>
      </article>
    `;
  }).join("");

  quizGrid.querySelectorAll(".quiz-box").forEach((card) => {
    card.querySelectorAll(".quiz-item").forEach((item) => {
      item.querySelectorAll(".choice-btn").forEach((button) => {
        button.addEventListener("click", () => {
          item.querySelectorAll(".choice-btn").forEach((choice) => choice.classList.remove("selected"));
          button.classList.add("selected");
        });
      });
    });

    card.querySelector(".submit-quiz-btn")?.addEventListener("click", () => {
      const videoId = card.dataset.quizVideoId;
      const questions = getQuestionSet(videoId);
      let score = 0;

      card.querySelectorAll(".quiz-item").forEach((item, qIndex) => {
        const selectedButton = item.querySelector(".choice-btn.selected");
        item.querySelectorAll(".choice-btn").forEach((choice, cIndex) => {
          choice.classList.remove("correct", "wrong");
          if (cIndex === questions[qIndex].answer) choice.classList.add("correct");
        });

        if (selectedButton && Number(selectedButton.dataset.choice) === questions[qIndex].answer) {
          score += 1;
        } else if (selectedButton) {
          selectedButton.classList.add("wrong");
        }
      });

      setQuizProgress(videoId, score, questions.length);
      const feedback = card.querySelector(".quiz-feedback");
      if (feedback) {
        feedback.textContent = score === questions.length
          ? `🎉 Perfect! You scored ${score}/${questions.length}!`
          : `😄 Great try! You scored ${score}/${questions.length}.`;
      }
    });
  });

  observeRevealItems();
}

function animateCounter(element, target) {
  const duration = 800;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    element.textContent = String(Math.round(target * progress));
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function renderStats() {
  const statsGrid = document.getElementById("statsGrid");
  if (!statsGrid) return;

  const watched = getWatchHistory().length;
  const quizCompleted = getQuizProgress().filter((item) => item.completed).length;
  const favorites = getFavorites().length;

  statsGrid.innerHTML = `
    <article class="video-card profile-video-card stat-card"><div class="video-content"><h4>🎬 Videos Watched</h4><p class="stat-number" data-target="${watched}">0</p></div></article>
    <article class="video-card profile-video-card stat-card"><div class="video-content"><h4>🎮 Quizzes Completed</h4><p class="stat-number" data-target="${quizCompleted}">0</p></div></article>
    <article class="video-card profile-video-card stat-card"><div class="video-content"><h4>❤️ Favorites Saved</h4><p class="stat-number" data-target="${favorites}">0</p></div></article>
  `;

  statsGrid.querySelectorAll(".stat-number").forEach((el) => animateCounter(el, Number(el.dataset.target || 0)));
}

function renderProfileSections() {
  if (page !== "profile") return;

  const user = getStoredUser();
  const favorites = getFavorites();
  const history = getWatchHistory().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const info = document.getElementById("profileUserInfo");
  const favoritesGrid = document.getElementById("favoritesGrid");
  const progressGrid = document.getElementById("progressGrid");
  if (!info || !favoritesGrid || !progressGrid) return;

  info.innerHTML = `
    <p><strong>Name:</strong> ${user?.name || "Little Learner"}</p>
    <p><strong>Email:</strong> ${user?.email || "Not available"}</p>
  `;

  favoritesGrid.innerHTML = favorites.length
    ? favorites.map((item) => `
      <article class="video-card profile-video-card reveal-on-scroll">
        <img class="video-thumb" src="${item.image}" alt="${item.title}" loading="lazy" />
        <button class="favorite-btn is-favorite" data-favorite-id="${item.id}">❤️</button>
        <div class="video-content">
          <h4>${item.title}</h4>
          <p>${formatCategory(item.category)}</p>
          <button class="watch-btn" data-video-id="${item.id}">▶ Watch</button>
        </div>
      </article>
    `).join("")
    : '<p class="empty-state">No favorites yet ❤️</p>';

  progressGrid.innerHTML = history.length
    ? history.map((item) => `
      <article class="video-card profile-video-card reveal-on-scroll">
        <div class="video-content">
          <h4>${item.title}</h4>
          <p>Watched on ${new Date(item.timestamp).toLocaleString()}</p>
          <span class="watched-label">Watched ✅</span>
          <div class="inline-actions">
            <button class="watch-btn" data-video-id="${item.id}">▶ Watch Again</button>
            <button class="story-btn remove-history-btn" data-history-id="${item.id}">Remove</button>
          </div>
        </div>
      </article>
    `).join("")
    : '<p class="empty-state">No videos watched yet 🎬</p>';

  renderStats();
  attachWatchButtonHandlers();
  attachFavoriteButtonHandlers();
  observeRevealItems();
}

function setupProfileActions() {
  if (page !== "profile") return;

  const editBtn = document.getElementById("editProfileBtn");
  const clearBtn = document.getElementById("clearHistoryBtn");
  const progressGrid = document.getElementById("progressGrid");
  const modal = document.getElementById("editProfileModal");
  const form = document.getElementById("editProfileForm");
  const cancelBtn = document.getElementById("cancelEditProfileBtn");
  const nameInput = document.getElementById("editProfileName");
  const emailInput = document.getElementById("editProfileEmail");

  editBtn?.addEventListener("click", () => {
    const user = getStoredUser() || {};
    if (nameInput) nameInput.value = user.name || "";
    if (emailInput) emailInput.value = user.email || "";
    modal?.classList.add("visible");
    modal?.setAttribute("aria-hidden", "false");
  });

  cancelBtn?.addEventListener("click", () => {
    modal?.classList.remove("visible");
    modal?.setAttribute("aria-hidden", "true");
  });

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("visible");
      modal.setAttribute("aria-hidden", "true");
    }
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const current = getStoredUser() || {};
    const updated = {
      ...current,
      name: nameInput?.value.trim() || "Little Learner",
      email: emailInput?.value.trim().toLowerCase() || ""
    };
    localStorage.setItem("dharmicUser", JSON.stringify(updated));
    modal?.classList.remove("visible");
    modal?.setAttribute("aria-hidden", "true");
    renderProfileSections();
  });

  clearBtn?.addEventListener("click", () => {
    clearHistory();
    renderProfileSections();
  });

  progressGrid?.addEventListener("click", (event) => {
    const button = event.target.closest(".remove-history-btn");
    if (!button) return;
    removeHistoryItem(button.dataset.historyId);
    renderProfileSections();
  });
}

function setupSearch() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;
  searchInput.addEventListener("input", (event) => buildCategoryVideoSections(event.target.value));
}

function observeRevealItems() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.18 });

  document.querySelectorAll(".reveal-on-scroll").forEach((element) => observer.observe(element));
}

function setupKrishnaAIExperience() {
  if (page !== "krishna-ai") return;

  const messagesContainer = document.getElementById("krishnaChatMessages");
  const topicButtons = Array.from(document.querySelectorAll(".krishna-topic-btn"));
  const promptButtons = Array.from(document.querySelectorAll(".krishna-prompt-btn"));
  const chatForm = document.getElementById("krishnaChatForm");
  const chatInput = document.getElementById("krishnaChatInput");
  const voiceInputBtn = document.getElementById("voiceInputBtn");
  const listenResponseBtn = document.getElementById("listenResponseBtn");
  const voiceStatus = document.getElementById("voiceStatus");
  const breathingCircle = document.getElementById("breathingCircle");
  const breathingText = document.getElementById("breathingText");
  const startCalmBtn = document.getElementById("startCalmBtn");
  const saveChatBtn = document.getElementById("saveChatBtn");
  const clearChatBtn = document.getElementById("clearChatBtn");
  const savedChatsList = document.getElementById("savedChatsList");

  if (!messagesContainer || !chatForm || !chatInput || !savedChatsList) return;

  const KRISHNA_SYSTEM_PROMPT = `You are Krishna, a wise, kind, and loving guide for children.

Your purpose:
- Answer ONLY dharmic questions
- Teach kindness, honesty, courage, and good values
- Use simple language for kids
- Give short, clear answers (3–5 lines)

Rules:
- If question is NOT related to dharma → politely refuse and redirect
- Always be positive and calm
- Sometimes include small Krishna or Mahabharata examples
- Never give harmful or unrelated answers
- Speak like a friendly guide

If user feels sad or anxious:
- comfort them
- give calming advice

End responses with positivity.`;
  const KRISHNA_SAVED_CHATS_KEY = "krishnaAiSavedChats";
  const KRISHNA_MESSAGE_LIMIT = 28;
  const NON_DHARMIC_MESSAGE = "I am here to guide you in dharma and good values, dear child 🌼. Please ask something related to kindness, courage, or life lessons.";
  const API_URL = "https://api.groq.com/openai/v1/chat/completions";

  let activeTopic = localStorage.getItem(KRISHNA_AI_TOPIC_KEY) || "learning";
  let activeChatId = null;
  let lastKrishnaResponse = "Dear child, I am here with calm guidance and love.";
  let messages = [{ role: "system", content: KRISHNA_SYSTEM_PROMPT }];

  const readSavedChats = () => safeReadArray(KRISHNA_SAVED_CHATS_KEY)
    .filter((chat) => chat?.id && chat?.title && Array.isArray(chat?.messages));

  const writeSavedChats = (savedChats) => {
    safeWriteArray(KRISHNA_SAVED_CHATS_KEY, savedChats.slice(-25));
  };

  const saveActiveHistory = () => {
    safeWriteArray(KRISHNA_AI_HISTORY_KEY, messages.filter((item) => item.role !== "system"));
  };

  const readActiveHistory = () => safeReadArray(KRISHNA_AI_HISTORY_KEY)
    .filter((item) => item?.role && item?.content)
    .slice(-KRISHNA_MESSAGE_LIMIT);

  const scrollToBottom = () => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const createBubble = (role, text) => {
    const bubble = document.createElement("article");
    bubble.className = `krishna-message ${role === "assistant" ? "krishna" : role}`;
    bubble.textContent = text;
    messagesContainer.appendChild(bubble);
    scrollToBottom();
  };

  const createTypingBubble = () => {
    const typing = document.createElement("article");
    typing.className = "krishna-message krishna typing";
    typing.innerHTML = '<span></span><span></span><span></span><em class="krishna-typing-text">Krishna is typing...</em>';
    messagesContainer.appendChild(typing);
    scrollToBottom();
    return typing;
  };

  const updateTopicButtons = () => {
    topicButtons.forEach((button) => {
      const selected = button.dataset.topic === activeTopic;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", selected ? "true" : "false");
    });
  };

  const toTitle = (message) => {
    const words = (message || "New Krishna Chat").trim().split(/\s+/).filter(Boolean).slice(0, 5);
    return words.join(" ") || "New Krishna Chat";
  };

  const isDharmicMessage = (text) => {
    const normalized = text.toLowerCase();
    const matchers = [
      "dharma", "dharmic", "kind", "kindness", "honest", "honesty", "truth", "brave", "courage", "respect", "friend",
      "value", "virtue", "calm", "peace", "anxiety", "sad", "sadness", "scared", "fear", "lesson", "duty", "forgive",
      "krishna", "gita", "mahabharata", "ramayana", "emotion", "angry", "help", "seva", "gratitude", "good"
    ];
    return matchers.some((word) => normalized.includes(word));
  };

  async function getAIResponse(userMessage, chatHistory) {
    const apiKey = window.KRISHNA_AI_CONFIG?.GROQ_API_KEY;
    if (!apiKey) {
      return {
        ok: false,
        reply: "Krishna needs blessing (API key). Please configure."
      };
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: chatHistory,
          temperature: 0.6,
          max_tokens: 220
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq request failed (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content?.trim();
      return {
        ok: true,
        reply: content || "Let us keep walking the path of dharma together 🌼"
      };
    } catch (error) {
      console.error("Krishna AI request error:", error);
      return {
        ok: false,
        reply: "",
        error
      };
    }
  }

  const buildDharmicFallback = (message) => {
    const normalized = message.toLowerCase();
    if (normalized.includes("scared") || normalized.includes("fear") || normalized.includes("anxiety")) {
      return "Dear child, when fear visits, take a slow breath and remember Krishna is with you. Speak truth, stay kind, and take one brave step at a time 🌿";
    }
    if (normalized.includes("sad") || normalized.includes("cry") || normalized.includes("alone")) {
      return "Dear child, your heart is precious. Share your feelings with someone you trust, chant a small prayer, and do one kind action today—light returns through love 🌼";
    }
    if (normalized.includes("angry") || normalized.includes("fight")) {
      return "Pause, breathe, and choose gentle words. Real strength is self-control. Krishna teaches us to protect peace first, then act with wisdom 🕊️";
    }
    return "Dear child, choose truth, kindness, and courage in this moment. Do your duty calmly, help someone nearby, and keep faith—this is the path of dharma ✨";
  };

  const renderSavedChats = () => {
    const savedChats = readSavedChats();
    savedChatsList.innerHTML = "";

    if (!savedChats.length) {
      const empty = document.createElement("p");
      empty.className = "muted-note";
      empty.textContent = "No saved chats yet.";
      savedChatsList.appendChild(empty);
      return;
    }

    savedChats.slice().reverse().forEach((chat) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "krishna-saved-chat-item";
      if (chat.id === activeChatId) button.classList.add("active");
      button.textContent = chat.title;
      button.addEventListener("click", () => {
        activeChatId = chat.id;
        messages = [{ role: "system", content: KRISHNA_SYSTEM_PROMPT }, ...chat.messages.filter((item) => item.role !== "system")].slice(-KRISHNA_MESSAGE_LIMIT);
        messagesContainer.innerHTML = "";
        messages.filter((item) => item.role !== "system").forEach((item) => createBubble(item.role, item.content));
        const lastAssistant = [...messages].reverse().find((item) => item.role === "assistant");
        if (lastAssistant) lastKrishnaResponse = lastAssistant.content;
        saveActiveHistory();
        renderSavedChats();
      });
      savedChatsList.appendChild(button);
    });
  };

  const appendAndRender = (role, content) => {
    messages.push({ role, content });
    if (messages.length > KRISHNA_MESSAGE_LIMIT) {
      messages = [messages[0], ...messages.slice(-(KRISHNA_MESSAGE_LIMIT - 1))];
    }
    createBubble(role, content);
    saveActiveHistory();
  };

  const handleUserMessage = async (value) => {
    const text = value.trim();
    if (!text) return;

    appendAndRender("user", text);

    const typing = createTypingBubble();
    let reply = NON_DHARMIC_MESSAGE;

    try {
      if (isDharmicMessage(text)) {
        const aiResult = await getAIResponse(text, messages);
        reply = aiResult.reply || buildDharmicFallback(text);
        if (!aiResult.ok && aiResult.error) {
          console.warn("Using Krishna AI fallback response due to API issue.");
        }
      }
    } catch {
      reply = buildDharmicFallback(text);
    }

    typing.remove();
    appendAndRender("assistant", reply);
    lastKrishnaResponse = reply;
  };

  const saveCurrentChat = () => {
    const onlyConversation = messages.filter((item) => item.role !== "system");
    const firstUserMessage = onlyConversation.find((item) => item.role === "user")?.content;

    if (!firstUserMessage) {
      voiceStatus.textContent = "Start a conversation first, then save your chat.";
      return;
    }

    const savedChats = readSavedChats();
    const chatId = activeChatId || Date.now();
    const payload = {
      id: chatId,
      title: toTitle(firstUserMessage),
      messages: onlyConversation
    };

    const existingIndex = savedChats.findIndex((item) => item.id === chatId);
    if (existingIndex >= 0) savedChats[existingIndex] = payload;
    else savedChats.push(payload);

    activeChatId = chatId;
    writeSavedChats(savedChats);
    renderSavedChats();
    voiceStatus.textContent = "Chat saved with love 🌼";
  };

  const clearChat = () => {
    messages = [{ role: "system", content: KRISHNA_SYSTEM_PROMPT }];
    activeChatId = null;
    messagesContainer.innerHTML = "";
    const welcomeMessage = "Dear child, welcome to Krishna AI Experience. Choose a topic and I will guide you with love.";
    createBubble("assistant", welcomeMessage);
    messages.push({ role: "assistant", content: welcomeMessage });
    lastKrishnaResponse = welcomeMessage;
    saveActiveHistory();
    renderSavedChats();
  };

  topicButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeTopic = button.dataset.topic || "learning";
      localStorage.setItem(KRISHNA_AI_TOPIC_KEY, activeTopic);
      updateTopicButtons();
      chatInput.placeholder = `Share your ${activeTopic} thoughts with Krishna...`;
    });
  });

  promptButtons.forEach((button) => {
    button.addEventListener("click", () => {
      chatInput.value = button.textContent || "";
      chatInput.focus();
    });
  });

  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = chatInput.value;
    chatInput.value = "";
    handleUserMessage(message);
  });

  saveChatBtn?.addEventListener("click", saveCurrentChat);
  clearChatBtn?.addEventListener("click", clearChat);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.addEventListener("result", (event) => {
      const transcript = event.results[0]?.[0]?.transcript || "";
      chatInput.value = transcript.trim();
      chatInput.focus();
      voiceStatus.textContent = "Voice captured. You can send it now.";
    });

    recognition.addEventListener("error", () => {
      voiceStatus.textContent = "I could not hear clearly. Please try once more.";
    });

    voiceInputBtn?.addEventListener("click", () => {
      voiceStatus.textContent = "Listening with care...";
      recognition.start();
    });
  } else if (voiceInputBtn) {
    voiceInputBtn.disabled = true;
    voiceStatus.textContent = "Voice input is unavailable in this browser.";
  }

  listenResponseBtn?.addEventListener("click", () => {
    if (!("speechSynthesis" in window)) {
      voiceStatus.textContent = "Voice response is unavailable in this browser.";
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(lastKrishnaResponse);
    utterance.lang = "en-US";
    utterance.pitch = 1;
    utterance.rate = 0.95;
    utterance.onstart = () => { voiceStatus.textContent = "Krishna is speaking..."; };
    utterance.onend = () => { voiceStatus.textContent = "Blessing complete. Press listen again anytime."; };
    window.speechSynthesis.speak(utterance);
  });

  const breathingPrompts = [
    "Breathe in gently for 4 counts...",
    "Hold softly for 2 counts...",
    "Breathe out slowly for 6 counts...",
    "Relax your shoulders. You are safe and loved."
  ];
  let breathingTimer = null;

  startCalmBtn?.addEventListener("click", () => {
    breathingCircle?.classList.add("active");
    let step = 0;
    breathingText.textContent = breathingPrompts[0];

    if (breathingTimer) window.clearInterval(breathingTimer);
    breathingTimer = window.setInterval(() => {
      step = (step + 1) % breathingPrompts.length;
      breathingText.textContent = breathingPrompts[step];
    }, 3500);
  });

  const storedHistory = readActiveHistory();
  if (storedHistory.length) {
    messages = [{ role: "system", content: KRISHNA_SYSTEM_PROMPT }, ...storedHistory];
    storedHistory.forEach((item) => createBubble(item.role, item.content));
    const lastAssistant = [...storedHistory].reverse().find((item) => item.role === "assistant");
    if (lastAssistant) lastKrishnaResponse = lastAssistant.content;
  } else {
    const welcomeMessage = "Dear child, welcome to Krishna AI Experience. Choose a topic and I will guide you with love.";
    messages.push({ role: "assistant", content: welcomeMessage });
    createBubble("assistant", welcomeMessage);
    saveActiveHistory();
  }

  updateTopicButtons();
  renderSavedChats();
}

function init() {
  if (!guardRoutes()) return;
  if (!ensureUniqueVideos()) console.warn("Video IDs must be unique.");

  setupGlobalBackground();
  setupActiveNavLinks();
  setupSignupForm();
  setupLoginForm();
  setupLogoutButton();
  buildCategoryCards();
  buildCategoryVideoSections();
  setupSearch();
  loadVideoPage();
  renderQuizPage();
  renderProfileSections();
  setupProfileActions();
  setupCardTiltEffects();
  attachFavoriteButtonHandlers();
  observeRevealItems();
  setupKrishnaAIExperience();
}

init();
