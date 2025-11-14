// ====================================================================
// A. FUNGSI UTILITY (COPY, MODAL)
// ====================================================================

// FUNGSI COPY TO CLIPBOARD (Menggunakan JavaScript Native)
function copyToClipboard(textToCopy, buttonId) {
  const tempInput = document.createElement("input");
  const cleanedText = buttonId.includes("rek")
    ? textToCopy.replace(/[-\s,]/g, "")
    : textToCopy;
  tempInput.value = cleanedText;
  document.body.appendChild(tempInput);

  // Gunakan document.execCommand untuk kompatibilitas iframe
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  const button = document.getElementById(buttonId);
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

// FUNGSI MODAL
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove("hidden");

  setTimeout(() => {
    modal.classList.add("opacity-100");
    modal.querySelector(".modal-content").classList.remove("scale-95");
    modal.querySelector(".modal-content").classList.add("scale-100");
  }, 10);

  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);

  modal.classList.remove("opacity-100");
  modal.querySelector(".modal-content").classList.add("scale-95");
  modal.querySelector(".modal-content").classList.remove("scale-100");

  setTimeout(() => {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }, 300);
}

// FUNGSI COPY DAN TUTUP MODAL
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
  let guestName = params.get("to") || params.get("nama"); // Cek 'to' atau 'nama'

  if (guestName) {
    // Decode URL (misal: "Budi%20Wijaya" menjadi "Budi Wijaya")
    guestName = decodeURIComponent(guestName.replace(/\+/g, " "));
    return guestName;
  }
  return null;
}

function displayGuestName() {
  const guestName = getGuestNameFromUrl();
  const displayElement = document.getElementById("guest-name-display");

  if (guestName) {
    displayElement.innerText = guestName;
  } else {
    // Jika tidak ada parameter URL, gunakan teks default atau sembunyikan
    displayElement.innerText = "Kawanku";
  }
}

// ====================================================================
// C. FUNGSI KONTROL MUSIK
// ====================================================================

function initializeMusicControl() {
  const music = document.getElementById("background-music");
  const controlButton = document.getElementById("music-control-button");
  const musicIcon = document.getElementById("music-icon");
  let isPlaying = false;

  // Fungsi untuk memperbarui ikon tombol
  function updateIcon(playing) {
    if (playing) {
      musicIcon.classList.remove("fa-volume-mute");
      musicIcon.classList.add("fa-volume-up");
    } else {
      musicIcon.classList.remove("fa-volume-up");
      musicIcon.classList.add("fa-volume-mute");
    }
  }

  // Fungsi untuk memutar musik otomatis setelah interaksi pertama
  function autoPlayAfterInteraction() {
    if (!isPlaying) {
      music.volume = 0.5;
      music
        .play()
        .then(() => {
          isPlaying = true;
          updateIcon(true);
        })
        .catch((error) => {
          console.log("Autoplay diblokir:", error);
          updateIcon(false);
        });
      document.removeEventListener("click", autoPlayAfterInteraction, true);
    }
  }

  document.addEventListener("click", autoPlayAfterInteraction, {
    once: true,
    capture: true,
  });

  // Listener untuk tombol kontrol
  controlButton.addEventListener("click", (e) => {
    e.stopPropagation();
    if (music.paused) {
      music
        .play()
        .then(() => {
          isPlaying = true;
          updateIcon(true);
        })
        .catch((error) => {
          alert(
            "Browser memblokir pemutaran otomatis. Silakan cek pengaturan media."
          );
          updateIcon(false);
        });
    } else {
      music.pause();
      isPlaying = false;
      updateIcon(false);
    }
  });

  updateIcon(false);
}

// ====================================================================
// D. FUNGSI SCROLL, NAVIGASI & OBSERVER
// ====================================================================

const mobileWrapper = document.getElementById("mobile-wrapper");

// REVISI: Fungsi untuk mendeteksi apakah layar berada dalam mode mobile
function isMobileView() {
  // Menggunakan 768px sebagai batas umum mobile/tablet
  return window.innerWidth <= 768;
}

