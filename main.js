// === NAVBAR SCROLL EFFECT ===
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
// === INSERTAR MES Y AÑO AUTOMÁTICO EN FOOTER ===
document.addEventListener("DOMContentLoaded", () => {
    const dateSpan = document.getElementById("date");
    if (dateSpan) {
      const now = new Date();
      const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
      const month = monthNames[now.getMonth()];
      const year = now.getFullYear();
      dateSpan.textContent = `${month} ${year}`;
    }
  });