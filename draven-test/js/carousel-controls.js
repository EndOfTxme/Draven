(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  document.querySelectorAll(".carousel-nav").forEach((nav) => {
    const carousel = nav.previousElementSibling;
    if (!carousel?.matches(".carousel")) return;

    nav.addEventListener("click", (event) => {
      const arrow = event.target.closest(".carousel-nav__arrow");
      if (!arrow) return;

      event.preventDefault();

      const firstItem = carousel.querySelector(".carousel__item");
      const track = carousel.querySelector(".carousel__track");
      if (!firstItem || !track) return;

      const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
      const distance = firstItem.getBoundingClientRect().width + gap;
      const direction = arrow.classList.contains("carousel-nav__arrow--next") ? 1 : -1;

      carousel.scrollBy({
        left: direction * distance,
        behavior: reduceMotion.matches ? "auto" : "smooth",
      });
    });
  });

  const gallery = document.querySelector("#product-gallery");
  const counter = document.querySelector(".gallery__counter");
  if (!gallery || !counter) return;

  const frames = Array.from(gallery.querySelectorAll(".gallery__tile"));
  let updateQueued = false;

  const updateCounter = () => {
    updateQueued = false;
    const viewportCenter = gallery.getBoundingClientRect().left + gallery.clientWidth / 2;
    let activeIndex = 0;
    let smallestDistance = Infinity;

    frames.forEach((frame, index) => {
      const bounds = frame.getBoundingClientRect();
      const distance = Math.abs(bounds.left + bounds.width / 2 - viewportCenter);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        activeIndex = index;
      }
    });

    counter.textContent = `${activeIndex + 1}/${frames.length}`;
  };

  gallery.addEventListener("scroll", () => {
    if (updateQueued) return;
    updateQueued = true;
    window.requestAnimationFrame(updateCounter);
  }, { passive: true });

  window.addEventListener("resize", updateCounter);
  updateCounter();
})();
