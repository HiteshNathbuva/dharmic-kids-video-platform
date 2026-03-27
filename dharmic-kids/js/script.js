/*
  Shared data + helpers for Dharmic Kids pages.
  This script controls auth, global animations, category rendering,
  favorites, watch history, quizzes, profile dashboard, and interactions.
*/

const categories = [
  { id: "krishna", name: "Krishna Stories", icon: "🦚", thumb: "images/thumbnails/krishna.webp", illustration: "images/thumbnails/krishna.webp" },
  { id: "hanuman", name: "Hanuman Stories", icon: "🐒", thumb: "images/thumbnails/ShriHanuman.webp", illustration: "images/thumbnails/ShriHanuman.webp" },
  { id: "ramayana", name: "Ramayana Stories", icon: "🏹", thumb: "images/thumbnails/ShriRamayan.webp", illustration: "images/thumbnails/ShriRamayan.webp" },
  { id: "mahabharata", name: "Mahabharata Stories", icon: "⚔️", thumb: "images/thumbnails/ShriMahabharat.webp", illustration: "images/thumbnails/ShriMahabharat.webp" },
  { id: "moral", name: "Moral Stories", icon: "🌟", thumb: "images/thumbnails/Children.webp", illustration: "images/thumbnails/Children.webp" }
];

