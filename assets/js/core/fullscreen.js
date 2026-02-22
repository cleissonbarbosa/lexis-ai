export function createFullscreenController(state, doc) {
  function getCard() {
    return doc.querySelector(".camera-card");
  }

  function getFullscreenElement() {
    return doc.fullscreenElement || doc.webkitFullscreenElement || null;
  }

  function applyFullscreenUi(card) {
    card.classList.add("fullscreen-mode");
    state.isFullscreen = true;
    doc.body.style.overflow = "hidden";
  }

  function clearFullscreenUi(card) {
    card.classList.remove("fullscreen-mode");
    state.isFullscreen = false;
    doc.body.style.overflow = "";
  }

  function enterFullscreen() {
    const card = getCard();
    if (!card) {
      return;
    }

    const requestFullscreen = card.requestFullscreen || card.webkitRequestFullscreen;

    if (requestFullscreen) {
      const result = requestFullscreen.call(card);
      if (result && typeof result.catch === "function") {
        result.catch(() => {});
      }
    }

    applyFullscreenUi(card);
  }

  function exitFullscreen() {
    const card = getCard();
    if (!card) {
      return;
    }

    const exitNativeFullscreen = doc.exitFullscreen || doc.webkitExitFullscreen;
    if (getFullscreenElement() && exitNativeFullscreen) {
      const result = exitNativeFullscreen.call(doc);
      if (result && typeof result.catch === "function") {
        result.catch(() => {});
      }
    }

    clearFullscreenUi(card);
  }

  function toggleFullscreen() {
    if (state.isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  }

  function handleFullscreenChange() {
    const card = getCard();
    if (!card) {
      return;
    }

    if (!getFullscreenElement() && state.isFullscreen) {
      clearFullscreenUi(card);
    }
  }

  doc.addEventListener("fullscreenchange", handleFullscreenChange);
  doc.addEventListener("webkitfullscreenchange", handleFullscreenChange);

  return {
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen
  };
}
