// ====================================================================
// A. KONFIGURASI DAN ELEMEN PENTING
// ====================================================================
const mobileWrapper = document.getElementById("mobile-wrapper");
const openButton = document.getElementById("open-button");
const bottomNavbar = document.getElementById("bottom-navbar");
const navContainer = document.getElementById("nav-container");

// ====================================================================
// B. FUNGSI UTILITY (COPY & MODAL)
// ====================================================================

function copyToClipboard(textToCopy, buttonId) {
  const tempInput = document.createElement("input");
  // Hapus tanda hubung/koma/spasi untuk memastikan rekening bersih
  tempInput.value = textToCopy.replace(/[-\s,]/g, "");
  document.body.appendChild(tempInput);

  // Salin teks
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  // Feedback pada tombol
  const button = document.getElementById(buttonId);
  if (button) {
    const originalText = button.innerHTML;

    // Feedback Visual
    button.innerHTML = '<i class="fas fa-check mr-1"></i> Tersalin!';
    button.classList.add("bg-green-600");

    // Kembalikan teks tombol setelah 2 detik
    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove("bg-green-600");
    }, 2000);
  }
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("hidden");

    setTimeout(() => {
      modal.classList.add("opacity-100");
      const content = modal.querySelector(".modal-content");
      if (content) {
        content.classList.remove("scale-95");
        content.classList.add("scale-100");
      }
    }, 10);

    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("opacity-100");
    const content = modal.querySelector(".modal-content");
    if (content) {
      content.classList.add("scale-95");
      content.classList.remove("scale-100");
    }

    setTimeout(() => {
      modal.classList.add("hidden");
      document.body.style.overflow = "";
    }, 300);
  }
}

function copyAndClose(textToCopy, buttonId, modalId) {
  copyToClipboard(textToCopy, buttonId);
  setTimeout(() => {
    closeModal(modalId);
  }, 400);
}

// ====================================================================
// C. FUNGSI NAVIGASI (SCROLL, CENTER, ACTIVE STATE)
// ====================================================================

function centerActiveNavItem(itemId) {
  if (!navContainer) return;
  const activeItem = document.getElementById(`nav-${itemId}`);

  if (!activeItem) return;

  const scrollPosition =
    activeItem.offsetLeft -
    navContainer.clientWidth / 2 +
    activeItem.offsetWidth / 2;

  navContainer.scrollTo({
    left: scrollPosition,
    behavior: "smooth",
  });
}

function setActiveNavItem(targetId) {
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    item.classList.remove("active-nav-item");
  });

  const activeNavItem = document.getElementById(`nav-${targetId}`);
  if (activeNavItem) {
    activeNavItem.classList.add("active-nav-item");

    centerActiveNavItem(targetId);
  }
}

function scrollToSection(event, targetId) {
  event.preventDefault();
  const targetElement = document.getElementById(targetId);

  if (
    targetElement &&
    mobileWrapper &&
    mobileWrapper.style.overflowY === "scroll"
  ) {
    mobileWrapper.scrollTo({
      top: targetElement.offsetTop,
      behavior: "smooth",
    });
  } else if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
    });
  }

  setActiveNavItem(targetId);
}

// ====================================================================
// D. FUNGSI KONTROL MUSIK
// ====================================================================

