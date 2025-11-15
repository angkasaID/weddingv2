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

// FUNGSI INI DIHAPUS karena tidak digunakan lagi dan untuk membersihkan kode:
// function lazyLoadAssets(sectionElement) { ... }

/**
 * Handles the resetting and triggering of ornament animations
 * for the given section.
 */
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
  // Added a small delay to prevent flicker/immediate re-triggering when scrolling quickly
  setTimeout(() => {
    sectionElement.querySelectorAll(".ornament-item").forEach((item) => {
      const animationClass = item.getAttribute("data-animation-class");
      if (animationClass) {
        // Re-apply classes to trigger animation
        item.classList.add("animate__animated", animationClass);
      }
    });
  }, 50);
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

    // Trigger animasi secara manual pada klik navigasi
    // lazyLoadAssets(targetSection); // <--- Dihapus
    document
      .querySelectorAll(".angkasa_slide")
      .forEach((sec) => sec.classList.remove("is-active"));
    targetSection.classList.add("is-active");
    triggerOrnamentAnimation(targetSection);
  }
}
window.scrollToSection = scrollToSection;

// ====================================================================
// E. FUNGSI PRELOADER (Anti-Flicker & Fungsional) [FIXED]
// ====================================================================

function handlePreloader() {
  const preloader = document.getElementById("preloader");
  // FIX: Menghapus dependensi progressBar dan logika asset tracking
  // yang tidak stabil di mobile dan memerlukan elemen HTML yang hilang.
  if (!preloader) return;

  // Menggunakan pendekatan berbasis waktu yang stabil (2 detik)
  // untuk memberi waktu yang cukup bagi font dimuat.
  const MIN_DISPLAY_TIME = 2500;

  // 1. Minimum Time Tracking
  setTimeout(() => {
    // 2. Hiding Logic
    // Sembunyikan Preloader (Fade-out)
    preloader.classList.add("opacity-0");

    // Setelah fade-out, sembunyikan sepenuhnya (Anti-Flicker)
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 500); // 0.5s = transition duration
  }, MIN_DISPLAY_TIME);

  // FIX: Menghapus semua logika progres bar simulasi
  // dan tracking aset (font, audio) yang rumit.
}

// ====================================================================
// F. INISIALISASI UTAMA (DOMContentLoaded)
// ====================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Definisikan Variabel Utama
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
        // LAZY LOAD ASSET (Dihapus karena kode ini tidak ada)
        // lazyLoadAssets(section); // <--- Dihapus

        // LOGIKA NAVBAR
        if (sectionId) {
          updateNavbarActiveState(sectionId);
        }

        // AKTIFKAN: Kelas IS-ACTIVE untuk animasi loop ornamen
        section.classList.add("is-active");

        // Trigger ornament animation on natural scroll
        triggerOrnamentAnimation(section);

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

    // Tunggu transisi slide up selesai (700ms)
    setTimeout(() => {
      // 3. Setup Scroll dan Konten Utama
      coverSectionOverlay.classList.add("hidden");

      // Membuka scroll di mobileWrapper
      mobileWrapper.style.overflowY = "scroll";
      mobileWrapper.style.scrollSnapType = "y mandatory";

      const firstSectionId = "cover";
      const targetSection = document.getElementById(firstSectionId);

      // Memulai observer untuk semua section setelah cover hilang
      document.querySelectorAll(".angkasa_slide").forEach((section) => {
        section.classList.add("scroll-active-section");
        observer.observe(section);
      });

      if (targetSection) {
        // Scroll ke section pertama
        mobileWrapper.scrollTo({
          top: targetSection.offsetTop,
          behavior: "smooth",
        });

        // lazyLoadAssets(targetSection); // <--- Dihapus

        // Atur state navigasi dan animasi
        updateNavbarActiveState(firstSectionId);
        targetSection.classList.add("is-active");
        triggerOrnamentAnimation(targetSection);
      }

      // 4. Tampilkan Navbar Bawah
      if (bottomNavbar.classList.contains("hidden")) {
        bottomNavbar.classList.remove("hidden");
      }
      bottomNavbar.classList.remove("translate-y-full");
      bottomNavbar.classList.add("translate-y-0");
    }, 750); // Delay sedikit lebih lama dari transisi (700ms)
  });
});
