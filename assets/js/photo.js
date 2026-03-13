(() => {
  const grid = document.getElementById("photoGrid");
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbTitle = document.getElementById("lbTitle");
  const lbClose = document.getElementById("lbClose");


  const PORTRAITS = 11;
  const LANDSCAPES = 11;

  const photos = {
    portrait: Array.from({ length: PORTRAITS }, (_, i) => {
      const n = i + 1;
      return { src: `assets/img/photos/p${n}.jpg`, title: `Portrait ${String(n).padStart(2, "0")}` };
    }),
    landscape: Array.from({ length: LANDSCAPES }, (_, i) => {
      const n = i + 1;
      return { src: `assets/img/photos/l${n}.jpg`, title: `Landscape ${String(n).padStart(2, "0")}` };
    })
  };

  function render(kind){
    if (!grid) return;
    grid.innerHTML = "";

    (photos[kind] || []).forEach(ph => {
      const tile = document.createElement("div");
      tile.className = "photo-tile";
      tile.innerHTML = `
        <img src="${ph.src}" alt="${ph.title}" loading="lazy">
        <div class="photo-label mono">${ph.title}</div>
      `;
      tile.addEventListener("click", () => open(ph));
      grid.appendChild(tile);
    });
  }

  function open(ph){
    if (!lb || !lbImg) return;
    lbImg.src = ph.src;
    if (lbTitle) lbTitle.textContent = ph.title || "Photo";
    lb.classList.add("is-open");
  }

  function close(){
    if (!lb) return;
    lb.classList.remove("is-open");
    if (lbImg) lbImg.src = "";
  }

  document.querySelectorAll("[data-filter]").forEach(btn => {
    btn.addEventListener("click", () => render(btn.dataset.filter));
  });

  lbClose?.addEventListener("click", close);
  lb?.addEventListener("click", (e) => { if (e.target === lb) close(); });

  render("portrait");
})();