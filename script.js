// =====================================================
//  Website Ulang Tahun — Misniati Imelda
//  Tulisan ada di content.js, mini game di games.js
// =====================================================

// 3 lagu + temanya. Ganti "title" dengan judul lagu yang sebenarnya.
const SONGS = [
  { title: "Lagu 1", file: "assets/musik/lagu1.mp3", theme: "pink",   themeName: "Pink Romantis", colors: ["#ff6fa8", "#ffd36e"] },
  { title: "Lagu 2", file: "assets/musik/lagu2.mp3", theme: "galaxy", themeName: "Galaksi Ungu",  colors: ["#a78bfa", "#5eead4"] },
  { title: "Lagu 3", file: "assets/musik/lagu3.mp3", theme: "sunset", themeName: "Senja Jingga",  colors: ["#fb923c", "#fde047"] },
];

// 14 foto galeri + keterangannya
const PHOTOS = [
  ["foto01.jpg", "Senyum termanis"],
  ["foto02.jpg", "Malu-malu tapi mau"],
  ["foto03.jpg", "Peace & love ✌️"],
  ["foto04.jpg", "Si pekerja keras"],
  ["foto05.jpg", "Kedipan maut 😉"],
  ["foto06.jpg", "Cantik natural"],
  ["foto07.jpg", "Senyum hari ini"],
  ["foto08.jpg", "Teduh dan hangat"],
  ["foto09.jpg", "Simple tapi manis"],
  ["foto10.jpg", "Gemas maksimal"],
  ["foto11.jpg", "Bahagia itu sederhana"],
  ["foto12.jpg", "Santai sejenak"],
  ["foto13.jpg", "Senyum secerah mentari"],
  ["foto14.jpg", "Anggun malam hari"],
];

