/* ============================================================
   PUSAT PENGATURAN LINK — ubah link di sini saja
   - Isi tanda kutip dengan link Anda (Google Drive, Instagram, dll.)
   - Link yang masih kosong ("") tidak akan aktif / disembunyikan
   ============================================================ */
const LINKS = {
  // Media sosial & kontak
  linkedin:  "https://www.linkedin.com/in/raninovitaduri30",
  instagram: "https://www.instagram.com/rani_vita30/",
  github:    "https://github.com/novitaduri",
  email:     "mailto:raniraninovitaduri30@gmail.com",
  whatsapp:  "https://wa.me/6282281996362",
  linkedin_sertifikat: "https://www.linkedin.com/in/raninovitaduri30/details/certifications/",
  publikasi: "https://ejournal.unama.ac.id/index.php/processor/article/view/2027",   // artikel jurnal (ganti ke profil Google Scholar jika ada)
  cv:        "",   // link Google Drive CV (atur akses: Siapa saja yang memiliki link)
  folder_sertifikat: "",   // opsional: folder Drive berisi semua sertifikat

  // Surat / bukti pengalaman kerja (urutan kartu pengalaman dari atas)
  // Kosongkan jika tidak ada: tombolnya otomatis disembunyikan
  pengalaman1: "",   // BPS Kab. Bengkulu Tengah
  pengalaman2: "",   // Freelance SMAAS
  pengalaman3: "https://docs.google.com/document/d/1_h8ihLHQ88YsX_GenIOEKVQYahz6WzFZ/edit",   // contoh notulen (Dikdasmen)
  pengalaman4: "",   // IT Support UM Bengkulu
  pengalaman5: "",   // Kedai Pizza & Pasta Latun
  pengalaman6: "",   // Japan Point Bengkulu
  pengalaman7: "",   // Toko Serbu Talo Indah

  // Proyek: demo (aplikasi yang berjalan) dan GitHub (kode)
  proyek1_demo:   "https://ranirani.kesug.com/smaas/",
  proyek1_github: "https://github.com/novitaduri",   // ganti dengan link repo SMAAS
  proyek2_demo:   "https://ranirani.kesug.com/Laboratorium_Histopatologi/home.php",
  proyek2_github: "https://github.com/novitaduri",   // ganti dengan link repo Lab Histopatologi
  proyek3_github: "https://github.com/novitaduri/SmartHome"
};

/* ============================================================
   GALERI GAMBAR (proyek & sertifikat) — dibuka dengan klik
   Tambah/ubah gambar: letakkan file di folder assets lalu catat di sini
   ============================================================ */
