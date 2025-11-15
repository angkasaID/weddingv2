// ====================================================================
// H. INJEKSI DATA KONFIGURASI STATIS (FIX TEMPLATING)
// ====================================================================
function injectConfigData() {
  // Pastikan UNDANGAN_CONFIG tersedia secara global
  if (typeof UNDANGAN_CONFIG === "undefined") {
    console.error("Configuration data (UNDANGAN_CONFIG) is not available.");
    return;
  }
  const config = UNDANGAN_CONFIG;

  // Helper untuk mendapatkan inisial
  const initials = `${config.brideName[0]} & ${config.groomName[0]}`;

  // --- PRELOADER & FOOTER ---
  // Penambahan Null Check di sini untuk mengatasi error (Line 17 yang bermasalah)
  const initialsDisplayEl = document.getElementById("initials-display");
  if (initialsDisplayEl) {
    initialsDisplayEl.innerText = initials;
  }

  const footerInitialsEl = document.getElementById("footer-initials");
  if (footerInitialsEl) {
    footerInitialsEl.innerText = initials;
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
    dateDisplayEl.innerText = config.fullDate;
  }

  // --- COVER OVERLAY ---
  const brideNameOverlayEl = document.getElementById(
    "bride-name-overlay-display"
  );
  const groomNameOverlayEl = document.getElementById(
    "groom-name-overlay-display"
  );
  if (brideNameOverlayEl) {
    brideNameOverlayEl.innerText = config.brideName;
  }
  if (groomNameOverlayEl) {
    groomNameOverlayEl.innerText = config.groomName;
  }

  // --- CLOSING SECTION ---
  const closingNamesEl = document.getElementById("closing-names");
  if (closingNamesEl) {
    closingNamesEl.innerText = `${config.brideName} & ${config.groomName}`;
  }
}

// ====================================================================
// A. FUNGSI UTILITY (COPY, MODAL)
// ====================================================================

function copyToClipboard(textToCopy, buttonId) {
  const tempInput = document.createElement("input");
  // Membersihkan teks: menghapus spasi, koma, dsb., agar hanya angka
  const cleanedText = textToCopy.replace(/[-\s,]/g, "");
  tempInput.value = cleanedText;
  document.body.appendChild(tempInput);

  // Penggunaan execCommand untuk kompatibilitas di iFrame/browser lama
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  const button = document.getElementById(buttonId);
  if (!button) return;
  const originalText = button.innerHTML;

  // Feedback visual
  button.innerHTML = '<i class="fas fa-check mr-1"></i> Tersalin!';
  button.classList.add("text-green-500");

  // Kembalikan teks tombol
  setTimeout(() => {
    button.innerHTML = originalText;
    button.classList.remove("text-green-500");
  }, 2000);
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  if (modalId === "gift-modal") {
    renderModalGiftDetails();
  }

  modal.classList.remove("hidden");

  setTimeout(() => {
    modal.classList.add("opacity-100");
    const modalContent = modal.querySelector(".modal-content");
    if (modalContent) {
      modalContent.classList.remove("scale-95");
      modalContent.classList.add("scale-100");
    }
  }, 10);

  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.remove("opacity-100");
  const modalContent = modal.querySelector(".modal-content");
  if (modalContent) {
    modalContent.classList.add("scale-95");
    modalContent.classList.remove("scale-100");
  }

  setTimeout(() => {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }, 300);
}

function copyAndClose(textToCopy, buttonId, modalId) {
  copyToClipboard(textToCopy, buttonId);
  setTimeout(() => {
    closeModal(modalId);
  }, 400);
}

window.openModal = openModal;
window.closeModal = closeModal;
window.copyAndClose = copyAndClose;
window.copyToClipboard = copyToClipboard;

// ====================================================================
// B. FUNGSI NAMA TAMU DARI URL
// ====================================================================

function getGuestNameFromUrl() {
  const params = new URLSearchParams(window.location.search);
  let guestName = params.get("to") || params.get("nama");

  if (guestName) {
    // Mengganti semua tanda '+' dengan spasi, lalu decode URI
    guestName = decodeURIComponent(guestName.replace(/\+/g, " "));
    return guestName;
  }
  return null;
}

function displayGuestName() {
  const guestName = getGuestNameFromUrl();
  const displayElement = document.getElementById("guest-name-display");

  if (displayElement) {
    // Default text jika tidak ada nama di URL
    displayElement.innerText = guestName || "Kawanku";
  }
}

// ====================================================================
// C. FUNGSI RENDERING DATA DARI CONFIG
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

