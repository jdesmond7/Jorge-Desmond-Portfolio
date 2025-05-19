// === COMPONENT LOADER (Navbar y Footer) ===
function loadComponent(id, path, callback) {
  fetch(path)
    .then(res => res.text())
    .then(data => {
      const target = document.getElementById(id);
      if (target) {
        target.innerHTML = data;
        if (typeof callback === 'function') callback();
      }
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent('navbar-placeholder', 'components/navbar.html', () => {
    const logo = document.querySelector('.logo');
    const currentPath = window.location.pathname;
    if (logo && (currentPath === '/' || currentPath.endsWith('index.html'))) {
      logo.classList.add('active');
    }

    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
      const linkHref = link.getAttribute('href');
      if (window.location.href.includes(linkHref)) {
        link.classList.add('active');
      }
    });
  });

  loadComponent('footer-placeholder', 'components/footer.html');
});

// === Polaroid Hero Animation ===
document.addEventListener("DOMContentLoaded", () => {
  const photoStack = document.querySelector('.photo-stack');
  const tooltipEls = [
    document.getElementById("tooltip-1"),
    document.getElementById("tooltip-2"),
    document.getElementById("tooltip-3")
  ];

  const tooltips = [
    ["Diseñador UX / UI", "Diseñador de producto", "Creador de experiencias digitales"],
    ["Estratega visual", "Optimiza flujos con IA", "Facilitador de DesignOps"],
    ["Desarrollador de sistemas de diseño", "Especialista en experiencia", "Líder de innovación digital"]
  ];

  let allPolaroids = Array.from(photoStack.querySelectorAll('.polaroid'));
  let currentIndex = 0;
  let intervalId;
  let isAnimating = false;

  // Función para generar una rotación aleatoria entre -8 y -4 o entre 4 y 8 grados
  function getRandomRotation() {
    const isPositive = Math.random() > 0.5;
    const rotation = (Math.random() * 4 + 4).toFixed(2); // Genera número entre 4 y 8
    return isPositive ? rotation : -rotation;
  }

  // Función para aplicar rotaciones aleatorias a todas las polaroids
  function applyRandomRotations() {
    allPolaroids.forEach(polaroid => {
      const rotation = getRandomRotation();
      polaroid.style.transform = `rotate(${rotation}deg)`;
    });
  }

  // Función para reorganizar las polaroids aleatoriamente
  function shufflePolaroids() {
    // Mantener la primera polaroid (polaroid-01) siempre al inicio
    const firstPolaroid = allPolaroids[0];
    const rest = allPolaroids.slice(1);
    
    // Mezclar el resto de polaroids
    for (let i = rest.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rest[i], rest[j]] = [rest[j], rest[i]];
    }
    
    // Reconstruir el array con la primera polaroid al inicio
    allPolaroids = [firstPolaroid, ...rest];
    
    // Limpiar el stack y agregar las polaroids en el nuevo orden
    photoStack.innerHTML = '';
    allPolaroids.forEach(polaroid => {
      photoStack.appendChild(polaroid);
    });
    
    // Aplicar rotaciones aleatorias después de reorganizar
    applyRandomRotations();
  }

  function rotatePolaroids() {
    if (isAnimating) return;
    isAnimating = true;

    const currentPolaroid = allPolaroids[currentIndex];
    const nextPolaroid = allPolaroids[(currentIndex + 1) % allPolaroids.length];
    
    // Preparar la siguiente polaroid
    nextPolaroid.classList.add('active');
    
    // Aplicar la animación de salida
    currentPolaroid.classList.add('out');

    setTimeout(() => {
      // Remover las clases de animación
      currentPolaroid.classList.remove('out', 'active');
      nextPolaroid.classList.remove('out');
      
      // Actualizar el índice
      currentIndex = (currentIndex + 1) % allPolaroids.length;
      
      // Si volvemos a la primera polaroid, reorganizar el resto
      if (currentIndex === 0) {
        shufflePolaroids();
      }
      
      // Actualizar tooltips
      updateTooltips();
      
      isAnimating = false;
    }, 400);
  }

  function updateTooltips() {
    const set = tooltips[currentIndex % tooltips.length];
    tooltipEls.forEach((el, i) => el.textContent = set[i] || "");
  }

  function startRotation() {
    intervalId = setInterval(rotatePolaroids, 10000);
  }

  function resetRotation() {
    clearInterval(intervalId);
    startRotation();
  }

  // Inicialización
  function initializePolaroids() {
    applyRandomRotations();
    shufflePolaroids();
    // Activar la primera polaroid
    allPolaroids[0].classList.add('active');
    updateTooltips();
    startRotation();
  }

  // Esperar a que la animación del hero termine antes de iniciar las polaroids
  const hero = document.querySelector('.hero');
  hero.addEventListener('animationend', () => {
    initializePolaroids();
  });

  // Event listener para click
  photoStack.addEventListener("click", () => {
    if (!isAnimating) {
      rotatePolaroids();
      resetRotation();
    }
  });
});