// ---------- Helper ----------
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const store = {
  get(k, d) { try { const v = localStorage.getItem("imelda_" + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem("imelda_" + k, JSON.stringify(v)); } catch {} },
};
function showScreen(id) {
  $$(".screen").forEach((s) => s.classList.remove("active"));
  $(id).classList.add("active");
}
let toastTimer;
function toast(text) {
  const t = $("#toast");
  t.textContent = text;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}
function showModal(icon, title, text, btn = "Oke!") {
  $("#modalIcon").textContent = icon;
  $("#modalTitle").textContent = title;
  $("#modalText").textContent = text;
  $("#modalBtn").textContent = btn;
  $("#modal").classList.add("open");
}
$("#modalBtn").addEventListener("click", () => $("#modal").classList.remove("open"));
const fmt = (s) => (isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00");
const themeVar = (name) => getComputedStyle(document.body).getPropertyValue(name).trim();

// =====================================================
//  MUSIK & TEMA
// =====================================================
const audio = $("#audio");
let current = 0;
audio.volume = 0.8;

function renderSongList() {
  $("#songList").innerHTML = SONGS.map((s, i) => `
    <button class="song ${i === current ? "active" : ""}" data-i="${i}">
      <span class="swatch" style="background:linear-gradient(135deg, ${s.colors[0]}, ${s.colors[1]})"></span>
      <span class="meta"><b>${s.title}</b><small>Tema: ${s.themeName}</small></span>
    </button>`).join("");
  $$(".song").forEach((b) => b.addEventListener("click", () => loadSong(+b.dataset.i, true)));
}
function loadSong(i, play) {
  current = (i + SONGS.length) % SONGS.length;
  const s = SONGS[current];
  audio.src = s.file;
  document.body.dataset.theme = s.theme;
  $("#npTitle").textContent = `${s.title} · ${s.themeName}`;
  renderSongList();
  if (play) { audio.play().catch(() => {}); toast(`🎵 ${s.title} — tema ${s.themeName}`); }
}
function updatePlayState() {
  const playing = !audio.paused;
  $("#musicBtn").classList.toggle("playing", playing);
  $("#playBtn").textContent = playing ? "⏸" : "▶";
}
audio.addEventListener("play", updatePlayState);
audio.addEventListener("pause", updatePlayState);
audio.addEventListener("ended", () => loadSong(current + 1, true));
audio.addEventListener("timeupdate", () => {
  $("#progressFill").style.width = (audio.currentTime / audio.duration) * 100 + "%";
  $("#curTime").textContent = fmt(audio.currentTime);
});
audio.addEventListener("loadedmetadata", () => ($("#durTime").textContent = fmt(audio.duration)));
$("#playBtn").addEventListener("click", () => (audio.paused ? audio.play() : audio.pause()));
$("#prevBtn").addEventListener("click", () => loadSong(current - 1, true));
$("#nextBtn").addEventListener("click", () => loadSong(current + 1, true));
$("#volume").addEventListener("input", (e) => (audio.volume = e.target.value));
$("#progress").addEventListener("click", (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  if (audio.duration) audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
});
$("#musicBtn").addEventListener("click", (e) => { e.stopPropagation(); $("#musicPanel").classList.toggle("open"); });
$("#closePanel").addEventListener("click", () => $("#musicPanel").classList.remove("open"));

// Autoplay saat website dibuka. Jika browser memblokir, lagu mulai di klik/sentuhan pertama.
loadSong(0, false);
function unlockAudio() {
  if (audio.paused) audio.play().catch(() => {});
  removeEventListener("pointerdown", unlockAudio);
  removeEventListener("keydown", unlockAudio);
}
audio.play().catch(() => {
  addEventListener("pointerdown", unlockAudio);
  addEventListener("keydown", unlockAudio);
});

// =====================================================
//  LATAR: bintang, balon, konfeti, hati
// =====================================================
const starCanvas = $("#stars");
const sctx = starCanvas.getContext("2d");
let stars = [];
let shooting = null;
function initStars() {
  starCanvas.width = innerWidth;
  starCanvas.height = innerHeight;
  stars = Array.from({ length: 170 }, () => ({
    x: Math.random() * starCanvas.width, y: Math.random() * starCanvas.height,
    r: Math.random() * 1.5 + 0.3, t: Math.random() * Math.PI * 2, s: Math.random() * 0.03 + 0.01,
  }));
}
function drawStars() {
  sctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  sctx.fillStyle = "#fff";
  for (const st of stars) {
    st.t += st.s;
    sctx.globalAlpha = 0.4 + Math.sin(st.t) * 0.4;
    sctx.beginPath(); sctx.arc(st.x, st.y, st.r, 0, Math.PI * 2); sctx.fill();
  }
  // bintang jatuh sesekali
  if (!shooting && Math.random() < 0.004) shooting = { x: rand(0, starCanvas.width * 0.7), y: rand(0, starCanvas.height * 0.4), life: 0 };
  if (shooting) {
    shooting.life++;
    const len = 120, sx = shooting.x + shooting.life * 9, sy = shooting.y + shooting.life * 4;
    const g = sctx.createLinearGradient(sx, sy, sx - len, sy - len * 0.45);
    g.addColorStop(0, "rgba(255,255,255,.9)"); g.addColorStop(1, "rgba(255,255,255,0)");
    sctx.globalAlpha = 1; sctx.strokeStyle = g; sctx.lineWidth = 2;
    sctx.beginPath(); sctx.moveTo(sx, sy); sctx.lineTo(sx - len, sy - len * 0.45); sctx.stroke();
    if (shooting.life > 50) shooting = null;
  }
  sctx.globalAlpha = 1;
  requestAnimationFrame(drawStars);
}
initStars();
drawStars();

function spawnBalloon() {
  const colors = [themeVar("--accent"), themeVar("--accent-2"), themeVar("--accent-soft"), "#ffffff", themeVar("--accent-deep")];
  const b = document.createElement("div");
  b.className = "balloon";
  b.style.background = pick(colors);
  b.style.left = Math.random() * 95 + "vw";
  b.style.scale = rand(0.7, 1.3);
  b.style.animationDuration = rand(9, 17) + "s";
  b.innerHTML = '<span class="shine"></span>';
  $("#balloons").appendChild(b);
  b.addEventListener("animationend", () => b.remove());
}
setInterval(spawnBalloon, 1000);

const confCanvas = $("#confetti");
const cctx = confCanvas.getContext("2d");
let confetti = [];
function resizeConf() { confCanvas.width = innerWidth; confCanvas.height = innerHeight; }
resizeConf();
function burstConfetti(count = 220, x = confCanvas.width / 2, y = confCanvas.height / 2) {
  const colors = [themeVar("--accent"), themeVar("--accent-2"), themeVar("--accent-soft"), "#ffffff", "#5eead4"];
  for (let i = 0; i < count; i++) {
    confetti.push({
      x: x + (Math.random() - 0.5) * 200, y, vx: (Math.random() - 0.5) * 16, vy: Math.random() * -16 - 4,
      w: rand(4, 12), h: rand(6, 18), rot: Math.random() * 360, vr: (Math.random() - 0.5) * 12, color: pick(colors), life: 0,
    });
  }
}
function drawConfetti() {
  cctx.clearRect(0, 0, confCanvas.width, confCanvas.height);
  confetti = confetti.filter((p) => p.y < confCanvas.height + 40 && p.life < 600);
  for (const p of confetti) {
    p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life++;
    cctx.save(); cctx.translate(p.x, p.y); cctx.rotate((p.rot * Math.PI) / 180);
    cctx.fillStyle = p.color; cctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.rot / 30)));
    cctx.restore();
  }
  requestAnimationFrame(drawConfetti);
}
drawConfetti();

