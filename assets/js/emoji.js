(() => {
  const emos = document.querySelectorAll(".emo");
  if (!emos.length) return;

  // Add subtle idle to some emojis
  emos.forEach((el, i) => {
    if (i % 3 === 0) el.classList.add("emo-idle");
  });

  // --- SPRING POP ANIMATION ---
  function springPop(el) {
    el.style.transition = "none";
    el.style.transform = "scale(1.35) rotate(-12deg)";

    requestAnimationFrame(() => {
      el.style.transition = "transform 420ms cubic-bezier(.18,1.4,.35,1)";
      el.style.transform = "scale(1) rotate(0deg)";
    });
  }

  // --- HOVER TILT (magnetic feel) ---
  function addHoverPhysics(el) {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * -18;
      const rotateY = ((x / rect.width) - 0.5) * 18;

      el.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transition = "transform 220ms ease";
      el.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    });
  }

  emos.forEach((el) => {
    // Click pop
    el.addEventListener("click", () => springPop(el));

    // Keyboard accessibility
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        springPop(el);
      }
    });

    addHoverPhysics(el);

    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", el.getAttribute("aria-label") || "emoji");
  });
})();