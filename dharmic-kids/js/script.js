/*
  Shared data + helpers for Dharmic Kids pages.
  This script controls global background animation, category rendering,
  Netflix-like video rows, storytelling voice control, quiz interactions,
  theme toggling, and scroll reveal animations.
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
  ]
};

const page = document.body.dataset.page;
let activeUtterance = null;

function setupThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  const storedTheme = localStorage.getItem("dharmic-theme");

  if (storedTheme === "dark") {
    document.body.classList.add("dark");
    if (toggle) toggle.textContent = "☀️";
  }

  toggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const dark = document.body.classList.contains("dark");
    localStorage.setItem("dharmic-theme", dark ? "dark" : "light");
    toggle.textContent = dark ? "☀️" : "🌙";
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

  categoryGrid.innerHTML = categories
    .map((cat, index) => `
      <article class="category-card reveal-on-scroll" style="animation-delay:${index * 0.08}s">
        <img class="category-illustration" src="${cat.illustration}" alt="${cat.name} cute cartoon illustration" loading="lazy" />
        <h3>${cat.name}</h3>
        <p>Animated dharmic stories for kids.</p>
      </article>
    `)
    .join("");
}

function createVideoCard(video) {
  return `
    <article class="video-card reveal-on-scroll">
      <img class="video-thumb" src="${video.thumb}" alt="${video.title} thumbnail" loading="lazy" />
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

  if (!container.children.length) {
    container.innerHTML = `<p style="text-align:center;">No videos found. Try another search name.</p>`;
  }

  attachWatchButtonHandlers();
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

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function attachWatchButtonHandlers() {
  document.querySelectorAll(".watch-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const videoId = btn.dataset.videoId;
      window.location.href = `video.html?id=${videoId}`;
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

  utterance.onend = () => {
    if (status) status.textContent = "Finished reading. Great listening! 🎉";
  };

  window.speechSynthesis.speak(utterance);
}

function loadVideoPage() {
  if (page !== "video") return;

  const params = new URLSearchParams(window.location.search);
  const videoId = params.get("id") || videos[0].id;
  const selected = videos.find((video) => video.id === videoId) || videos[0];

  const card = document.getElementById("videoPlayerCard");
  if (!card) return;

  card.innerHTML = `
    <h1>${selected.title}</h1>
    <iframe src="https://www.youtube.com/embed/${selected.id}" title="${selected.title}" allowfullscreen></iframe>
    <p>${selected.desc}</p>
    <div class="story-controls">
      <button id="listenStoryBtn" class="story-btn">🔊 Listen Story</button>
      <button id="pauseStoryBtn" class="story-btn secondary">⏸ Pause / Resume</button>
    </div>
    <p id="speechStatus">Tap listen to hear this story aloud.</p>
    <section id="quizContainer" class="quiz-box"></section>
  `;

  document.getElementById("listenStoryBtn")?.addEventListener("click", () => speakStory(selected));
  document.getElementById("pauseStoryBtn")?.addEventListener("click", () => {
    if (!("speechSynthesis" in window) || !activeUtterance) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    } else {
      window.speechSynthesis.pause();
    }
  });

  renderQuiz(selected.id);

  const recommended = videos.filter((v) => v.id !== selected.id).slice(0, 5);
  const recommendedList = document.getElementById("recommendedList");
  if (!recommendedList) return;

  recommendedList.innerHTML = recommended
    .map((item) => `
      <a class="recommend-item" href="video.html?id=${item.id}">
        <img src="${item.thumb}" alt="${item.title}" loading="lazy" />
        <h4>${item.title}</h4>
      </a>
    `)
    .join("");
}

function renderQuiz(videoId) {
  const quizContainer = document.getElementById("quizContainer");
  if (!quizContainer) return;

  const questions = quizByVideo[videoId] || quizByVideo.default;
  quizContainer.innerHTML = `
    <h3>🎮 Story Quiz Time</h3>
    ${questions.map((question, qIndex) => `
      <article class="quiz-item">
        <p>${qIndex + 1}. ${question.q}</p>
        <div class="quiz-choices">
          ${question.choices.map((choice, cIndex) => `<button class="choice-btn" data-q="${qIndex}" data-choice="${cIndex}">${choice}</button>`).join("")}
        </div>
      </article>
    `).join("")}
    <p id="quizFeedback" class="quiz-feedback">Choose answers to see your score.</p>
  `;

  quizContainer.querySelectorAll(".choice-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const qIndex = Number(btn.dataset.q);
      const picked = Number(btn.dataset.choice);
      const parent = btn.closest(".quiz-item");
      parent?.querySelectorAll(".choice-btn").forEach((choice) => choice.classList.remove("correct", "wrong"));

      const correct = questions[qIndex].answer === picked;
      btn.classList.add(correct ? "correct" : "wrong");

      const feedback = document.getElementById("quizFeedback");
      if (feedback) {
        feedback.textContent = correct ? "🎉 Correct! Awesome job, little learner!" : "😄 Nice try! Give it one more shot.";
      }
    });
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

function init() {
  setupGlobalBackground();
  setupThemeToggle();
  buildCategoryCards();
  buildCategoryVideoSections();
  setupSearch();
  loadVideoPage();
  setupCardTiltEffects();
  observeRevealItems();
}

init();
