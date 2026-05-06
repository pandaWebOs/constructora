document.addEventListener('DOMContentLoaded', () => {
  
  /**
   * 1. Toggle del menú móvil
   */
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      siteNav.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('active');
      });
    });
  }

  /**
   * 2. Scroll suave para anclas internas
   */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        
        if (target) {
          e.preventDefault();
          const headerOffset = 80; 
          const rect = target.getBoundingClientRect();
          const offsetTop = rect.top + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  /**
   * 3. Lógica del Carrusel de Galería
   */
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (track && prevBtn && nextBtn) {
    let currentIndex = 0;

    const updateCarousel = () => {
      const slide = track.children[0];
      // Obtenemos el espacio entre imágenes (gap)
      const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
      // Ancho total a mover por cada clic
      const moveAmount = slide.offsetWidth + gap;
      track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;
    };

    nextBtn.addEventListener('click', () => {
      // Calculamos cuántas imágenes se ven en pantalla
      const visibleSlides = Math.round(track.parentElement.offsetWidth / track.children[0].offsetWidth);
      const maxIndex = track.children.length - visibleSlides;

      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        currentIndex = 0; // Si llega al final, vuelve al inicio
      }
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        // Si está en el inicio, va al final
        const visibleSlides = Math.round(track.parentElement.offsetWidth / track.children[0].offsetWidth);
        currentIndex = track.children.length - visibleSlides;
      }
      updateCarousel();
    });

    // Recalcular posiciones si se voltea el teléfono o cambia tamaño de ventana
    window.addEventListener('resize', () => {
      currentIndex = 0;
      updateCarousel();
    });
  }

  /**
   * 4. Lógica del Formulario de WhatsApp
   */
  const whatsappForm = document.getElementById('whatsappForm');

  if (whatsappForm) {
    whatsappForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // CONFIGURACIÓN: Tu número de Chile
      const miTelefono = "56999842735"; 

      const nombre = document.getElementById('nombre').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();

      if (nombre === '' || mensaje === '') return; 

      const textoFinal = `Hola! 👋 Mi nombre es *${nombre}* e hice una consulta desde la web:\n\n${mensaje}`;
      const urlWhatsApp = `https://wa.me/${miTelefono}?text=${encodeURIComponent(textoFinal)}`;

      window.open(urlWhatsApp, '_blank');
    });
  }

});