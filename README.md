# ⌨️ Terminal Portfolio — System Administrator

Portfolio statis bertema terminal/console untuk IT SysAdmin.
**0 framework, 0 dependency, 0 build step** — tinggal edit, upload, selesai.

```
portfolio/
├── index.html      ← konten utama (about, skills, contact)
├── css/style.css   ← seluruh styling
├── js/main.js      ← boot sequence, terminal interaktif, animasi
└── README.md
```

---

## ✏️ Cara Custom (5 menit)

Semua bagian yang perlu diganti ditandai komentar `<!-- ✏️ EDIT -->` di HTML.

| Yang diganti | Di mana |
|---|---|
| Nama | `js/main.js` → `PROFILE.name`, `<title>` & logo & footer di `index.html` |
| Email / GitHub / LinkedIn | `js/main.js` → `PROFILE.email` dll, dan section `#contact` di `index.html` |
| Bio & pengalaman | `index.html` → section `about` |
| Skill & level (%) | `index.html` → section `skills` (ubah `data-lvl="90"` dan teksnya) |
| Statistik (uptime, jumlah server) | `index.html` → `.stats` |
| Lokasi | `js/main.js` → `PROFILE.location` |

## 🖥️ Perintah Terminal di Website

Pengunjung bisa mengetik langsung di terminal:

| Command | Fungsi |
|---|---|
| `help` | daftar semua perintah |
| `whoami` / `about` | profil singkat |
| `skills` | matriks skill ala terminal |
| `neofetch` | info sistem versi fun (ASCII Tux) |
| `uptime` / `ping` / `ls` / `pwd` / `echo` / `history` | flavor commands |
| `clear` | bersihkan layar (`Ctrl+L` juga bisa) |
| `sudo hire-me` | 🥚 easter egg — coba aja |
| `rm -rf /` | 🥚 easter egg |
| `coffee` / `exit` / `hire` | easter egg lain |

Fitur input: history (↑/↓), tab-completion, Ctrl+C, Ctrl+L.

## 🚀 Cara Deploy

### GitHub Pages (gratis)
1. Buat repo baru di GitHub, upload folder ini
2. **Settings → Pages → Source: `main` branch / root**
3. Live di `https://username.github.io/nama-repo/`

### Netlify Drop (paling cepat)
1. Buka `app.netlify.com/drop`
2. Drag & drop folder `portfolio` ini
3. Live dalam hitungan detik

### Vercel
```bash
npm i -g vercel
cd portfolio
vercel
```

### Hosting sendiri (VPS — sesuai profesi 😄)
```bash
scp -r ./* user@server:/var/www/html/
```

---

## 📝 Catatan

- Font (JetBrains Mono) via Google Fonts — kalau offline otomatis fallback ke font monospace lokal
- Menghormati `prefers-reduced-motion` (aksesibilitas)
- Responsif sampai layar HP
- Ganti angka-angka statistik & level skill sesuai kemampuan asli kamu — jangan **99.9% uptime kalau belom pernah handle production** 😄
