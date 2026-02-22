import {
  LETTERS,
  STORAGE_KEY,
  SETTINGS_STORAGE_KEY,
  FALLBACK_LOCALE,
  DEFAULT_SETTINGS,
  SIGN_LANGUAGES
} from "./core/constants.js";
import { createInitialState } from "./core/state.js";
import { getUIRefs } from "./core/ui.js";
import { classifyGesture } from "./core/classifier.js";
import { smoothDetection } from "./core/detection-smoothing.js";
import { createAudioController } from "./core/audio.js";
import { createFeedbackController } from "./core/feedback.js";
import { createSessionController } from "./core/session.js";
import { createFullscreenController } from "./core/fullscreen.js";
import { createTextOutputController } from "./core/text-output.js";
import { createSettingsController } from "./core/settings.js";
import { SIGN_GESTURES } from "./data/sign-gestures.js";
import { I18N } from "./data/i18n.js";

const state = createInitialState(DEFAULT_SETTINGS);

const ui = getUIRefs(document);

const metaDescription = document.querySelector('meta[name="description"]');
const ctx = ui.canvas.getContext("2d");

let hands = null;
let camera = null;
let settingsController = null;

const feedbackController = createFeedbackController(ui);
const { playTone, playAutoAddSound, playDetectionSound } = createAudioController(state);
const { startSessionTimer, stopSessionTimer } = createSessionController(state, ui);
const { enterFullscreen, exitFullscreen, toggleFullscreen } = createFullscreenController(state, document);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function interpolate(template, vars = {}) {
  return String(template).replace(/\{(\w+)\}/g, (fullMatch, key) => {
    return Object.prototype.hasOwnProperty.call(vars, key) ? vars[key] : fullMatch;
  });
}

function dictionary(locale) {
  return I18N[locale] || I18N[FALLBACK_LOCALE];
}

function t(key, vars = {}) {
  const scoped = dictionary(state.locale);
  const fallback = dictionary(FALLBACK_LOCALE);
  const text = scoped[key] ?? fallback[key] ?? key;
  return interpolate(text, vars);
}

function getSignLanguageById(id) {
  return SIGN_LANGUAGES.find((item) => item.id === id) || SIGN_LANGUAGES[0];
}

function getActiveSignLanguage() {
  return getSignLanguageById(state.signLanguageId);
}

function readStoredSignLanguage() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value && SIGN_LANGUAGES.some((item) => item.id === value && item.available !== false)) {
      return value;
    }
  } catch {
    // Ignore storage access errors.
  }

  return SIGN_LANGUAGES[0].id;
}

function saveSignLanguage(id) {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // Ignore storage access errors.
  }
}

function formatCharacterCount(count) {
  const unit = count === 1 ? t("characterSingular") : t("characterPlural");
  return `${count} ${unit}`;
}

function renderLoadStatus() {
  ui.loadStatus.textContent = t(state.loadStatusKey, state.loadStatusVars);
}

function setLoad(progress, key, vars = {}) {
  state.loadingProgress = progress;
  state.loadStatusKey = key;
  state.loadStatusVars = vars;

  ui.loadFill.style.width = `${progress}%`;
  ui.loadingOverlay.querySelector(".loading-bar")?.setAttribute("aria-valuenow", String(progress));
  renderLoadStatus();
}

function hideLoading() {
  state.loadingVisible = false;
  ui.loadingOverlay.classList.add("hidden");

  setTimeout(() => {
    ui.loadingOverlay.remove();
  }, 380);
}

function renderStatus() {
  const text = t(state.statusKey, state.statusVars);

  ui.statusText.textContent = text;
  if (ui.appStatus) {
    ui.appStatus.textContent = text;
  }
  ui.statusDot.className = "dot";

  if (state.statusMode === "live") {
    ui.statusDot.classList.add("live");
  }

  if (state.statusMode === "loading") {
    ui.statusDot.classList.add("loading");
  }

  if (ui.appStatus) {
    ui.appStatus.classList.remove("badge-live", "badge-warn", "badge-off");

    if (state.statusMode === "live") {
      ui.appStatus.classList.add("badge-live");
    } else if (state.statusMode === "loading") {
      ui.appStatus.classList.add("badge-warn");
    } else {
      ui.appStatus.classList.add("badge-off");
    }
  }
}