const HEART_EMOJI = ["💖", "💕", "💗", "✨", "🌸", "💝"];
function heartBurst(x, y, n = 4) {
  for (let i = 0; i < n; i++) {
    const h = document.createElement("span");
    h.className = "heart";
    h.textContent = pick(HEART_EMOJI);
    h.style.left = x + "px"; h.style.top = y + "px";
    h.style.setProperty("--dx", (Math.random() - 0.5) * 120 + "px");
    h.style.setProperty("--rot", (Math.random() - 0.5) * 60 + "deg");
    h.style.fontSize = rand(14, 28) + "px";
    $("#hearts").appendChild(h);
    h.addEventListener("animationend", () => h.remove());
  }
}
addEventListener("pointerdown", (e) => {
  if (e.target.closest(".arena, #fwCanvas, .scratch-wrap")) return; // jangan ganggu game
  heartBurst(e.clientX, e.clientY);
});
addEventListener("resize", () => { initStars(); resizeConf(); });

// =====================================================
//  ALUR: hitung mundur → kado → kue → ucapan → hub
// =====================================================
(function intro() {
  let n = 3;
  const el = $("#introCount");
  const texts = ["Siap-siap, ya…", "Tarik napas…", "Dan…"];
  const tick = () => {
    if (n === 0) { showScreen("#screen-gift"); return; }
    el.textContent = n;
    el.style.animation = "none"; el.offsetHeight; el.style.animation = "";
    $("#introText").textContent = texts[3 - n];
    n--;
    setTimeout(tick, 1000);
  };
  tick();
})();

$("#gift").addEventListener("click", () => {
  $("#gift").classList.add("open");
  if (audio.paused) audio.play().catch(() => {});
  burstConfetti(80);
  setTimeout(() => showScreen("#screen-cake"), 1100);
});

let blown = false;
function blowCandles() {
  if (blown) return;
  blown = true;
  stopMic();
  $$(".candle").forEach((c, i) => {
    setTimeout(() => {
      c.querySelector(".flame").classList.add("out");
      const smoke = document.createElement("span");
      smoke.className = "smoke";
      c.appendChild(smoke);
    }, i * 250);
  });
  setTimeout(() => {
    burstConfetti(300);
    showScreen("#screen-wish");
    typeMessage();
    showMascots();
  }, 1400);
}
$(".candles").addEventListener("click", blowCandles);

// Tiup lilin lewat mikrofon
let micStream = null, micCtx = null;
$("#micBtn").addEventListener("click", async () => {
  try {
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    micCtx = new (window.AudioContext || window.webkitAudioContext)();
    const src = micCtx.createMediaStreamSource(micStream);
    const an = micCtx.createAnalyser();
    an.fftSize = 512;
    src.connect(an);
    const data = new Uint8Array(an.fftSize);
    $("#cakeHint").textContent = "Sekarang tiup ke mikrofon! 🌬️";
    let loud = 0;
    const listen = () => {
      if (blown || !micStream) return;
      an.getByteTimeDomainData(data);
      let sum = 0;
      for (const v of data) sum += ((v - 128) / 128) ** 2;
      const rms = Math.sqrt(sum / data.length);
      loud = rms > 0.18 ? loud + 1 : 0;
      if (loud > 6) blowCandles(); else requestAnimationFrame(listen);
    };
    listen();
  } catch {
    toast("Mikrofon tidak bisa dipakai, ketuk lilinnya saja ya 🕯️");
  }
});
function stopMic() {
  if (micStream) micStream.getTracks().forEach((t) => t.stop());
  if (micCtx) micCtx.close();
  micStream = micCtx = null;
}

