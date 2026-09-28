// ---------- Screenshot gallery: thumbs + prev/next arrows + counter ----------
document.querySelectorAll('.gallery').forEach((gallery) => {
  const img = gallery.querySelector('[data-gallery-img]');
  const thumbButtons = Array.from(gallery.querySelectorAll('.gallery-thumbs button'));
  const counter = gallery.querySelector('[data-gallery-counter]');
  const prevBtn = gallery.querySelector('.gallery-nav.prev');
  const nextBtn = gallery.querySelector('.gallery-nav.next');
  const slides = thumbButtons.map((b) => b.getAttribute('data-src'));
  const alts = thumbButtons.map((b) => b.getAttribute('data-alt') || '');
  let current = 0;

  const showSlide = (index) => {
    if (!img || !slides.length) return;
    current = (index + slides.length) % slides.length;
    img.style.opacity = '0';
    window.setTimeout(() => {
      img.src = slides[current];
      if (alts[current]) img.alt = alts[current];
      img.style.opacity = '1';
    }, 120);
    thumbButtons.forEach((b, i) => b.classList.toggle('active', i === current));
    if (counter) counter.textContent = (current + 1) + ' / ' + slides.length;
  };

  thumbButtons.forEach((btn, i) => {
    btn.addEventListener('click', () => showSlide(i));
  });
  if (prevBtn) prevBtn.addEventListener('click', () => showSlide(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showSlide(current + 1));

  // Keyboard support when the gallery has focus/hover
  gallery.setAttribute('tabindex', '0');
  gallery.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') showSlide(current - 1);
    if (e.key === 'ArrowRight') showSlide(current + 1);
  });
});

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };
  const openMenu = () => {
    navLinks.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

// ---------- Scroll progress bar ----------
const progressBar = document.getElementById('scrollProgress');
if (progressBar) {
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

// ---------- Reveal on scroll ----------
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// ---------- Hero cursor-follow spotlight ----------
const hero = document.getElementById('top');
const spotlight = document.getElementById('heroSpotlight');
if (hero && spotlight && window.matchMedia('(hover: hover)').matches) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    spotlight.style.setProperty('--x', x + '%');
    spotlight.style.setProperty('--y', y + '%');
  });
}

// ---------- Nav shadow / active link on scroll ----------
const sections = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
  const navIo = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach((a) => {
          a.style.color = a.getAttribute('href') === '#' + id ? 'var(--text)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach((s) => navIo.observe(s));
}


// ---------- Full-size screenshot viewer ----------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

if (lightbox && lightboxImg && typeof lightbox.showModal === 'function') {
  const openLightbox = (img) => {
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;
    lightbox.showModal();
  };

  document.querySelectorAll('.project-media img').forEach((img) => {
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'View full size: ' + img.alt);
    img.addEventListener('click', () => openLightbox(img));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(img);
      }
    });
  });

  lightboxClose.addEventListener('click', () => lightbox.close());
  // Clicking outside the image (on the backdrop) closes it too
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.close();
  });
}

// ---------- Resume button: appears once assets/resume.pdf exists ----------
const resumeLinks = document.querySelectorAll('[data-resume]');
if (resumeLinks.length && window.location.protocol.indexOf('http') === 0) {
  fetch('assets/resume.pdf', { method: 'HEAD' })
    .then((res) => {
      if (res.ok) resumeLinks.forEach((link) => { link.hidden = false; });
    })
    .catch(() => {});
}


// ---------- Email links: copy the address and confirm ----------
// Many computers have no default email app, so a plain mailto: link can look
// like it does nothing. The link still tries to open an email app, and we also
// copy the address and show a short confirmation.
const toast = document.createElement('div');
toast.className = 'toast';
toast.setAttribute('role', 'status');
toast.setAttribute('aria-live', 'polite');
document.body.appendChild(toast);
let toastTimer;

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 4200);
};

const copyText = (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve, reject) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    ok ? resolve() : reject(new Error('copy failed'));
  });
};

document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  link.addEventListener('click', () => {
    const address = link.getAttribute('href').replace('mailto:', '').split('?')[0];
    copyText(address)
      .then(() => showToast('Email address copied: ' + address))
      .catch(() => showToast('Email me at ' + address));
  });
});