function setStatus(mode, key, vars = {}) {
  state.statusMode = mode;
  state.statusKey = key;
  state.statusVars = vars;
  renderStatus();
}

function updateStartButtonLabel() {
  if (state.isStartingCamera) {
    ui.btnStart.innerHTML = `<span class="btn-icon">⏳</span> ${t("btnStarting")}`;
    return;
  }

  if (state.isRunning) {
    ui.btnStart.innerHTML = `<span class="btn-icon">⏹</span> ${t("btnStop")}`;
  } else {
    ui.btnStart.innerHTML = `<span class="btn-icon">▶</span> ${t("btnStart")}`;
  }
}

function showToast(message) {
  feedbackController.showToast(message);
}

function showToastKey(key, vars = {}) {
  showToast(t(key, vars));
}

const { copySentence, speakText, exportAsImage } = createTextOutputController({
  state,
  getActiveSignLanguage,
  showToastKey
});

function writeSettingsStorage(settings) {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Ignore storage access errors.
  }
}

function spawnConfetti() {
  feedbackController.spawnConfetti(document);
}

function updateModeNote() {
  const signLanguage = getActiveSignLanguage();
  const langData = SIGN_GESTURES[signLanguage.id];
  let key = signLanguage.support === "core" ? "modeNoteCore" : "modeNoteExperimental";
  let noteText = t(key, { language: signLanguage.label });

  // Add two-hand system note
  if (langData && langData.system === "two-hand") {
    noteText += " " + t("twoHandNote", { language: signLanguage.label });
  }

  ui.modeNote.textContent = noteText;
}

function updateHistoryDisplay() {
  if (state.detectionHistory.length === 0) {
    ui.historyRow.innerHTML = `<span class="muted">${t("historyEmpty")}</span>`;
    return;
  }

  ui.historyRow.innerHTML = state.detectionHistory
    .map((value, index) => `<span class="history-chip ${index === 0 ? "recent" : ""}">${value}</span>`)
    .join("");
}

function updateSentenceDisplay() {
  const safeText = state.sentence || "";
  ui.sentenceText.innerHTML = `${safeText}<span class="cursor"></span>`;
  ui.sentenceCount.textContent = formatCharacterCount(safeText.length);
  syncActionButtons();
}

function updateStats() {
  ui.statLetters.textContent = String(state.totalDetections);

  const avg = state.totalDetections > 0
    ? Math.round((state.totalConfidence / state.totalDetections) * 100)
    : 0;

  ui.statConf.textContent = `${avg}%`;
}

function addToHistory(letter) {
  state.detectionHistory.unshift(letter);

  if (state.detectionHistory.length > 14) {
    state.detectionHistory.pop();
  }

  updateHistoryDisplay();
}

function addLetterToSentence(letter, confidence = state.confidence, source = "manual") {
  if (!letter) {
    return;
  }

  state.sentence += letter;
  state.totalDetections += 1;
  state.totalConfidence += confidence;

  updateSentenceDisplay();
  updateStats();
  addToHistory(letter);

  if (source === "auto") {
    playAutoAddSound();
    showToastKey("toastAutoAdded", { letter });
  } else {
    playDetectionSound();
  }

  // Confetti on every 10th letter or on first space (word completed)
  if (state.totalDetections > 0 && state.totalDetections % 10 === 0) {
    spawnConfetti();
  }
}

function addSpaceToSentence() {
  // Check if a word was just completed (non-empty text before adding space)
  const trimmed = state.sentence.trim();
  const hasWord = trimmed.length > 0 && !trimmed.endsWith(" ");
  
  state.sentence += " ";
  updateSentenceDisplay();
  
  if (hasWord && trimmed.split(/\s+/).length >= 1) {
    playTone(523, 100, "sine");
  }
}

function removeLastChar() {
  if (!state.sentence.length) {
    return;
  }

  state.sentence = state.sentence.slice(0, -1);
  updateSentenceDisplay();
}

function clearSentence() {
  if (!state.sentence.length) {
    return;
  }

  state.sentence = "";
  updateSentenceDisplay();
  showToastKey("toastTextCleared");
}

function syncActionButtons() {
  const hasText = state.sentence.length > 0;

  ui.btnAdd.disabled = !state.isRunning || !state.currentLetter;
  ui.btnSpace.disabled = !state.isRunning;
  ui.btnBackspace.disabled = !hasText;
  ui.btnClear.disabled = !hasText;
  ui.btnCopy.disabled = !hasText;
  ui.btnSpeak.disabled = !hasText;
  ui.btnExportImg.disabled = !hasText;
}