let typingTimer = null;
function finishMessage() {
  clearInterval(typingTimer);
  $("#message").textContent = MESSAGE;
  $("#message").classList.add("done");
  $("#signature").textContent = SIGNATURE;
  $("#signature").classList.add("show");
  $("#wishActions").classList.add("show");
}
function typeMessage() {
  const el = $("#message");
  el.textContent = "";
  el.classList.remove("done");
  $("#signature").classList.remove("show");
  $("#wishActions").classList.remove("show");
  let i = 0;
  clearInterval(typingTimer);
  typingTimer = setInterval(() => {
    el.textContent += MESSAGE[i++];
    if (i >= MESSAGE.length) { finishMessage(); burstConfetti(150); }
  }, 32);
}
$(".card").addEventListener("click", () => { if (!$("#message").classList.contains("done")) finishMessage(); });

$("#toHub").addEventListener("click", () => { showMascots("hub"); showScreen("#screen-hub"); $("#screen-hub").scrollTop = 0; });
$("#backToWish").addEventListener("click", () => { showScreen("#screen-wish"); showMascots("wish"); });
$("#replayBtn").addEventListener("click", () => {
  clearInterval(typingTimer);
  blown = false;
  $("#gift").classList.remove("open");
  $$(".flame").forEach((f) => f.classList.remove("out"));
  $$(".smoke").forEach((s) => s.remove());
  $("#cakeHint").textContent = "Ketuk lilinnya, atau tiup ke mikrofon 🎤";
  resetProgress();
  hideMascots();
  showScreen("#screen-gift");
});

// =====================================================
//  HUB & SISTEM HALAMAN
// =====================================================
const PAGE_HOOKS = {}; // { nama: { open(){}, close(){} } } — dipakai juga oleh games.js
let openedPages = []; // mulai dari 0 setiap kali halaman dibuka / di-refresh
const cards = $$(".hub-card");
cards.forEach((c, i) => c.style.setProperty("--d", i));
$("#totalCount").textContent = cards.length;
function refreshOpened() {
  cards.forEach((c) => c.classList.toggle("opened", openedPages.includes(c.dataset.page)));
  $("#openedCount").textContent = openedPages.length;
}
refreshOpened();

let activePage = null;
function openPage(name) {
  if (activePage) closePage();
  activePage = name;
  const page = $("#page-" + name);
  page.classList.add("open");
  page.scrollTop = 0;
  if (!openedPages.includes(name)) {
    openedPages.push(name);
    refreshOpened();
    if (openedPages.length === cards.length) {
      setTimeout(() => {
        burstConfetti(400);
        showModal("🏆", "Semua Kejutan Terbuka!", "Kamu sudah membuka semua kejutan. Terima kasih sudah menjelajah sampai akhir, Imelda. Semoga hari ini jadi salah satu hari terbaikmu. 💖");
      }, 800);
    }
  }
  PAGE_HOOKS[name]?.open?.();
}
function closePage() {
  if (!activePage) return;
  $("#page-" + activePage).classList.remove("open");
  PAGE_HOOKS[activePage]?.close?.();
  if (typeof mascotReact === "function") mascotReact(activePage, openedPages.length === cards.length);
  activePage = null;
}
cards.forEach((c) => c.addEventListener("click", () => openPage(c.dataset.page)));
$$("[data-close]").forEach((b) => b.addEventListener("click", closePage));
addEventListener("keydown", (e) => {
  if (e.key === "Escape" && activePage && !$("#lightbox").classList.contains("open")) closePage();
});

// ---------- Surat ----------
PAGE_HOOKS.letter = {
  open() {
    $("#letterContent").innerHTML =
      `<h2>${LETTER.title}</h2>` +
      LETTER.paragraphs.map((p, i) => `<p style="animation-delay:${0.25 + i * 0.35}s">${p}</p>`).join("") +
      `<p class="closing" style="animation-delay:${0.4 + LETTER.paragraphs.length * 0.35}s">${LETTER.closing}</p>`;
  },
};

// ---------- Puisi ----------
let poemIndex = 0;
function renderPoem(i) {
  poemIndex = i;
  $$(".poem-tab").forEach((t, k) => t.classList.toggle("active", k === i));
  const p = POEMS[i];
  $("#poemContent").innerHTML =
    `<h2>${p.title}</h2>` +
    p.lines.map((l, k) => `<span class="line" style="animation-delay:${0.2 + k * 0.18}s">${l || "&nbsp;"}</span>`).join("");
  $("#poemContent").style.animation = "none"; $("#poemContent").offsetHeight; $("#poemContent").style.animation = "";
}
$("#poemTabs").innerHTML = POEMS.map((p, i) => `<button class="poem-tab" data-i="${i}">${p.title}</button>`).join("");
$$(".poem-tab").forEach((t) => t.addEventListener("click", () => renderPoem(+t.dataset.i)));
PAGE_HOOKS.poems = { open() { renderPoem(poemIndex); } };

