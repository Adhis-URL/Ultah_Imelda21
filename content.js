// =====================================================
//  SEMUA TULISAN ADA DI SINI — bebas kamu ubah 💌
// =====================================================

// Nama tokoh pengirim di cerpen — ganti dengan namamu 😉
const SENDER_NAME = "Raka";

// ---------- Ucapan singkat (diketik otomatis di halaman ucapan) ----------
const MESSAGE = `Hari ini, semesta sedang merayakan satu hal yang istimewa: hari ketika kamu hadir ke dunia. 🎉

Selamat ulang tahun, Misniati Imelda. Semoga usia barumu dipenuhi tawa yang tulus, langkah yang ringan, dan doa-doa yang satu per satu menemukan jalannya menjadi nyata. ✨`;

const SIGNATURE = "— Dari Adhis Lelaki Masadepan mu 💖";

// ---------- Surat panjang ----------
const LETTER = {
  title: "Untuk Imelda, di Hari Ulang Tahunnya",
  paragraphs: [
    "Hai, Imelda.",
    "Aku menulis surat ini pelan-pelan, karena aku ingin setiap katanya benar-benar sampai. Bukan sekadar ucapan yang lewat di layar lalu tenggelam di antara notifikasi lain, tapi sesuatu yang bisa kamu buka lagi kapan pun kamu butuh diingatkan betapa berharganya dirimu.",
    "Hari ini usiamu bertambah. Orang bilang itu artinya jatah waktu berkurang, tapi aku lebih suka melihatnya begini: hari ini dunia mendapat satu tahun lagi bersama orang sebaik kamu. Satu tahun lagi untuk senyummu yang bikin suasana jadi hangat, untuk caramu peduli tanpa banyak bicara, dan untuk semangatmu yang tetap menyala meskipun hari sedang tidak bersahabat.",
    "Aku tahu, tidak semua hari di tahun kemarin terasa mudah. Mungkin ada lelah yang kamu sembunyikan di balik tawa, ada rencana yang tidak berjalan sesuai harapan, ada malam-malam ketika kamu bertanya apakah semua ini akan baik-baik saja. Kalau boleh aku jawab sekarang: kamu sudah melewatinya. Kamu masih di sini, masih tersenyum, masih berusaha. Dan itu luar biasa.",
    "Di usia yang baru ini, aku berharap kamu lebih sering memeluk dirimu sendiri. Lebih sering bilang \"aku hebat\" pada bayangan di cermin. Lebih jarang meragukan langkahmu. Semoga pekerjaanmu membawa berkah, semoga lelahmu selalu dibayar dengan hasil yang manis, dan semoga orang-orang di sekitarmu selalu tahu cara menyayangimu dengan benar.",
    "Semoga kesehatan selalu menemanimu, rezeki datang dari arah yang tidak disangka, dan setiap pintu yang kamu ketuk terbuka dengan ramah. Semoga hatimu selalu punya tempat pulang, dan semoga tempat itu selalu terasa tenang.",
    "Terima kasih sudah lahir, Imelda. Terima kasih sudah menjadi kamu, versi terbaik yang bahkan mungkin belum kamu sadari.",
    "Selamat ulang tahun. Semoga tahun ini menjadi bab paling indah dalam ceritamu sejauh ini.",
  ],
  closing: "Dengan tulus,\nseseorang yang selalu mendoakan bahagiamu 💖",
};

