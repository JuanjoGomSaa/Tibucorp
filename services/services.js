const services = [
  {
    slug: "revisoria-fiscal",
    tab: "RF",
    name: "Revisoría fiscal",
    description:
      "Cumplimiento normativo, revisión independiente, control interno y acompañamiento permanente para fortalecer la gestión empresarial.",
    benefits: ["Mayor confianza financiera", "Prevención de sanciones", "Mejor control empresarial"],
  },
  {
    slug: "asesoria-tributaria",
    tab: "AT",
    name: "Asesoría tributaria",
    description:
      "Planeación, prevención de riesgos fiscales y acompañamiento frente a obligaciones tributarias y entidades de control.",
    benefits: ["Reducción de contingencias", "Cumplimiento oportuno", "Mejor planeación financiera"],
  },
  {
    slug: "outsourcing-contable",
    tab: "OC",
    name: "Outsourcing contable",
    description:
      "Gestión contable organizada para tomar decisiones con información clara, actualizada y oportuna.",
    benefits: ["Información actualizada", "Menor carga operativa", "Decisiones con datos confiables"],
  },
  {
    slug: "auditoria-financiera",
    tab: "AF",
    name: "Auditoría financiera",
    description:
      "Evaluación de procesos, estados financieros, riesgos y oportunidades de mejora para fortalecer el control empresarial.",
    benefits: ["Mayor confiabilidad", "Riesgos detectados a tiempo", "Mejora de procesos"],
  },
  {
    slug: "asesoria-legal",
    tab: "AL",
    name: "Asesoría legal empresarial",
    description:
      "Soporte jurídico para empresas, grupos familiares, direccionamiento corporativo y sucesión patrimonial.",
    benefits: ["Seguridad jurídica", "Prevención de conflictos", "Continuidad empresarial"],
  },
  {
    slug: "back-office",
    tab: "BO",
    name: "Back office administrativo",
    description:
      "Apoyo operativo y administrativo para liberar carga interna, ordenar procesos y mejorar el control del negocio.",
    benefits: ["Procesos más ordenados", "Menor carga interna", "Mejor seguimiento"],
  },
];

const whatsappNumber = "573165549451";
const slider = document.querySelector("[data-services-slider]");
const accordions = [...document.querySelectorAll(".service-accordion")];
const servicesHeader = document.querySelector(".services-page .site-header");

if (servicesHeader) {
  let lastScrollY = window.scrollY;

  window.addEventListener(
    "scroll",
    () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      const shouldHide = isScrollingDown && currentScrollY > 90 && !servicesHeader.classList.contains("nav-open");

      servicesHeader.classList.toggle("is-hidden", shouldHide);
      lastScrollY = currentScrollY;
    },
    { passive: true },
  );
}

const makeWhatsappUrl = (name, detailed = false) => {
  const message = detailed
    ? `Hola, estoy interesado en conocer más sobre el servicio de ${name}.`
    : `Hola, estoy interesado en el servicio de ${name}.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};

const openAccordion = (slug, shouldFocus = false) => {
  const target = document.getElementById(slug);
  if (!target) return;

  accordions.forEach((item) => {
    const isOpen = item === target;
    item.classList.toggle("is-open", isOpen);
    item.querySelector(".service-accordion-header")?.setAttribute("aria-expanded", String(isOpen));
  });

  target.scrollIntoView({ behavior: "smooth", block: "start" });

  if (shouldFocus) {
    window.setTimeout(() => {
      target.querySelector(".service-accordion-header")?.focus({ preventScroll: true });
    }, 420);
  }
};

accordions.forEach((accordion) => {
  const button = accordion.querySelector(".service-accordion-header");
  button?.addEventListener("click", () => {
    const isOpen = accordion.classList.contains("is-open");
    accordions.forEach((item) => {
      item.classList.remove("is-open");
      item.querySelector(".service-accordion-header")?.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      accordion.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

if (slider) {
  const title = slider.querySelector("[data-slide-title]");
  const description = slider.querySelector("[data-slide-description]");
  const benefits = slider.querySelector("[data-slide-benefits]");
  const counter = slider.querySelector("[data-slide-counter]");
  const progress = slider.querySelector("[data-slide-progress]");
  const whatsapp = slider.querySelector("[data-slide-whatsapp]");
  const details = slider.querySelector("[data-slide-details]");
  const dots = [...slider.querySelectorAll("[data-slide-dot]")];
  const previous = slider.querySelector("[data-slide-prev]");
  const next = slider.querySelector("[data-slide-next]");
  let activeIndex = 0;
  let touchStartX = 0;

  const setSlide = (index) => {
    const nextIndex = (index + services.length) % services.length;
    const service = services[nextIndex];

    slider.classList.add("is-changing");

    window.setTimeout(() => {
      activeIndex = nextIndex;
      if (title) title.textContent = service.name;
      if (description) description.textContent = service.description;
      if (counter) counter.textContent = `${String(nextIndex + 1).padStart(2, "0")} / 06`;
      if (progress) progress.style.width = `${((nextIndex + 1) / services.length) * 100}%`;
      if (whatsapp) whatsapp.href = makeWhatsappUrl(service.name);
      if (benefits) {
        benefits.innerHTML = service.benefits.map((benefit) => `<li>${benefit}</li>`).join("");
      }

      dots.forEach((dot) => {
        const isActive = Number(dot.dataset.index) === nextIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-selected", String(isActive));
      });

      slider.classList.remove("is-changing");
    }, 180);
  };

  previous?.addEventListener("click", () => setSlide(activeIndex - 1));
  next?.addEventListener("click", () => setSlide(activeIndex + 1));

  dots.forEach((dot) => {
    dot.addEventListener("click", () => setSlide(Number(dot.dataset.index)));
  });

  details?.addEventListener("click", () => {
    openAccordion(services[activeIndex].slug, true);
  });

  slider.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") setSlide(activeIndex - 1);
    if (event.key === "ArrowRight") setSlide(activeIndex + 1);
  });

  slider.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0]?.clientX || 0;
    },
    { passive: true },
  );

  slider.addEventListener(
    "touchend",
    (event) => {
      const touchEndX = event.changedTouches[0]?.clientX || 0;
      const delta = touchEndX - touchStartX;
      if (Math.abs(delta) < 48) return;
      setSlide(delta > 0 ? activeIndex - 1 : activeIndex + 1);
    },
    { passive: true },
  );

  setSlide(0);
}
