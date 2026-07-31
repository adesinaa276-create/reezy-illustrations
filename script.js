// Reezy Illustrations — site interactions

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const galleryImages = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close-btn');

function closeMenu() {
    if (!menuToggle || !navLinks) return;
    navLinks.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', event => {
        if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMenu();
        }
    });
}

function openLightbox(image) {
    if (!lightbox || !lightboxImg) return;

    lightboxImg.src = image.currentSrc || image.src;
    lightboxImg.alt = image.alt || 'Photography preview';
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
}

function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
}

galleryImages.forEach(image => {
    image.addEventListener('click', () => openLightbox(image));
});

closeBtn?.addEventListener('click', closeLightbox);

lightbox?.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeLightbox();
        closeMenu();
    }
});
