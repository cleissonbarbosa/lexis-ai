export function createSettingsController({
  state,
  ui,
  defaultSettings,
  settingsStorageKey,
  t,
  showToastKey,
  applyTheme,
  saveSettings,
  playDetectionSound
}) {
  function readStoredSettings() {
    try {
      const raw = localStorage.getItem(settingsStorageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        return { ...defaultSettings, ...parsed };
      }
    } catch {
      // Ignore.
    }

    return { ...defaultSettings };
  }

  function persistSettings() {
    saveSettings({
      holdDurationMs: state.holdDurationMs,
      minConfidence: state.minConfidence,
      autoAddConfidence: state.autoAddConfidence,
      cooldownMs: state.cooldownMs,
      detectionSmoothing: state.detectionSmoothing,
      darkMode: state.darkMode,
      soundFeedback: state.soundFeedback
    });
  }

  function applySettings(settings) {
    state.holdDurationMs = settings.holdDurationMs;
    state.minConfidence = settings.minConfidence;
    state.autoAddConfidence = settings.autoAddConfidence;
    state.cooldownMs = settings.cooldownMs;
    state.detectionSmoothing = settings.detectionSmoothing;
    state.darkMode = settings.darkMode ?? defaultSettings.darkMode;
    state.soundFeedback = settings.soundFeedback ?? defaultSettings.soundFeedback;

    ui.settingHoldDuration.value = settings.holdDurationMs;
    ui.settingMinConfidence.value = Math.round(settings.minConfidence * 100);
    ui.settingAutoAddConfidence.value = Math.round(settings.autoAddConfidence * 100);
    ui.settingCooldown.value = settings.cooldownMs;
    ui.settingDetectionSmoothing.value = settings.detectionSmoothing;
    ui.settingDarkMode.checked = state.darkMode;
    ui.settingSoundFeedback.checked = state.soundFeedback;

    applyTheme(state.darkMode);
    renderSettingsValues();
    updateAllRangeFills();
  }

  function renderSettingsValues() {
    ui.settingHoldDurationValue.textContent = `${(state.holdDurationMs / 1000).toFixed(1)}s`;
    ui.settingMinConfidenceValue.textContent = `${Math.round(state.minConfidence * 100)}%`;
    ui.settingAutoAddConfidenceValue.textContent = `${Math.round(state.autoAddConfidence * 100)}%`;
    ui.settingCooldownValue.textContent = `${(state.cooldownMs / 1000).toFixed(1)}s`;
    ui.settingDetectionSmoothingValue.textContent = `${state.detectionSmoothing} ${t("framesUnit")}`;
  }

  /** Updates the CSS --range-fill custom property on a range input so the
   *  gradient track visually reflects the current value. */
  function updateRangeFill(input) {
    const min = parseFloat(input.min) || 0;
    const max = parseFloat(input.max) || 100;
    const val = parseFloat(input.value) || 0;
    const pct = ((val - min) / (max - min)) * 100;
    input.style.setProperty("--range-fill", `${pct.toFixed(1)}%`);
  }

  function updateAllRangeFills() {
    updateRangeFill(ui.settingHoldDuration);
    updateRangeFill(ui.settingMinConfidence);
    updateRangeFill(ui.settingAutoAddConfidence);
    updateRangeFill(ui.settingCooldown);
    updateRangeFill(ui.settingDetectionSmoothing);
  }

  function resetSettings() {
    applySettings(defaultSettings);
    persistSettings();
    showToastKey("settingsReset");
  }

  function openSettings() {
    state.settingsOpen = true;
    ui.settingsOverlay.hidden = false;
    requestAnimationFrame(() => {
      ui.settingsOverlay.classList.add("show");
    });
  }

  function closeSettings() {
    state.settingsOpen = false;
    ui.settingsOverlay.classList.remove("show");
    setTimeout(() => {
      ui.settingsOverlay.hidden = true;
    }, 250);
  }

  function bindSettingsEvents() {
    ui.btnSettings.addEventListener("click", openSettings);
    ui.btnCloseSettings.addEventListener("click", closeSettings);
    ui.settingsOverlay.addEventListener("click", (e) => {
      if (e.target === ui.settingsOverlay) {
        closeSettings();
      }
    });

    ui.settingHoldDuration.addEventListener("input", (e) => {
      state.holdDurationMs = parseInt(e.target.value, 10);
      updateRangeFill(e.target);
      renderSettingsValues();
      persistSettings();
    });

    ui.settingMinConfidence.addEventListener("input", (e) => {
      state.minConfidence = parseInt(e.target.value, 10) / 100;
      updateRangeFill(e.target);
      renderSettingsValues();
      persistSettings();
    });

    ui.settingAutoAddConfidence.addEventListener("input", (e) => {
      state.autoAddConfidence = parseInt(e.target.value, 10) / 100;
      updateRangeFill(e.target);
      renderSettingsValues();
      persistSettings();
    });

    ui.settingCooldown.addEventListener("input", (e) => {
      state.cooldownMs = parseInt(e.target.value, 10);
      updateRangeFill(e.target);
      renderSettingsValues();
      persistSettings();
    });

    ui.settingDetectionSmoothing.addEventListener("input", (e) => {
      state.detectionSmoothing = parseInt(e.target.value, 10);
      updateRangeFill(e.target);
      state.smoothingBuffer = [];
      renderSettingsValues();
      persistSettings();
    });

    ui.btnResetSettings.addEventListener("click", resetSettings);

    ui.settingDarkMode.addEventListener("change", (e) => {
      applyTheme(e.target.checked);
      persistSettings();
    });

    ui.settingSoundFeedback.addEventListener("change", (e) => {
      state.soundFeedback = e.target.checked;
      persistSettings();
      if (e.target.checked) {
        playDetectionSound();
      }
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && state.settingsOpen) {
        closeSettings();
      }
    });
  }

  return {
    readStoredSettings,
    persistSettings,
    applySettings,
    renderSettingsValues,
    resetSettings,
    openSettings,
    closeSettings,
    bindSettingsEvents
  };
}
