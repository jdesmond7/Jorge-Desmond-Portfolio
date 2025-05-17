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
  loadComponent('navbar-placeholder', '/components/navbar.html', () => {
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

  loadComponent('footer-placeholder', '/components/footer.html');
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
  const firstPolaroid = allPolaroids[0];
  let index = 0;
  let intervalId;

  // Asegura que siempre inicia con polaroid-01
  photoStack.innerHTML = '';
  photoStack.appendChild(firstPolaroid);
  const rest = allPolaroids.slice(1);
  shuffleArray(rest).forEach(p => photoStack.appendChild(p));
  allPolaroids = Array.from(photoStack.querySelectorAll('.polaroid'));

  function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function randomRotation(deg = 6) {
    return (Math.random() * deg * 2 - deg).toFixed(2);
  }

  function applyRandomRotation() {
    allPolaroids.forEach((el, i) => {
      const rotation = randomRotation();
      el.style.transform = `rotate(${rotation}deg)`;
    });
  }

  function updateTooltips() {
    const set = tooltips[index % tooltips.length];
    tooltipEls.forEach((el, i) => el.textContent = set[i] || "");
    index++;
  }

  function rotatePolaroids() {
    const top = allPolaroids[0];
    const clone = top.cloneNode(true);
    clone.classList.add('out');
    clone.style.position = 'absolute';
    clone.style.top = '0';
    clone.style.left = '0';
    clone.style.zIndex = 999;
    photoStack.appendChild(clone);

    top.style.opacity = '0';

    setTimeout(() => {
      photoStack.removeChild(clone);
      photoStack.removeChild(top);

      // Reorganizar aleatoriamente sin incluir top
      const rest = allPolaroids.slice(1);
      const shuffled = shuffleArray(rest);
      shuffled.forEach(p => photoStack.appendChild(p));
      photoStack.appendChild(top);

      top.style.opacity = '1';
      allPolaroids = Array.from(photoStack.querySelectorAll('.polaroid'));
      applyRandomRotation();
      updateTooltips();
    }, 500); // igual al tiempo de .out
  }

  function startRotation() {
    intervalId = setInterval(rotatePolaroids, 10000);
  }

  function resetRotation() {
    clearInterval(intervalId);
    startRotation();
  }

  photoStack.addEventListener("click", () => {
    rotatePolaroids();
    resetRotation();
  });

  applyRandomRotation();
  updateTooltips();
  startRotation();
});