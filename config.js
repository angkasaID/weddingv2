const UNDANGAN_CONFIG = {
  // DATA MEMPELAI
  brideName: "Tia",
  groomName: "Yoga",

  // TANGGAL & WAKTU UTAMA
  fullDate: "Minggu, 12 Desember 2025",
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", // Musik latar

  // ACARA
  events: [
    {
      type: "Akad Nikah",
      date: "Minggu, 12 Desember 2025",
      time: "09.00 WIB - Selesai",
      location: "Masjid Raya Bandung",
      mapLink: null,
    },
    {
      type: "Resepsi",
      date: "Minggu, 12 Desember 2025",
      time: "11.00 WIB - 15.00 WIB",
      location: "Gedung Serbaguna Puri Indah",
      mapLink: "https://maps.app.goo.gl/...", // Ganti link peta
    },
  ],

  // HADIAH (AMPLOP DIGITAL)
  gifts: [
    {
      bank: "BCA",
      name: "Tita Indah Sari",
      number: "1234-567-890",
    },
    // Anda bisa menambahkan rekening lain di sini
  ],

  // ORNAMEN & TEMA
  accentColor: "#C6915A",
  primaryColor: "#f7f3f0",
};

// Mengatur variabel CSS Root sesuai konfigurasi (Otomatis)
document.documentElement.style.setProperty(
  "--color-accent",
  UNDANGAN_CONFIG.accentColor
);
document.documentElement.style.setProperty(
  "--color-primary",
  UNDANGAN_CONFIG.primaryColor
);