function initializeMusicControl() {
  const music = document.getElementById("background-music");
  const controlButton = document.getElementById("music-control-button");
  const musicIcon = document.getElementById("music-icon");
  let isPlaying = false;

  if (!music || !controlButton || !musicIcon) return;

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
          console.log("Autoplay diblokir:", error.message);
        });
      document.removeEventListener("click", autoPlayAfterInteraction);
    }
  }

  document.addEventListener("click", autoPlayAfterInteraction, {
    once: true,
  });

  function updateIcon(playing) {
    if (playing) {
      musicIcon.classList.remove("fa-volume-mute");
      musicIcon.classList.add("fa-volume-up");
    } else {
      musicIcon.classList.remove("fa-volume-up");
      musicIcon.classList.add("fa-volume-mute");
    }
  }

  controlButton.addEventListener("click", () => {
    if (music.paused) {
      music
        .play()
        .then(() => {
          isPlaying = true;
          updateIcon(true);
        })
        .catch((error) => {
          alert(
            "Browser memblokir pemutaran. Silakan coba interaksi lain atau cek pengaturan media."
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
// E. LOGIKA BUTTON BUKA UNDANGAN (Event Listener)
// ====================================================================

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

if (openButton) {
  openButton.addEventListener("click", function () {
    const targetSection = document.getElementById(
      this.getAttribute("data-target").replace("#", "")
    );
    const fullscreenTarget = document.getElementById("fullscreen-container");

    const isMobile = window.innerWidth <= 768;

    // 1. Panggil mode Layar Penuh HANYA jika isMobile true
    if (isMobile && fullscreenTarget) {
      launchFullscreen(fullscreenTarget);
    }

    // 2. Sembunyikan tombol
    openButton.classList.add("hidden");

    // 3. Gunakan Timeout untuk menyesuaikan layout
    setTimeout(() => {
      // 4. Aktifkan scrolling dan sesuaikan layout
      if (mobileWrapper) {
        mobileWrapper.style.overflowY = "scroll";
        mobileWrapper.style.paddingBottom = "70px"; // Menambah padding untuk navbar
      }

      document.querySelectorAll(".angkasa_slide").forEach((section) => {
        section.classList.add("scroll-active-section");
      });

      // 5. Tampilkan Navbar secara inisial
      if (bottomNavbar) {
        bottomNavbar.classList.remove("hidden");
        setTimeout(() => {
          bottomNavbar.classList.remove("translate-y-full");
        }, 50);
      }

      // 6. Scroll ke section target
      if (targetSection && mobileWrapper) {
        mobileWrapper.scrollTo({
          top: targetSection.offsetTop,
          behavior: "smooth",
        });
        setActiveNavItem(targetSection.id);
      }
    }, 200);
  });
}

// ====================================================================
// F. INITIALIZATION (DOM CONTENT LOADED)
// ====================================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Inisialisasi Kontrol Musik
  initializeMusicControl();

  // 2. Fitur Link to Nama Undangan (BARU)
  // Mendapatkan parameter URL
  const urlParams = new URLSearchParams(window.location.search);
  let guestName = urlParams.get("to"); // Ambil nilai dari parameter 'to'

  // Elemen tempat menampilkan nama tamu
  const guestNameSlot = document.getElementById("guestNameSlot");

  if (guestNameSlot && guestName) {
    // Mengganti '_' dengan spasi dan decoding URI
    let decodedName = decodeURIComponent(guestName.replace(/_/g, " "));

    // Memastikan nama tidak kosong setelah decoding
    if (decodedName) {
      guestNameSlot.innerHTML = decodedName;
    }
  }

  // 3. Inisialisasi Intersection Observer untuk Navbar
  const sections = document.querySelectorAll(".angkasa_slide[data-section]");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;

        if (mobileWrapper && mobileWrapper.style.overflowY === "scroll") {
          setActiveNavItem(sectionId);
        }

        entry.target.querySelectorAll(".animated-content").forEach((el) => {
          el.classList.add("is-visible");
        });
      } else {
        entry.target.querySelectorAll(".animated-content").forEach((el) => {
          el.classList.remove("is-visible");
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  setActiveNavItem("cover");
});

// ====================================================================
// G. DEKLARASI GLOBAL (Agar bisa dipanggil dari HTML)
// ====================================================================
window.copyToClipboard = copyToClipboard;
window.openModal = openModal;
window.closeModal = closeModal;
window.copyAndClose = copyAndClose;
window.scrollToSection = scrollToSection;
window.setActiveNavItem = setActiveNavItem;
