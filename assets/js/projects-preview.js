(() => {
  const rows = Array.from(document.querySelectorAll(".projRow"));
  const pv = {
    index: document.getElementById("pvIndex"),
    img: document.getElementById("pvImg"),
    title: document.getElementById("pvTitle"),
    tagline: document.getElementById("pvTagline"),
    year: document.getElementById("pvYear"),
    role: document.getElementById("pvRole"),
    tools: document.getElementById("pvTools"),
    link: document.getElementById("pvLink"),
  };
  if (!rows.length || !pv.img || !window.gsap) return;

  // overlay image for buttery crossfade
  const wrap = pv.img.parentElement;
  wrap.style.position = "relative";
  const overlay = document.createElement("img");
  overlay.alt = "";
  overlay.style.position = "absolute";
  overlay.style.inset = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.objectFit = "cover";
  overlay.style.opacity = "0";
  overlay.style.transform = "scale(1.03)";
  overlay.style.pointerEvents = "none";
  wrap.appendChild(overlay);

  let active = -1, busy = false;

  function setRow(el){
    rows.forEach(r => r.setAttribute("aria-current","false"));
    el.setAttribute("aria-current","true");
  }

  function setPreview(el, i){
    if (busy || i === active) return;
    busy = true;
    setRow(el);

    const title = el.dataset.title || "";
    const tagline = el.dataset.tagline || "";
    const year = el.dataset.year || "";
    const role = el.dataset.role || "";
    const tools = el.dataset.tools || "";
    const thumb = el.dataset.thumb || "";
    const href = el.getAttribute("href") || "#";

    const tl = gsap.timeline({
      defaults:{ ease:"power2.out" },
      onComplete:()=>{ active = i; busy = false; }
    });

    // text out
    tl.to([pv.title, pv.tagline], { y:-6, opacity:0, duration:0.16 }, 0)
      .to([pv.year, pv.role, pv.tools], { opacity:0, duration:0.12 }, 0);

    // swap
    tl.add(() => {
      if (pv.index) pv.index.textContent = String(i+1).padStart(2,"0");
      pv.title.textContent = title;
      pv.tagline.textContent = tagline;
      pv.year.textContent = year;
      pv.role.textContent = role;
      pv.tools.textContent = tools;
      pv.link.href = href;
    });

    // image crossfade
    if (thumb) {
      tl.add(() => { overlay.src = thumb; }, 0);
      tl.set(overlay, { opacity:0, transform:"scale(1.03)" }, 0)
        .to(overlay, { opacity:1, duration:0.20 }, 0.02)
        .to(overlay, { transform:"scale(1)", duration:0.55 }, 0.02)
        .to(pv.img, { opacity:0.75, duration:0.16 }, 0.02)
        .add(() => { pv.img.src = thumb; }, 0.12)
        .to(pv.img, { opacity:0.9, duration:0.16 }, 0.14)
        .to(overlay, { opacity:0, duration:0.22 }, 0.16);
    }

    // text in
    tl.fromTo([pv.title, pv.tagline], { y:10, opacity:0 }, { y:0, opacity:1, duration:0.22 }, 0.12)
      .to([pv.year, pv.role, pv.tools], { opacity:1, duration:0.18 }, 0.16);

    // subtle preview “pulse”
    tl.fromTo(wrap, { filter:"brightness(1)" }, { filter:"brightness(1.06)", duration:0.18, yoyo:true, repeat:1, ease:"power1.out" }, 0.08);
  }

  rows.forEach((el, i) => {
    el.addEventListener("mouseenter", () => setPreview(el,i));
    el.addEventListener("focus", () => setPreview(el,i));
  });

  // set first active
  if (rows[0]) { active = 0; setRow(rows[0]); }
})();
