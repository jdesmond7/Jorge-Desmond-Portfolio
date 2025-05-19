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

  // Initialize polaroid animations
  const photoStack = document.querySelector('.photo-stack');
  if (photoStack) {
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
        
        const set = tooltips[currentIndex % tooltips.length];
        tooltipEls.forEach((el, i) => el.textContent = set[i] || "");
        
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
      const set = tooltips[0];
      tooltipEls.forEach((el, i) => el.textContent = set[i] || "");
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