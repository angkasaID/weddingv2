function injectConfigData() {
  if (typeof UNDANGAN_CONFIG === "undefined") {
    console.error(
      "Configuration data (UNDANGAN_CONFIG) is not available. Please check config.js."
    );
    return;
  }
  const config = UNDANGAN_CONFIG;

  const initials = `${config.brideName[0]} & ${config.groomName[0]}`;

  // --- LOGIKA EKSTRAKSI NAMA TAMU DARI URL (?to=) ---
  const urlParams = new URLSearchParams(window.location.search);
  let guestName = urlParams.get("to") || config.guestNameDefault;
  if (guestName) {
    guestName = decodeURIComponent(guestName.replace(/\+/g, " ")).trim();
  }
  // --------------------------------------------------

  // --- PRELOADER & FOOTER ---
  const initialsDisplayEl = document.getElementById("initials-display");
  if (initialsDisplayEl) {
    initialsDisplayEl.innerText = initials;
  }

  // --- COVER SECTION (HEADER) ---
  const brideNameCoverEl = document.getElementById("bride-name-cover-display");
  const groomNameCoverEl = document.getElementById("groom-name-cover-display");
  if (brideNameCoverEl) {
    brideNameCoverEl.innerText = config.brideName;
  }
  if (groomNameCoverEl) {
    groomNameCoverEl.innerText = config.groomName;
  }

  // Tanggal
  const dateDisplayEl = document.getElementById("date-display");
  if (dateDisplayEl) {
    dateDisplayEl.innerText = config.dateDisplay;
  }

  // --- BRIDE/GROOM PROFILE SECTION ---
  // Nama Lengkap dan Panggilan
  const footerInitialsEl = document.getElementById("footer-initials");
  const groomFullNameEl = document.getElementById("groom-full-name");
  const groomNicknameEl = document.getElementById("groom-nickname");
  const brideFullNameEl = document.getElementById("bride-full-name");
  const brideNicknameEl = document.getElementById("bride-nickname");
  const coupleNamesEl = document.getElementById("couple-names-combined");

  if (groomFullNameEl) {
    groomFullNameEl.innerText = config.groomFullName;
  }
  if (groomNicknameEl) {
    groomNicknameEl.innerText = config.groomName;
  }
  if (brideFullNameEl) {
    brideFullNameEl.innerText = config.brideFullName;
  }
  if (brideNicknameEl) {
    brideNicknameEl.innerText = config.brideName;
  }
  if (coupleNamesEl) {
    coupleNamesEl.innerText = `${config.brideName} & ${config.groomName}`;
  }
  if (footerInitialsEl) {
    footerInitialsEl.innerText = initials;
  }

  // Nama Orang Tua
  const groomParentsEl = document.getElementById("groom-parents");
  const brideParentsEl = document.getElementById("bride-parents");

  if (groomParentsEl) {
    groomParentsEl.innerHTML = `Putra dari Bapak ${config.groomFatherName}<br/>& Ibu ${config.groomMotherName}`;
  }
  if (brideParentsEl) {
    brideParentsEl.innerHTML = `Putri dari Bapak ${config.brideFatherName}<br/>& Ibu ${config.brideMotherName}`;
  }

  // --- ACARA (RESEPSI & AKAD) ---
  const akadDateEl = document.getElementById("akad-date");
  const akadTimeEl = document.getElementById("akad-time");
  const akadLocationEl = document.getElementById("akad-location");
  const akadDayEl = document.getElementById("akad-day");

  if (akadDateEl) {
    akadDateEl.innerText = config.akadDateDisplay;
  }
  if (akadTimeEl) {
    akadTimeEl.innerText = config.akadTimeDisplay;
  }
  if (akadLocationEl) {
    akadLocationEl.innerText = config.akadLocation;
  }
  if (akadDayEl) {
    akadDayEl.innerText = config.akadDayDisplay;
  }

  // Google Maps Link (Pastikan tombol memiliki ID)
  const mapLinkEl = document.getElementById("google-maps-link");
  if (mapLinkEl) {
    mapLinkEl.href = config.locationMapsUrl;
  }

  // --- KADO/GIFT SECTION ---
  // Informasi Bank (Asumsi ini adalah bank utama)
  const bankNameEl = document.getElementById("bank-name");
  const bankAccountEl = document.getElementById("bank-account");
  const bankRecipientEl = document.getElementById("bank-recipient");

  if (bankNameEl) {
    bankNameEl.innerText = config.bankName;
  }
  if (bankAccountEl) {
    bankAccountEl.innerText = config.bankAccount;
  }
  if (bankRecipientEl) {
    bankRecipientEl.innerText = config.bankRecipient;
  }

  // Informasi Alamat Fisik
  const alamatRecipientDisplayEl = document.getElementById(
    "alamat-recipient-display"
  );
  const alamatDetailDisplayEl = document.getElementById(
    "alamat-detail-display"
  );
  const alamatContactDisplayEl = document.getElementById(
    "alamat-contact-display"
  );
  const alamatFisikBtn = document.getElementById("alamat-fisik-btn");

  // Membuat string alamat lengkap untuk ditampilkan di modal
  const addressDetailText = `
    ${config.physicalAddress}
    ${config.physicalCity}, ${config.physicalZip}
  `;

  // Membuat string alamat lengkap untuk disalin (format satu baris)
  const addressCopyText = `
    Alamat: ${config.physicalAddress}, ${config.physicalCity}, ${config.physicalZip}. 
    Penerima: ${config.bankRecipient}. 
    Nomor Kontak: ${config.contactNumber}
  `
    .replace(/\s\s+/g, " ")
    .trim(); // Menghilangkan spasi berlebih dan baris baru

  // Inject Data ke Modal
  if (alamatRecipientDisplayEl) {
    alamatRecipientDisplayEl.innerHTML = `Penerima: <strong>${config.bankRecipient}</strong>`;
  }
  if (alamatDetailDisplayEl) {
    // Inner HTML untuk mempertahankan pemformatan
    alamatDetailDisplayEl.innerHTML = addressDetailText
      .trim()
      .replace(/\n/g, "<br/>");
  }
  if (alamatContactDisplayEl) {
    alamatContactDisplayEl.innerText = `Nomor Kontak: ${config.contactNumber}`;
  }

  if (alamatFisikBtn) {
    // Asumsi copyAndClose didefinisikan di app.js
    alamatFisikBtn.onclick = () => {
      // Panggil copyAndClose dengan string copy yang sudah diformat
      copyAndClose(addressCopyText, "alamat-fisik-btn", "modal-fisik");
    };
  }

  // --- AUDIO ---
  const audioEl = document.getElementById("background-music");
  if (audioEl) {
    audioEl.src = config.musicUrl;
  }

  // --- WAZE/GOOGLE CALENDAR ---
  const calendarLinkEl = document.getElementById("calendar-link");
  const wazeLinkEl = document.getElementById("waze-link");

  if (calendarLinkEl) {
    calendarLinkEl.href = config.calendarLink;
  }

  if (wazeLinkEl) {
    wazeLinkEl.href = config.wazeLink;
  }

  // --- QUOTE SECTION ---
  const quoteTextEl = document.getElementById("quote-text");
  const quoteSourceEl = document.getElementById("quote-source");
  if (quoteTextEl && config.quote && config.quote.text) {
    quoteTextEl.innerText = config.quote.text;
  }
  if (quoteSourceEl && config.quote && config.quote.source) {
    quoteSourceEl.innerText = config.quote.source;
  }

  // ====================================================================
  // C. LOGIKA RSVP (DIPINDAHKAN KE SINI AGAR MENDAPATKAN AKSES KE config & guestName)
  // ====================================================================

  // 1. Tampilkan Nama Tamu di Section RSVP (Greeting Section)
  const rsvpGreetingNameEl = document.getElementById("rsvp-greeting-name");
  if (rsvpGreetingNameEl) {
    rsvpGreetingNameEl.innerText = guestName;
  }

  // 2. Logika Tombol Kirim WhatsApp dari Modal
  const sendRsvpWaBtnModal = document.getElementById("send-rsvp-wa-btn-modal");

  if (
    sendRsvpWaBtnModal &&
    config.whatsappNumber &&
    config.whatsappRsvpTemplate
  ) {
    sendRsvpWaBtnModal.addEventListener("click", () => {
      // Ambil nilai dari elemen di Modal
      const status = document.getElementById("rsvp-status-modal").value;
      let count = document.getElementById("rsvp-count-modal").value;
      const message =
        document.getElementById("rsvp-message-modal").value ||
        "Tidak ada pesan/doa khusus.";

      // --- VALIDASI Sederhana ---
      count = parseInt(count);
      if (status === "Hadir" && (isNaN(count) || count < 1)) {
        alert("Jumlah tamu harus diisi minimal 1 jika Anda hadir.");
        return;
      } else if (status === "Tidak Hadir") {
        count = 0;
      }

      // 3. Ganti placeholder di template pesan
      let finalMessage = config.whatsappRsvpTemplate
        .replace("[GUEST_NAME]", guestName)
        .replace("[STATUS]", status)
        .replace("[COUNT]", count)
        .replace("[MESSAGE]", `Pesan/Doa: ${message}`);

      // 4. Encode pesan dan buka WhatsApp
      const encodedMessage = encodeURIComponent(finalMessage);
      const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodedMessage}`;

      // Tutup Modal (Asumsi fungsi closeModal() ada di app.js)
      if (typeof closeModal === "function") {
        closeModal("rsvp-form-modal");
      }
      window.open(whatsappUrl, "_blank");
    });
  }
}

// ====================================================================
// FUNGSI UTILITY DI LUAR INJECT CONFIG DATA (Harus tetap di sini)
// ====================================================================

function copyTextToClipboard(text) {
  // Menggunakan navigator.clipboard.writeText jika tersedia
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error("Could not copy text: ", err);
      // Fallback ke execCommand jika navigator.clipboard gagal (terkadang di iframe)
      fallbackCopyTextToClipboard(text);
    });
  } else {
    // Fallback untuk browser lama
    fallbackCopyTextToClipboard(text);
  }
}

function fallbackCopyTextToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  // Menghindari gangguan pada tata letak
  textarea.style.position = "fixed";
  textarea.style.top = 0;
  textarea.style.left = 0;
  textarea.style.opacity = 0;
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Fallback: Unable to copy", err);
  }
  document.body.removeChild(textarea);
}

// Helper untuk menampilkan pesan "Tersalin!"
function showCopyMessage(buttonEl, message) {
  const originalText = buttonEl.innerHTML;
  buttonEl.innerHTML = `<i class="fas fa-check mr-2"></i> ${message}`;
  buttonEl.disabled = true;

  setTimeout(() => {
    buttonEl.innerHTML = originalText;
    buttonEl.disabled = false;
  }, 1500);
}

// Tambahkan helper copyAndClose jika belum ada
// Catatan: Fungsi ini biasanya berada di app.js
/*
function copyAndClose(text, buttonId, modalId) {
    copyTextToClipboard(text);
    const button = document.getElementById(buttonId);
    showCopyMessage(button, "Tersalin!");
    // Asumsi modal ditutup setelah salin berhasil
    setTimeout(() => {
        if (typeof closeModal === 'function') {
            closeModal(modalId);
        }
    }, 1600);
}
*/

// ====================================================================
// C. FUNGSI RENDERING DATA DARI CONFIG (Tetap di sini atau dipindahkan ke app.js)
// ====================================================================

function renderEvents() {
  if (typeof UNDANGAN_CONFIG === "undefined" || !UNDANGAN_CONFIG.events) return;
  const container = document.getElementById("events-container");
  if (!container) return;

  container.innerHTML = UNDANGAN_CONFIG.events
    .map((event, index) => {
      const mapButton = event.mapLink
        ? `
          <a
            href="${event.mapLink}"
            target="_blank"
            class="mt-4 inline-block bg-accent text-white text-sm py-2 px-4 rounded-full hover:shadow-lg transition-shadow"
          >
            <i class="fas fa-map-marked-alt mr-2"></i> Lihat Peta
          </a>
        `
        : "";

      const animationClass =
        index === 0 ? "animated-content is-visible" : "animated-content";

      return `
          <div class="bg-gray-50 p-6 rounded-xl shadow-md ${animationClass}" data-index="${index}">
            <h3 class="font-accent text-3xl color-accent mb-3">${event.type}</h3>
            <p class="text-gray-700 mb-2">${event.date}</p>
            <p class="text-lg font-semibold text-[var(--color-dark)] mb-4">${event.time}</p>
            <div class="border-t border-gray-200 pt-3">
              <p class="text-sm">${event.location}</p>
              ${mapButton}
            </div>
          </div>
        `;
    })
    .join("");
}

function injectGiftModalData() {
  if (
    typeof UNDANGAN_CONFIG === "undefined" ||
    !UNDANGAN_CONFIG.gifts ||
    UNDANGAN_CONFIG.gifts.length < 2
  ) {
    console.warn("Konfigurasi hadiah tidak lengkap atau tidak ditemukan.");
    return;
  }
  const config = UNDANGAN_CONFIG;
  const gift1 = config.gifts[0];
  const gift2 = config.gifts[1];

  // --- Rekening 1 (MANDIRI) ---
  const bankAccount1El = document.getElementById("bank-account-1");
  const copyBank1Btn = document.getElementById("copy-bank-1-btn");

  if (bankAccount1El) {
    // Tampilkan dengan format yang mudah dibaca
    bankAccount1El.innerText = gift1.number.match(/.{1,4}/g).join("-");
  }
  if (copyBank1Btn) {
    // Hapus listener lama jika ada, lalu tambahkan yang baru
    copyBank1Btn.onclick = () => {
      // Pastikan copyAndClose sudah terdefinisi di app.js
      copyAndClose(gift1.number, "copy-bank-1-btn", "modal-digital");
    };
    document.getElementById("bank-name-1").innerText = `BANK ${gift1.bank}`;
    document.getElementById(
      "bank-recipient-1"
    ).innerText = `A/N: ${gift1.name}`;
  }

  // --- Rekening 2 (BRI) ---
  const bankAccount2El = document.getElementById("bank-account-2");
  const copyBank2Btn = document.getElementById("copy-bank-2-btn");

  if (bankAccount2El) {
    // Tampilkan dengan format yang mudah dibaca
    bankAccount2El.innerText = gift2.number.match(/.{1,4}/g).join("-");
  }
  if (copyBank2Btn) {
    copyBank2Btn.onclick = () => {
      copyAndClose(gift2.number, "copy-bank-2-btn", "modal-digital");
    };
    document.getElementById("bank-name-2").innerText = `BANK ${gift2.bank}`;
    document.getElementById(
      "bank-recipient-2"
    ).innerText = `A/N: ${gift2.name}`;
  }
}