function getReferenceDescription(letter) {
  const langData = SIGN_GESTURES[state.signLanguageId] || SIGN_GESTURES.libras;
  const gestureInfo = langData.alphabet[letter];
  if (gestureInfo && gestureInfo.desc) {
    return gestureInfo.desc;
  }
  return t("referenceDescription", {
    letter,
    language: getActiveSignLanguage().label
  });
}

function buildAlphabetGrid() {
  const activeLetter = ui.refLetter.textContent || "A";
  ui.alphabetGrid.innerHTML = "";
  const langData = SIGN_GESTURES[state.signLanguageId] || SIGN_GESTURES.libras;
  const letters = Object.keys(langData.alphabet);

  for (const letter of letters) {
    const gestureInfo = langData.alphabet[letter];
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "letter-chip";
    chip.dataset.letter = letter;
    chip.title = getReferenceDescription(letter);
    if (gestureInfo?.icon) {
      chip.innerHTML = `<span class="chip-letter">${letter}</span><img class="chip-icon hand-icon" src="${gestureInfo.icon}" alt="${letter}" aria-hidden="true">`;
    } else {
      chip.textContent = letter;
    }
    chip.addEventListener("click", () => showReference(letter));
    ui.alphabetGrid.appendChild(chip);
  }

  document.querySelectorAll(".letter-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.letter === activeLetter);
  });
}

function showReference(letter) {
  const langData = SIGN_GESTURES[state.signLanguageId] || SIGN_GESTURES.libras;
  const gestureInfo = langData.alphabet[letter];
  if (!letter || !gestureInfo) {
    return;
  }

  ui.referenceCard.hidden = false;
  ui.refLetter.textContent = letter;

  if (gestureInfo.icon) {
    ui.refEmoji.innerHTML = `<img class="ref-svg-img hand-icon" src="${gestureInfo.icon}" alt="Sinal de ${letter}">`;
  } else {
    ui.refEmoji.textContent = gestureInfo.emoji;
  }

  ui.refDesc.textContent = gestureInfo.desc;

  document.querySelectorAll(".letter-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.letter === letter);
  });
}

function updateDetectedDisplay(letter, confidence, holdProgress = 0, holdMessage = t("holdToAutoAdd")) {
  ui.detectedDisplay.hidden = false;

  if (ui.detectedLetter.textContent !== letter) {
    ui.detectedLetter.style.transform = "scale(1.16)";

    setTimeout(() => {
      ui.detectedLetter.style.transform = "scale(1)";
    }, 150);
  }

  ui.detectedLetter.textContent = letter || "?";
  ui.detectedWord.textContent = letter
    ? t("confidencePattern", { value: Math.round(confidence * 100) })
    : t("detectedNoDetection");

  ui.confFill.style.width = `${Math.round(confidence * 100)}%`;
  ui.holdFill.style.width = `${Math.round(holdProgress * 100)}%`;
  ui.holdLabel.textContent = holdMessage;

  if (letter) {
    showReference(letter);
  }
}

function clearDetectedDisplay() {
  ui.detectedLetter.textContent = "?";
  ui.detectedWord.textContent = t("detectedNoHand");
  ui.confFill.style.width = "0%";
  ui.holdFill.style.width = "0%";
  ui.holdLabel.textContent = t("holdToAutoAdd");
}

