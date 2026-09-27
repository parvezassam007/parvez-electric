// ===============================
// MOBILE MENU
// ===============================

function toggleMenu() {
  const menu = document.getElementById("navMenu");

  if (menu) {
    menu.classList.toggle("active");
  }
}


// ===============================
// GALLERY FILTER
// ===============================

document.addEventListener("DOMContentLoaded", function () {

  // Auto Year
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // Filter Buttons
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const filter = this.getAttribute("data-filter");

      // Active button
      filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      this.classList.add("active");


      // Show / Hide gallery items
      galleryItems.forEach(function (item) {

        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }

      });

    });

  });

});


// ===============================
// LIGHTBOX
// ===============================

let currentSlide = 0;
let galleryImages = [];

function openLightbox(image) {

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const caption = document.getElementById("lightboxCaption");

  if (!lightbox || !lightboxImg) return;


  // Get visible gallery images
  galleryImages = Array.from(
    document.querySelectorAll(".gallery-item")
  )
  .filter(function (item) {
    return item.style.display !== "none";
  })
  .map(function (item) {
    return item.querySelector("img");
  });


  currentSlide = galleryImages.indexOf(image);

  if (currentSlide < 0) {
    currentSlide = 0;
  }


  lightboxImg.src = image.src;
  lightboxImg.alt = image.alt;

  if (caption) {
    caption.textContent = image.alt;
  }

  lightbox.classList.add("active");

  document.body.style.overflow = "hidden";
}


// ===============================
// CLOSE LIGHTBOX
// ===============================

function closeLightbox() {

  const lightbox = document.getElementById("lightbox");

  if (lightbox) {
    lightbox.classList.remove("active");
  }

  document.body.style.overflow = "";
}


// ===============================
// CHANGE SLIDE
// ===============================

function changeSlide(direction) {

  if (galleryImages.length === 0) return;

  currentSlide += direction;


  if (currentSlide >= galleryImages.length) {
    currentSlide = 0;
  }

  if (currentSlide < 0) {
    currentSlide = galleryImages.length - 1;
  }


  const image = galleryImages[currentSlide];

  const lightboxImg = document.getElementById("lightboxImg");
  const caption = document.getElementById("lightboxCaption");

  if (lightboxImg) {
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
  }

  if (caption) {
    caption.textContent = image.alt;
  }

}


// ===============================
// CLICK OUTSIDE LIGHTBOX TO CLOSE
// ===============================

document.addEventListener("click", function (event) {

  const lightbox = document.getElementById("lightbox");

  if (
    lightbox &&
    event.target === lightbox
  ) {
    closeLightbox();
  }

});


// ===============================
// KEYBOARD CONTROLS
// ===============================

document.addEventListener("keydown", function (event) {

  const lightbox = document.getElementById("lightbox");

  if (!lightbox || !lightbox.classList.contains("active")) {
    return;
  }


  if (event.key === "Escape") {
    closeLightbox();
  }


  if (event.key === "ArrowLeft") {
    changeSlide(-1);
  }


  if (event.key === "ArrowRight") {
    changeSlide(1);
  }

});
