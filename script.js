const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".site-nav a");

if (header && menuButton) {
  const updateHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  menuButton.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const audienceMap = document.querySelector(".audience-map");

if (audienceMap) {
  const cards = [...audienceMap.querySelectorAll("[data-audience-card]")];
  const centerTitle = audienceMap.querySelector("[data-audience-title]");
  const centerDescription = audienceMap.querySelector("[data-audience-description]");
  const defaultContent = {
    key: "",
    title: centerTitle?.textContent || "¿Para quién es?",
    description: centerDescription?.textContent || "Descubra cómo podemos acompañar su empresa.",
  };
  const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  let selectedCard = null;

  const updateCenter = (card) => {
    const content = card
      ? {
          key: card.dataset.audienceKey,
          title: card.dataset.title,
          description: card.dataset.description,
        }
      : defaultContent;

    if (centerTitle) centerTitle.textContent = content.title;
    if (centerDescription) centerDescription.textContent = content.description;
    audienceMap.dataset.active = content.key;
    audienceMap.classList.toggle("has-selection", Boolean(card));
  };

  const setActiveCard = (card) => {
    cards.forEach((item) => {
      const isActive = item === card;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-expanded", String(isActive));
    });

    selectedCard = card;
    updateCenter(card);
  };

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (hoverQuery.matches) {
        updateCenter(card);
        card.classList.add("is-preview");
      }
    });

    card.addEventListener("mouseleave", () => {
      if (hoverQuery.matches) {
        card.classList.remove("is-preview");
        updateCenter(selectedCard);
      }
    });

    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      const shouldClose = selectedCard === card && !hoverQuery.matches;
      setActiveCard(shouldClose ? null : card);
    });

    card.addEventListener("keydown", (event) => {
      if (event.target.closest("a")) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      const shouldClose = selectedCard === card && !hoverQuery.matches;
      setActiveCard(shouldClose ? null : card);
    });
  });

  updateCenter(null);
}

const teamShowcase = document.querySelector("[data-team-showcase]");

if (teamShowcase) {
  const thumbs = [...teamShowcase.querySelectorAll("[data-team-thumb]")];
  const count = teamShowcase.querySelector("[data-team-count]");
  const name = teamShowcase.querySelector("[data-team-name]");
  const role = teamShowcase.querySelector("[data-team-role]");
  const description = teamShowcase.querySelector("[data-team-description]");
  const photoFrame = teamShowcase.querySelector(".team-main-photo");

  const setActiveMember = (thumb) => {
    teamShowcase.classList.add("is-switching");

    window.setTimeout(() => {
      thumbs.forEach((item) => {
        const isActive = item === thumb;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      if (count) count.textContent = `#${thumb.dataset.index}`;
      if (name) name.textContent = thumb.dataset.name;
      if (role) role.textContent = thumb.dataset.role;
      if (description) description.textContent = thumb.dataset.description;
      if (photoFrame) photoFrame.dataset.teamPhotoLabel = thumb.dataset.name;

      teamShowcase.classList.remove("is-switching");
    }, 140);
  };

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => setActiveMember(thumb));
  });
}
