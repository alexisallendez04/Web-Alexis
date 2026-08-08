const setPanelState = (item, isOpen) => {
  const button = item.querySelector(".faq-question");
  const panel = item.querySelector(".faq-answer");

  item.classList.toggle("is-open", isOpen);
  button?.setAttribute("aria-expanded", isOpen ? "true" : "false");
  panel?.setAttribute("aria-hidden", isOpen ? "false" : "true");
};

export function initFaq() {
  const items = document.querySelectorAll(".faq-item");

  items.forEach((item, index) => {
    const button = item.querySelector(".faq-question");
    const panel = item.querySelector(".faq-answer");

    if (!button || !panel) return;

    const panelId = panel.id || `faq-panel-${index + 1}`;
    panel.id = panelId;
    button.setAttribute("aria-controls", panelId);
    setPanelState(item, false);

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      items.forEach((other) => setPanelState(other, false));

      if (!isOpen) {
        setPanelState(item, true);
      }
    });
  });
}
