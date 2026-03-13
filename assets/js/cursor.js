const arrowCursor = document.querySelector(".arrow-cursor");

if (arrowCursor && window.matchMedia("(pointer:fine)").matches) {
  const interactiveSelectors = [
    "a",
    "button",
    ".btn",
    ".nav-btn",
    ".lw__stackContent",
    ".lw__title",
    ".emo"
  ].join(",");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  const setHoverState = (target) => {
    arrowCursor.classList.toggle("is-hover", !!target.closest(interactiveSelectors));
  };

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    setHoverState(e.target);
  });

  window.addEventListener("mouseover", (e) => {
    setHoverState(e.target);
  });

  window.addEventListener("mousedown", () => {
    arrowCursor.classList.add("is-down");
  });

  window.addEventListener("mouseup", () => {
    arrowCursor.classList.remove("is-down");
  });

  const animateCursor = () => {
    cursorX += (mouseX - cursorX) * 0.35;
    cursorY += (mouseY - cursorY) * 0.35;

    arrowCursor.style.left = `${cursorX}px`;
    arrowCursor.style.top = `${cursorY}px`;

    requestAnimationFrame(animateCursor);
  };

  animateCursor();
}