// ---------- Cerpen ----------
PAGE_HOOKS.story = {
  open() {
    const words = STORY.paragraphs.join(" ").split(/\s+/).length;
    $("#storyContent").innerHTML =
      `<h2>${STORY.title}</h2><p class="meta" style="animation-delay:.1s">Sebuah cerpen · ± ${Math.ceil(words / 200)} menit membaca</p>` +
      STORY.paragraphs.map((p, i) => {
        const end = i === STORY.paragraphs.length - 1;
        return `<p class="${end ? "end" : ""}" style="animation-delay:${0.3 + Math.min(i, 6) * 0.25}s">${p}</p>`;
      }).join("");
  },
};

// ---------- Gombal ----------
let gombalSeen = [];
let gombalDeck = [];
let lastGombal = "";
$("#gombalTotal").textContent = GOMBAL.length;
function updateGombalStats() {
  $("#gombalCount").textContent = gombalSeen.length;
  const pct = Math.round((gombalSeen.length / GOMBAL.length) * 100);
  $("#baperFill").style.width = pct + "%";
  $("#baperPct").textContent = pct + "%";
}
updateGombalStats();
$("#gombalBtn").addEventListener("click", (e) => {
  if (!gombalDeck.length) gombalDeck = GOMBAL.map((_, i) => i).sort(() => Math.random() - 0.5);
  const i = gombalDeck.pop();
  lastGombal = GOMBAL[i];
  const el = $("#gombalText");
  el.classList.remove("pop"); el.offsetHeight; el.classList.add("pop");
  el.textContent = lastGombal;
  $("#gombalEmoji").textContent = pick(["😳", "🥰", "😚", "🙈", "😆", "😍", "🤭", "💘"]);
  if (!gombalSeen.includes(i)) gombalSeen.push(i);
  updateGombalStats();
  heartBurst(e.clientX, e.clientY, 8);
  if (gombalSeen.length === GOMBAL.length) toast("Level baper 100%! Kamu sudah baca semua gombalan 🙈");
});
$("#copyGombal").addEventListener("click", () => {
  if (!lastGombal) return toast("Ketuk 'Gombalin Aku' dulu 😆");
  navigator.clipboard?.writeText(lastGombal).then(() => toast("Gombalan disalin! 📋"), () => toast("Gagal menyalin"));
});

// ---------- Galeri + lightbox ----------
$("#gallery").innerHTML = PHOTOS.map(([file, cap], i) => `
  <figure class="polaroid" data-i="${i}" style="--tilt:${rand(-3, 3).toFixed(1)}deg">
    <img src="assets/foto/${file}" alt="${cap}" loading="lazy" />
    <span>${cap}</span>
  </figure>`).join("");
const polaroids = $$(".polaroid");
PAGE_HOOKS.gallery = {
  open() {
    polaroids.forEach((p, i) => { p.classList.remove("visible"); setTimeout(() => p.classList.add("visible"), 150 + i * 80); });
  },
};
polaroids.forEach((p) => p.addEventListener("click", () => openLightbox(+p.dataset.i)));

