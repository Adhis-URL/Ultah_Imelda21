// =====================================================
//  MINI GAME: Pecah Balon, Memori Foto, Tangkap Cinta,
//  Kartu Gosok, dan Kembang Api
// =====================================================

// ---------- 1. PECAH BALON ----------
(() => {
  const arena = $("#popArena");
  let score = 0, time = 30, running = false, spawnT, clockT;
  let best = store.get("popBest", 0);
  $("#popBest").textContent = best;

  function spawn() {
    if (!running) return;
    const b = document.createElement("div");
    b.className = "pop-balloon";
    const r = Math.random();
    let type = "normal";
    if (r < 0.12) type = "gold"; else if (r < 0.24) type = "bomb";
    const colors = [themeVar("--accent"), themeVar("--accent-2"), themeVar("--accent-soft"), "#5eead4", "#60a5fa", "#f472b6"];
    b.style.background = type === "gold" ? "radial-gradient(circle at 35% 30%, #fff6c2, #f5b301)" : type === "bomb" ? "radial-gradient(circle at 35% 30%, #555, #111)" : pick(colors);
    if (type === "gold") b.textContent = "⭐";
    if (type === "bomb") b.textContent = "💣";
    b.style.left = rand(2, 88) + "%";
    b.style.animationDuration = rand(3, 5.5) - (30 - time) * 0.05 + "s";
    b.addEventListener("pointerdown", (e) => {
      e.stopPropagation();
      const pts = type === "gold" ? 5 : type === "bomb" ? -3 : 1;
      score = Math.max(0, score + pts);
      $("#popScore").textContent = score;
      const rect = arena.getBoundingClientRect();
      const fx = document.createElement("div");
      fx.className = "pop-burst";
      fx.textContent = (pts > 0 ? "+" : "") + pts;
      fx.style.color = pts > 0 ? themeVar("--accent-2") : "#ff6b6b";
      fx.style.left = e.clientX - rect.left + "px";
      fx.style.top = e.clientY - rect.top + "px";
      arena.appendChild(fx);
      fx.addEventListener("animationend", () => fx.remove());
      if (pts > 0) burstConfetti(18, e.clientX, e.clientY);
      b.remove();
    });
    b.addEventListener("animationend", () => b.remove());
    arena.appendChild(b);
    spawnT = setTimeout(spawn, Math.max(220, 620 - (30 - time) * 13));
  }
  function start() {
    score = 0; time = 30; running = true;
    $("#popScore").textContent = 0; $("#popTime").textContent = 30;
    $("#popOverlay").classList.add("hidden");
    spawn();
    clockT = setInterval(() => {
      time--;
      $("#popTime").textContent = time;
      if (time <= 0) end();
    }, 1000);
  }
  function stop() {
    running = false;
    clearTimeout(spawnT); clearInterval(clockT);
    arena.querySelectorAll(".pop-balloon").forEach((b) => b.remove());
  }
  function end() {
    stop();
    const newBest = score > best;
    if (newBest) { best = score; store.set("popBest", best); $("#popBest").textContent = best; }
    const msg = score >= 40 ? "Gila, jago banget! Tanganmu secepat senyummu bikin orang meleleh. 😆"
      : score >= 20 ? "Keren! Balon-balonnya kalah sama semangatmu. 🎈"
      : "Lumayan! Yang penting kamu senang, coba lagi yuk. 😊";
    $("#popOverlay").innerHTML = `<h3>${newBest ? "Rekor Baru! 🏆" : "Waktu Habis!"}</h3><p>Skor kamu: <b>${score}</b><br>${msg}</p><button class="btn btn-big" id="popStart">Main Lagi</button>`;
    $("#popOverlay").classList.remove("hidden");
    $("#popStart").addEventListener("click", start);
    if (newBest) burstConfetti(200);
  }
  $("#popStart").addEventListener("click", start);
  PAGE_HOOKS.pop = { close: () => { if (running) { stop(); $("#popOverlay").classList.remove("hidden"); } } };
})();

