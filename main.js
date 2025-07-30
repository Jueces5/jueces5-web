// Navegación entre páginas
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const pageId = this.getAttribute('data-page');
        // Ocultar todas las páginas
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        // Mostrar la página seleccionada
        document.getElementById(pageId).classList.add('active');
        // Actualizar navegación activa
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.style.backgroundColor = '';
        });
        this.style.backgroundColor = '#4a6b9b';
        // Desplazarse al inicio
        window.scrollTo(0, 0);
    });});
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
                    // Pausar otros audios
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
        document.querySelectorAll('.page.active .btn-subir').forEach(btn => {
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
            // Cerrar otros items
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
    // Carga de imágenes
    document.querySelectorAll('img').forEach(img => {
      img.onload = () => img.classList.add('loaded');
      if(img.complete) img.classList.add('loaded');
    });
});
// Service Worker
if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('SW registrado');
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
// Filtrado de categorías en la galería
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