// ====================================================================
// REVISI: SCROLL SNAP KUSTOM DENGAN DURASI LAMBAT (Hanya di Mobile View)
// ====================================================================
function enableCustomScrollSnap() {
  // 1. KELUAR dan lepas event jika bukan Mobile View
  if (!isMobileView()) {
    $(mobileWrapper).off("wheel"); // Pastikan listener dilepas di desktop
    console.log("Custom Scroll Snap dinonaktifkan. Scroll normal aktif.");
    return;
  }

  if (typeof jQuery === "undefined" || !mobileWrapper) {
    console.error("jQuery atau #mobile-wrapper tidak ditemukan.");
    return;
  }

  // 2. Jika Mobile View, pasang event listener Wheel
  var sectionHeight = mobileWrapper.clientHeight;
  var isSnapping = false;

  // Lepas event listener lama sebelum memasang yang baru untuk mencegah duplikasi
  $(mobileWrapper)
    .off("wheel")
    .on("wheel", function (e) {
      // e.preventDefault() hanya dipanggil di sini, yang hanya aktif di Mobile View.
      e.preventDefault();

      if (isSnapping) {
        return;
      }
      isSnapping = true;

      var delta = e.originalEvent.deltaY;
      var currentScrollTop = $(mobileWrapper).scrollTop();
      var targetScroll;

      // Logika penentuan posisi scroll target (Snap logic)
      if (delta > 0) {
        targetScroll =
          Math.ceil(currentScrollTop / sectionHeight) * sectionHeight;
      } else {
        targetScroll =
          Math.floor(currentScrollTop / sectionHeight) * sectionHeight -
          sectionHeight;
      }

      if (targetScroll < 0) {
        targetScroll = 0;
      }

      // Animasi Scroll dengan Durasi Lambat (1.2 detik)
      $(mobileWrapper).animate(
        {
          scrollTop: targetScroll,
        },
        {
          duration: 1200,
          easing: "swing",
          complete: function () {
            isSnapping = false;
          },
        }
      );
    });
}
// ====================================================================

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
  // Cek apakah scroll sudah diizinkan
  if (targetSection && mobileWrapper.style.overflowY !== "hidden") {
    mobileWrapper.scrollTo({
      top: targetSection.offsetTop,
      behavior: "smooth",
    });

    updateNavbarActiveState(sectionId);
    centerActiveNavItem(sectionId);
  }
}
window.scrollToSection = scrollToSection;

// Inisialisasi saat DOM siap
document.addEventListener("DOMContentLoaded", () => {
  displayGuestName();
  initializeMusicControl();

  // **PENTING:** Pastikan #mobile-wrapper memiliki overflow-y: hidden di CSS awal.

  document.getElementById("open-button").addEventListener("click", function () {
    const targetSection = document.getElementById(
      this.getAttribute("data-target").replace("#", "")
    );
    const openButton = document.getElementById("open-button");
    const bottomNavbar = document.getElementById("bottom-navbar");
    const fullscreenTarget = document.getElementById("fullscreen-container");

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      launchFullscreen(fullscreenTarget);
    }

    openButton.classList.add("hidden");

    setTimeout(() => {
      // 1. IZINKAN SCROLL BERGANTUNG PADA VIEW
      // Mobile: 'scroll' (untuk scroll snap kustom)
      // Desktop: 'auto' (untuk scroll normal browser)
      mobileWrapper.style.overflowY = isMobileView() ? "scroll" : "auto";
      mobileWrapper.style.paddingBottom = "70px";

      // 2. AKTIFKAN SCROLL SNAP KUSTOM (Fungsi akan exit jika desktop)
      enableCustomScrollSnap();

      document.querySelectorAll(".angkasa_slide").forEach((section) => {
        section.classList.add("scroll-active-section");
      });

      bottomNavbar.classList.remove("hidden");
      setTimeout(() => {
        bottomNavbar.classList.remove("translate-y-full");
      }, 50);

      // Scroll ke section pertama setelah dibuka
      if (targetSection) {
        mobileWrapper.scrollTo({
          top: targetSection.offsetTop,
          behavior: "smooth",
        });
      }

      updateNavbarActiveState("cover");
    }, 200);
  });
});

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
    item.classList.remove("active-nav-style");
  });

  const activeLink = document.getElementById(`nav-${sectionId}`);
  if (activeLink) {
    activeLink.classList.add("active-nav-style");
    centerActiveNavItem(sectionId);
  }
}

const observerOptions = {
  root: mobileWrapper,
  rootMargin: "0px",
  threshold: 0.8,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    const section = entry.target;

    if (entry.isIntersecting) {
      const sectionId = section.getAttribute("id");
      if (sectionId) {
        updateNavbarActiveState(sectionId);
      }

      section.querySelectorAll(".animated-content").forEach((el) => {
        el.classList.add("is-visible");
      });

      section.querySelectorAll(".animate__animated").forEach((el) => {
        const entryAnimation = Array.from(el.classList).find(
          (cls) =>
            cls.startsWith("animate__fadeIn") ||
            cls.startsWith("animate__slideIn") ||
            cls.startsWith("animate__jackInTheBox")
        );
        if (entryAnimation) {
          el.classList.remove(entryAnimation);
          setTimeout(() => {
            el.classList.add(entryAnimation);
          }, 50);
        }
      });
    } else {
      section.querySelectorAll(".animated-content").forEach((el) => {
        el.classList.remove("is-visible");
      });
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".angkasa_slide").forEach((section) => {
    observer.observe(section);
  });
});