// ---------- 2. MEMORI FOTO ----------
(() => {
  const grid = $("#memGrid");
  const PAIRS = 8;
  let first = null, lock = false, moves = 0, found = 0, t0 = 0, timer = null;
  let best = store.get("memBest", null);
  $("#memBest").textContent = best ?? "-";

  function build() {
    clearInterval(timer); timer = null;
    moves = 0; found = 0; first = null; lock = false;
    $("#memMoves").textContent = 0; $("#memTime").textContent = 0;
    const chosen = [...PHOTOS].sort(() => Math.random() - 0.5).slice(0, PAIRS);
    const deck = [...chosen, ...chosen].sort(() => Math.random() - 0.5);
    grid.innerHTML = deck.map(([file], i) => `
      <div class="mem-card" data-f="${file}">
        <div class="mem-face mem-front">${pick(["💝", "💖", "🎀", "🌸"])}</div>
        <div class="mem-face mem-back"><img src="assets/foto/${file}" alt="" /></div>
      </div>`).join("");
    grid.querySelectorAll(".mem-card").forEach((c) => c.addEventListener("click", () => flip(c)));
  }
  function flip(c) {
    if (lock || c === first || c.classList.contains("done")) return;
    if (!timer) { t0 = Date.now(); timer = setInterval(() => ($("#memTime").textContent = Math.floor((Date.now() - t0) / 1000)), 500); }
    c.classList.add("flip");
    if (!first) { first = c; return; }
    moves++; $("#memMoves").textContent = moves;
    if (first.dataset.f === c.dataset.f) {
      first.classList.add("done"); c.classList.add("done");
      const r = c.getBoundingClientRect();
      burstConfetti(40, r.left + r.width / 2, r.top);
      first = null;
      if (++found === PAIRS) win();
    } else {
      lock = true;
      const a = first; first = null;
      setTimeout(() => { a.classList.remove("flip"); c.classList.remove("flip"); lock = false; }, 800);
    }
  }
  function win() {
    clearInterval(timer);
    const secs = Math.floor((Date.now() - t0) / 1000);
    const newBest = best === null || moves < best;
    if (newBest) { best = moves; store.set("memBest", best); $("#memBest").textContent = best; }
    burstConfetti(300);
    setTimeout(() => showModal("🃏", newBest ? "Rekor Baru!" : "Berhasil!", `Semua pasangan ketemu dalam ${moves} langkah dan ${secs} detik. Ingatanmu sebagus senyummu! 😍`, "Yeay!"), 600);
  }
  $("#memRestart").addEventListener("click", build);
  PAGE_HOOKS.memory = { open: build, close: () => clearInterval(timer) };
})();

