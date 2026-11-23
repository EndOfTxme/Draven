(() => {
  const input = document.querySelector(".search__input");
  const overlay = document.querySelector("#search-overlay");
  if (!input || !overlay) return;

  const closeButton = overlay.querySelector(".search-panel__close");
  const clearButton = overlay.querySelector(".search-panel__clear");
  const trigger = document.querySelector(".search__trigger");
  const suggestions = overlay.querySelector(".search-panel__suggestions");
  const results = overlay.querySelector(".search-panel__results");
  const resultItems = Array.from(overlay.querySelectorAll(".search-result"));
  const emptyMessage = overlay.querySelector(".search-panel__empty");
  const tabs = Array.from(overlay.querySelectorAll(".search-panel__tab"));
  let activeCategory = "all";

  const animateNavigation = () => {
    const content = results.hidden ? suggestions : results;
    content.classList.remove("is-changing");
    void content.offsetWidth;
    content.classList.add("is-changing");
  };

  const openPanel = () => {
    overlay.hidden = false;
    document.body.classList.add("search-open");
  };

  const closePanel = () => {
    overlay.hidden = true;
    document.body.classList.remove("search-open");
  };

  const updateResults = () => {
    const query = input.value.trim().toLowerCase();
    clearButton.hidden = !input.value;
    const showResults = Boolean(query) || activeCategory !== "all";
    suggestions.hidden = showResults;
    results.hidden = !showResults;

    let visibleCount = 0;
    resultItems.forEach((item) => {
      const matchesQuery = !query || item.dataset.search.includes(query);
      const matchesCategory = activeCategory === "all" || item.dataset.category === activeCategory;
      const visible = matchesQuery && matchesCategory;
      item.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    emptyMessage.hidden = visibleCount !== 0;
  };

  trigger.addEventListener("click", () => {
    openPanel();
    window.requestAnimationFrame(() => input.focus());
  });

  input.addEventListener("focus", () => {
    openPanel();
    updateResults();
  });
  input.addEventListener("input", () => {
    openPanel();
    updateResults();
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activeCategory = tab.dataset.category;
      tabs.forEach((item) => {
        const selected = item === tab;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-selected", String(selected));
      });
      updateResults();
      animateNavigation();
    });
  });

  overlay.querySelectorAll("[data-query]").forEach((button) => {
    button.addEventListener("click", () => {
      input.value = button.dataset.query;
      activeCategory = "all";
      tabs.forEach((tab) => {
        const selected = tab.dataset.category === "all";
        tab.classList.toggle("is-active", selected);
        tab.setAttribute("aria-selected", String(selected));
      });
      updateResults();
      animateNavigation();
      input.focus();
    });
  });

  closeButton.addEventListener("click", () => {
    closePanel();
    trigger.focus();
  });
  clearButton.addEventListener("click", () => {
    input.value = "";
    activeCategory = "all";
    tabs.forEach((tab) => {
      const selected = tab.dataset.category === "all";
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
    });
    updateResults();
    input.focus();
  });
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closePanel();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.hidden) {
      closePanel();
      input.blur();
      trigger.focus();
    }
  });
})();