// ---------- Puisi ----------
const POEMS = [
  {
    title: "Di Hari Kau Lahir",
    lines: [
      "Pagi itu, langit tidak tahu",
      "bahwa ia sedang menyambut seseorang",
      "yang kelak membuat banyak hari terasa lebih terang.",
      "",
      "Angin berbisik pada daun-daun,",
      "matahari terbit sedikit lebih hati-hati,",
      "seolah tak ingin silaunya",
      "mengalahkan cahaya kecil yang baru tiba.",
      "",
      "Dan kini, bertahun-tahun kemudian,",
      "cahaya kecil itu telah tumbuh",
      "menjadi senyum yang hangat,",
      "menjadi tawa yang menular,",
      "menjadi kamu — Imelda.",
      "",
      "Selamat hari lahir, wahai cahaya,",
      "teruslah bersinar dengan caramu sendiri.",
    ],
  },
  {
    title: "Senyummu",
    lines: [
      "Ada yang tak pernah bisa kujelaskan",
      "tentang caramu tersenyum:",
      "sederhana, tapi mampu meruntuhkan",
      "seluruh mendung dalam kepala.",
      "",
      "Seperti teh hangat di sore yang hujan,",
      "seperti lagu lama yang tiba-tiba diputar,",
      "seperti pulang,",
      "setelah perjalanan yang panjang.",
      "",
      "Maka hari ini aku hanya meminta satu hal",
      "pada Tuhan yang Maha Mendengar:",
      "jagalah senyum itu,",
      "jangan biarkan ia pudar",
      "oleh apa pun yang dunia tawarkan.",
    ],
  },
  {
    title: "Doa Kecil di Malam Ulang Tahunmu",
    lines: [
      "Di antara lilin yang menyala,",
      "kutitipkan doa-doa kecil",
      "yang tak sempat kuucapkan dengan suara.",
      "",
      "Semoga langkahmu selalu ringan,",
      "meski jalan kadang berbatu.",
      "Semoga hatimu selalu lapang,",
      "meski dunia kadang tak menentu.",
      "",
      "Semoga lelahmu menjadi lillah,",
      "semoga sabarmu berbuah indah,",
      "semoga setiap air mata",
      "berganti tawa yang lebih lama.",
      "",
      "Dan bila suatu hari kau ragu",
      "pada dirimu sendiri,",
      "bacalah lagi puisi ini:",
      "kau selalu cukup, Imelda.",
      "Selalu.",
    ],
  },
];

// ---------- Cerpen ----------
const STORY = {
  title: "Kado yang Tak Bisa Dibungkus",
  paragraphs: [
    `Tiga hari sebelum tanggal itu, ${SENDER_NAME} duduk di depan laptopnya dengan kepala penuh kebingungan. Di layar, belasan tab toko online terbuka berderet: jam tangan, boneka beruang, buket bunga, parfum. Semuanya bagus. Semuanya juga terasa biasa saja.`,
    "\"Kenapa susah banget, sih, cari kado buat orang yang spesial?\" gumamnya sambil menutup tab satu per satu.",
    "Masalahnya, Imelda bukan orang yang mudah ditebak. Ia bisa tertawa terbahak-bahak karena hal sepele, tapi juga bisa diam lama memandangi langit sore seakan sedang membaca sesuatu di sana. Ia kuat, tapi diam-diam lembut. Ia sibuk bekerja, tapi selalu sempat menanyakan kabar orang lain. Kado biasa rasanya tidak cukup untuk orang yang tidak biasa.",
    `Malam itu ${SENDER_NAME} membuka galeri ponselnya. Ada foto Imelda yang sedang tersenyum dengan lipstik merahnya, foto ia berkedip jahil sambil menahan tawa, foto ia berkerudung hitam di dalam mobil dengan mata yang ikut tersenyum. ${SENDER_NAME} menggulir layar pelan-pelan, dan tanpa sadar ikut tersenyum juga.`,
    "Lalu sebuah ide muncul.",
    "\"Bagaimana kalau kadonya bukan barang,\" katanya pada dirinya sendiri, \"tapi sebuah tempat? Tempat yang isinya semua hal tentang dia.\"",
    `Esok harinya, sepulang kuliah, ${SENDER_NAME} membuka aplikasi yang biasa ia pakai untuk mengerjakan tugas. Ia mulai mengetik baris demi baris. Awalnya hanya sebuah kotak hadiah yang bisa dibuka. Lalu sebuah kue dengan lilin yang bisa ditiup. Lalu balon-balon yang melayang, bintang yang berkelip, dan musik yang ia pilih sendiri, lagu-lagu yang entah kenapa selalu mengingatkannya pada Imelda.`,
    "Malam kedua, ia menulis puisi. Ia bukan penyair, dan ia tahu itu. Ia menghapus kalimat pertama sebanyak tujuh kali. Tapi ia terus menulis, karena ia sadar ada hal-hal yang tidak bisa disampaikan lewat obrolan biasa. Hal-hal seperti: terima kasih sudah ada. Hal-hal seperti: kamu lebih berharga dari yang kamu kira.",
    "Malam ketiga, matanya mulai berat. Kopi di mejanya sudah dingin sejak satu jam lalu. Tapi ketika ia membuka hasil kerjanya di browser dan melihat nama itu muncul berkilau di tengah layar, Misniati Imelda, rasa lelahnya hilang begitu saja.",
    "\"Semoga dia suka,\" bisiknya.",
    "Tepat tengah malam, ia mengirimkan sebuah tautan. Tanpa penjelasan panjang, hanya satu kalimat: \"Buka ini, ya. Ada kejutan kecil buat kamu.\"",
    "Di seberang sana, Imelda menatap layar ponselnya dengan dahi berkerut. Ia mengetuk tautan itu. Sebuah kotak hadiah bergoyang-goyang di tengah layar, seolah tidak sabar ingin dibuka. Ia mengetuknya, dan musik mulai mengalun. Konfeti berhamburan. Ada kue dengan tiga lilin yang menunggu ditiup.",
    "Ia tertawa kecil. Lalu terdiam. Lalu tersenyum lagi, lebih lama.",
    "Ketika ia sampai di galeri dan melihat foto-fotonya sendiri tersusun rapi seperti polaroid yang ditempel di dinding kenangan, ia menutup mulutnya dengan tangan. Matanya menghangat.",
    "Ternyata ada kado yang tidak bisa dibungkus kertas dan pita. Kado yang tidak dijual di toko mana pun. Kado yang dibuat dari waktu, dari usaha, dan dari perasaan yang tulus.",
    "Dan malam itu, Imelda tahu satu hal dengan pasti: ia diingat. Ia dirayakan. Ia disayangi.",
    "Dan mungkin, itulah kado terbaik yang bisa diterima seseorang di hari ulang tahunnya.",
    "— Tamat —",
  ],
};