// ---------- 3. TANGKAP CINTA ----------
(() => {
  const canvas = $("#catchCanvas");
  const ctx = canvas.getContext("2d");
  let W, H, basket, items, score, lives, running = false, raf, last, spawnAcc, speedMul;
  let best = store.get("catchBest", 0);
  const keys = {};
  $("#catchBest").textContent = best;

  function resize() {
    const r = canvas.getBoundingClientRect();
    W = canvas.width = r.width; H = canvas.height = r.height;
  }
  function start() {
    resize();
    basket = { x: W / 2, w: Math.max(70, W * 0.13) };
    items = []; score = 0; lives = 3; spawnAcc = 0; speedMul = 1;
    $("#catchScore").textContent = 0; $("#catchLives").textContent = "❤️❤️❤️";
    $("#catchOverlay").classList.add("hidden");
    running = true; last = performance.now();
    raf = requestAnimationFrame(loop);
  }
  function spawn() {
    const r = Math.random();
    const type = r < 0.1 ? "star" : r < 0.3 ? "broken" : "heart";
    items.push({ x: rand(20, W - 20), y: -30, vy: rand(140, 220) * speedMul, type, rot: rand(-0.5, 0.5) });
  }
  function loop(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    speedMul += dt * 0.03;
    spawnAcc += dt;
    if (spawnAcc > Math.max(0.35, 0.9 - score * 0.008)) { spawnAcc = 0; spawn(); }
    if (keys.ArrowLeft) basket.x -= 520 * dt;
    if (keys.ArrowRight) basket.x += 520 * dt;
    basket.x = Math.max(basket.w / 2, Math.min(W - basket.w / 2, basket.x));

    ctx.clearRect(0, 0, W, H);
    const by = H - 46;
    for (const it of items) {
      it.y += it.vy * dt;
      ctx.save(); ctx.translate(it.x, it.y); ctx.rotate(it.rot);
      ctx.font = "34px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(it.type === "star" ? "🌟" : it.type === "broken" ? "💔" : "💖", 0, 0);
      ctx.restore();
      if (!it.hit && it.y > by - 10 && it.y < by + 24 && Math.abs(it.x - basket.x) < basket.w / 2 + 6) {
        it.hit = true;
        if (it.type === "broken") {
          lives--;
          $("#catchLives").textContent = "❤️".repeat(lives) + "🖤".repeat(3 - lives);
          canvas.parentElement.animate([{ transform: "translateX(-8px)" }, { transform: "translateX(8px)" }, { transform: "none" }], { duration: 250 });
          if (lives <= 0) return end();
        } else {
          score += it.type === "star" ? 5 : 1;
          $("#catchScore").textContent = score;
        }
      }
    }
    items = items.filter((it) => !it.hit && it.y < H + 40);

    // keranjang
    ctx.font = `${Math.round(basket.w * 0.75)}px serif`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("🧺", basket.x, by + 6);
    raf = requestAnimationFrame(loop);
  }
  function stop() { running = false; cancelAnimationFrame(raf); }
  function end() {
    stop();
    const newBest = score > best;
    if (newBest) { best = score; store.set("catchBest", best); $("#catchBest").textContent = best; burstConfetti(220); }
    const msg = score >= 60 ? "Hatimu penuh cinta! Keranjangmu sampai kewalahan. 💞"
      : score >= 25 ? "Banyak banget cinta yang kamu tangkap hari ini! 💖"
      : "Tenang, cinta yang sebenarnya nggak akan ke mana-mana kok. 😉";
    $("#catchOverlay").innerHTML = `<h3>${newBest ? "Rekor Baru! 🏆" : "Permainan Selesai"}</h3><p>Kamu menangkap <b>${score}</b> cinta.<br>${msg}</p><button class="btn btn-big" id="catchStart">Main Lagi</button>`;
    $("#catchOverlay").classList.remove("hidden");
    $("#catchStart").addEventListener("click", start);
  }
  function moveTo(clientX) {
    if (!basket) return;
    const r = canvas.getBoundingClientRect();
    basket.x = clientX - r.left;
  }
  canvas.addEventListener("pointermove", (e) => moveTo(e.clientX));
  canvas.addEventListener("pointerdown", (e) => moveTo(e.clientX));
  addEventListener("keydown", (e) => { if (running && (e.key === "ArrowLeft" || e.key === "ArrowRight")) { keys[e.key] = true; e.preventDefault(); } });
  addEventListener("keyup", (e) => (keys[e.key] = false));
  $("#catchStart").addEventListener("click", start);
  addEventListener("resize", () => { if (running) resize(); });
  PAGE_HOOKS.catch = { close: () => { if (running) { stop(); $("#catchOverlay").classList.remove("hidden"); } } };
})();

// ---------- 4. KARTU GOSOK ----------
(() => {
  const canvas = $("#scratchCanvas");
  const ctx = canvas.getContext("2d");
  let drawing = false, revealed = false, lastPrize = -1;

  function newCard() {
    revealed = false;
    let i;
    do { i = Math.floor(Math.random() * PRIZES.length); } while (i === lastPrize && PRIZES.length > 1);
    lastPrize = i;
    const p = PRIZES[i];
    $("#scratchPrize").innerHTML = `<span class="p-icon">${p.icon}</span><b>${p.title}</b><small>${p.text}</small>`;
    const r = canvas.getBoundingClientRect();
    canvas.width = r.width; canvas.height = r.height;
    canvas.style.opacity = 1;
    const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    g.addColorStop(0, "#f7d774"); g.addColorStop(0.5, "#fff1b8"); g.addColorStop(1, "#d4a017");
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = g; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(120, 80, 0, .55)";
    ctx.font = "600 20px Poppins, sans-serif"; ctx.textAlign = "center";
    ctx.fillText("✨ GOSOK DI SINI ✨", canvas.width / 2, canvas.height / 2 + 7);
    for (let k = 0; k < 40; k++) { ctx.fillText("·", rand(0, canvas.width), rand(0, canvas.height)); }
  }
  let lastPt = null;
  function scratch(e) {
    if (!drawing || revealed) return;
    const r = canvas.getBoundingClientRect();
    const pt = { x: (e.clientX - r.left) * (canvas.width / r.width), y: (e.clientY - r.top) * (canvas.height / r.height) };
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 44; ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo((lastPt || pt).x, (lastPt || pt).y);
    ctx.lineTo(pt.x + 0.1, pt.y);
    ctx.stroke();
    lastPt = pt;
  }
  function check() {
    if (revealed) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 32) if (data[i] === 0) clear++;
    if (clear / (data.length / 32) > 0.5) {
      revealed = true;
      canvas.style.opacity = 0;
      const r = canvas.getBoundingClientRect();
      burstConfetti(180, r.left + r.width / 2, r.top + r.height / 2);
      toast("Selamat! Simpan baik-baik kuponnya ya 🎟️");
    }
  }
  canvas.addEventListener("pointerdown", (e) => { drawing = true; lastPt = null; canvas.setPointerCapture(e.pointerId); scratch(e); });
  canvas.addEventListener("pointermove", scratch);
  canvas.addEventListener("pointerup", () => { drawing = false; lastPt = null; check(); });
  canvas.addEventListener("pointercancel", () => (drawing = false));
  $("#scratchAgain").addEventListener("click", newCard);
  PAGE_HOOKS.scratch = { open: () => requestAnimationFrame(newCard) };
})();

