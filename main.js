// =====================
//   Image Loading Logic
// =====================

function preloadImages() {
  return new Promise((resolve) => {
    const imageUrls = [
      './images/hero-polaroids/polaroid-01.webp',
      './images/hero-polaroids/polaroid-02.webp',
      './images/hero-polaroids/polaroid-03.webp',
      './images/hero-polaroids/polaroid-04.webp',
      './images/hero-polaroids/polaroid-05.webp',
      './images/hero-polaroids/polaroid-06.webp',
      './images/hero-polaroids/polaroid-07.webp',
      './images/hero-polaroids/polaroid-08.webp',
      './images/hero-polaroids/polaroid-09.webp',
      './images/brandlogos/GrowrkLogotype.svg',
      './images/brandlogos/Spin-logo.svg',
      './images/brandlogos/Logotipo_de_Grupo_Salinas.svg',
      './images/icons/send-01.svg'
    ];

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    function checkAllLoaded() {
      loadedCount++;
      if (loadedCount === totalImages) {
        // Add a small delay for smooth transition
        setTimeout(() => {
          document.getElementById('loading-screen').style.opacity = '0';
          setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
          }, 500);
        }, 300);
        resolve();
      }
    }

    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded; // Continue even if some images fail
      img.src = url;
    });
  });
}

// =====================
//   Component Loading
// =====================

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

// === Initialize All Components ===
document.addEventListener("DOMContentLoaded", async () => {
  // Start preloading images
  await preloadImages();


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
    let allPolaroids = Array.from(photoStack.querySelectorAll('.polaroid'));
    let currentIndex = 0;
    let intervalId = null;
    let isAnimating = false;
    const CLICK_DEBOUNCE_MS = 200;
    let nextAllowedClickTs = 0;
    const ROTATION_INTERVAL = 8000; // 8 seconds

    function getRandomRotation() {
      const isPositive = Math.random() > 0.5;
      const rotation = (Math.random() * 4 + 4).toFixed(2);
      return isPositive ? rotation : -rotation;
    }

    function getRandomPolaroidDifferentFrom(excludeIndex) {
      if (allPolaroids.length <= 1) return 0;
      let candidate = excludeIndex;
      while (candidate === excludeIndex) {
        candidate = Math.floor(Math.random() * allPolaroids.length);
      }
      return candidate;
    }

    function changePolaroid() {
      if (isAnimating) return;
      isAnimating = true;

      const currentPolaroid = allPolaroids[currentIndex];
      const nextIndex = getRandomPolaroidDifferentFrom(currentIndex);
      const nextPolaroid = allPolaroids[nextIndex];

      // Hide current polaroid
      currentPolaroid.classList.remove('active');
      currentPolaroid.classList.add('out');

      // Show next polaroid with entrance animation
      setTimeout(() => {
        currentPolaroid.classList.remove('out');
        nextPolaroid.classList.add('entering');
        
        setTimeout(() => {
          nextPolaroid.classList.remove('entering');
          nextPolaroid.classList.add('active');
          currentIndex = nextIndex;
          isAnimating = false;
        }, 600); // Match CSS transition duration
      }, 600); // Match CSS transition duration
    }

    function startRotation() {
      if (intervalId) {
        clearInterval(intervalId);
      }
      intervalId = setInterval(changePolaroid, ROTATION_INTERVAL);
    }

    function resetRotation() {
      if (intervalId) {
        clearInterval(intervalId);
      }
      startRotation();
    }

    function initializePolaroids() {
      // Apply random rotations to all polaroids
      allPolaroids.forEach(polaroid => {
        const rotation = getRandomRotation();
        polaroid.style.transform = `translateY(30px) scale(0.8) rotate(${rotation}deg)`;
      });

      // Show first polaroid immediately
      const firstPolaroid = allPolaroids[0];
      firstPolaroid.classList.add('active');
      startRotation();
    }

    // Initialize polaroids immediately when DOM is ready
    initializePolaroids();

    photoStack.addEventListener("click", () => {
      const now = Date.now();
      if (now < nextAllowedClickTs) return; // debounce clicks muy rápidos
      nextAllowedClickTs = now + CLICK_DEBOUNCE_MS;
      // Siempre reinicia el temporizador para que el siguiente cambio automático
      // comience a contar desde este instante
      resetRotation();
      // Si la animación automática está en curso, ignora el click
      if (isAnimating) return;
      // De lo contrario, cambia inmediatamente a la siguiente polaroid
      changePolaroid();
    });
  }




  // Forzar scroll al tope en mobile
  if (window.innerWidth <= 640) {
    window.scrollTo(0, 0);
  }
});

// Deshabilita el scroll restoration automático
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function forceScrollTop() {
  window.scrollTo(0, 0);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

window.addEventListener('DOMContentLoaded', forceScrollTop);
window.addEventListener('load', forceScrollTop);
setTimeout(forceScrollTop, 100);