// ---------- Gombalan ----------
const GOMBAL = [
  "Kamu tahu bedanya kamu sama kue ulang tahun? Kue cuma manis sehari, kamu manisnya setiap hari. 🎂",
  "Lilin di kue boleh padam, tapi rasa sayangku ke kamu nyala terus tanpa perlu ditiup. 🕯️",
  "Hari ini umurmu nambah, tapi tenang aja, cantikmu juga ikut naik level. ✨",
  "Kamu itu kayak wifi gratis, bikin aku betah dan nggak mau jauh-jauh. 📶",
  "Kalau senyummu bisa dijual, aku rela jadi pelanggan tetap seumur hidup. 😊",
  "Aku bukan fotografer, tapi aku bisa bayangin kita berdua dalam satu bingkai. 📸",
  "Kata dokter aku kurang vitamin. Aku jawab: yang kurang itu vitamin U, alias kamu. 💊",
  "Kamu kayak alarm pagi: nggak bisa diabaikan, dan selalu jadi hal pertama yang kupikirkan. ⏰",
  "Balon bisa terbang tinggi, tapi hatiku terbangnya lebih tinggi tiap lihat kamu senyum. 🎈",
  "Bumi itu bulat, tapi kenapa ujung-ujungnya aku selalu ketemunya kamu lagi? 🌍",
  "Kamu tahu kenapa langit malam ini cerah? Karena bintangnya lagi ulang tahun, kamu. ⭐",
  "Aku nggak pinter matematika, tapi aku tahu kamu ditambah aku hasilnya bahagia. ➕",
  "Kalau kamu jadi lagu, kamu pasti lagu yang aku putar berulang-ulang sampai hafal. 🎵",
  "Kamu tuh kayak kopi: bikin melek, bikin candu, dan bikin hari-hariku nggak hambar. ☕",
  "Kamu boleh nambah umur, tapi jangan nambah jarak, ya. 📏",
  "Aku rela jadi lilin kue ulang tahunmu, asal yang tiup kamu. 🎂",
  "Mau tahu kado terbaik buat kamu tahun ini? Coba lihat cermin, itu yang paling berharga. 🪞",
  "Kamu kayak hujan di musim kemarau: ditunggu-tunggu, dan bikin semuanya terasa segar lagi. 🌧️",
  "Kalau bahagia itu punya alamat, kayaknya alamatnya di senyummu deh. 🏡",
  "Kata orang jangan gampang percaya sama janji. Tapi aku janji, aku bakal selalu dukung kamu. 🤝",
  "Kamu itu kayak matahari pagi: hangat, terang, dan bikin semangat bangun. 🌅",
  "Kenapa ya tiap kamu lewat, jantungku langsung olahraga tanpa disuruh? 💓",
  "Konfeti di website ini banyak, tapi tetap kalah banyak sama alasan aku mengagumi kamu. 🎉",
  "Aku bukan Google, tapi semua yang kamu cari ada di aku: perhatian, doa, dan dukungan. 🔍",
  "Selamat ulang tahun, kamu. Iya, kamu yang dari tadi senyum-senyum baca gombalan ini. 😆",
];

