export function createFeedbackController(ui) {
  let toastTimer = null;

  function showToast(message) {
    if (!message) {
      return;
    }

    ui.toastMessage.textContent = message;
    ui.toast.hidden = false;
    ui.toast.classList.add("show");

    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    toastTimer = setTimeout(() => {
      ui.toast.classList.remove("show");

      setTimeout(() => {
        ui.toast.hidden = true;
      }, 220);
    }, 1900);
  }

  function spawnConfetti(doc) {
    const container = doc.createElement("div");
    container.className = "confetti-container";
    doc.body.appendChild(container);

    const colors = ["#22d3ee", "#f97316", "#4ade80", "#f472b6", "#a78bfa", "#fbbf24"];

    for (let i = 0; i < 40; i++) {
      const piece = doc.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = `${Math.random() * 0.8}s`;
      piece.style.animationDuration = `${1.5 + Math.random() * 1.5}s`;
      piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      piece.style.width = `${6 + Math.random() * 6}px`;
      piece.style.height = `${8 + Math.random() * 8}px`;
      container.appendChild(piece);
    }

    setTimeout(() => container.remove(), 3500);
  }

  return {
    showToast,
    spawnConfetti
  };
}
