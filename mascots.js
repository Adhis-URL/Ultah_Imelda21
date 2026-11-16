// =====================================================
//  MASKOT: Moci si kelinci (kiri) & Coklat si beruang (kanan)
//  Muncul setelah lilin ditiup, melambai, dan mengirim chat.
// =====================================================

// ---------- Gambar SVG (dibuat sendiri, bebas dipakai) ----------
const BUNNY_SVG = `
<svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg" aria-label="Moci si kelinci">
  <ellipse cx="100" cy="244" rx="62" ry="6" fill="rgba(0,0,0,.25)"/>
  <g class="m-ear m-ear-l"><ellipse cx="74" cy="52" rx="17" ry="46" fill="#fff6fa" stroke="#f2bfd2" stroke-width="3" transform="rotate(-12 74 52)"/><ellipse cx="74" cy="56" rx="8" ry="32" fill="#ffb3cc" transform="rotate(-12 74 56)"/></g>
  <g class="m-ear m-ear-r"><ellipse cx="126" cy="52" rx="17" ry="46" fill="#fff6fa" stroke="#f2bfd2" stroke-width="3" transform="rotate(12 126 52)"/><ellipse cx="126" cy="56" rx="8" ry="32" fill="#ffb3cc" transform="rotate(12 126 56)"/></g>
  <ellipse cx="52" cy="186" rx="13" ry="22" fill="#fff6fa" stroke="#f2bfd2" stroke-width="3" transform="rotate(20 52 186)"/>
  <ellipse cx="100" cy="190" rx="56" ry="50" fill="#fff6fa" stroke="#f2bfd2" stroke-width="3"/>
  <ellipse cx="100" cy="200" rx="32" ry="30" fill="#ffe3ec"/>
  <ellipse cx="74" cy="236" rx="20" ry="11" fill="#fff6fa" stroke="#f2bfd2" stroke-width="3"/>
  <ellipse cx="126" cy="236" rx="20" ry="11" fill="#fff6fa" stroke="#f2bfd2" stroke-width="3"/>
  <circle cx="100" cy="112" r="54" fill="#fff6fa" stroke="#f2bfd2" stroke-width="3"/>
  <g class="m-eyes">
    <ellipse cx="80" cy="110" rx="7" ry="9" fill="#3b2230"/><circle cx="82.5" cy="106" r="2.6" fill="#fff"/>
    <ellipse cx="120" cy="110" rx="7" ry="9" fill="#3b2230"/><circle cx="122.5" cy="106" r="2.6" fill="#fff"/>
  </g>
  <ellipse cx="66" cy="128" rx="10" ry="6" fill="#ff8fb5" opacity=".65"/>
  <ellipse cx="134" cy="128" rx="10" ry="6" fill="#ff8fb5" opacity=".65"/>
  <ellipse cx="100" cy="122" rx="5" ry="3.5" fill="#ff7aa8"/>
  <path d="M92 128 q4 6 8 0 q4 6 8 0" fill="none" stroke="#3b2230" stroke-width="2.5" stroke-linecap="round"/>
  <g class="m-hat"><path d="M100 22 L84 62 L116 62 Z" fill="#ffd36e"/><path d="M92 42 L108 42 L111 50 L89 50 Z" fill="#ff6fa8"/><circle cx="100" cy="21" r="7" fill="#ff6fa8"/></g>
  <g class="m-wave"><ellipse cx="156" cy="160" rx="13" ry="25" fill="#fff6fa" stroke="#f2bfd2" stroke-width="3" transform="rotate(-35 156 160)"/><ellipse cx="166" cy="144" rx="5" ry="4" fill="#ffd0e0"/></g>
</svg>`;

