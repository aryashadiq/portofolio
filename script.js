// ===== Content — edit these to update the site =====
// rank: 1–10 (10 shows as MAX)
const SKILLS = [
  { num: "I", arcana: "Magician", name: "Python", note: "Data processing · machine learning", rank: 8 },
  { num: "V", arcana: "Hierophant", name: "SQL", note: "Querying and preparing data", rank: 7 },
  { num: "XVII", arcana: "Star", name: "Data Visualization", note: "Turning findings into clear charts", rank: 7 },
  { num: "VII", arcana: "Chariot", name: "HTML", note: "Semantic page structure", rank: 8 },
  { num: "III", arcana: "Empress", name: "CSS", note: "Layout and responsive design", rank: 7 },
  { num: "IX", arcana: "Hermit", name: "JavaScript", note: "Interactivity on the web", rank: 6 },
  { num: "XIV", arcana: "Temperance", name: "Tailwind CSS", note: "Utility-first styling", rank: 6 },
];

const PROJECTS = [
  {
    num: "VII", arcana: "Chariot",
    title: "Event Website",
    desc: "A full event website built with Laravel 11, from the front-end pages to the back-end logic, then deployed to production.",
    tags: ["Laravel 11", "PHP", "Back-end", "Deployment"],
    link: "https://github.com/aryashadiq/eventina-laravel-project",
  },
  {
    num: "X", arcana: "Fortune",
    title: "Adult Income Prediction",
    desc: "Predicts whether a person earns >50K or <=50K a year using the Adult Income Dataset, covering preprocessing, model development, and interpreting the results.",
    tags: ["Python", "Machine Learning", "Classification"],
    link: "https://github.com/aryashadiq/income-prediction-ml",
  },
  {
    num: "XVII", arcana: "Star",
    title: "Plant Disease Classification",
    desc: "Classifies plant diseases from leaf images with a computer-vision model built in PyTorch, from data collection to evaluation.",
    tags: ["PyTorch", "Computer Vision", "Deep Learning"],
    link: "https://github.com/aryashadiq/plant-disease-RESTNET50",
  },
];

// ===== Helpers =====
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// ===== Render content =====
$("#skillList").innerHTML = SKILLS.map((s) => `
  <li class="sl-row">
    <span class="sl-num" aria-hidden="true">${s.num}</span>
    <div>
      <p class="sl-name">${esc(s.name)}</p>
      <p class="sl-note">${esc(s.arcana)} Arcana · ${esc(s.note)}</p>
    </div>
    <div class="sl-rank" aria-label="Rank ${s.rank} of 10">
      <span class="sl-rank-label">Rank <b>${s.rank >= 10 ? "MAX" : s.rank}</b></span>
      <span class="pips" aria-hidden="true">${Array.from({ length: 10 }, (_, i) => `<i class="${i < s.rank ? "on" : ""}"></i>`).join("")}</span>
    </div>
  </li>`).join("");

$("#projectGrid").innerHTML = PROJECTS.map((p) => `
  <article class="card">
    <span class="card-num" aria-hidden="true">${p.num}</span>
    <p class="card-arcana">${esc(p.arcana)}</p>
    <h3 class="card-title">${esc(p.title)}</h3>
    <p class="card-desc">${esc(p.desc)}</p>
    <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
    <a class="card-link" href="${p.link}" target="_blank" rel="noopener">View on GitHub ▶</a>
  </article>`).join("");

// ===== Sound (tiny synth blips, no audio files) =====
let audio;
let soundOn = true;
try { soundOn = localStorage.getItem("p3-sound") !== "off"; } catch {}
const soundBtn = $("#soundToggle");
const syncSoundBtn = () => {
  soundBtn.textContent = soundOn ? "Sound On" : "Sound Off";
  soundBtn.setAttribute("aria-pressed", String(soundOn));
};
syncSoundBtn();
soundBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  soundOn = !soundOn;
  try { localStorage.setItem("p3-sound", soundOn ? "on" : "off"); } catch {}
  syncSoundBtn();
});

// ===== Music: official Spotify embed, loaded only when first opened =====
const SPOTIFY_TRACK = "4pjFNyjGaoKgLTnndISP6V"; // Color Your Night — Lotus Juice, Azumi Takahashi
const musicBtn = $("#musicToggle");
const musicBox = $("#musicBox");

