// Plays once per session
(() => {
  const loader = document.getElementById("introLoader");
  if (!loader) return;

  const key = "introPlayed_v1";
  if (sessionStorage.getItem(key) === "1") return;

  loader.classList.add("is-visible");

  const pct = document.getElementById("bootPct");
  const bar = document.getElementById("bootBar");
  const lines = [
    document.getElementById("bootLine1"),
    document.getElementById("bootLine2"),
    document.getElementById("bootLine3"),
  ].filter(Boolean);

  // Simple animation without any libs
  let v = 0;
  lines.forEach((l, i) => {
    l.style.opacity = "0.35";
    setTimeout(() => (l.style.opacity = "1"), 120 + i * 120);
  });

  const timer = setInterval(() => {
    v += Math.ceil((100 - v) * 0.12);
    if (v > 100) v = 100;
    if (pct) pct.textContent = `${v}%`;
    if (bar) bar.style.width = `${v}%`;

    if (v >= 100) {
      clearInterval(timer);
      sessionStorage.setItem(key, "1");
      loader.style.transition = "opacity 280ms ease";
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.classList.remove("is-visible");
        loader.style.opacity = "";
        loader.style.transition = "";
      }, 300);
    }
  }, 30);
})();