function renderGifts() {
  if (typeof UNDANGAN_CONFIG === "undefined" || !UNDANGAN_CONFIG.gifts) return;
  const container = document.getElementById("gifts-container");
  if (!container) return;

  container.innerHTML = UNDANGAN_CONFIG.gifts
    .map((gift, index) => {
      const copyButtonId = `copy-rek-${index}`;

      return `
					<div class="bg-white p-6 rounded-xl shadow-lg animated-content" data-index="${index}">
						<h3 class="text-xl font-bold color-accent mb-2">${gift.bank}</h3>
						<p class="text-sm">Atas Nama: ${gift.name}</p>
						<p id="rekening-${index}" class="text-2xl font-mono text-[var(--color-dark)] my-3">
							${gift.number}
						</p>
						<button
							id="${copyButtonId}"
							onclick="copyToClipboard('${gift.number}', '${copyButtonId}')"
							class="mt-2 text-sm text-gray-600 bg-gray-100 py-1 px-3 rounded-full hover:bg-gray-200 transition-colors"
						>
							<i class="fas fa-copy mr-1"></i> Salin Nomor
						</button>
					</div>
				`;
    })
    .join("");
}

function renderModalGiftDetails() {
  if (
    typeof UNDANGAN_CONFIG === "undefined" ||
    !UNDANGAN_CONFIG.gifts ||
    UNDANGAN_CONFIG.gifts.length === 0
  )
    return;
  const modalDetailContainer = document.getElementById("modal-gift-detail");
  const modalCopyButton = document.getElementById("modal-copy-rek-btn");
  const firstGift = UNDANGAN_CONFIG.gifts[0]; // Ambil data rekening pertama untuk modal

  if (!modalDetailContainer || !modalCopyButton || !firstGift) return;

  modalDetailContainer.innerHTML = `
			<p class="font-bold">Bank ${firstGift.bank}</p>
			<p class="text-xl font-mono my-1">${firstGift.number}</p>
			<p class="text-sm">a/n ${firstGift.name}</p>
		`;

  // Tambahkan event listener baru untuk tombol Salin di modal
  // Penting: menggunakan removeEventListener/addEventListener untuk mencegah duplikasi listener
  const newCopyHandler = (e) => {
    e.stopPropagation();
    copyAndClose(firstGift.number, "modal-copy-rek-btn", "gift-modal");
  };

  // Hapus listener lama jika ada (cara aman)
  const oldCopyHandler = modalCopyButton.onclick;
  if (oldCopyHandler) {
    modalCopyButton.onclick = null; // Menghapus event handler inline
  }

  // Tambahkan listener baru
  modalCopyButton.onclick = newCopyHandler;
}

// ====================================================================
// D. FUNGSI KONTROL MUSIK
// ====================================================================

function initializeMusicControl() {
  const music = document.getElementById("background-music");
  const pauseButton = document.getElementById("music-pause-button");
  const muteButton = document.getElementById("music-mute-button");
  const pauseIcon = document.getElementById("pause-icon");
  const muteIcon = document.getElementById("mute-icon");
  let isPlaying = false;

  if (!music || !pauseButton || !muteButton || !pauseIcon || !muteIcon) return;

  function updatePauseIcon(playing) {
    if (playing) {
      pauseIcon.classList.remove("fa-play");
      pauseIcon.classList.add("fa-pause");
    } else {
      pauseIcon.classList.remove("fa-pause");
      pauseIcon.classList.add("fa-play");
    }
  }

  function updateMuteIcon(muted) {
    if (muted) {
      muteIcon.classList.remove("fa-volume-up");
      muteIcon.classList.add("fa-volume-mute");
    } else {
      muteIcon.classList.remove("fa-volume-mute");
      muteIcon.classList.add("fa-volume-up");
    }
  }

  function autoPlayAfterInteraction() {
    if (!isPlaying && music) {
      music.volume = 0.5;
      music
        .play()
        .then(() => {
          isPlaying = true;
          updatePauseIcon(true);
          updateMuteIcon(music.muted);
        })
        .catch((error) => {
          console.log("Autoplay diblokir:", error);
          updatePauseIcon(false);
        });
      // Hapus listener setelah interaksi pertama
      document.removeEventListener("click", autoPlayAfterInteraction, true);
      document.removeEventListener(
        "touchstart",
        autoPlayAfterInteraction,
        true
      );
    }
  }

  // 1. Initial interaction listener for Autoplay (Click/Touch)
  document.addEventListener("click", autoPlayAfterInteraction, {
    once: true,
    capture: true,
  });
  document.addEventListener("touchstart", autoPlayAfterInteraction, {
    once: true,
    capture: true,
  });

  // 2. Play/Pause Listener
  pauseButton.addEventListener("click", (e) => {
    e.stopPropagation();
    if (music.paused) {
      music
        .play()
        .then(() => {
          isPlaying = true;
          updatePauseIcon(true);
        })
        .catch((error) => {
          console.error("Music play failed on click:", error);
          updatePauseIcon(false);
        });
    } else {
      music.pause();
      isPlaying = false;
      updatePauseIcon(false);
    }
  });

  // 3. Mute/Unmute Listener
  muteButton.addEventListener("click", (e) => {
    e.stopPropagation();
    music.muted = !music.muted;
    updateMuteIcon(music.muted);
  });

  // Set Initial state
  updatePauseIcon(false);
  updateMuteIcon(music.muted);
}

