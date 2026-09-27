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


  // GALLERY LIGHTBOX

  const galleryImages =
    document.querySelectorAll(".gallery-item img");


  galleryImages.forEach(function (image) {

    image.addEventListener("click", function () {

      const lightbox =
        document.createElement("div");

      lightbox.className = "gallery-lightbox";


      lightbox.innerHTML = `

        <button class="gallery-close">
          &times;
        </button>

        <img
          src="${this.src}"
          alt="${this.alt}"
        >

        <div class="gallery-lightbox-title">
          ${this.alt}
        </div>

      `;


      document.body.appendChild(lightbox);


      // CLOSE BUTTON

      const closeButton =
        lightbox.querySelector(".gallery-close");


      closeButton.addEventListener("click", function () {

        lightbox.remove();

      });


      // CLICK OUTSIDE IMAGE

      lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {

          lightbox.remove();

        }

      });

    });

  });

});
