function animarCruz() {
    const cruz = document.querySelector('.cruz-animada');
    // Reinicia la animación removiendo y agregando la clase
    cruz.style.animation = 'none';
    cruz.offsetHeight; // Trigger reflow
    cruz.style.animation = null;
    
    // Aplica la animación (solo para móviles)
    if (window.innerWidth <= 992) {
        cruz.style.animation = 'aparecerCruz 1.5s ease-in-out forwards';
        cruz.style.animationDelay = '0.5s';
        
        // Animación de las partes de la cruz
        const before = window.getComputedStyle(cruz, '::before');
        const after = window.getComputedStyle(cruz, '::after');
        
        // Reinicia las animaciones de los pseudo-elementos
        cruz.style.setProperty('--cruz-before-animation', 'extenderHorizontal 0.5s ease-in-out forwards');
        cruz.style.setProperty('--cruz-after-animation', 'extenderVertical 0.5s ease-in-out forwards');
    }
}
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const pageId = this.getAttribute('data-page');
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
        
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        this.classList.add('active');
        animarCruz();
        const mobileNav = document.querySelector('.mobile-nav');
        if (mobileNav.classList.contains('active')) {
            document.querySelector('.menu-hamburguesa').classList.remove('active');
            mobileNav.classList.remove('active');
            document.querySelector('.menu-overlay').classList.remove('active');
            document.body.classList.remove('menu-open');
        }
        window.scrollTo(0, 0);
    });
});
// Control de audio
document.addEventListener('DOMContentLoaded', function() {
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const audioId = this.getAttribute('data-audio');
            const audio = document.getElementById(audioId); 
            try {
                if (audio.readyState === 0) {
                    await audio.load();
                }
                if (audio.paused) {
                    await audio.play();
                    this.textContent = 'Pausar';       
                    document.querySelectorAll('audio').forEach(a => {
                        if (a !== audio && !a.paused) {
                            a.pause();
                            a.currentTime = 0;
                            const otherBtn = document.querySelector(`[data-audio="${a.id}"]`);
                            if (otherBtn) otherBtn.textContent = 'Escuchar';
                        }});} else {
                    audio.pause();
                    this.textContent = 'Escuchar';
                }} catch (error) {
                console.error('Error de reproducción:', error);
                alert(`Error al reproducir: ${error.message}`);
            }});});});
// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
document.querySelectorAll('.galeria img').forEach(img => {
    img.addEventListener('click', function() {
        lightboxImg.src = this.src;
        lightboxCaption.textContent = this.parentElement.querySelector('figcaption').textContent;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });});
document.querySelector('.close-lightbox').addEventListener('click', function() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
});
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }})
// Botón subir
document.addEventListener('DOMContentLoaded', function() {
    const handleScroll = () => {
        document.querySelectorAll('.btn-subir').forEach(btn => {
            if (window.scrollY > 300) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }});};
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.querySelectorAll('.btn-subir').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });});});   
    handleScroll();
});
// FAQ Acordeón
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const item = question.parentElement;
        if(!question.classList.contains('active')) {
            question.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-question').classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }});} else {
            question.classList.remove('active');
            answer.style.maxHeight = null;
        }}); });
// Optimización para conexiones lentas
document.addEventListener('DOMContentLoaded', function() {
    if(navigator.connection && 
      (navigator.connection.effectiveType === 'slow-2g' || 
       navigator.connection.effectiveType === '2g')) {
      document.querySelectorAll('img').forEach(img => {
        if(img.dataset.lowres) {
          img.src = img.dataset.lowres;
        }
        img.loading = 'eager';
      });
    }
    document.querySelectorAll('img').forEach(img => {
      img.onload = () => img.classList.add('loaded');
      if(img.complete) img.classList.add('loaded');
    });
});
if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('SW registrado');
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
document.querySelectorAll('.categoria-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.categoria-btn').forEach(b => {
            b.classList.remove('active');
        });
        this.classList.add('active');
        const categoria = this.getAttribute('data-categoria');
        const galeria = document.querySelector('.galeria');
        galeria.className = 'galeria';
        if (categoria !== 'todas') {
            galeria.classList.add(`mostrar-${categoria}`);
        } else {
            galeria.classList.add('mostrar-todas');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const galeria = document.querySelector('.galeria');
    galeria.classList.add('mostrar-todas');
});

//Hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.menu-hamburguesa');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeMenu = document.querySelector('.close-menu');
    const body = document.body;
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);
    hamburger.addEventListener('click', function() {
        this.classList.add('active');
        mobileNav.classList.add('active');
        menuOverlay.classList.add('active');
        body.classList.add('menu-open');
    });
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    }
    closeMenu.addEventListener('click', closeMobileMenu);
    menuOverlay.addEventListener('click', closeMobileMenu);
    document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 100) {
            hamburger.style.top = '15px';
        } else {
            hamburger.style.top = '20px';
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.menu-hamburguesa');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const headerHeight = header.offsetHeight;
        if (scrollPosition > headerHeight - 50) {
            hamburger.classList.add('scrolled');
            header.classList.add('header-scrolled');
        } else {
            hamburger.classList.remove('scrolled');
            header.classList.remove('header-scrolled');
        }
        if (scrollPosition > 100) {
            hamburger.style.top = '15px';
        } else {
            hamburger.style.top = '20px';
        }
    });
});
// Botones para compartir
document.querySelectorAll('.btn-compartir').forEach(btn => {
    btn.addEventListener('click', function() {
        const redSocial = this.getAttribute('data-red');
        const url = encodeURIComponent(window.location.href);
        const titulo = encodeURIComponent(document.title);
        
        if (redSocial === 'facebook') {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        } else if (redSocial === 'whatsapp') {
            window.open(`https://wa.me/?text=${titulo}%20${url}`, '_blank');
        }
    });
});