// ====================================================================
// E. FUNGSI SCROLL, NAVIGASI & OBSERVER
// ====================================================================

let mobileWrapper;
let observer;

function isMobileView() {
  return window.innerWidth <= 768;
}

function launchFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function triggerOrnamentAnimation(sectionElement) {
  if (!sectionElement) return;

  // 1. Reset ALL ornaments' animation classes globally (important for re-triggering)
  document.querySelectorAll(".ornament-item").forEach((item) => {
    item.classList.remove("animate__animated");
    const animationClass = item.getAttribute("data-animation-class");
    if (animationClass) {
      item.classList.remove(animationClass);
    }
  });

  // 2. Apply animation to ornaments in the current section
  setTimeout(() => {
    sectionElement.querySelectorAll(".ornament-item").forEach((item) => {
      const animationClass = item.getAttribute("data-animation-class");
      if (animationClass) {
        item.classList.add("animate__animated", animationClass);
      }
    });
  }, 50);
}

function updateNavbarActiveState(sectionId) {
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active-nav-style");
  });

  const activeLink = document.getElementById(`nav-${sectionId}`);
  if (activeLink) {
    activeLink.classList.add("active-nav-style");
    centerActiveNavItem(sectionId);
  }
}

function centerActiveNavItem(itemId) {
  const navContainer = document.querySelector("#bottom-navbar > div");
  const activeItem = document.getElementById(`nav-${itemId}`);

  if (!activeItem || !navContainer) return;

  const scrollPosition =
    activeItem.offsetLeft -
    navContainer.clientWidth / 2 +
    activeItem.offsetWidth / 2;

  navContainer.scrollTo({
    left: scrollPosition,
    behavior: "smooth",
  });
}

function scrollToSection(event, sectionId) {
  event.preventDefault();
  const targetSection = document.getElementById(sectionId);

  if (
    targetSection &&
    mobileWrapper &&
    mobileWrapper.style.overflowY !== "hidden"
  ) {
    mobileWrapper.scrollTo({
      top: targetSection.offsetTop,
      behavior: "smooth",
    });

    updateNavbarActiveState(sectionId);
    centerActiveNavItem(sectionId);

    document
      .querySelectorAll(".angkasa_slide")
      .forEach((sec) => sec.classList.remove("is-active"));
    targetSection.classList.add("is-active");
    triggerOrnamentAnimation(targetSection);
  }
}
window.scrollToSection = scrollToSection;

// ====================================================================
// F. FUNGSI PRELOADER (Anti-Flicker & Fungsional) - LOGIK BARU
// ====================================================================

function handlePreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) {
    console.error("Preloader element with ID 'preloader' tidak ditemukan.");
    return;
  }

  let loadFired = false;
  let minTimeElapsed = false;
  let hasHidden = false;
  const MIN_DISPLAY_TIME = 2000; // 2 detik minimum tampilan
  const MAX_WAIT_TIME = 8000; // 8 detik maksimum sebagai JAMINAN fallback

  const hidePreloaderVisuals = () => {
    if (hasHidden) return;
    hasHidden = true;

    // LANGKAH 1: Mulai efek fade-out
    preloader.classList.add("opacity-0");

    // LANGKAH 2: Nonaktifkan interaksi klik (PENTING!)
    preloader.style.pointerEvents = "none";

    // LANGKAH 3: Sembunyikan sepenuhnya setelah transisi (0.5s)
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 500);
  };

  const attemptHide = () => {
    // Hanya sembunyikan jika MIN_TIME sudah berlalu DAN semua aset sudah dimuat
    if (loadFired && minTimeElapsed) {
      hidePreloaderVisuals();
    }
  };

  // --- 1. MINIMUM TIME TIMER (Mulai segera saat DOM siap) ---
  // Timer ini memastikan preloader tampil setidaknya 2 detik
  setTimeout(() => {
    minTimeElapsed = true;
    attemptHide();
  }, MIN_DISPLAY_TIME);

  // --- 2. WINDOW LOAD EVENT (Menunggu semua aset) ---
  window.addEventListener(
    "load",
    () => {
      loadFired = true;
      attemptHide();
    },
    { once: true }
  );

  // --- 3. FALLBACK GUARANTEE (Jaminan hilang setelah MAX_WAIT_TIME) ---
  // Jika load event diblokir (kemungkinan besar penyebab masalah Anda), ini akan memaksa preloader hilang.
  setTimeout(() => {
    if (!hasHidden) {
      console.warn(
        "Preloader dipaksa hilang setelah 8 detik. Mungkin ada aset yang terblokir."
      );
      hidePreloaderVisuals();
    }
  }, MAX_WAIT_TIME);
}