// ---------- 5. KEMBANG API ----------
(() => {
  const canvas = $("#fwCanvas");
  const ctx = canvas.getContext("2d");
  let rockets = [], sparks = [], running = false, raf, autoT;

  function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
  function launch(tx, ty) {
    rockets.push({ x: tx ?? rand(canvas.width * 0.15, canvas.width * 0.85), y: canvas.height, tx: tx ?? null, ty: ty ?? rand(canvas.height * 0.12, canvas.height * 0.45), vy: -rand(9, 13) });
  }
  function explode(x, y) {
    const hue = rand(0, 360);
    const shape = Math.random() < 0.3 ? "heart" : "round";
    const n = 110;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      let vx, vy;
      if (shape === "heart") {
        // kurva hati
        const t = a;
        vx = 16 * Math.sin(t) ** 3 * 0.32;
        vy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 0.32;
      } else {
        const sp = rand(2, 7);
        vx = Math.cos(a) * sp; vy = Math.sin(a) * sp;
      }
      sparks.push({ x, y, vx, vy, life: 1, hue: hue + rand(-20, 20) });
    }
  }
  function loop() {
    if (!running) return;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(3, 1, 10, 0.22)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";
    for (const r of rockets) {
      r.y += r.vy; r.vy += 0.12;
      ctx.fillStyle = "#ffe9b0";
      ctx.beginPath(); ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2); ctx.fill();
      if (r.y <= r.ty || r.vy >= 0) { r.done = true; explode(r.x, r.y); }
    }
    rockets = rockets.filter((r) => !r.done);
    for (const s of sparks) {
      s.x += s.vx; s.y += s.vy; s.vy += 0.05; s.vx *= 0.985; s.vy *= 0.985; s.life -= 0.012;
      ctx.fillStyle = `hsla(${s.hue}, 100%, 65%, ${Math.max(0, s.life)})`;
      ctx.beginPath(); ctx.arc(s.x, s.y, 2, 0, Math.PI * 2); ctx.fill();
    }
    sparks = sparks.filter((s) => s.life > 0);
    raf = requestAnimationFrame(loop);
  }
  canvas.addEventListener("pointerdown", (e) => {
    const r = { x: e.clientX, y: e.clientY };
    rockets.push({ x: r.x, y: canvas.height, ty: r.y, vy: -Math.max(9, Math.sqrt(2 * 0.12 * (canvas.height - r.y)) + 0.5) });
  });
  PAGE_HOOKS.fireworks = {
    open() {
      resize(); running = true; rockets = []; sparks = [];
      ctx.fillStyle = "#03010a"; ctx.fillRect(0, 0, canvas.width, canvas.height);
      loop();
      for (let i = 0; i < 4; i++) setTimeout(() => launch(), i * 350);
      autoT = setInterval(() => launch(), 900);
    },
    close() { running = false; cancelAnimationFrame(raf); clearInterval(autoT); },
  };
  addEventListener("resize", () => { if (running) resize(); });
})();