function setMusicOpen(isOpen) {
  if (isOpen && !$("#musicSlot iframe")) {
    $("#musicSlot").innerHTML = `<iframe title="Color Your Night on Spotify"
      src="https://open.spotify.com/embed/track/${SPOTIFY_TRACK}?utm_source=generator&theme=0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"></iframe>`;
  }
  // hiding keeps the iframe mounted, so the song keeps playing in the background
  musicBox.hidden = !isOpen;
  musicBtn.setAttribute("aria-expanded", String(isOpen));
}

musicBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  setMusicOpen(musicBox.hidden);
});
$("#musicClose").addEventListener("click", () => {
  setMusicOpen(false);
  musicBtn.focus();
});

function sfx(type) {
  if (!soundOn) return;
  try {
    audio ||= new (window.AudioContext || window.webkitAudioContext)();
    const [from, to, dur] = { move: [900, 1400, 0.05], confirm: [660, 1760, 0.14], back: [720, 340, 0.12] }[type];
    const t = audio.currentTime;
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(from, t);
    osc.frequency.exponentialRampToValueAtTime(to, t + dur);
    gain.gain.setValueAtTime(0.07, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.05);
    osc.connect(gain).connect(audio.destination);
    osc.start(t);
    osc.stop(t + dur + 0.06);
  } catch {}
}

// ===== Date / time HUD =====
const forceDarkHour = new URLSearchParams(location.search).has("darkhour");
let seaTint = "63,208,255";

function timeOfDay(h) {
  if (h === 0) return "Dark Hour";
  if (h < 5) return "Late Night";
  if (h < 8) return "Early Morning";
  if (h < 12) return "Morning";
  if (h < 13) return "Lunchtime";
  if (h < 16) return "Afternoon";
  if (h < 18) return "After School";
  return "Evening";
}

function moonPhase(date) {
  const synodic = 29.530588853;
  const knownNew = Date.UTC(2000, 0, 6, 18, 14);
  const days = (date - knownNew) / 864e5;
  const p = (((days % synodic) + synodic) % synodic) / synodic;
  let name;
  if (p < 0.03 || p > 0.97) name = "New Moon";
  else if (p < 0.22) name = "Waxing Crescent";
  else if (p < 0.28) name = "First Quarter";
  else if (p < 0.47) name = "Waxing Gibbous";
  else if (p < 0.53) name = "Full Moon";
  else if (p < 0.72) name = "Waning Gibbous";
  else if (p < 0.78) name = "Last Quarter";
  else name = "Waning Crescent";
  // shadow slides off to the left while waxing, back in from the right while waning
  const shift = p < 0.5 ? -p * 200 : (1 - p) * 200;
  return { name, shift };
}

function updateHud() {
  const now = new Date();
  const darkHour = forceDarkHour || now.getHours() === 0;
  $("#hudMd").textContent = `${now.getMonth() + 1}/${now.getDate()}`;
  $("#hudDay").textContent = now.toLocaleDateString("en-US", { weekday: "short" });
  $("#hudTime").textContent = darkHour ? "Dark Hour" : timeOfDay(now.getHours());
  const moon = moonPhase(now);
  $("#moon").style.setProperty("--shift", `${moon.shift}%`);
  $("#moonName").textContent = moon.name;
  document.body.classList.toggle("dark-hour", darkHour);
  seaTint = darkHour ? "109,255,158" : "63,208,255";
}
updateHud();
setInterval(updateHud, 30000);

// ===== Underwater background =====
const canvas = $("#sea");
const ctx = canvas.getContext("2d");
let W = 0, H = 0;
const bubbles = [];

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = innerWidth;
  H = innerHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  bubbles.length = 0;
  const count = Math.round((W * H) / 24000);
  for (let i = 0; i < count; i++) {
    bubbles.push({ x: Math.random() * W, y: Math.random() * H, r: 0.8 + Math.random() * 2.6, speed: 0.15 + Math.random() * 0.55, wobble: Math.random() * Math.PI * 2 });
  }
}

