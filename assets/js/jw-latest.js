(() => {
  // Wait until DOM is ready
  const ready = () => {
    const stage = document.getElementById("jwStage");
    const cards = Array.from(document.querySelectorAll("#jwStack .jwCard"));
    if (!stage || cards.length < 2) return;

    // If GSAP isn't loaded, at least show everything (no broken blank state)
    const hasGSAP = !!(window.gsap && window.ScrollTrigger);
    cards.forEach((c, i) => (c.style.zIndex = String(10 + i)));

    if (!hasGSAP) {
      cards.forEach((c, i) => {
        c.style.opacity = "1";
        c.style.transform = "translateY(0)";
      });
      return;
    }

    window.gsap.registerPlugin(window.ScrollTrigger);

    // Start state
    window.gsap.set(cards[0], { opacity: 1, y: 0, scale: 1 });
    for (let i = 1; i < cards.length; i++) {
      window.gsap.set(cards[i], { opacity: 0, y: 140, scale: 0.995 });
    }

    // Pin stage
    window.ScrollTrigger.create({
      trigger: stage,
      start: "top top+=120",
      end: () => `+=${(cards.length - 1) * 520}`,
      pin: true,
      anticipatePin: 1
    });

    // Stack each next card exactly on top
    cards.slice(1).forEach((card, idx) => {
      const startAt = 120 + idx * 520;
      const endAt = startAt + 420;

      window.gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: stage,
          start: () => `top top+=${startAt}`,
          end: () => `top top+=${endAt}`,
          scrub: true
        }
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }
})();
