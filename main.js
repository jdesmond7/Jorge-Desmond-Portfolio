// === Load Component Function ===
async function loadComponent(placeholderId, componentPath, callback) {
  try {
    const response = await fetch(componentPath);
    const html = await response.text();
    const placeholder = document.getElementById(placeholderId);
    if (placeholder) {
      placeholder.innerHTML = html;
      if (callback) callback();
    }
  } catch (error) {
    console.error(`Error loading component ${componentPath}:`, error);
  }
}

// === Scroll to Top on Load and Refresh ===
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

// === Navbar Scroll Effect ===
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY >= 220) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// === Initialize All Components ===
document.addEventListener("DOMContentLoaded", () => {
  // Load navbar
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

  // Load footer
  loadComponent('footer-placeholder', 'components/footer.html');

  // Initialize letter animations
  const letters = document.querySelectorAll('.name .letter');
  letters.forEach(letter => {
    let timeoutId;
    
    letter.addEventListener('mouseenter', () => {
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      letter.classList.add('letter-up');
    });

    letter.addEventListener('mouseleave', () => {
      // Wait for the transition to complete before removing the class
      timeoutId = setTimeout(() => {
        letter.classList.remove('letter-up');
      }, 400); // Match this with the CSS transition duration
    });
  });

  // === TOOLTIP DATA ===
  const polaroidTooltips = [
    [
      { text: "Tu amigable diseñador de confianza 🕷️", icon: "magic-wand-02.svg", position: "top-left" },
      { text: "Diseñador de productos digitales", icon: "palette.svg", position: "top-right" },
      { text: "Super humano digital", icon: "command.svg", position: "bottom-left" }
    ],
    [
      { text: "Creador de experiencias digitales", icon: "transform.svg", position: "top-left" },
      { text: "Diseñador Senior en UX / UI ", icon: "cursor-04.svg", position: "top-right" },
      { text: "Maestro Jedi en innovación", icon: "bezier-curve-01.svg", position: "bottom-right" }
    ],
    [
      { text: "Miembros de la Orden Sith 🤖", icon: "roller-brush.svg", position: "top-left" },
      { text: "Mupppet, Botarga, Peluche ???", icon: "type-01.svg", position: "bottom-right" },
      { text: "Diseñador de productos digitales", icon: "palette.svg", position: "top-right" }
    ],
    [
      { text: "Diseñador Senior en UX / UI ", icon: "cursor-04.svg", position: "top-left" },
      { text: "Creador de experiencias digitales", icon: "transform.svg", position: "top-right" },
      { text: "Super humano digital", icon: "command.svg", position: "bottom-left" }
    ],
    [
      { text: "Maestro Jedi en innovación", icon: "bezier-curve-01.svg", position: "top-left" },
      { text: "Tu amigable diseñador de confianza 🕷️", icon: "magic-wand-02.svg", position: "top-right" },
      { text: "Diseñador de productos digitales", icon: "palette.svg", position: "bottom-left" }
    ],
    [
      { text: "Mupppet, Botarga, Peluche ???", icon: "type-01.svg", position: "top-left" },
      { text: "Miembros de la Orden Sith 🤖", icon: "roller-brush.svg", position: "top-right" },
      { text: "Creador de experiencias digitales", icon: "transform.svg", position: "bottom-right" }
    ],
    [
      { text: "Super humano digital", icon: "command.svg", position: "top-left" },
      { text: "Diseñador Senior en UX / UI ", icon: "cursor-04.svg", position: "top-right" },
      { text: "Maestro Jedi en innovación", icon: "bezier-curve-01.svg", position: "bottom-left" }
    ],
    [
      { text: "Creador de experiencias digitales", icon: "transform.svg", position: "top-left" },
      { text: "Tu amigable diseñador de confianza 🕷️", icon: "magic-wand-02.svg", position: "top-right" },
      { text: "Mupppet, Botarga, Peluche ???", icon: "type-01.svg", position: "bottom-right" }
    ],
    [
      { text: "Diseñador de productos digitales", icon: "palette.svg", position: "top-left" },
      { text: "Miembros de la Orden Sith 🤖", icon: "roller-brush.svg", position: "top-right" },
      { text: "Super humano digital", icon: "command.svg", position: "bottom-left" }
    ],
    [
      { text: "Maestro Jedi en innovación", icon: "bezier-curve-01.svg", position: "top-left" },
      { text: "Creador de experiencias digitales", icon: "transform.svg", position: "top-right" },
      { text: "Diseñador Senior en UX / UI ", icon: "cursor-04.svg", position: "bottom-right" }
    ]
  ];

  // Initialize polaroid animations
  const photoStack = document.querySelector('.photo-stack');
  if (photoStack) {
    const tooltipEls = [
      document.getElementById("tooltip-1"),
      document.getElementById("tooltip-2"),
      document.getElementById("tooltip-3")
    ];

    let allPolaroids = Array.from(photoStack.querySelectorAll('.polaroid'));
    let currentIndex = 0;
    let intervalId = null;
    let isAnimating = false;
    const ROTATION_INTERVAL = 10000; // 10 seconds

    function getRandomRotation() {
      const isPositive = Math.random() > 0.5;
      const rotation = (Math.random() * 4 + 4).toFixed(2);
      return isPositive ? rotation : -rotation;
    }

    function applyRandomRotations() {
      allPolaroids.forEach(polaroid => {
        const rotation = getRandomRotation();
        polaroid.style.transform = `rotate(${rotation}deg)`;
      });
    }

    function shufflePolaroids() {
      const firstPolaroid = allPolaroids[0];
      const rest = allPolaroids.slice(1);
      
      for (let i = rest.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rest[i], rest[j]] = [rest[j], rest[i]];
      }
      
      allPolaroids = [firstPolaroid, ...rest];
      
      photoStack.innerHTML = '';
      allPolaroids.forEach(polaroid => {
        photoStack.appendChild(polaroid);
      });
      
      applyRandomRotations();
    }

    function breakText(text) {
      return text;
    }

    function updateTooltips(polaroidIndex) {
      const tips = polaroidTooltips[polaroidIndex % polaroidTooltips.length];
      // Sets de posiciones para rotar
      const positionSets = [
        // 1era vez
        ['left-anchored-high', 'right-anchored-mid', 'left-anchored-low'],
        // 2nda vez
        ['right-anchored-high', 'left-anchored-high', 'right-anchored-low'],
        // 3ra vez
        ['right-anchored-high', 'right-anchored-mid', 'left-anchored-low'],
        // 4ta vez (diferente)
        ['left-anchored-high', 'right-anchored-high', 'right-anchored-low']
      ];
      const positions = positionSets[polaroidIndex % positionSets.length];
      tips.slice(0, 3).forEach((tip, i) => {
        if (tooltipEls[i]) {
          const safeText = breakText(tip.text);
          tooltipEls[i].innerHTML = `<img src=\"images/icons/${tip.icon}\" alt=\"icon\" class=\"tooltip-icon\" loading=\"eager\" width=\"24\" height=\"24\"><span>${safeText}</span>`;
          tooltipEls[i].className = `tooltip ${positions[i]}`;
          tooltipEls[i].style.display = '';
        }
      });
    }

    function rotatePolaroids() {
      if (isAnimating) return;
      isAnimating = true;

      const currentPolaroid = allPolaroids[currentIndex];
      const nextPolaroid = allPolaroids[(currentIndex + 1) % allPolaroids.length];
      
      nextPolaroid.classList.add('active');
      currentPolaroid.classList.add('out');

      setTimeout(() => {
        currentPolaroid.classList.remove('out', 'active');
        nextPolaroid.classList.remove('out');
        
        currentIndex = (currentIndex + 1) % allPolaroids.length;
        
        if (currentIndex === 0) {
          shufflePolaroids();
        }
        
        updateTooltips(currentIndex);
        
        isAnimating = false;
      }, 400);
    }

    function startRotation() {
      if (intervalId) {
        clearInterval(intervalId);
      }
      intervalId = setInterval(rotatePolaroids, ROTATION_INTERVAL);
    }

    function resetRotation() {
      if (intervalId) {
        clearInterval(intervalId);
      }
      startRotation();
    }

    function initializePolaroids() {
      applyRandomRotations();
      shufflePolaroids();
      allPolaroids[0].classList.add('active');
      updateTooltips(0);
      startRotation();
    }

    const hero = document.querySelector('.hero');
    if (hero) {
      hero.addEventListener('animationend', () => {
        initializePolaroids();
      });
    }

    photoStack.addEventListener("click", () => {
      if (!isAnimating) {
        rotatePolaroids();
        resetRotation();
      }
    });
  }
});