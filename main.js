/* ===== CIDCLOTHiNGSTORE — Main JS ===== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== CUSTOM CURSOR =====
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Smooth follower
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effect on interactive elements
  const hoverEls = document.querySelectorAll('a, button, .collection-card, .insta-card, .why-card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('expanded');
      follower.classList.add('expanded');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('expanded');
      follower.classList.remove('expanded');
    });
  });

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== MOBILE MENU =====
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const hamburgerLines = document.querySelectorAll('.hamburger-line');
  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
    if (menuOpen) {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
      hamburgerLines[0].style.transform = 'rotate(45deg) translateY(7px)';
      hamburgerLines[1].style.opacity = '0';
      hamburgerLines[2].style.transform = 'rotate(-45deg) translateY(-7px)';
    } else {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      hamburgerLines[0].style.transform = '';
      hamburgerLines[1].style.opacity = '';
      hamburgerLines[2].style.transform = '';
    }
  }

  menuBtn.addEventListener('click', toggleMenu);
  mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

  // ===== SCROLL REVEAL =====
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger reveals within the same parent
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const siblingIndex = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, siblingIndex * 120);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== PARALLAX HERO =====
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroBg && scrolled < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });

  // ===== MARQUEE DUPLICATE =====
  // Already handled via CSS animation doubling content in HTML

  // ===== HERO TEXT TYPING EFFECT (subtle) =====
  const tagline = document.querySelector('.hero-headline');
  if (tagline) {
    tagline.style.letterSpacing = '0.08em';
    setTimeout(() => {
      tagline.style.transition = 'letter-spacing 1.5s cubic-bezier(0.22, 1, 0.36, 1)';
      tagline.style.letterSpacing = '0.12em';
    }, 600);
  }

  // ===== ACTIVE NAV HIGHLIGHT =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--gold)';
          }
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => sectionObserver.observe(section));

  // ===== COLLECTION CARD TILT =====
  const collectionCards = document.querySelectorAll('.collection-card');
  collectionCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -5;
      const rotateY = (x - centerX) / centerX * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });

  // ===== FOOTER YEAR =====
  const copyright = document.querySelector('footer .border-t p:first-child');
  if (copyright) {
    const year = new Date().getFullYear();
    copyright.textContent = copyright.textContent.replace('2025', year);
  }

  console.log('%c CIDCLOTHiNGSTORE ', 'background: #C9A84C; color: #080808; font-size: 16px; font-weight: bold; padding: 8px 16px;');
  console.log('%c Lagos Island\'s Finest Women\'s Fashion ', 'color: #C9A84C; font-size: 12px;');

});
