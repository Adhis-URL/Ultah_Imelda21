# 🎂 Website Ulang Tahun — Misniati Imelda

## Cara membuka
Klik kanan `index.html` di VS Code → **Open with Live Server**.
(Fitur tiup lilin pakai mikrofon hanya jalan lewat Live Server, tidak lewat klik dua kali file.)

## Alur
1. ⏳ Hitung mundur 3-2-1
2. 🎁 Kado → ketuk untuk membuka
3. 🎂 Kue → ketuk lilin **atau tiup ke mikrofon**
4. 💌 Ucapan → tombol **Buka Kotak Kejutan**
5. 🎁 Kotak Kejutan berisi 12 kejutan (ada penghitung "x / 12 dibuka")

## Isi Kotak Kejutan
| Untuk Dibaca | Mini Game | Lainnya |
|---|---|---|
| 💌 Surat Untukmu | 🎈 Pecah Balon (30 detik) | 📸 Galeri Kenangan + slideshow |
| 📜 3 Puisi | 🃏 Memori Foto (pakai fotonya) | 🎆 Kembang Api (ada yang berbentuk hati) |
| 📖 Cerpen | 🧺 Tangkap Cinta | 🏮 Lampion Harapan |
| 😘 25 Gombalan + meter baper | 🎟️ Kartu Gosok Hadiah | 💖 20 Alasan Kamu Istimewa |

Skor terbaik, gombalan yang sudah dibaca, dan harapan tersimpan di browser.

## Maskot
Setelah lilin ditiup, **Moci si kelinci** (kiri) dan **Coklat si beruang** (kanan) masuk sambil melompat dan melambai, lalu mengirim chat ucapan. Kalau diketuk, mereka melompat dan membalas chat. Isi chatnya bisa diubah di `mascots.js` (`MASCOT_INTRO` dan `MASCOT_CHATTER`).

## Mengubah isi
- **`content.js`** → semua tulisan: ucapan, surat, puisi, cerpen, gombalan, hadiah kartu gosok, alasan
  - `SENDER_NAME` = nama tokoh pengirim di cerpen (ganti dengan namamu)
- **`script.js`** → judul lagu (`SONGS`) dan keterangan foto (`PHOTOS`)
- **`games.js`** → semua mini game

## Musik & tema
Tombol equalizer di pojok kanan atas: pilih lagu, putar/jeda, maju/mundur, volume.
Lagu 1 = Pink Romantis · Lagu 2 = Galaksi Ungu · Lagu 3 = Senja Jingga.
Jika browser memblokir autoplay, musik mulai pada klik/sentuhan pertama.

## Publikasi lewat GitHub Pages
1. Buat repository baru di GitHub (misalnya `ultah-imelda`), atur **Public**.
2. Upload **semua isi folder ini**, termasuk folder `assets`. `index.html` harus berada di paling luar (root), bukan di dalam subfolder.
3. Buka **Settings → Pages → Build and deployment**, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu **Save**.
4. Tunggu 1–2 menit. Linknya akan muncul seperti `https://usernamemu.github.io/ultah-imelda/`.

Catatan:
- GitHub membedakan huruf besar dan kecil. Jangan ganti nama file foto atau lagu, kecuali kamu juga mengganti namanya di `script.js`.
- Di GitHub Pages (https), fitur tiup lilin pakai mikrofon juga berjalan di HP.
- Tampilan sudah disesuaikan untuk HP kecil, HP besar, landscape, dan iPhone yang punya notch.
