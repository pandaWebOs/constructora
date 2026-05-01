document.addEventListener('DOMContentLoaded', () => {
  
  /**
   * 1. Toggle del menú móvil
   */
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      // CORRECCIÓN: Usamos 'active' para que coincida exactamente con la regla de tu CSS
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
          // Ajustado a 80px (5rem) para respetar la altura del header del nuevo CSS
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
   * 3. Lógica del Formulario de WhatsApp
   */
  const whatsappForm = document.getElementById('whatsappForm');

  if (whatsappForm) {
    whatsappForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // CONFIGURACIÓN: Tu número de Chile
      const miTelefono = "56999842735"; 

      // .trim() elimina espacios en blanco accidentales al inicio o final
      const nombre = document.getElementById('nombre').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();

      // Previene enviar si los campos solo tienen espacios vacíos
      if (nombre === '' || mensaje === '') return; 

      // Formatear el mensaje usando backticks (`)
      const textoFinal = `Hola! 👋 Mi nombre es *${nombre}* e hice una consulta desde la web:\n\n${mensaje}`;
      
      // URL corregida con el formato de WhatsApp
      const urlWhatsApp = `https://wa.me/${miTelefono}?text=${encodeURIComponent(textoFinal)}`;

      // Abrir en nueva pestaña
      window.open(urlWhatsApp, '_blank');
    });
  }

});