function toggleMenu() {

  const menu = document.getElementById("navMenu");

  if (menu) {
    menu.classList.toggle("active");
  }

}


document.addEventListener("DOMContentLoaded", function () {

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // GALLERY IMAGE CLICK
  const galleryImages = document.querySelectorAll(".gallery-item img");

  galleryImages.forEach(function (image) {

    image.addEventListener("click", function () {

      const lightbox = document.createElement("div");

      lightbox.className = "gallery-lightbox";

      lightbox.innerHTML = `
        <span class="gallery-close">&times;</span>
        <img src="${this.src}" alt="${this.alt}">
        <div class="gallery-lightbox-title">${this.alt}</div>
      `;

      document.body.appendChild(lightbox);

      // CLOSE BUTTON
      lightbox.querySelector(".gallery-close").onclick = function () {
        lightbox.remove();
      };

      // CLICK OUTSIDE IMAGE
      lightbox.onclick = function (event) {
        if (event.target === lightbox) {
          lightbox.remove();
        }
      };

    });

  });

});
