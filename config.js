const UNDANGAN_CONFIG = {
  guestNameDefault: "Tamu Undangan",
  musicUrl: "https://aethersub.store/asset/Music/latar.mp3",

  brideName: "Tia",
  groomName: "Yoga",
  brideFullName: "Tia Rokhimah",
  groomFullName: "Yoga Saputra",

  // Nama Orang Tua
  brideFatherName: "Carsono (Alm)",
  brideMotherName: "Ina Siti Rokhimah",
  groomFatherName: "Slamet Sujarwo",
  groomMotherName: "Rasumi",

  // --- TANGGAL & WAKTU UTAMA (Untuk cover dan acara) ---
  dateDisplay: "Jum'at, 23 Januari 2026",
  akadDayDisplay: "Jum'at",
  akadDateDisplay: "23.01.26",
  akadTimeDisplay: "Pukul 13:00 WIB",
  // Alamat Tekstual yang akan ditampilkan
  akadLocation: "Dusun Klesem, RT25/08, GunungJaya, Belik, Pemalang",

  // Link untuk Countdown
  countdownTargetDate: "Jan 23, 2026 13:00:00", // Format: Month Day, Year HH:MM:SS

  // --- WA RSVP CONFIGURATION ---
  // Nomor WA penerima konfirmasi RSVP (Contoh: 628123456789)
  whatsappNumber: "6285171140818",
  // Template pesan WA dengan placeholder
  whatsappRsvpTemplate:
    "Halo [GUEST_NAME], saya konfirmasi kehadiran. Status: [STATUS]. Jumlah: [COUNT] orang.\n\n[MESSAGE]",

  // --- MAPS CONFIGURATION (BARU) ---
  calendarLink:
    "https://calendar.google.com/event?action=TEMPLATE&text=Pernikahan+Tia+%26+Yoga&dates=20260123T060000Z/20260123T090000Z&details=Pernikahan+Tia+Rokhimah+dan+Yoga+Saputra&location=Dusun+Klesem,+Belik,+Pemalang",
  wazeLink: "https://waze.com/ul?ll=-7.1234,109.4321&navigate=yes&zoom=10",

  // --- QUOTE ---
  quote: {
    text: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum: 21",
  },

  // Alamat Fisik
  physicalAddress: "Dk Klesem, RT25/08, GunungJaya, Belik, Pemalang",
  physicalCity: "Jawa Tengah",
  physicalZip: "52356",
  contactNumber: "0851 7114 0818",
  bankRecipient: "Tia Rokhimah",

  // Bank Tambahan (Array Gifts)
  gifts: [
    {
      bank: "MANDIRI",
      number: "1310012345678",
      name: "Yoga Saputra",
    },
    {
      bank: "BRI",
      number: "08901234567890",
      name: "Tia Rokhimah",
    },
  ],

  locationMapsUrl: "https://maps.app.goo.gl/JxGnFRvewacvZiBk8",
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1184.2778167850392!2d109.3764659268553!3d-7.153596896371059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sid!2sid!4v1764042119400!5m2!1sid!2sid",
  locationName: "Dk.Klesem Gunung Jaya",
  locationFullAddress:
    "Dk Klesem, RT25/08, GunungJaya, Belik, Pemalang, Jawa Tengah",

  sponsors: [
    "./src/themes/foto/sponsor1.png",
    "./src/themes/foto/sponsor2.png",
  ],
};
