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

  // === animacion hero ===

  const highlights = Array.from(document.querySelectorAll('.highlight'));

  // Colores más legibles
  const colors = ['--blue-800', '--yellow-800', '--red-800', '--green-800'];
  const backgrounds = ['--yellow-50', 'none']; // solo amarillo o sin fondo
  
  const fonts = [
    "'Londrina Shadow', cursive",
    "'Fontdiner Swanky', cursive",
    "'Chicle', cursive",
    "'DynaPuff', cursive",
    "'Mogra', sans-serif"
  ];
  
  // Mapa para evitar coincidencia entre fondo y texto
  const bgToTextColor = {
    '--blue-100': '--blue-800',
    '--yellow-100': '--yellow-800',
    '--red-100': '--red-800',
    '--green-100': '--green-800'
  };
  
  // Función para aleatorio
  function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  // Shuffle de Fisher-Yates
  function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  
  function cycleSingleHighlight(el) {
    let bg = randomFrom(backgrounds);
    let text;
  
    do {
      text = randomFrom(colors);
    } while (bg !== 'none' && bgToTextColor[bg] === text);
  
    const font = randomFrom(fonts);
    const colorVal = getComputedStyle(document.documentElement).getPropertyValue(text).trim();
    const bgVal = bg === 'none' ? 'transparent' : getComputedStyle(document.documentElement).getPropertyValue(bg).trim();
  
    el.style.color = colorVal;
    el.style.backgroundColor = bgVal;
    el.style.fontFamily = font;
  }
  
  function runHighlightCycle() {
    const shuffled = shuffleArray(highlights);
  
    shuffled.forEach((el, i) => {
      setTimeout(() => {
        cycleSingleHighlight(el);
      }, i * 400); // animación desfasada
    });
  }
  
// ⏱ Espera 4s antes de iniciar el primer ciclo
setTimeout(() => {
    runHighlightCycle();
    setInterval(runHighlightCycle, 4000);
  }, 4000);

// === Hover ilustraciones ===

  const illustrations = document.querySelectorAll('.illustration-item');
const container = document.querySelector('.illustration-list');

illustrations.forEach(img => {
  img.addEventListener('click', () => {
    const isActive = img.classList.contains('active');

    // Limpiar todas
    illustrations.forEach(i => i.classList.remove('active'));
    container.classList.remove('active-mode');

    // Si no estaba activa, activarla y entrar en modo "active"
    if (!isActive) {
      img.classList.add('active');
      container.classList.add('active-mode');
    }
  });
});