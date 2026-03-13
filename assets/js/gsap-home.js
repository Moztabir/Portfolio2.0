gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  // Smooth scroll
  const lenis = new Lenis({
    duration: 1,
    smoothWheel: true,
    smoothTouch: false
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on("scroll", ScrollTrigger.update);

  // Elements
  const header = document.querySelector("header");
  const heroPanel = document.querySelector(".hero-panel");
  const heroCopy = document.querySelector(".hero-copy");
  const heroSub = document.querySelector(".hero-sub");
  const heroLinks = document.querySelector(".hero-links");
  const nosHead = document.querySelector(".nos-head");
  const latestCards = gsap.utils.toArray(".lw__stackItem");
  const projectCards = gsap.utils.toArray(".lw__stackContent");
  const photoStage = document.querySelector(".ph-reveal__stage");
  const photoCenter = document.querySelector(".ph-reveal__center");

  // Intro
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(header, {
    y: -20,
    opacity: 0,
    duration: 0.7
  })
  .from(heroPanel, {
    y: 30,
    opacity: 0,
    scale: 0.98,
    duration: 0.9
  }, "-=0.35")
  .from(heroCopy, {
    y: 24,
    opacity: 0,
    duration: 0.8
  }, "-=0.5")
  .from(heroSub, {
    y: 16,
    opacity: 0,
    duration: 0.6
  }, "-=0.45")
  .from(heroLinks ? heroLinks.children : [], {
    y: 12,
    opacity: 0,
    duration: 0.5,
    stagger: 0.08
  }, "-=0.35");

  // Section heading
  if (nosHead) {
    gsap.from(nosHead, {
      scrollTrigger: {
        trigger: nosHead,
        start: "top 82%"
      },
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out"
    });
  }

  // Project cards reveal
  latestCards.forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 88%"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.05,
      ease: "power3.out"
    });
  });

  // Light hover only
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -6,
        duration: 0.25,
        ease: "power2.out"
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        duration: 0.35,
        ease: "power3.out"
      });
    });
  });

  // Photo section reveal
  if (photoStage) {
    gsap.from(photoStage, {
      scrollTrigger: {
        trigger: photoStage,
        start: "top 84%"
      },
      y: 50,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out"
    });
  }

  // Very subtle center float only
  if (photoCenter) {
    gsap.to(photoCenter, {
      y: -6,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  ScrollTrigger.refresh();
});