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

// level: 1–6, picks the matching rank word (like Academics → "Genius" in P3)
const SOCIAL_STATS = [
  { name: "Academics", level: 3, ranks: ["Slacker", "Average", "Above Average", "Smart", "Intelligent", "Genius"] },
  { name: "Analytics", level: 2, ranks: ["Clueless", "Curious", "Observant", "Methodical", "Insightful", "Visionary"] },
  { name: "Craft", level: 4, ranks: ["Novice", "Tinkerer", "Builder", "Developer", "Engineer", "Architect"] },
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
// Simple line-art symbols for the tarot cards (100×100 viewBox, stroked in currentColor)
const ARCANA_SYMBOLS = {
  magician: '<path d="M18 50c0-14 14-18 32 0s32 14 32 0-14-18-32 0-32 14-32 0z"/>',
  hierophant: '<circle cx="50" cy="28" r="12"/><path d="M50 40v46M50 62h13M50 75h10"/>',
  star: '<path d="M50 12l8 26 26 4-20 16 8 28-22-16-22 16 8-28-20-16 26-4z"/>',
  chariot: '<circle cx="50" cy="50" r="30"/><circle cx="50" cy="50" r="6"/><path d="M50 20v60M20 50h60M29 29l42 42M71 29L29 71"/>',
  empress: '<circle cx="50" cy="38" r="18"/><path d="M50 56v32M37 72h26"/>',
  hermit: '<path d="M50 14l20 24-8 44H38l-8-44z"/><circle cx="50" cy="52" r="7"/><path d="M50 14V6"/>',
  temperance: '<path d="M30 16h40L50 50l20 34H30l20-34z"/><path d="M40 78h20"/>',
};
const DEFAULT_SYMBOL = '<circle cx="50" cy="50" r="28"/>';

$("#skillList").innerHTML = SKILLS.map((s, i) => `
  <li class="tarot-item" style="--d:${i}">
    <div class="tarot" aria-hidden="true">
      <div class="tarot-frame">
        <span class="tarot-num">${s.num}</span>
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${ARCANA_SYMBOLS[s.arcana.toLowerCase()] || DEFAULT_SYMBOL}</svg>
        <span class="tarot-name">${esc(s.arcana)}</span>
      </div>
    </div>
    <div>
      <p class="sl-name">${esc(s.name)}</p>
      <p class="sl-note">${esc(s.note)}</p>
      <div class="sl-rank" aria-label="${esc(s.arcana)} Arcana, rank ${s.rank} of 10">
        <span class="sl-rank-label">Rank <b>${s.rank >= 10 ? "MAX" : s.rank}</b></span>
        <span class="pips" aria-hidden="true">${Array.from({ length: 10 }, (_, k) => `<i class="${k < s.rank ? "on" : ""}"></i>`).join("")}</span>
      </div>
    </div>
  </li>`).join("");

$("#socialStats").innerHTML = SOCIAL_STATS.map((s) => `
  <li class="ss-row">
    <span class="ss-name">${esc(s.name)}</span>
    <span class="ss-rank"><small>Lv ${s.level}</small>${esc(s.ranks[s.level - 1])}</span>
    <span class="ss-bar" aria-hidden="true">${s.ranks.map((_, k) => `<i class="${k < s.level ? "on" : ""}" style="--k:${k}"></i>`).join("")}</span>
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
    const [from, to, dur, wave, vol] = {
      move: [900, 1400, 0.05, "triangle", 0.07],
      confirm: [660, 1760, 0.14, "triangle", 0.07],
      back: [720, 340, 0.12, "triangle", 0.07],
      shatter: [3200, 500, 0.28, "sawtooth", 0.03],
    }[type];
    const t = audio.currentTime;
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = wave;
    osc.frequency.setValueAtTime(from, t);
    osc.frequency.exponentialRampToValueAtTime(to, t + dur);
    gain.gain.setValueAtTime(vol, t);
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
const shatter = $("#shatter");
const items = $$(".menu-item");
let state = "title";
let index = 0;
let openPanel = null;
let busy = false;

function enterMenu() {
  if (state !== "title" || busy) return;
  state = "menu";
  sfx("confirm");
  shatterTransition(() => {
    body.classList.remove("is-title");
    titleScreen.inert = true;
    menu.inert = false;
    setActive(0);
  });
}

function setActive(i, focus = true) {
  index = (i + items.length) % items.length;
  items.forEach((el, k) => el.classList.toggle("is-active", k === index));
  if (focus) items[index].focus({ preventScroll: true });
}

// Glass forms from the impact point, the screen swaps underneath, then the glass
// breaks outward. `origin` is in viewport pixels; defaults to the centre.
function shatterTransition(swap, origin) {
  if (reduceMotion) { swap(); busy = false; return; }
  busy = true;
  const W = innerWidth, H = innerHeight;
  const o = origin || { x: W / 2, y: H / 2 };
  const portrait = H > W;
  const cols = portrait ? 4 : 7, rows = portrait ? 7 : 4;

  // jittered grid (edges stay on the screen border), then two triangles per cell
  const pts = [];
  for (let r = 0; r <= rows; r++) {
    pts.push([]);
    for (let c = 0; c <= cols; c++) {
      const jx = c === 0 || c === cols ? 0 : (Math.random() - 0.5) * (W / cols) * 0.7;
      const jy = r === 0 || r === rows ? 0 : (Math.random() - 0.5) * (H / rows) * 0.7;
      pts[r].push([(c * W) / cols + jx, (r * H) / rows + jy]);
    }
  }
  const tris = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const a = pts[r][c], b = pts[r][c + 1], d = pts[r + 1][c], e = pts[r + 1][c + 1];
      if (Math.random() < 0.5) tris.push([a, b, e], [a, e, d]);
      else tris.push([a, b, d], [b, e, d]);
    }
  }

  const diag = Math.hypot(W, H);
  shatter.innerHTML = tris.map((t) => {
    const cx = (t[0][0] + t[1][0] + t[2][0]) / 3;
    const cy = (t[0][1] + t[1][1] + t[2][1]) / 3;
    // shrink a little toward the centre so thin cracks show between shards
    const p = t.map(([x, y]) => [cx + (x - cx) * 0.97, cy + (y - cy) * 0.97]);
    const minX = Math.min(...p.map((q) => q[0])), maxX = Math.max(...p.map((q) => q[0]));
    const minY = Math.min(...p.map((q) => q[1])), maxY = Math.max(...p.map((q) => q[1]));
    const poly = p.map(([x, y]) => `${(x - minX).toFixed(1)}px ${(y - minY).toFixed(1)}px`).join(",");
    const dx = cx - o.x, dy = cy - o.y, len = Math.hypot(dx, dy) || 1;
    const push = 160 + Math.random() * 260;
    const dist = len / diag;
    const tone = Math.random() < 0.12 ? 4 : 1 + Math.floor(Math.random() * 3);
    return `<i class="shard t${tone}" style="left:${minX.toFixed(1)}px;top:${minY.toFixed(1)}px;width:${(maxX - minX).toFixed(1)}px;height:${(maxY - minY).toFixed(1)}px;clip-path:polygon(${poly});transform-origin:${(cx - minX).toFixed(1)}px ${(cy - minY).toFixed(1)}px;--din:${Math.round(dist * 160)}ms;--dout:${Math.round(dist * 160)}ms;--tx:${Math.round((dx / len) * push)}px;--ty:${Math.round((dy / len) * push + 80)}px;--rot:${Math.round((Math.random() - 0.5) * 140)}deg"></i>`;
  }).join("");
  shatter.style.setProperty("--ox", `${o.x}px`);
  shatter.style.setProperty("--oy", `${o.y}px`);

  shatter.className = "shatter in";
  setTimeout(() => {
    swap();
    shatter.className = "shatter out";
    sfx("shatter");
  }, 400);
  setTimeout(() => {
    shatter.className = "shatter";
    shatter.innerHTML = "";
    busy = false;
  }, 1100);
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
  busy = true;
  const item = items[index];
  const r = item.getBoundingClientRect();
  item.classList.add("is-picked");
  sfx("confirm");
  // let the "pop" land, then break the glass from where the item sits
  setTimeout(() => {
    shatterTransition(() => {
      item.classList.remove("is-picked");
      showPanel(panel);
    }, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
  }, reduceMotion ? 0 : 170);
}

function close() {
  if (!openPanel || busy) return;
  sfx("back");
  const panel = openPanel;
  shatterTransition(() => {
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
    // let the music / sound buttons work from the keyboard on the title screen
    if (e.key === "Tab" || e.target.closest?.(".corner, .music-box")) return;
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