function drawHandSkeleton(lms, width, height) {
  const toCanvas = (landmark) => ({ x: landmark.x * width, y: landmark.y * height });

  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [5, 6], [6, 7], [7, 8],
    [0, 9], [9, 10], [10, 11], [11, 12],
    [0, 13], [13, 14], [14, 15], [15, 16],
    [0, 17], [17, 18], [18, 19], [19, 20],
    [5, 9], [9, 13], [13, 17]
  ];

  const getColor = (a, b) => {
    if (a <= 4 && b <= 4) return "rgba(226, 232, 240, 0.45)";
    if ((a >= 5 && a <= 8) || (b >= 5 && b <= 8)) return "rgba(45, 212, 191, 0.78)";
    if ((a >= 9 && a <= 12) || (b >= 9 && b <= 12)) return "rgba(14, 165, 233, 0.7)";
    if ((a >= 13 && a <= 16) || (b >= 13 && b <= 16)) return "rgba(249, 115, 22, 0.76)";
    return "rgba(244, 114, 182, 0.68)";
  };

  for (const [a, b] of connections) {
    const pa = toCanvas(lms[a]);
    const pb = toCanvas(lms[b]);

    ctx.beginPath();
    ctx.moveTo(pa.x, pa.y);
    ctx.lineTo(pb.x, pb.y);
    ctx.strokeStyle = getColor(a, b);
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.stroke();
  }

  lms.forEach((landmark, index) => {
    const point = toCanvas(landmark);
    const isTip = [4, 8, 12, 16, 20].includes(index);

    ctx.beginPath();
    ctx.arc(point.x, point.y, isTip ? 6 : 4, 0, Math.PI * 2);

    if (isTip) {
      ctx.fillStyle = "#2dd4bf";
      ctx.shadowColor = "#2dd4bf";
      ctx.shadowBlur = 10;
    } else {
      ctx.fillStyle = "rgba(241, 245, 249, 0.75)";
      ctx.shadowBlur = 0;
    }

    ctx.fill();
    ctx.shadowBlur = 0;
  });
}

function resetAutoAdd() {
  state.holdStart = null;
  state.holdLetter = null;
  ui.holdFill.style.width = "0%";
  ui.holdLabel.textContent = t("holdToAutoAdd");
}

function handleAutoAdd(letter, confidence) {
  const now = Date.now();

  if (!letter || confidence < state.minConfidence || now < state.holdCooldownUntil) {
    resetAutoAdd();
    return;
  }

  if (state.holdLetter !== letter) {
    state.holdLetter = letter;
    state.holdStart = now;
    updateDetectedDisplay(letter, confidence, 0, t("holdSignalDetected"));
    return;
  }

  const elapsed = now - state.holdStart;
  const progress = Math.min(elapsed / state.holdDurationMs, 1);
  const secondsLeft = Math.max((state.holdDurationMs - elapsed) / 1000, 0);

  const holdMessage = progress >= 1
    ? t("holdConfirming")
    : t("holdAutoIn", { seconds: secondsLeft.toFixed(1) });

  updateDetectedDisplay(letter, confidence, progress, holdMessage);

  if (progress >= 1 && confidence >= state.autoAddConfidence) {
    addLetterToSentence(letter, confidence, "auto");
    state.holdCooldownUntil = now + state.cooldownMs;
    resetAutoAdd();
  }
}

function onHandResults(results) {
  state.frameCount += 1;

  const now = Date.now();
  if (now - state.lastFpsTime >= 1000) {
    state.fps = state.frameCount;
    state.frameCount = 0;
    state.lastFpsTime = now;
    ui.fpsText.textContent = `${state.fps} ${t("fpsUnit")}`;
  }

  ui.canvas.width = ui.video.videoWidth || 640;
  ui.canvas.height = ui.video.videoHeight || 480;
  ctx.clearRect(0, 0, ui.canvas.width, ui.canvas.height);

  if (results.multiHandLandmarks?.length) {
    const landmarks = results.multiHandLandmarks[0];
    drawHandSkeleton(landmarks, ui.canvas.width, ui.canvas.height);

    const raw = classifyGesture(landmarks, state.signLanguageId);
    const { letter, confidence } = smoothDetection(state, raw.letter, raw.confidence);
    state.currentLetter = letter;
    state.confidence = confidence;

    updateDetectedDisplay(letter, confidence);
    handleAutoAdd(letter, confidence);
  } else {
    state.currentLetter = null;
    state.confidence = 0;
    smoothDetection(state, null, 0);
    resetAutoAdd();
    clearDetectedDisplay();
  }

  syncActionButtons();
}

