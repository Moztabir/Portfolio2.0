(() => {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.from("#aboutIntro", { y:18, opacity:0, duration:0.6, ease:"power2.out" });

  // scanline endless
  gsap.to("#scanLine", { y:220, duration:1.1, ease:"none", repeat:-1, yoyo:true });

  // Pinned scene: words slide in one by one
  const words = gsap.utils.toArray("#bigWords .bigWord");
  gsap.set(words, { opacity:0, y:14 });

  ScrollTrigger.create({
    trigger:"#pinSection",
    start:"top 20%",
    end:"+=500",
    pin:true,
    scrub:true
  });

  gsap.to(words, {
    opacity:1,
    y:0,
    stagger:0.22,
    ease:"power2.out",
    scrollTrigger:{
      trigger:"#pinSection",
      start:"top 60%",
      end:"+=420",
      scrub:true
    }
  });

  // Chips disturbance
  document.querySelectorAll(".chip").forEach(chip => {
    chip.style.cursor = "default";
    chip.addEventListener("mouseenter", () => {
      gsap.to(chip, { x:gsap.utils.random(-10,10), y:gsap.utils.random(-8,8), rotation:gsap.utils.random(-3,3), duration:0.18, ease:"power2.out" });
    });
    chip.addEventListener("mouseleave", () => {
      gsap.to(chip, { x:0, y:0, rotation:0, duration:0.22, ease:"power2.out" });
    });
  });

  gsap.from("#skillsZone", {
    opacity:0, y:16, duration:0.7, ease:"power2.out",
    scrollTrigger:{ trigger:"#skillsZone", start:"top 80%" }
  });
})();