const BEAR_SVG = `
<svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg" aria-label="Coklat si beruang">
  <ellipse cx="100" cy="244" rx="62" ry="6" fill="rgba(0,0,0,.25)"/>
  <circle cx="56" cy="70" r="22" fill="#c98b5a" stroke="#9c6236" stroke-width="3"/><circle cx="56" cy="70" r="11" fill="#f1cfae"/>
  <circle cx="144" cy="70" r="22" fill="#c98b5a" stroke="#9c6236" stroke-width="3"/><circle cx="144" cy="70" r="11" fill="#f1cfae"/>
  <ellipse cx="148" cy="186" rx="13" ry="22" fill="#c98b5a" stroke="#9c6236" stroke-width="3" transform="rotate(-20 148 186)"/>
  <ellipse cx="100" cy="190" rx="56" ry="50" fill="#c98b5a" stroke="#9c6236" stroke-width="3"/>
  <ellipse cx="100" cy="200" rx="32" ry="30" fill="#f1cfae"/>
  <ellipse cx="74" cy="236" rx="20" ry="11" fill="#c98b5a" stroke="#9c6236" stroke-width="3"/>
  <ellipse cx="126" cy="236" rx="20" ry="11" fill="#c98b5a" stroke="#9c6236" stroke-width="3"/>
  <circle cx="100" cy="114" r="56" fill="#c98b5a" stroke="#9c6236" stroke-width="3"/>
  <ellipse cx="100" cy="132" rx="26" ry="19" fill="#f1cfae"/>
  <g class="m-eyes">
    <ellipse cx="78" cy="108" rx="7" ry="9" fill="#2b1a12"/><circle cx="80.5" cy="104" r="2.6" fill="#fff"/>
    <ellipse cx="122" cy="108" rx="7" ry="9" fill="#2b1a12"/><circle cx="124.5" cy="104" r="2.6" fill="#fff"/>
  </g>
  <ellipse cx="62" cy="128" rx="10" ry="6" fill="#ff8f8f" opacity=".55"/>
  <ellipse cx="138" cy="128" rx="10" ry="6" fill="#ff8f8f" opacity=".55"/>
  <ellipse cx="100" cy="124" rx="8" ry="5.5" fill="#2b1a12"/>
  <path d="M100 129 v5 M92 136 q8 7 16 0" fill="none" stroke="#2b1a12" stroke-width="2.5" stroke-linecap="round"/>
  <g class="m-bow"><path d="M100 168 L82 158 L82 178 Z M100 168 L118 158 L118 178 Z" fill="#a78bfa"/><circle cx="100" cy="168" r="5" fill="#7c5cf0"/></g>
  <g class="m-hat"><path d="M112 24 L94 62 L128 60 Z" fill="#5eead4"/><path d="M103 44 L119 43 L122 51 L99 52 Z" fill="#ffd36e"/><circle cx="112" cy="23" r="7" fill="#ffd36e"/></g>
  <g class="m-wave"><ellipse cx="44" cy="160" rx="13" ry="25" fill="#c98b5a" stroke="#9c6236" stroke-width="3" transform="rotate(35 44 160)"/><ellipse cx="34" cy="144" rx="5" ry="4" fill="#f1cfae"/></g>
</svg>`;