let lbIndex = 0, slideTimer = null;
const SLIDE_MS = 3500;
function showPhoto(i) {
  lbIndex = (i + PHOTOS.length) % PHOTOS.length;
  const [file, cap] = PHOTOS[lbIndex];
  const img = $("#lbImg");
  img.style.animation = "none"; img.offsetHeight; img.style.animation = "";
  img.src = `assets/foto/${file}`; img.alt = cap;
  $("#lbCaption").textContent = cap;
  $("#lbCounter").textContent = `${lbIndex + 1} / ${PHOTOS.length}`;
  if (slideTimer) restartSlideProgress();
}
function openLightbox(i) { showPhoto(i); $("#lightbox").classList.add("open"); }
function closeLightbox() { $("#lightbox").classList.remove("open"); stopSlideshow(); }
function restartSlideProgress() {
  const bar = $("#lbProgress");
  bar.style.transition = "none"; bar.style.width = "0"; bar.offsetHeight;
  bar.style.transition = `width ${SLIDE_MS}ms linear`; bar.style.width = "100%";
}
function startSlideshow() {
  openLightbox(lbIndex);
  clearInterval(slideTimer);
  slideTimer = setInterval(() => showPhoto(lbIndex + 1), SLIDE_MS);
  restartSlideProgress();
}
function stopSlideshow() {
  clearInterval(slideTimer); slideTimer = null;
  const bar = $("#lbProgress"); bar.style.transition = "none"; bar.style.width = "0";
}
$("#slideshowBtn").addEventListener("click", () => { lbIndex = 0; startSlideshow(); });
$("#lbClose").addEventListener("click", closeLightbox);
$("#lbPrev").addEventListener("click", (e) => { e.stopPropagation(); showPhoto(lbIndex - 1); });
$("#lbNext").addEventListener("click", (e) => { e.stopPropagation(); showPhoto(lbIndex + 1); });
$("#lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") closeLightbox(); });
addEventListener("keydown", (e) => {
  if (!$("#lightbox").classList.contains("open")) return;
  if (e.key === "ArrowRight") showPhoto(lbIndex + 1);
  if (e.key === "ArrowLeft") showPhoto(lbIndex - 1);
  if (e.key === "Escape") closeLightbox();
});
let touchX = null;
$("#lightbox").addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
$("#lightbox").addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) showPhoto(lbIndex + (dx < 0 ? 1 : -1));
  touchX = null;
});

// ---------- Lampion harapan ----------
let wishes = store.get("wishes", []);
function renderWishes() {
  $("#wishList").innerHTML = wishes.map((w) => `<li>🏮 ${w.replace(/</g, "&lt;")}</li>`).join("");
}
function launchLantern(text, delay = 0) {
  setTimeout(() => {
    const l = document.createElement("div");
    l.className = "lantern";
    l.style.left = rand(10, 85) + "vw";
    l.innerHTML = `<div class="lantern-body"></div>${text ? `<small></small>` : ""}`;
    if (text) l.querySelector("small").textContent = text;
    $("#lanternSky").appendChild(l);
    l.addEventListener("animationend", () => l.remove());
  }, delay);
}
$("#wishForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = $("#wishInput").value.trim();
  if (!text) return toast("Tulis harapanmu dulu ya ✍️");
  wishes.unshift(text);
  store.set("wishes", wishes);
  renderWishes();
  launchLantern(text);
  for (let i = 1; i < 5; i++) launchLantern("", i * 400);
  $("#wishInput").value = "";
  toast("Harapanmu sudah terbang ke langit ✨");
});
PAGE_HOOKS.wishes = {
  open() {
    renderWishes();
    for (let i = 0; i < 6; i++) launchLantern("", i * 500);
  },
};

// ---------- Alasan kamu istimewa ----------
$("#reasonTotal").textContent = REASONS.length;
let reasonsOpened = 0;
$("#reasonGrid").innerHTML = REASONS.map((r, i) => `
  <div class="reason" data-i="${i}">
    <div class="reason-inner">
      <div class="reason-face reason-front">${pick(["💖", "💗", "💝", "💕", "💓"])}<small>#${i + 1}</small></div>
      <div class="reason-face reason-back">${r}</div>
    </div>
  </div>`).join("");
$$(".reason").forEach((r) => r.addEventListener("click", (e) => {
  if (r.classList.contains("open")) return;
  r.classList.add("open");
  heartBurst(e.clientX, e.clientY, 6);
  if (++reasonsOpened === REASONS.length) {
    burstConfetti(250);
    showModal("💖", "Dan Masih Banyak Lagi…", "20 alasan ini cuma sebagian kecil. Sisanya terlalu banyak untuk ditulis di satu website. 😊");
  }
}));

// ---------- Reset semua progres (dipakai tombol "Ulangi dari awal") ----------
function resetProgress() {
  openedPages = [];
  refreshOpened();
  gombalSeen = []; gombalDeck = []; lastGombal = "";
  updateGombalStats();
  $("#gombalText").textContent = "Ketuk tombol di bawah, kalau berani…";
  reasonsOpened = 0;
  $$(".reason").forEach((r) => r.classList.remove("open"));
}
// bersihkan sisa data lama dari versi sebelumnya
try { localStorage.removeItem("imelda_opened"); localStorage.removeItem("imelda_gombalSeen"); } catch {}
