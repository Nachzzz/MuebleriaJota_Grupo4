export function initMenuToggle() {
  const toggleBtn = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  // si no existe en la página, no hace nada
  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}