// ---------- Hadiah kartu gosok ----------
const PRIZES = [
  { icon: "🍜", title: "Kupon Traktiran", text: "Berlaku untuk satu makanan favoritmu, kapan pun kamu mau." },
  { icon: "🧋", title: "Kupon Boba Gratis", text: "Satu gelas minuman manis untuk orang yang paling manis." },
  { icon: "🎬", title: "Kupon Nonton Bareng", text: "Film bebas pilih, popcorn ditanggung." },
  { icon: "🤗", title: "Kupon Peluk Virtual", text: "Bisa ditukar kapan saja saat kamu lelah. Tidak ada tanggal kedaluwarsa." },
  { icon: "🎧", title: "Kupon Curhat Tanpa Batas", text: "Siap mendengarkan, tanpa menghakimi, tanpa memotong cerita." },
  { icon: "🌷", title: "Kupon Bunga", text: "Satu buket bunga untuk menemani harimu." },
  { icon: "👑", title: "Kupon Ratu Sehari", text: "Hari ini semua permintaanmu (yang masuk akal) dikabulkan." },
];

// ---------- Alasan kamu istimewa ----------
const REASONS = [
  "Senyummu bisa bikin hari paling buruk terasa sedikit lebih ringan.",
  "Kamu pekerja keras, tapi tetap ingat untuk bercanda.",
  "Caramu tertawa itu menular, siapa pun di dekatmu ikut bahagia.",
  "Kamu peduli pada orang lain, bahkan saat kamu sendiri sedang lelah.",
  "Kamu cantik dengan atau tanpa kerudung, dengan atau tanpa lipstik merah itu.",
  "Kamu kuat, meski kadang kamu sendiri lupa betapa kuatnya kamu.",
  "Kamu selalu tahu cara bikin suasana jadi hangat.",
  "Gaya kedipan jahilmu itu ikonik, nggak ada yang bisa niru.",
  "Kamu tetap rendah hati walaupun punya banyak kelebihan.",
  "Kamu berani mengejar mimpimu sendiri.",
  "Kamu bisa jadi lucu dan anggun di hari yang sama.",
  "Ceritamu selalu enak didengar, sesederhana apa pun.",
  "Kamu tulus, dan ketulusan itu langka.",
  "Kamu bertahan di hari-hari yang berat, dan itu patut dibanggakan.",
  "Kamu punya hati yang lembut di balik semangat yang besar.",
  "Kamu selalu berusaha jadi versi terbaik dirimu.",
  "Kamu membuat orang lain merasa dihargai.",
  "Dunia jadi tempat yang sedikit lebih indah karena ada kamu.",
  "Karena kamu adalah kamu, dan itu sudah lebih dari cukup.",
  "Dan karena hari ini adalah harimu. Selamat ulang tahun! 🎂",
];