async function initMediaPipe() {
  setStatus("loading", "statusLoadingModel");
  setLoad(10, "loadingCheckEnvironment");
  await sleep(130);

  if (!window.Hands || !window.Camera) {
    setLoad(100, "loadingLibFail");
    setStatus("off", "statusLoadFailed");
    showToastKey("toastMediaPipeFailed");
    return;
  }

  setLoad(35, "loadingInitHands");
  await sleep(130);

  hands = new window.Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/${file}`
  });

  hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.5
  });

  hands.onResults(onHandResults);

  setLoad(70, "loadingApplyConfig");
  await sleep(160);
  setLoad(100, "loadingReady");

  setStatus("off", "statusReady");

  setTimeout(() => {
    hideLoading();
  }, 260);
}

async function startCamera() {
  if (!hands) {
    showToastKey("toastModelLoading");
    return;
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    showToastKey("toastCameraUnsupported");
    return;
  }

  state.isStartingCamera = true;
  ui.btnStart.disabled = true;
  updateStartButtonLabel();
  setStatus("loading", "statusStartingCamera");

  let stream = null;

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 960 },
        height: { ideal: 720 },
        facingMode: "user"
      }
    });

    ui.video.srcObject = stream;
    await ui.video.play();

    camera = new window.Camera(ui.video, {
      onFrame: async () => {
        if (!state.isRunning) {
          return;
        }

        await hands.send({ image: ui.video });
      },
      width: 960,
      height: 720
    });

    await camera.start();

    state.isRunning = true;
    state.isStartingCamera = false;

    ui.placeholder.hidden = true;
    ui.cameraWrapper.classList.add("active");
    ui.fpsDisplay.hidden = false;
    ui.detectedDisplay.hidden = false;

    setStatus("live", "statusLive");
    startSessionTimer();

    ui.btnStart.disabled = false;
    updateStartButtonLabel();
    syncActionButtons();
  } catch (error) {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      ui.video.srcObject = null;
    }

    state.isRunning = false;
    state.isStartingCamera = false;

    setStatus("off", "statusWaitingCamera");
    ui.btnStart.disabled = false;
    updateStartButtonLabel();

    showToastKey("toastCameraError", { error: error.message });
  }
}

function stopCamera() {
  state.isRunning = false;
  state.isStartingCamera = false;

  if (camera) {
    camera.stop();
    camera = null;
  }

  if (ui.video.srcObject) {
    ui.video.srcObject.getTracks().forEach((track) => track.stop());
    ui.video.srcObject = null;
  }

  ui.placeholder.hidden = false;
  ui.cameraWrapper.classList.remove("active");
  ui.fpsDisplay.hidden = true;
  ui.fpsText.textContent = `-- ${t("fpsUnit")}`;
  ui.detectedDisplay.hidden = true;

  state.currentLetter = null;
  state.confidence = 0;

  updateStartButtonLabel();
  ui.btnStart.disabled = false;

  resetAutoAdd();
  clearDetectedDisplay();
  setStatus("off", "statusReady");
  syncActionButtons();
  stopSessionTimer();

  if (state.isFullscreen) {
    exitFullscreen();
  }

  ctx.clearRect(0, 0, ui.canvas.width, ui.canvas.height);
}

function toggleCamera() {
  if (state.isRunning) {
    stopCamera();
  } else {
    startCamera();
  }
}

function handleHotkeys(event) {
  const key = event.key;
  const hasModifier = event.metaKey || event.ctrlKey || event.altKey;

  if (hasModifier) {
    return;
  }

  if (key === "Enter") {
    event.preventDefault();
    toggleCamera();
    return;
  }

  if (key === "+" || key === "=") {
    event.preventDefault();
    addLetterToSentence(state.currentLetter, state.confidence);
    return;
  }

  if (key === "Backspace") {
    event.preventDefault();
    removeLastChar();
    return;
  }

  if (key === " ") {
    event.preventDefault();
    if (state.isRunning) {
      addSpaceToSentence();
    }
  }
}

function applyTranslations() {
  document.documentElement.lang = state.locale;
  document.title = t("pageTitle");

  if (metaDescription) {
    metaDescription.setAttribute("content", t("pageDescription"));
  }

  ui.loadingSubtitle.textContent = t("loadingSubtitle");
  renderLoadStatus();

  ui.brandTagline.textContent = t("brandTagline");
  if (ui.badgeBrowserFirst) ui.badgeBrowserFirst.textContent = t("badgeBrowserFirst");
  if (ui.badgePages) ui.badgePages.textContent = t("badgePages");

  ui.cameraCardTitle.textContent = t("cameraCardTitle");
  ui.cameraCardSubtitle.textContent = t("cameraCardSubtitle");

  ui.signLanguageLabel.textContent = t("signLanguageLabel");
  ui.signLanguageSelect.setAttribute("aria-label", t("signLanguageAria"));

  ui.cameraPlaceholderText.innerHTML = t("cameraPlaceholderTemplate", {
    action: `<strong>${t("btnStart")}</strong>`
  });

  ui.controlsGroup.setAttribute("aria-label", t("controlsAriaLabel"));

  ui.btnAdd.innerHTML = `<span class="btn-icon">➕</span> ${t("btnAdd")}`;
  ui.btnBackspace.innerHTML = `<span class="btn-icon">⌫</span> ${t("btnBackspace")}`;
  ui.btnSpace.innerHTML = `<span class="btn-icon">⎵</span> ${t("btnSpace")}`;
  ui.btnClear.innerHTML = `<span class="btn-icon">🗑️</span> ${t("btnClear")}`;
  ui.btnCopyText.textContent = t("btnCopy");
  ui.btnSpeakText.textContent = t("btnSpeak");
  ui.btnExportImgText.textContent = t("btnExportImg");
  ui.btnFullscreen.innerHTML = `<span class="btn-icon">⛶</span> ${t("btnFullscreen")}`;
  ui.btnExitFullscreen.innerHTML = `<span class="btn-icon">✕</span> ${t("btnExitFullscreen")}`;
  updateStartButtonLabel();

  ui.sentenceTitle.textContent = t("sentenceTitle");
  ui.shortcutHint.innerHTML = t("shortcutHint");

  ui.panelStatsTitle.textContent = t("panelStatsTitle");
  ui.statLettersLabel.textContent = t("statLettersLabel");
  ui.statConfLabel.textContent = t("statConfLabel");

  ui.panelHistoryTitle.textContent = t("panelHistoryTitle");
  ui.panelReferenceTitle.textContent = t("panelReferenceTitle");
  ui.panelHowToTitle.textContent = t("panelHowToTitle");

  ui.inst1.textContent = t("inst1");
  ui.inst2.textContent = t("inst2");
  ui.inst3.textContent = t("inst3");
  ui.inst4.textContent = t("inst4");

  ui.footerText.textContent = t("footerText");

  ui.fpsText.textContent = state.fps > 0 ? `${state.fps} ${t("fpsUnit")}` : `-- ${t("fpsUnit")}`;

  // Settings translations
  ui.settingsModalTitle.textContent = t("settingsTitle");
  ui.btnCloseSettings.setAttribute("aria-label", t("settingsClose"));
  ui.settingHoldDurationLabel.textContent = t("settingHoldDuration");
  ui.settingHoldDurationHint.textContent = t("settingHoldDurationHint");
  ui.settingMinConfidenceLabel.textContent = t("settingMinConfidence");
  ui.settingMinConfidenceHint.textContent = t("settingMinConfidenceHint");
  ui.settingAutoAddConfidenceLabel.textContent = t("settingAutoAddConfidence");
  ui.settingAutoAddConfidenceHint.textContent = t("settingAutoAddConfidenceHint");
  ui.settingCooldownLabel.textContent = t("settingCooldown");
  ui.settingCooldownHint.textContent = t("settingCooldownHint");
  ui.settingDetectionSmoothingLabel.textContent = t("settingSmoothing");
  ui.settingDetectionSmoothingHint.textContent = t("settingSmoothingHint");
  ui.btnResetSettings.textContent = t("settingReset");
  ui.btnSettings.setAttribute("title", t("settingsTitle"));
  ui.btnSettings.setAttribute("aria-label", t("settingsTitle"));
  ui.btnThemeToggle.setAttribute("title", t("themeToggle"));
  ui.btnThemeToggle.setAttribute("aria-label", t("themeToggle"));
  if (ui.settingDarkModeLabel) ui.settingDarkModeLabel.textContent = t("settingDarkMode");
  if (ui.settingSoundFeedbackLabel) ui.settingSoundFeedbackLabel.textContent = t("settingSoundFeedback");
  if (ui.settingSoundFeedbackHint) ui.settingSoundFeedbackHint.textContent = t("settingSoundFeedbackHint");
  if (ui.sessionTimerLabel) ui.sessionTimerLabel.textContent = t("sessionLabel");

  updateModeNote();
  updateSentenceDisplay();
  updateStats();
  updateHistoryDisplay();
  buildAlphabetGrid();

  if (!ui.referenceCard.hidden) {
    showReference(ui.refLetter.textContent || "A");
  } else {
    ui.refDesc.textContent = getReferenceDescription(ui.refLetter.textContent || "A");
  }

  if (state.currentLetter) {
    updateDetectedDisplay(state.currentLetter, state.confidence);
  } else {
    clearDetectedDisplay();
  }

  renderStatus();
  renderSettingsValues();
}

function applySignLanguage(signLanguageId, options = {}) {
  const { persist = true, notify = true } = options;
  let selected = getSignLanguageById(signLanguageId);

  // Fallback to first available language if the selected one is disabled
  if (selected.available === false) {
    selected = SIGN_LANGUAGES.find((item) => item.available !== false) || SIGN_LANGUAGES[0];
  }

  state.signLanguageId = selected.id;
  state.locale = selected.locale;

  ui.signLanguageSelect.value = selected.id;

  if (persist) {
    saveSignLanguage(selected.id);
  }

  applyTranslations();

  if (notify) {
    showToastKey("toastLanguageChanged", { language: selected.label });
  }
}

function populateSignLanguageSelect() {
  ui.signLanguageSelect.innerHTML = "";

  for (const signLanguage of SIGN_LANGUAGES) {
    const option = document.createElement("option");
    option.value = signLanguage.id;
    if (signLanguage.available === false) {
      option.textContent = `${signLanguage.label} (${t("comingSoon")})`;
      option.disabled = true;
    } else {
      option.textContent = signLanguage.label;
    }
    ui.signLanguageSelect.appendChild(option);
  }
}

// ─── Settings Management ────────────────────────────────────

function createSettingsService() {
  settingsController = createSettingsController({
    state,
    ui,
    defaultSettings: DEFAULT_SETTINGS,
    settingsStorageKey: SETTINGS_STORAGE_KEY,
    t,
    showToastKey,
    applyTheme,
    saveSettings: writeSettingsStorage,
    playDetectionSound
  });
}

function readStoredSettings() {
  return settingsController.readStoredSettings();
}

function saveSettings() {
  settingsController.persistSettings();
}

function applySettings(settings) {
  settingsController.applySettings(settings);
}

function renderSettingsValues() {
  settingsController?.renderSettingsValues();
}

function bindSettingsEvents() {
  settingsController.bindSettingsEvents();
}

// ─── Theme Management ────────────────────────────────────────

function applyTheme(isDark) {
  state.darkMode = isDark;
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  ui.btnThemeToggle.textContent = isDark ? "☀️" : "🌙";
  ui.settingDarkMode.checked = isDark;
}

function toggleTheme() {
  const newDark = !state.darkMode;
  applyTheme(newDark);
  saveSettings();
}

function bindEvents() {
  ui.btnStart.addEventListener("click", toggleCamera);

  ui.btnAdd.addEventListener("click", () => {
    addLetterToSentence(state.currentLetter, state.confidence);
  });

  ui.btnBackspace.addEventListener("click", removeLastChar);
  ui.btnSpace.addEventListener("click", addSpaceToSentence);
  ui.btnClear.addEventListener("click", clearSentence);
  ui.btnCopy.addEventListener("click", copySentence);
  ui.btnSpeak.addEventListener("click", speakText);
  ui.btnExportImg.addEventListener("click", exportAsImage);
  ui.btnFullscreen.addEventListener("click", toggleFullscreen);
  ui.btnExitFullscreen.addEventListener("click", exitFullscreen);
  ui.btnThemeToggle.addEventListener("click", toggleTheme);

  ui.signLanguageSelect.addEventListener("change", (event) => {
    applySignLanguage(event.target.value);
  });

  window.addEventListener("keydown", handleHotkeys);

  // Also close fullscreen on Escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && state.isFullscreen) exitFullscreen();
  });
}

function init() {
  populateSignLanguageSelect();
  createSettingsService();

  const storedSignLanguage = readStoredSignLanguage();
  applySignLanguage(storedSignLanguage, { persist: false, notify: false });

  // Load saved settings
  const storedSettings = readStoredSettings();
  
  // Auto-detect system dark mode preference on first run
  if (!localStorage.getItem(SETTINGS_STORAGE_KEY)) {
    storedSettings.darkMode = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  }
  
  applySettings(storedSettings);

  bindEvents();
  bindSettingsEvents();
  initMediaPipe();
}

init();