// ---------- Isi chat (bebas diubah) ----------
// Saat halaman ucapan (setelah tiup lilin)
const MASCOT_INTRO = [
  ["left", "Haiii Imelda! 👋"],
  ["right", "Yeay, lilinnya sudah ditiup! 🕯️✨"],
  ["left", "Selamat ulang tahun yaaa! 🎂🎉"],
  ["right", "Semoga semua permohonanmu terkabul! 🙏💖"],
  ["left", "Psst… ada kotak kejutan di bawah, buka deh! 🎁"],
];
// Saat masuk Kotak Kejutan
const MASCOT_HUB_INTRO = [
  ["right", "Tadaaa! Ini dia Kotak Kejutannya! 🎁"],
  ["left", "Ada 12 kejutan, mau buka yang mana dulu? 🤔"],
  ["right", "Aku saranin baca Surat Untukmu dulu! 💌"],
  ["left", "Kalau mau main, Pecah Balon seru banget lho! 🎈"],
];
const MASCOT_CHATTER = {
  wish: {
    left: [
      "Kamu cantik banget hari ini! 😍",
      "Mau peluk? 🤗",
      "Aku udah nunggu hari ini dari kemarin lho! 🐰",
      "Jangan lupa makan kue yang banyak ya! 🍰",
      "Senyum terus yaa, Imelda! 😊",
    ],
    right: [
      "Happy birthday, Imelda! 🐻🎈",
      "Semoga sehat selalu ya! 💪",
      "Tahun ini pasti jadi tahun terbaikmu! ⭐",
      "Aku bawain pelukan beruang nih! 🧸",
      "Kamu hebat, sudah sejauh ini! 👏",
    ],
  },
  hub: {
    left: [
      "Udah coba Kartu Gosok belum? Ada hadiahnya! 🎟️",
      "Gombalannya bikin baper, awas senyum sendiri! 🙈",
      "Kembang apinya bisa dibentuk hati lho! 🎆",
      "Galeri fotonya cantik-cantik semua! 📸",
      "Coba tulis harapanmu di Lampion Harapan! 🏮",
    ],
    right: [
      "Rekor Pecah Balon kamu berapa? 🎈",
      "Main Memori Foto yuk, isinya fotomu! 🃏",
      "Puisinya bagus, aku sampai terharu… 🥹",
      "Cerpennya ada kejutan di akhir lho! 📖",
      "Buka semua ya, ada hadiah kalau 12/12! 🏆",
    ],
  },
};
// Komentar setelah kembali dari sebuah kejutan
const MASCOT_REACT = {
  letter: ["left", "Suratnya bikin hangat ya? 🥹💌"],
  poems: ["right", "Puisinya indah banget kan? 📜✨"],
  story: ["left", "Gimana cerpennya? Bikin senyum nggak? 📖😊"],
  gombal: ["right", "Hayo, pipinya merah tuh! 😳"],
  pop: ["left", "Balonnya pecah semua? Hebat! 🎈"],
  memory: ["right", "Ingatanmu tajam banget! 🃏🧠"],
  catch: ["left", "Cintanya banyak yang ketangkep? 💖"],
  scratch: ["right", "Hadiahnya jangan lupa ditagih ya! 🎟️😆"],
  gallery: ["left", "Fotonya cantik semua! 📸😍"],
  fireworks: ["right", "Kembang apinya meriah ya! 🎆"],
  wishes: ["left", "Semoga harapanmu terkabul! 🏮🙏"],
  reasons: ["right", "Masih banyak alasan lainnya lho! 💖"],
};
const MASCOT_NAMES = { left: "Moci 🐰", right: "Coklat 🐻" };

// ---------- Logika ----------
const mascotWrap = document.createElement("div");
mascotWrap.id = "mascots";
mascotWrap.innerHTML = ["left", "right"]
  .map(
    (side) => `
  <div class="mascot mascot-${side}" data-side="${side}">
    <div class="chat-bubble"><span class="cb-name">${MASCOT_NAMES[side]}</span><span class="cb-text"></span></div>
    <div class="mascot-body">${side === "left" ? BUNNY_SVG : BEAR_SVG}</div>
  </div>`,
  )
  .join("");
document.body.appendChild(mascotWrap);

let mascotTimers = [];
let chatterTimer = null;
let mascotsOn = false;
const later = (fn, ms) => mascotTimers.push(setTimeout(fn, ms));

function say(side, text, holdMs = 3600) {
  const m = mascotWrap.querySelector(`.mascot-${side}`);
  const bubble = m.querySelector(".chat-bubble");
  const txt = bubble.querySelector(".cb-text");
  // sembunyikan balon chat maskot lain supaya tidak bertumpuk
  const other = mascotWrap.querySelector(
    `.mascot-${side === "left" ? "right" : "left"}`,
  );
  const ob = other.querySelector(".chat-bubble");
  clearTimeout(ob._type);
  clearTimeout(ob._hide);
  ob.classList.remove("show");
  other.classList.remove("talking");
  clearTimeout(bubble._hide);
  clearTimeout(bubble._type);
  txt.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>';
  bubble.classList.add("show");
  m.classList.add("talking");
  bubble._type = setTimeout(() => {
    txt.textContent = text;
    bubble.classList.remove("pop");
    bubble.offsetHeight;
    bubble.classList.add("pop");
    boop(side === "left" ? 880 : 620);
  }, 700);
  bubble._hide = setTimeout(() => {
    bubble.classList.remove("show");
    m.classList.remove("talking");
  }, 700 + holdMs);
}

