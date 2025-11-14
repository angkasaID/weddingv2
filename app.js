// ====================================================================
// A. FUNGSI UTILITY (COPY, MODAL)
// ====================================================================

function copyToClipboard(textToCopy, buttonId) {
  const tempInput = document.createElement("input");
  const cleanedText = buttonId.includes("rek")
    ? textToCopy.replace(/[-\s,]/g, "")
    : textToCopy;
  tempInput.value = cleanedText;
  document.body.appendChild(tempInput);

  document.execCommand("copy", false, tempInput.select());
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
    guestName = decodeURIComponent(guestName.replace(/\+/g, " "));
    return guestName;
  }
  return null;
}

function displayGuestName() {
  const guestName = getGuestNameFromUrl();
  const displayElement = document.getElementById("guest-name-display");

  if (displayElement) {
    displayElement.innerText = guestName || "Kawanku";
  }
}

// ====================================================================
// C. FUNGSI KONTROL MUSIK (Dua Tombol: Play/Pause dan Mute/Unmute)
// ====================================================================

function initializeMusicControl() {
  const music = document.getElementById("background-music");
  const pauseButton = document.getElementById("music-pause-button");
  const muteButton = document.getElementById("music-mute-button");
  const pauseIcon = document.getElementById("pause-icon");
  const muteIcon = document.getElementById("mute-icon");
  let isPlaying = false; // Tracks Play/Pause state

  if (!music || !pauseButton || !muteButton || !pauseIcon || !muteIcon) return;

  // Helper untuk mengupdate ikon Play/Pause
  function updatePauseIcon(playing) {
    if (playing) {
      pauseIcon.classList.remove("fa-play");
      pauseIcon.classList.add("fa-pause");
    } else {
      pauseIcon.classList.remove("fa-pause");
      pauseIcon.classList.add("fa-play");
    }
  }

  // Helper untuk mengupdate ikon Mute/Unmute
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
// D. FUNGSI SCROLL, NAVIGASI & OBSERVER
// ====================================================================

// Variabel Global untuk DOM dan Observer
let mobileWrapper;
let observer;

function isMobileView() {
  // Gunakan 768px sebagai batas umum untuk mobile
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

function updateNavbarActiveState(sectionId) {
  document.querySelectorAll(".nav-item").forEach((item) => {
    // Menghapus kelas 'active-nav-style'
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
  }
}
window.scrollToSection = scrollToSection;

// ====================================================================
// E. FUNGSI PRELOADER (Anti-Flicker & Fungsional)
// ====================================================================

function handlePreloader() {
  const preloader = document.getElementById("preloader");
  const progressBar = document.getElementById("progress-bar");
  if (!preloader || !progressBar) return;

  // Flags dan Timer
  let allAssetsReady = false;
  let minTimeMet = false;
  const MIN_DISPLAY_TIME = 500; // Minimum waktu tampil 500ms (untuk user experience)

  // Aset yang dilacak: Fonts dan Audio
  const music = document.getElementById("background-music");
  let assetsToLoad = 2; // Font dan Audio

  // --- 1. Asset Tracking ---
  const checkCompletion = (assetName) => {
    assetsToLoad--;

    // Update visual progress bar secara bertahap
    if (assetsToLoad === 1) {
      progressBar.style.width = "66%"; // Fonts selesai (sisa 1 asset)
    } else if (assetsToLoad === 0) {
      progressBar.style.width = "99%"; // Audio selesai (semua asset dimuat)
      allAssetsReady = true;
    }

    checkAndHidePreloader();
  };

  // a. Track Fonts (Document Fonts Ready API)
  document.fonts.ready.then(() => {
    checkCompletion("Fonts");
  });

  // b. Track Audio (Can Play Through Event)
  music.oncanplaythrough = () => {
    checkCompletion("Audio");
  };

  // --- 2. Minimum Time Tracking ---
  setTimeout(() => {
    minTimeMet = true;
    checkAndHidePreloader();
  }, MIN_DISPLAY_TIME);

  // --- 3. Initial Visual Simulation (Animasi Awal) ---
  let progress = 0;
  const maxSimulatedProgress = 33; // Simulasi awal hingga 33% sebelum aset mulai dilacak
  const intervalTime = 50;

  const loadingInterval = setInterval(() => {
    if (progress < maxSimulatedProgress) {
      progress += 1;
      progressBar.style.width = `${progress}%`;
    } else {
      clearInterval(loadingInterval);
    }
  }, intervalTime);

  // --- 4. Hiding Logic (Akan dipanggil oleh Asset Tracker dan Minimum Timer) ---
  function checkAndHidePreloader() {
    if (allAssetsReady && minTimeMet) {
      // Pastikan simulasi berhenti
      clearInterval(loadingInterval);
      progressBar.style.width = "100%";

      // 1. Sembunyikan Preloader (Fade-out)
      preloader.classList.add("opacity-0");

      // 2. Setelah fade-out, sembunyikan sepenuhnya (Anti-Flicker: tidak ada manipulasi display overlay)
      setTimeout(() => {
        preloader.classList.add("hidden");

        // Tidak perlu menampilkan coverSectionOverlay karena sudah ada di bawah preloader
      }, 500); // 0.5s = transition duration
    }
  }

  // Memastikan progress bar dimulai dari 0%
  progressBar.style.width = "0%";
}

// ====================================================================
// F. INISIALISASI UTAMA (DOMContentLoaded)
// ====================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Definisikan Variabel Utama
  mobileWrapper = document.getElementById("mobile-wrapper");
  // coverSectionOverlay tidak perlu disembunyikan/ditampilkan, biarkan z-index yang bekerja
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

  // 2. Tampilkan Nama Tamu & Kontrol Musik
  displayGuestName();
  initializeMusicControl();

  // 3. Mulai Preloader (Sekarang Fungsional & Anti-Flicker)
  handlePreloader();

  // 4. INISIALISASI INTERSECTION OBSERVER
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
        // LAZY LOAD ASSET
        section.querySelectorAll(".lazy-load-img[data-src]").forEach((img) => {
          if (!img.getAttribute("src")) {
            img.setAttribute("src", img.getAttribute("data-src"));
            img.removeAttribute("data-src");
            img.classList.add("is-loaded");
          }
        });

        // LOGIKA NAVBAR
        if (sectionId) {
          updateNavbarActiveState(sectionId);
        }

        // AKTIFKAN: Kelas IS-ACTIVE untuk animasi loop ornamen
        section.classList.add("is-active");

        // Memicu entry animasi slide-up (animated-content)
        section.querySelectorAll(".animated-content").forEach((el) => {
          el.classList.add("is-visible");
        });

        // LOGIKA KHUSUS: Navbar Transisi dan Footer (saat masuk section closing)
        if (sectionId === "closing" && creditFooter) {
          bottomNavbar.classList.remove("navbar-bottom");
          bottomNavbar.classList.add("navbar-top");
          creditFooter.classList.remove("opacity-0", "pointer-events-none");
          creditFooter.classList.add("opacity-100", "pointer-events-auto");
        }
      } else {
        // Logika saat section keluar viewport
        section.classList.remove("is-active");

        section.querySelectorAll(".animated-content").forEach((el) => {
          el.classList.remove("is-visible");
        });

        // LOGIKA KHUSUS: Navbar Transisi dan Footer (saat keluar section closing)
        if (sectionId === "closing" && creditFooter) {
          bottomNavbar.classList.remove("navbar-top");
          bottomNavbar.classList.add("navbar-bottom");
          creditFooter.classList.remove("opacity-100", "pointer-events-auto");
          creditFooter.classList.add("opacity-0", "pointer-events-none");
        }
      }
    });
  }, observerOptions);

  // Mulai mengamati semua section
  document.querySelectorAll(".angkasa_slide").forEach((section) => {
    observer.observe(section);
  });

  // 5. LISTENER TOMBOL BUKA UNDANGAN (Slide Up Logic)
  openButton.addEventListener("click", function () {
    const isMobile = isMobileView();
    const coverSectionOverlay = document.getElementById(
      "cover-section-overlay"
    );

    // Tampilkan kontrol musik
    if (musicControls) {
      musicControls.classList.remove("hidden", "opacity-0");
      musicControls.classList.add("opacity-100");
    }

    // 1. Musik & Fullscreen
    document
      .getElementById("background-music")
      .play()
      .catch((e) => console.error("Music play blocked:", e));
    if (isMobile && fullscreenTarget) {
      launchFullscreen(document.documentElement);
    }

    // 2. EFEK SLIDE UP
    coverSectionOverlay.style.transform = "translateY(-100%)";
    openButton.classList.add("hidden");

    setTimeout(() => {
      // 3. Setup Scroll dan Konten Utama
      coverSectionOverlay.classList.add("hidden"); // Hilangkan elemen sepenuhnya setelah slide up selesai

      // Membuka scroll di mobileWrapper
      mobileWrapper.style.overflowY = "scroll";
      mobileWrapper.style.scrollSnapType = "y mandatory";

      document.querySelectorAll(".angkasa_slide").forEach((section) => {
        section.classList.add("scroll-active-section");
      });

      // 4. Tampilkan Navbar Bawah
      if (bottomNavbar.classList.contains("hidden")) {
        bottomNavbar.classList.remove("hidden");
      }
      bottomNavbar.classList.remove("translate-y-full");
      bottomNavbar.classList.add("translate-y-0");

      // 5. Scroll ke section pertama
      const firstSectionId = "opening";
      const targetSection = document.getElementById(firstSectionId);

      if (targetSection) {
        mobileWrapper.scrollTo({
          top: targetSection.offsetTop,
          behavior: "smooth",
        });
        updateNavbarActiveState(firstSectionId);

        // FIX: Untuk Section Opening, pastikan IS-ACTIVE ditambahkan
        targetSection.classList.add("is-active");
      }
    }, 700);
  });
});