const GALLERIES = {
  smaas: [
    ["assets/proyek/smaas-dashboard.jpg", "SMAAS: halaman utama"],
    ["assets/proyek/smaas-login.jpg", "SMAAS: halaman login"],
    ["assets/proyek/smaas-form.jpg", "SMAAS: form surat masuk"],
    ["assets/proyek/smaas-erd.jpg", "SMAAS: struktur database"]
  ],
  lab: [
    ["assets/proyek/lab-login.jpg", "Lab Histopatologi: halaman login"],
    ["assets/proyek/lab-form.jpg", "Lab Histopatologi: form data pasien"],
    ["assets/proyek/lab-laporan.jpg", "Lab Histopatologi: laporan hasil (PDF)"],
    ["assets/proyek/lab-erd.jpg", "Lab Histopatologi: struktur database"]
  ],
  smarthome: [
    ["assets/proyek/smarthome-1.jpg", "Prototipe Smart Home"],
    ["assets/proyek/smarthome-2.jpg", "Rangkaian sensor dan atap otomatis"],
    ["assets/proyek/smarthome-3.jpg", "Rangkaian Arduino dan RFID"]
  ],
  excel: [
    ["assets/proyek/excel-laporan-produk.jpg", "Dashboard Laporan Produk"],
    ["assets/proyek/excel-laporan-keuangan.jpg", "Dashboard Laporan Keuangan"]
  ],
  "cert-itsupport": [
    ["assets/sertifikat/it-support.jpg", "Sertifikat Kompetensi IT Support (2026)"],
    ["assets/sertifikat/networking.jpg", "Sertifikat Kompetensi Networking (2026)"]
  ],
  "cert-excel": [["assets/sertifikat/excel.jpg", "Microsoft Excel Course Certificate (2026)"]],
  "cert-panitia": [["assets/sertifikat/panitia-dikdasmen.jpg", "Sertifikat Panitia Bimbingan Teknis (2025)"]],
  "cert-teknisi": [
    ["assets/sertifikat/teknisi-komputer-1.jpg", "Sertifikat Kompetensi Teknisi Komputer BNSP (2024)"],
    ["assets/sertifikat/teknisi-komputer-2.jpg", "Daftar unit kompetensi"]
  ],
  "cert-perakitan": [
    ["assets/sertifikat/perakitan-komputer-1.jpg", "Sertifikat Perakitan Komputer (2024)"],
    ["assets/sertifikat/perakitan-komputer-2.jpg", "Materi pelatihan"]
  ],
  "cert-digmar": [
    ["assets/sertifikat/digital-marketing-1.jpg", "Sertifikat Kompetensi Digital Marketing (2023)"],
    ["assets/sertifikat/digital-marketing-2.jpg", "Transkrip kompetensi"]
  ]
};

/* ===== Menerapkan link ke halaman (tidak perlu diubah) ===== */
document.querySelectorAll('[data-link]').forEach(el => {
  const url = LINKS[el.dataset.link];
  if (url) {
    el.href = url;
    if (/^https?:/.test(url)) { el.target = '_blank'; el.rel = 'noopener noreferrer'; }
  } else if (el.hasAttribute('data-hide-empty')) {
    el.hidden = true;
  } else {
    el.classList.add('is-empty');
    el.setAttribute('aria-disabled', 'true');
    el.addEventListener('click', e => e.preventDefault());
  }
});

/* ===== Menu mobile ===== */
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
    toggle.textContent = isOpen ? '×' : '☰';
  });
  links.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
  }));
}
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== Penampil gambar (lightbox) ===== */
(function () {
  const box = document.getElementById('lightbox');
  if (!box) return;
  const img = box.querySelector('img');
  const cap = box.querySelector('figcaption');
  const prev = box.querySelector('.lb-prev');
  const next = box.querySelector('.lb-next');
  let items = [], idx = 0, opener = null;

  function show() {
    const [src, caption] = items[idx];
    img.src = src; img.alt = caption;
    cap.textContent = items.length > 1 ? caption + '  (' + (idx + 1) + '/' + items.length + ')' : caption;
    prev.hidden = next.hidden = items.length < 2;
  }
  function open(key, trigger) {
    if (!GALLERIES[key]) return;
    items = GALLERIES[key]; idx = 0; opener = trigger;
    show(); box.hidden = false; document.body.style.overflow = 'hidden';
    box.querySelector('.lb-close').focus();
  }
  function close() {
    box.hidden = true; img.src = ''; document.body.style.overflow = '';
    if (opener) opener.focus();
  }
  function step(d) { idx = (idx + d + items.length) % items.length; show(); }

  document.querySelectorAll('[data-gallery]').forEach(el =>
    el.addEventListener('click', () => open(el.dataset.gallery, el)));
  box.querySelector('.lb-close').addEventListener('click', close);
  prev.addEventListener('click', () => step(-1));
  next.addEventListener('click', () => step(1));
  box.addEventListener('click', e => { if (e.target === box) close(); });
  document.addEventListener('keydown', e => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft' && items.length > 1) step(-1);
    if (e.key === 'ArrowRight' && items.length > 1) step(1);
  });
})();
