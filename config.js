const UNDANGAN_CONFIG = {
  guestNameDefault: "Tamu Undangan",
  musicUrl: "./src/themes/music/latar.mp3",

  brideName: "Tia",
  groomName: "Yoga",
  brideFullName: "Tia Rokhimah",
  groomFullName: "Yoga Saputra",

  // Nama Orang Tua
  brideFatherName: "Bima",
  brideMotherName: "Indah",
  groomFatherName: "Satria",
  groomMotherName: "Ayu",

  // --- TANGGAL & WAKTU UTAMA (Untuk cover dan acara) ---
  dateDisplay: "Sabtu, 25 Januari 2025",
  akadDayDisplay: "Minggu",
  akadDateDisplay: "25.05.25",
  akadTimeDisplay: "Pukul 08:00 WIB",
  akadLocation: "Masjid Raya At-Taqwa, Jakarta",

  // --- WA RSVP CONFIGURATION (BARU DITAMBAHKAN) ---
  // Nomor WA penerima konfirmasi RSVP (Contoh: 628123456789)
  whatsappNumber: "628123456789",
  // Template pesan WA dengan placeholder yang akan diganti di data-injector.js
  whatsappRsvpTemplate:
    "Halo [GUEST_NAME], saya konfirmasi kehadiran. Status: [STATUS]. Jumlah: [COUNT] orang.\n\n[MESSAGE]",

  // --- LINK LOKASI & KALENDER ---
  // Link Google Maps (Untuk tombol umum di sesi Acara)
  locationMapsUrl: "https://maps.app.goo.gl/ContohLinkGoogleMaps",
  // Link Google Calendar untuk disimpan tamu
  calendarLink:
    "https://calendar.google.com/event?action=TEMPLATE&text=Pernikahan+Rama+%26+Sinta&dates=20250125T040000Z/20250125T070000Z&details=Pernikahan+Sinta+Dewi+dan+Rama+Wijaya&location=Ballroom+Bimasakti",
  // Link Waze
  wazeLink: "https://waze.com/ul?ll=-6.2000,106.8000&navigate=yes&zoom=10",

  // --- QUOTE ---
  quote: {
    text: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum: 21",
  },

  // --- KADO/GIFT (Informasi Bank Utama) ---
  bankName: "BCA",
  bankAccount: "1234 567 890",
  bankRecipient: "Sinta Dewi",

  // Alamat Fisik
  physicalAddress: "Jl. Bima Sakti No. 10",
  physicalCity: "Jakarta",
  physicalZip: "12345",
  contactNumber: "0812 3456 7890",

  // --- DATA STRUKTURAL (Untuk fungsi renderEvents dan renderGifts) ---
  events: [
    {
      type: "Akad Nikah",
      date: "Sabtu, 25 Januari 2025",
      time: "Pukul 08:00 WIB",
      location: "Masjid Raya At-Taqwa, Jakarta",
      mapLink: "https://maps.app.goo.gl/ContohLinkMasjid",
    },
    {
      type: "Resepsi",
      date: "Sabtu, 25 Januari 2025",
      time: "Pukul 11:00 - 14:00 WIB",
      location: "Ballroom Bimasakti, Grand Hotel, Jakarta",
      mapLink: "https://maps.app.goo.gl/ContohLinkResepsi",
    },
  ],

  gifts: [
    {
      bank: "MANDIRI",
      name: "Alhikmah Abadi",
      number: "1310012345678",
    },
    {
      bank: "BRI",
      name: "Indah Permata",
      number: "08901234567890",
    },
  ],
};
