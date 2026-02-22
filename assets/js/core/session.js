export function createSessionController(state, ui) {
  function startSessionTimer() {
    state.sessionStartTime = Date.now();
    ui.sessionTimerRow.hidden = false;
    updateSessionTimer();
    state.sessionTimerInterval = setInterval(updateSessionTimer, 1000);
  }

  function stopSessionTimer() {
    if (state.sessionTimerInterval) {
      clearInterval(state.sessionTimerInterval);
      state.sessionTimerInterval = null;
    }
  }

  function updateSessionTimer() {
    if (!state.sessionStartTime) {
      return;
    }

    const elapsed = Math.floor((Date.now() - state.sessionStartTime) / 1000);
    const mins = Math.floor(elapsed / 60).toString().padStart(2, "0");
    const secs = (elapsed % 60).toString().padStart(2, "0");
    ui.sessionTimerValue.textContent = `${mins}:${secs}`;
  }

  return {
    startSessionTimer,
    stopSessionTimer,
    updateSessionTimer
  };
}
