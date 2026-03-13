// Smooth in-tab transitions between pages
(() => {
  const overlay = document.getElementById("transitionOverlay");
  if (!overlay) return;

  function internal(a){
    if (!a || !a.href) return false;
    const url = new URL(a.href, location.href);
    const same = url.origin === location.origin;
    const isHash = a.getAttribute("href")?.startsWith("#");
    const blank = a.getAttribute("target") === "_blank";
    return same && !isHash && !blank;
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!internal(a)) return;
    if (e.metaKey || e.ctrlKey) return; // user choice

    e.preventDefault();
    overlay.style.transition = "opacity 180ms ease";
    overlay.style.opacity = "1";
    setTimeout(() => (location.href = a.getAttribute("href")), 180);
  });

  window.addEventListener("pageshow", () => {
    overlay.style.transition = "opacity 220ms ease";
    overlay.style.opacity = "0";
  });
})();