const videos = [
  { id: "wUWhfHEA6RA", category: "ramayana", title: "Rama and Sita's Journey", desc: "A gentle retelling of Rama, Sita, and Lakshmana's forest adventure.", thumb: "images/thumbnails/ShriRamayan.webp" },
  { id: "vEsw4xQ6-pw", category: "ramayana", title: "Hanuman Finds Sita", desc: "Watch the brave leap of Hanuman in Lanka.", thumb: "images/thumbnails/ShriHanuman.webp" },
  { id: "2R4Oot8XJYQ", category: "mahabharata", title: "Young Pandavas", desc: "Meet the Pandavas and learn about courage and unity.", thumb: "images/thumbnails/ShriMahabharat.webp" },
  { id: "Z9AqQ3fmbJY", category: "mahabharata", title: "Krishna's Wisdom", desc: "An introduction to Krishna's guidance in difficult times.", thumb: "images/thumbnails/krishna.webp" },
  { id: "ZL8M4m6nR8Q", category: "krishna", title: "Little Krishna and Butter", desc: "Fun childhood story about Krishna's playful side.", thumb: "images/thumbnails/krishna.webp" },
  { id: "vQ7Qf4r2k7s", category: "krishna", title: "Kaliya Mardan", desc: "See how Krishna protects friends with courage.", thumb: "images/thumbnails/krishna.webp" },
  { id: "CGJz8f5n7AA", category: "hanuman", title: "Birth of Hanuman", desc: "A colorful story of Hanuman's divine birth.", thumb: "images/thumbnails/ShriHanuman.webp" },
  { id: "L8M9eN6xYxY", category: "hanuman", title: "Hanuman Lifts Mountain", desc: "Sanjeevani adventure with strength and devotion.", thumb: "images/thumbnails/ShriHanuman.webp" },
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
      <p>Animated dharmic stories for kids.</p>
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

    prev?.addEventListener("click", () => row.scrollBy({ left: -340, behavior: "smooth" }));
    next?.addEventListener("click", () => row.scrollBy({ left: 340, behavior: "smooth" }));
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

  if (!messagesContainer || !chatForm || !chatInput) return;

  const knowledgeBase = {
    learning: {
      intro: "Let us learn with joy, dear child.",
      defaults: [
        "Dharma means choosing truth, kindness, and responsibility in everyday moments.",
        "You can practice dharma by respecting elders, speaking gently, and helping friends.",
        "Krishna teaches that a pure heart and good actions make life bright."
      ],
      keywords: {
        truth: "Truth keeps your mind light and your heart peaceful. Even if it feels hard, honesty is strength.",
        respect: "Respect is dharma in action: kind words, listening carefully, and showing gratitude.",
        help: "Helping others is seva. Small acts like sharing toys or comforting a friend are powerful."
      }
    },
    anxiety: {
      intro: "I am with you. Let us calm your heart slowly.",
      defaults: [
        "Place one hand on your heart. Breathe in for 4 counts, hold 2, and breathe out for 6.",
        "You are safe in this moment. Imagine Krishna's flute filling your heart with soft light.",
        "When worry comes, whisper: 'I am brave, I am loved, I am guided.'"
      ],
      keywords: {
        scared: "It is okay to feel scared. Take a deep breath in... now breathe out slowly. Krishna stays beside you.",
        exam: "Before study or exams, take three calm breaths and say: 'I will try my best with faith and focus.'",
        sleep: "For bedtime worries, breathe slowly and imagine stars blessing your room with peace."
      }
    },
    courage: {
      intro: "True courage is a calm heart doing what is right.",
      defaults: [
        "Krishna guided Arjuna to stand for truth with clarity and compassion.",
        "Courage grows when you take one small brave step at a time.",
        "Confidence means saying: 'I can learn, I can improve, I can try again.'"
      ],
      keywords: {
        fear: "Bravery is not zero fear. Bravery is doing the right thing even when fear is present.",
        speak: "If you are afraid to speak, start with one sentence, a steady breath, and gentle eye contact.",
        fail: "Every mistake is a lesson. Krishna smiles when you keep trying with sincerity."
      }
    },
    kindness: {
      intro: "Kindness is one of your brightest superpowers.",
      defaults: [
        "A kind child notices feelings and offers comfort, sharing, and gentle words.",
        "Friendship grows when we listen, include others, and forgive with love.",
        "Krishna's joy shines where hearts are caring and respectful."
      ],
      keywords: {
        friend: "A good friend listens, includes, and speaks kindly, even during disagreement.",
        angry: "When upset, pause, breathe, and choose gentle words. Kindness can calm conflict.",
        sharing: "Sharing toys, time, or attention teaches your heart to be generous."
      }
    },
    lessons: {
      intro: "Every day brings a new life lesson.",
      defaults: [
        "From the Gita we learn: focus on good actions, not only on results.",
        "Life lessons become wisdom when we practice them daily.",
        "Patience, honesty, and gratitude make your character strong."
      ],
      keywords: {
        duty: "Duty means doing what is right for your role: student, sibling, friend, and child.",
        choice: "When choices feel hard, ask: Is this truthful, kind, and helpful?",
        success: "Real success is becoming a good person while learning new skills."
      }
    },
    sadness: {
      intro: "Your feelings matter deeply. You are not alone.",
      defaults: [
        "When sadness comes, let tears flow, then place your hand on your heart and breathe slowly.",
        "Talk to a trusted grown-up. Sharing feelings is wise and brave.",
        "Krishna's love stays with you in quiet moments, bringing gentle hope."
      ],
      keywords: {
        lonely: "When lonely, connect with someone kind, draw your feelings, and take soft breaths.",
        cry: "Crying is okay. Emotions are waves; they pass. You are strong and loved.",
        hurt: "If someone hurt your feelings, speak to a trusted adult so you feel safe and supported."
      }
    }
  };

  let activeTopic = localStorage.getItem(KRISHNA_AI_TOPIC_KEY) || "learning";
  if (!knowledgeBase[activeTopic]) activeTopic = "learning";
  let lastKrishnaResponse = "Dear child, I am here with calm guidance and love.";

  const readHistory = () => safeReadArray(KRISHNA_AI_HISTORY_KEY).filter((item) => item?.role && item?.text);

  const saveHistory = (history) => {
    safeWriteArray(KRISHNA_AI_HISTORY_KEY, history.slice(-40));
  };

  const scrollToBottom = () => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const createBubble = (role, text) => {
    const bubble = document.createElement("article");
    bubble.className = `krishna-message ${role}`;
    bubble.textContent = text;
    messagesContainer.appendChild(bubble);
    scrollToBottom();
    return bubble;
  };

  const createTypingBubble = () => {
    const typing = document.createElement("article");
    typing.className = "krishna-message krishna typing";
    typing.innerHTML = '<span></span><span></span><span></span>';
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

  const findKeywordReply = (topicConfig, message) => {
    const normalized = message.toLowerCase();
    return Object.entries(topicConfig.keywords).find(([keyword]) => normalized.includes(keyword))?.[1] || "";
  };

  const topicReply = (message) => {
    const config = knowledgeBase[activeTopic];
    const keywordReply = findKeywordReply(config, message);
    if (keywordReply) return `${config.intro} ${keywordReply}`;

    const pickIndex = (message.length + activeTopic.length) % config.defaults.length;
    return `${config.intro} ${config.defaults[pickIndex]}`;
  };

  const sendKrishnaReply = (message) => {
    const typing = createTypingBubble();

    window.setTimeout(() => {
      typing.remove();
      const reply = topicReply(message);
      createBubble("krishna", reply);
      lastKrishnaResponse = reply;
      const history = readHistory();
      history.push({ role: "krishna", text: reply, topic: activeTopic });
      saveHistory(history);
    }, 700);
  };

  const handleUserMessage = (value) => {
    const text = value.trim();
    if (!text) return;

    createBubble("user", text);
    const history = readHistory();
    history.push({ role: "user", text, topic: activeTopic });
    saveHistory(history);

    sendKrishnaReply(text);
  };

  topicButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeTopic = button.dataset.topic || "learning";
      localStorage.setItem(KRISHNA_AI_TOPIC_KEY, activeTopic);
      updateTopicButtons();
      createBubble("krishna", `Topic selected: ${button.textContent}. I will guide you with this focus now.`);
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

  // Voice input: converts spoken words into text.
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

  // Voice output: reads the latest Krishna guidance aloud.
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

  // Guided calming loop with breathing animation and prompts.
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

  const storedHistory = readHistory();
  if (storedHistory.length) {
    storedHistory.forEach((item) => createBubble(item.role, item.text));
    const lastKrishna = [...storedHistory].reverse().find((item) => item.role === "krishna");
    if (lastKrishna) lastKrishnaResponse = lastKrishna.text;
  } else {
    createBubble("krishna", "Dear child, welcome to Krishna AI Experience. Choose a topic and I will guide you with love.");
  }

  updateTopicButtons();
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