// Bunyi "boop" kecil saat chat muncul (dibuat dengan Web Audio, tanpa file)
let boopCtx = null;
function boop(freq) {
  try {
    boopCtx =
      boopCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = boopCtx.createOscillator(),
      g = boopCtx.createGain();
    const t = boopCtx.currentTime;
    o.type = "sine";
    o.frequency.setValueAtTime(freq, t);
    o.frequency.exponentialRampToValueAtTime(freq * 1.6, t + 0.08);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.08, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
    o.connect(g).connect(boopCtx.destination);
    o.start(t);
    o.stop(t + 0.2);
  } catch {}
}

let mascotMode = "wish";
function playScript(lines) {
  mascotTimers.forEach(clearTimeout);
  mascotTimers = [];
  clearInterval(chatterTimer);
  let t = 900;
  lines.forEach(([side, text]) => {
    later(() => say(side, text, 2600), t);
    t += 2700;
  });
  later(startChatter, t + 1500);
}
function showMascots(mode = "wish") {
  const changed = mode !== mascotMode;
  mascotMode = mode;
  document.body.classList.toggle("mascot-hub", mode === "hub");
  const script = mode === "hub" ? MASCOT_HUB_INTRO : MASCOT_INTRO;
  if (mascotsOn) {
    if (changed) playScript(script);
    return;
  }
  mascotsOn = true;
  mascotWrap.classList.remove("leaving");
  mascotWrap.classList.add("on");
  document.body.classList.add("mascots-on");
  setTimeout(() => playScript(script), 400);
}
function startChatter() {
  clearInterval(chatterTimer);
  let side = "right";
  chatterTimer = setInterval(() => {
    side = side === "left" ? "right" : "left";
    say(side, pick(MASCOT_CHATTER[mascotMode][side]));
  }, 8000);
}
// dipanggil saat kembali dari sebuah kejutan
function mascotReact(page, allDone) {
  if (!mascotsOn) return;
  mascotTimers.forEach(clearTimeout);
  mascotTimers = [];
  if (allDone) {
    later(() => say("left", "KAMU BERHASIL BUKA SEMUANYA! 🏆🎉", 3200), 500);
    later(
      () => say("right", "Selamat ulang tahun sekali lagi, Imelda! 💖", 3400),
      2400,
    );
  } else if (MASCOT_REACT[page]) {
    const [side, text] = MASCOT_REACT[page];
    const m = mascotWrap.querySelector(`.mascot-${side}`);
    m.classList.remove("jump");
    m.offsetHeight;
    m.classList.add("jump");
    later(() => say(side, text, 3000), 400);
  }
  later(startChatter, 6000);
}
function hideMascots() {
  if (!mascotsOn) return;
  mascotsOn = false;
  mascotTimers.forEach(clearTimeout);
  mascotTimers = [];
  clearInterval(chatterTimer);
  mascotWrap.querySelectorAll(".chat-bubble").forEach((b) => {
    clearTimeout(b._type);
    clearTimeout(b._hide);
    b.classList.remove("show");
  });
  mascotWrap.classList.add("leaving");
  document.body.classList.remove("mascots-on", "mascot-hub");
  setTimeout(() => {
    if (!mascotsOn) mascotWrap.classList.remove("on", "leaving");
  }, 700);
}

// Colek maskot → lompat, hati, dan chat lucu
mascotWrap.querySelectorAll(".mascot-body").forEach((body) => {
  body.addEventListener("click", (e) => {
    const m = body.parentElement;
    const side = m.dataset.side;
    m.classList.remove("jump");
    m.offsetHeight;
    m.classList.add("jump");
    heartBurst(e.clientX, e.clientY, 7);
    say(side, pick(MASCOT_CHATTER[mascotMode][side]), 3000);
  });
});
