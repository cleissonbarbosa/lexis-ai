/**
 * Mobile gesture support for swipe interactions
 */

export function createGestureController(ui) {
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  const MIN_SWIPE_DISTANCE = 50;
  const MAX_VERTICAL_DEVIATION = 100;

  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }

  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }

  function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = Math.abs(touchEndY - touchStartY);

    // Check if it's a horizontal swipe (not too much vertical movement)
    if (deltaY > MAX_VERTICAL_DEVIATION) {
      return;
    }

    // Swipe right to close modal (only if modal is open)
    if (deltaX > MIN_SWIPE_DISTANCE) {
      const modal = ui.settingsOverlay;
      if (modal && !modal.hidden && modal.classList.contains('show')) {
        ui.btnCloseSettings.click();
      }
    }
  }

  // Add pull-down to close modal
  function handleModalTouchStart(e) {
    if (e.target.classList.contains('modal') || e.target.closest('.modal-header')) {
      touchStartY = e.changedTouches[0].screenY;
    }
  }

  function handleModalTouchEnd(e) {
    if (e.target.classList.contains('modal') || e.target.closest('.modal-header')) {
      touchEndY = e.changedTouches[0].screenY;
      const deltaY = touchEndY - touchStartY;

      // Pull down to close (swipe down on modal)
      if (deltaY > MIN_SWIPE_DISTANCE * 2) {
        ui.btnCloseSettings.click();
      }
    }
  }

  function init() {
    // Add swipe gestures to settings overlay
    if (ui.settingsOverlay) {
      ui.settingsOverlay.addEventListener('touchstart', handleTouchStart, { passive: true });
      ui.settingsOverlay.addEventListener('touchend', handleTouchEnd, { passive: true });

      // Add pull-down gesture for modal
      const modal = ui.settingsOverlay.querySelector('.modal');
      if (modal) {
        modal.addEventListener('touchstart', handleModalTouchStart, { passive: true });
        modal.addEventListener('touchend', handleModalTouchEnd, { passive: true });
      }
    }
  }

  return { init };
}
