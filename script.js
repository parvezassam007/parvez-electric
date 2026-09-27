// Navbar Toggle for Mobile
function toggleMenu() {
  const menu = document.getElementById("navMenu");
  if (menu) {
    menu.classList.toggle("active");
  }
}

// Set Current Year & Initialize Gallery Filter
document.addEventListener("DOMContentLoaded", function () {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Gallery Filter Functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          if (filterValue === 'all' || itemCategory === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
});

// Lightbox Functionality
let currentIndex = 0;
let visibleItems = [];

function updateVisibleItems() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  visibleItems = Array.from(galleryItems).filter(item => window.getComputedStyle(item).display !== 'none');
}

function openLightbox(imgElement) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  
  if (!lightbox) return;
  updateVisibleItems();
  
  const galleryItem = imgElement.closest('.gallery-item');
  currentIndex = visibleItems.indexOf(galleryItem);
  
  lightbox.style.display = 'flex';
  lightboxImg.src = imgElement.src;
  const info = galleryItem.querySelector('.gallery-info');
  lightboxCaption.innerHTML = info ? info.innerHTML : '';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.style.display = 'none';
  }
}

function changeSlide(direction) {
  if (visibleItems.length === 0) return;
  currentIndex += direction;
  if (currentIndex >= visibleItems.length) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = visibleItems.length - 1;
  }
  const targetItem = visibleItems[currentIndex];
  const targetImg = targetItem.querySelector('img');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  
  if (targetImg && lightboxImg) {
    lightboxImg.src = targetImg.src;
    const info = targetItem.querySelector('.gallery-info');
    lightboxCaption.innerHTML = info ? info.innerHTML : '';
  }
}

// Close lightbox on clicking outside image
window.addEventListener('click', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (lightbox && e.target === lightbox) {
    closeLightbox();
  }
});
