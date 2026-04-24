// Toggle del menú móvil
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });

  // Cerrar menú al hacer clic en un enlace
  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
    });
  });
}

// Scroll suave para anclas internas
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 64; // alto aproximado del header
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
 * Lógica del Formulario de WhatsApp
 */
const whatsappForm = document.getElementById('whatsappForm');

if (whatsappForm) {
  whatsappForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // CONFIGURACIÓN: Tu número de Chile
    const miTelefono = "56999842735"; 

    const nombre = document.getElementById('nombre').value;
    const mensaje = document.getElementById('mensaje').value;

    // Formatear el mensaje usando backticks (`) para que las variables funcionen
    const textoFinal = `Hola! 👋 Mi nombre es *${nombre}* e hice una consulta desde la web:\n\n${mensaje}`;
    
    // URL corregida con el formato de WhatsApp
    const urlWhatsApp = `https://wa.me/${miTelefono}?text=${encodeURIComponent(textoFinal)}`;

    // Abrir en nueva pestaña
    window.open(urlWhatsApp, '_blank');
  });
}