// ====================================================================
// G. INISIALISASI UTAMA (DOMContentLoaded)
// ====================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Render data dinamis dari config ke HTML
  renderEvents();
  renderGifts();

  // 2. INJEKSI DATA STATIS (Perbaikan error ada di dalam fungsi ini sekarang)
  injectConfigData();

  mobileWrapper = document.getElementById("mobile-wrapper");
  const bottomNavbar = document.getElementById("bottom-navbar");
  const openButton = document.getElementById("open-button");
  const fullscreenTarget = document.getElementById("fullscreen-container");
  const musicControls = document.getElementById("floating-music-controls");

  if (!mobileWrapper || !bottomNavbar || !openButton) {
    console.error(
      "DOM Initialization Failed: One or more critical elements are missing."
    );
    return;
  }

  // 3. Tampilkan Nama Tamu & Kontrol Musik
  displayGuestName();
  initializeMusicControl();

  // 4. Mulai Preloader (Sekarang lebih tangguh!)
  handlePreloader();

  // 5. INISIALISASI INTERSECTION OBSERVER
  const observerOptions = {
    root: mobileWrapper,
    rootMargin: "0px",
    threshold: 0.8,
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const section = entry.target;
      const sectionId = section.getAttribute("id");
      const creditFooter = document.getElementById("credit-footer");

      if (entry.isIntersecting) {
        if (sectionId) {
          updateNavbarActiveState(sectionId);
        }

        section.classList.add("is-active");

        // Trigger ornament animation on natural scroll
        triggerOrnamentAnimation(section);

        // Memicu entry animasi slide-up (animated-content)
        section.querySelectorAll(".animated-content").forEach((el) => {
          el.classList.add("is-visible");
        });

        // LOGIKA KHUSUS: Navbar Transisi dan Footer
        if (sectionId === "closing" && creditFooter) {
          bottomNavbar.classList.remove("navbar-bottom");
          bottomNavbar.classList.add("navbar-top");
          creditFooter.classList.remove("opacity-0", "pointer-events-none");
          creditFooter.classList.add("opacity-100", "pointer-events-auto");
        }
      } else {
        section.classList.remove("is-active");

        // LOGIKA KHUSUS: Navbar Transisi dan Footer
        if (sectionId === "closing" && creditFooter) {
          bottomNavbar.classList.remove("navbar-top");
          bottomNavbar.classList.add("navbar-bottom");
          creditFooter.classList.remove("opacity-100", "pointer-events-auto");
          creditFooter.classList.add("opacity-0", "pointer-events-none");
        }
      }
    });
  }, observerOptions);

  // 6. LISTENER TOMBOL BUKA UNDANGAN (Slide Up Logic)
  openButton.addEventListener("click", function () {
    const isMobile = isMobileView();
    const coverSectionOverlay = document.getElementById(
      "cover-section-overlay"
    );

    if (musicControls) {
      musicControls.classList.remove("hidden", "opacity-0");
      musicControls.classList.add("opacity-100");
    }

    document
      .getElementById("background-music")
      .play()
      .catch((e) => console.error("Music play blocked:", e));

    // Launch fullscreen only if user grants permission
    if (isMobile && fullscreenTarget) {
      launchFullscreen(document.documentElement);
    }

    coverSectionOverlay.style.transform = "translateY(-100%)";
    openButton.classList.add("hidden");

    setTimeout(() => {
      coverSectionOverlay.classList.add("hidden");

      mobileWrapper.style.overflowY = "scroll";
      mobileWrapper.style.scrollSnapType = "y mandatory";

      const firstSectionId = "cover";
      const targetSection = document.getElementById(firstSectionId);

      document.querySelectorAll(".angkasa_slide").forEach((section) => {
        section.classList.add("scroll-active-section");
        observer.observe(section);
      });

      if (targetSection) {
        // Scroll to the first section after the overlay is hidden
        mobileWrapper.scrollTo({
          top: targetSection.offsetTop,
          behavior: "smooth",
        });

        updateNavbarActiveState(firstSectionId);
        targetSection.classList.add("is-active");
        triggerOrnamentAnimation(targetSection);
      }

      const bottomNavbar = document.getElementById("bottom-navbar");
      if (bottomNavbar.classList.contains("hidden")) {
        bottomNavbar.classList.remove("hidden");
      }
      bottomNavbar.classList.remove("translate-y-full");
      bottomNavbar.classList.add("translate-y-0");
    }, 750);
  });
});