function draw(t) {
  ctx.clearRect(0, 0, W, H);
  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  // light shafts from the surface
  for (let i = 0; i < 5; i++) {
    const x = W * (0.12 + i * 0.2) + Math.sin(t / 4200 + i) * 60;
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, `rgba(${seaTint},0.09)`);
    g.addColorStop(1, `rgba(${seaTint},0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(x - 30, 0);
    ctx.lineTo(x + 30, 0);
    ctx.lineTo(x + 170 - i * 20, H);
    ctx.lineTo(x - 50 - i * 10, H);
    ctx.closePath();
    ctx.fill();
  }

  // drifting current lines
  for (let k = 0; k < 7; k++) {
    const y0 = H * (0.32 + k * 0.1);
    ctx.beginPath();
    for (let x = 0; x <= W + 12; x += 12) {
      const y = y0 + Math.sin(x * 0.004 + t / 1800 + k) * 14 + Math.sin(x * 0.011 - t / 1300 + k * 2) * 6;
      x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.strokeStyle = `rgba(${seaTint},${0.05 + k * 0.012})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // bubbles
  ctx.fillStyle = "rgba(210,240,255,0.32)";
  for (const b of bubbles) {
    if (!reduceMotion) {
      b.y -= b.speed;
      b.wobble += 0.02;
      if (b.y < -10) { b.y = H + 10; b.x = Math.random() * W; }
    }
    ctx.beginPath();
    ctx.arc(b.x + Math.sin(b.wobble) * 6, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
  if (!reduceMotion) requestAnimationFrame(draw);
}

resize();
addEventListener("resize", () => { resize(); if (reduceMotion) draw(0); });
requestAnimationFrame(draw);

// ===== Menu & panels =====
const body = document.body;
const titleScreen = $("#title");
const menu = $("#menu");
const wipe = $("#wipe");
const items = $$(".menu-item");
let state = "title";
let index = 0;
let openPanel = null;
let busy = false;

function enterMenu() {
  if (state !== "title") return;
  state = "menu";
  body.classList.remove("is-title");
  titleScreen.inert = true;
  menu.inert = false;
  setActive(0);
  sfx("confirm");
}

function setActive(i, focus = true) {
  index = (i + items.length) % items.length;
  items.forEach((el, k) => el.classList.toggle("is-active", k === index));
  if (focus) items[index].focus({ preventScroll: true });
}

function transition(swap) {
  if (reduceMotion) { swap(); return; }
  busy = true;
  wipe.classList.remove("run");
  void wipe.offsetWidth;
  wipe.classList.add("run");
  setTimeout(swap, 340);
  setTimeout(() => { wipe.classList.remove("run"); busy = false; }, 820);
}

function showPanel(panel) {
  panel.classList.add("is-open");
  panel.inert = false;
  panel.scrollTop = 0;
  menu.inert = true;
  body.classList.add("panel-open");
  openPanel = panel;
  $(".back-btn", panel).focus({ preventScroll: true });
  history.replaceState(null, "", `#${panel.id}`);
}

function open(id) {
  const panel = document.getElementById(id);
  if (!panel || openPanel || busy) return;
  sfx("confirm");
  transition(() => showPanel(panel));
}

function close() {
  if (!openPanel || busy) return;
  sfx("back");
  const panel = openPanel;
  transition(() => {
    panel.classList.remove("is-open");
    panel.inert = true;
    menu.inert = false;
    body.classList.remove("panel-open");
    openPanel = null;
    setActive(index);
    history.replaceState(null, "", location.pathname + location.search);
  });
}

items.forEach((item, k) => {
  item.addEventListener("pointerenter", () => {
    if (k !== index) { setActive(k, false); sfx("move"); }
  });
  item.addEventListener("focus", () => setActive(k, false));
  item.addEventListener("click", () => { setActive(k, false); open(item.dataset.target); });
});

$$(".back-btn").forEach((btn) => btn.addEventListener("click", close));
titleScreen.addEventListener("click", enterMenu);

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (state === "title") {
    if (e.key === "Tab") return;
    e.preventDefault();
    enterMenu();
    return;
  }
  if (openPanel) {
    if (e.key === "Escape") { e.preventDefault(); close(); }
    return;
  }
  const k = e.key.toLowerCase();
  if (k === "arrowdown" || k === "s") { e.preventDefault(); setActive(index + 1); sfx("move"); }
  else if (k === "arrowup" || k === "w") { e.preventDefault(); setActive(index - 1); sfx("move"); }
});

// Deep link: /#projects opens straight into that panel
const startPanel = location.hash && document.getElementById(location.hash.slice(1));
if (startPanel && startPanel.classList.contains("panel")) {
  state = "menu";
  body.classList.remove("is-title");
  titleScreen.inert = true;
  index = Math.max(0, items.findIndex((el) => el.dataset.target === startPanel.id));
  setActive(index, false);
  showPanel(startPanel);
}
