const ALPHABET_DATA = {
  A: { emoji: "✊", desc: "Punho fechado com polegar ao lado." },
  B: { emoji: "🖐️", desc: "Mão aberta, dedos juntos e polegar dobrado." },
  C: { emoji: "🤌", desc: "Mão em formato de C." },
  D: { emoji: "☝️", desc: "Indicador para cima e demais dedos recolhidos." },
  E: { emoji: "🤙", desc: "Dedos curvados para dentro." },
  F: { emoji: "👌", desc: "Polegar e indicador em círculo." },
  G: { emoji: "👉", desc: "Indicador e polegar apontados." },
  H: { emoji: "✌️", desc: "Indicador e médio estendidos lado a lado." },
  I: { emoji: "🤙", desc: "Apenas o dedo mínimo estendido." },
  J: { emoji: "🤙", desc: "Mínimo estendido com movimento em J." },
  K: { emoji: "✌️", desc: "Indicador, médio e polegar estendidos." },
  L: { emoji: "🤟", desc: "Polegar e indicador formam um L." },
  M: { emoji: "✊", desc: "Três dedos sobre o polegar." },
  N: { emoji: "✊", desc: "Dois dedos sobre o polegar." },
  O: { emoji: "👌", desc: "Dedos e polegar fechando um O." },
  P: { emoji: "👇", desc: "Semelhante ao K, apontado para baixo." },
  Q: { emoji: "👇", desc: "Semelhante ao G, apontado para baixo." },
  R: { emoji: "🤞", desc: "Indicador e médio cruzados." },
  S: { emoji: "✊", desc: "Punho fechado com polegar à frente." },
  T: { emoji: "✊", desc: "Polegar entre indicador e médio." },
  U: { emoji: "✌️", desc: "Indicador e médio juntos e estendidos." },
  V: { emoji: "✌️", desc: "Indicador e médio em formato de V." },
  W: { emoji: "🤟", desc: "Três dedos estendidos para W." },
  X: { emoji: "☝️", desc: "Indicador em gancho." },
  Y: { emoji: "🤙", desc: "Polegar e mínimo estendidos." },
  Z: { emoji: "☝️", desc: "Indicador traçando Z." }
};

const LETTERS = Object.keys(ALPHABET_DATA);

const state = {
  isRunning: false,
  currentLetter: null,
  confidence: 0,
  sentence: "",
  detectionHistory: [],
  totalDetections: 0,
  totalConfidence: 0,
  frameCount: 0,
  lastFpsTime: Date.now(),
  fps: 0,
  holdStart: null,
  holdLetter: null,
  holdDurationMs: 1500,
  holdCooldownUntil: 0
};

const ui = {
  loadingOverlay: document.getElementById("loadingOverlay"),
  loadFill: document.getElementById("loadFill"),
  loadStatus: document.getElementById("loadStatus"),
  appStatus: document.getElementById("appStatus"),
  cameraWrapper: document.getElementById("cameraWrapper"),
  placeholder: document.getElementById("placeholder"),
  video: document.getElementById("videoEl"),
  canvas: document.getElementById("canvasEl"),
  statusDot: document.getElementById("statusDot"),
  statusText: document.getElementById("statusText"),
  fpsDisplay: document.getElementById("fpsDisplay"),
  fpsText: document.getElementById("fpsText"),
  detectedDisplay: document.getElementById("detectedDisplay"),
  detectedLetter: document.getElementById("detectedLetter"),
  detectedWord: document.getElementById("detectedWord"),
  confFill: document.getElementById("confFill"),
  holdFill: document.getElementById("holdFill"),
  holdLabel: document.getElementById("holdLabel"),
  btnStart: document.getElementById("btnStart"),
  btnAdd: document.getElementById("btnAdd"),
  btnBackspace: document.getElementById("btnBackspace"),
  btnSpace: document.getElementById("btnSpace"),
  btnClear: document.getElementById("btnClear"),
  btnCopy: document.getElementById("btnCopy"),
  sentenceText: document.getElementById("sentenceText"),
  sentenceCount: document.getElementById("sentenceCount"),
  statLetters: document.getElementById("statLetters"),
  statConf: document.getElementById("statConf"),
  historyRow: document.getElementById("historyRow"),
  alphabetGrid: document.getElementById("alphabetGrid"),
  referenceCard: document.getElementById("referenceCard"),
  refLetter: document.getElementById("refLetter"),
  refEmoji: document.getElementById("refEmoji"),
  refDesc: document.getElementById("refDesc"),
  toast: document.getElementById("toast"),
  toastMessage: document.getElementById("toastMessage")
};

const ctx = ui.canvas.getContext("2d");
let hands = null;
let camera = null;
let toastTimer = null;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setLoad(progress, message) {
  ui.loadFill.style.width = `${progress}%`;
  ui.loadingOverlay.querySelector(".loading-bar")?.setAttribute("aria-valuenow", String(progress));
  ui.loadStatus.textContent = message;
}

function hideLoading() {
  ui.loadingOverlay.classList.add("hidden");
  setTimeout(() => ui.loadingOverlay.remove(), 380);
}

function setStatus(mode, text) {
  ui.statusText.textContent = text;
  ui.statusDot.className = "dot";

  if (mode === "live") {
    ui.statusDot.classList.add("live");
  }

  if (mode === "loading") {
    ui.statusDot.classList.add("loading");
  }

  ui.appStatus.textContent = text;
  ui.appStatus.classList.remove("badge-live", "badge-warn", "badge-off");

  if (mode === "live") {
    ui.appStatus.classList.add("badge-live");
  } else if (mode === "loading") {
    ui.appStatus.classList.add("badge-warn");
  } else {
    ui.appStatus.classList.add("badge-off");
  }
}

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
  }, 1800);
}

function updateSentenceDisplay() {
  const safeText = state.sentence || "";
  ui.sentenceText.innerHTML = `${safeText}<span class="cursor"></span>`;
  ui.sentenceCount.textContent = `${safeText.length} caractere${safeText.length === 1 ? "" : "s"}`;
  syncActionButtons();
}

function updateStats() {
  ui.statLetters.textContent = String(state.totalDetections);
  const averageConfidence = state.totalDetections > 0
    ? Math.round((state.totalConfidence / state.totalDetections) * 100)
    : 0;
  ui.statConf.textContent = `${averageConfidence}%`;
}

function addToHistory(letter) {
  state.detectionHistory.unshift(letter);
  if (state.detectionHistory.length > 14) {
    state.detectionHistory.pop();
  }

  ui.historyRow.innerHTML = state.detectionHistory
    .map((value, index) => `<span class="history-chip ${index === 0 ? "recent" : ""}">${value}</span>`)
    .join("");
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
    showToast(`"${letter}" adicionada automaticamente`);
  }
}

function addSpaceToSentence() {
  state.sentence += " ";
  updateSentenceDisplay();
}

function removeLastChar() {
  if (state.sentence.length === 0) {
    return;
  }
  state.sentence = state.sentence.slice(0, -1);
  updateSentenceDisplay();
}

function clearSentence() {
  if (state.sentence.length === 0) {
    return;
  }
  state.sentence = "";
  updateSentenceDisplay();
  showToast("Texto limpo");
}

async function copySentence() {
  if (!state.sentence) {
    return;
  }

  try {
    await navigator.clipboard.writeText(state.sentence.trimEnd());
    showToast("Texto copiado");
  } catch (error) {
    const textarea = document.createElement("textarea");
    textarea.value = state.sentence.trimEnd();
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    showToast("Texto copiado");
  }
}

function syncActionButtons() {
  const hasText = state.sentence.length > 0;
  ui.btnAdd.disabled = !state.isRunning || !state.currentLetter;
  ui.btnSpace.disabled = !state.isRunning;
  ui.btnBackspace.disabled = !hasText;
  ui.btnClear.disabled = !hasText;
  ui.btnCopy.disabled = !hasText;
}

function buildAlphabetGrid() {
  ui.alphabetGrid.innerHTML = "";

  for (const letter of LETTERS) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "letter-chip";
    chip.dataset.letter = letter;
    chip.textContent = letter;
    chip.title = ALPHABET_DATA[letter].desc;
    chip.addEventListener("click", () => showReference(letter));
    ui.alphabetGrid.appendChild(chip);
  }
}

function showReference(letter) {
  if (!letter || !ALPHABET_DATA[letter]) {
    return;
  }

  ui.referenceCard.hidden = false;
  ui.refLetter.textContent = letter;
  ui.refEmoji.textContent = ALPHABET_DATA[letter].emoji;
  ui.refDesc.textContent = ALPHABET_DATA[letter].desc;

  document.querySelectorAll(".letter-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.letter === letter);
  });
}

function updateDetectedDisplay(letter, confidence, holdProgress = 0, holdMessage = "Segure para auto-adicionar") {
  ui.detectedDisplay.hidden = false;

  if (ui.detectedLetter.textContent !== letter) {
    ui.detectedLetter.style.transform = "scale(1.16)";
    setTimeout(() => {
      ui.detectedLetter.style.transform = "scale(1)";
    }, 150);
  }

  ui.detectedLetter.textContent = letter || "?";
  ui.detectedWord.textContent = letter
    ? `${Math.round(confidence * 100)}% de confiança`
    : "Sem detecção";
  ui.confFill.style.width = `${Math.round(confidence * 100)}%`;
  ui.holdFill.style.width = `${Math.round(holdProgress * 100)}%`;
  ui.holdLabel.textContent = holdMessage;

  if (letter) {
    showReference(letter);
  }
}

function clearDetectedDisplay() {
  ui.detectedLetter.textContent = "?";
  ui.detectedWord.textContent = "Sem mão detectada";
  ui.confFill.style.width = "0%";
  ui.holdFill.style.width = "0%";
  ui.holdLabel.textContent = "Segure para auto-adicionar";
}

function getLandmarkPos(lms, idx) {
  return { x: lms[idx].x, y: lms[idx].y, z: lms[idx].z };
}

function dist3d(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
}

function classifyLibras(lms) {
  if (!lms || lms.length < 21) {
    return { letter: null, confidence: 0 };
  }

  const thumb = lms[4].x < lms[3].x;
  const index = lms[8].y < lms[6].y;
  const middle = lms[12].y < lms[10].y;
  const ring = lms[16].y < lms[14].y;
  const pinky = lms[20].y < lms[18].y;

  const thumbIndexDist = dist3d(getLandmarkPos(lms, 4), getLandmarkPos(lms, 8));
  const indexMiddleDist = dist3d(getLandmarkPos(lms, 8), getLandmarkPos(lms, 12));

  const ext = [thumb, index, middle, ring, pinky];
  const extCount = ext.filter(Boolean).length;
  const results = [];

  if (!index && !middle && !ring && !pinky) {
    results.push({ letter: "A", conf: thumb ? 0.76 : 0.85 });
  }

  if (index && middle && ring && pinky && !thumb) {
    results.push({ letter: "B", conf: 0.84 });
  }

  if (!index && !middle && !ring && !pinky && !thumb && thumbIndexDist > 0.1) {
    results.push({ letter: "C", conf: 0.7 });
  }

  if (index && !middle && !ring && !pinky) {
    results.push({ letter: "D", conf: thumb ? 0.67 : 0.75 });
  }

  if (!index && !middle && ring && pinky && thumb && thumbIndexDist < 0.08) {
    results.push({ letter: "F", conf: 0.8 });
  }

  if (!index && !middle && !ring && pinky) {
    results.push({ letter: "I", conf: 0.84 });
  }

  if (thumb && index && !middle && !ring && !pinky) {
    results.push({ letter: "L", conf: 0.82 });
  }

  if (!index && !middle && !ring && !pinky && thumbIndexDist < 0.06) {
    results.push({ letter: "O", conf: 0.75 });
  }

  if (index && middle && !ring && !pinky) {
    results.push({ letter: indexMiddleDist < 0.04 ? "U" : "V", conf: 0.78 });
  }

  if (!index && !middle && !ring && !pinky && !thumb) {
    results.push({ letter: "S", conf: 0.7 });
  }

  if (index && middle && ring && !pinky && !thumb) {
    results.push({ letter: "W", conf: 0.8 });
  }

  if (thumb && !index && !middle && !ring && pinky) {
    results.push({ letter: "Y", conf: 0.84 });
  }

  if (!thumb && !middle && !ring && !pinky) {
    const indexHooked = lms[8].y > lms[7].y && lms[8].y < lms[6].y;
    if (indexHooked) {
      results.push({ letter: "X", conf: 0.72 });
    }
  }

  if (index && middle && ring && pinky && thumb) {
    results.push({ letter: "B", conf: 0.6 });
  }

  if (results.length === 0) {
    const fallbackMap = ["S", "A", "E", "M", "N", "T"];
    results.push({ letter: fallbackMap[extCount] || "S", conf: 0.3 });
  }

  results.sort((a, b) => b.conf - a.conf);
  return { letter: results[0].letter, confidence: results[0].conf };
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

  lms.forEach((landmark, i) => {
    const point = toCanvas(landmark);
    const isTip = [4, 8, 12, 16, 20].includes(i);

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
  ui.holdLabel.textContent = "Segure para auto-adicionar";
}

function handleAutoAdd(letter, confidence) {
  const now = Date.now();

  if (!letter || confidence < 0.65 || now < state.holdCooldownUntil) {
    resetAutoAdd();
    return;
  }

  if (state.holdLetter !== letter) {
    state.holdLetter = letter;
    state.holdStart = now;
    updateDetectedDisplay(letter, confidence, 0, "Sinal detectado. Mantenha estável...");
    return;
  }

  const elapsed = now - state.holdStart;
  const progress = Math.min(elapsed / state.holdDurationMs, 1);
  const secondsLeft = Math.max((state.holdDurationMs - elapsed) / 1000, 0);

  updateDetectedDisplay(
    letter,
    confidence,
    progress,
    progress >= 1 ? "Confirmando..." : `Auto-adiciona em ${secondsLeft.toFixed(1)}s`
  );

  if (progress >= 1 && confidence >= 0.7) {
    addLetterToSentence(letter, confidence, "auto");
    state.holdCooldownUntil = now + 900;
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
    ui.fpsText.textContent = `${state.fps} fps`;
  }

  ui.canvas.width = ui.video.videoWidth || 640;
  ui.canvas.height = ui.video.videoHeight || 480;
  ctx.clearRect(0, 0, ui.canvas.width, ui.canvas.height);

  if (results.multiHandLandmarks?.length) {
    const landmarks = results.multiHandLandmarks[0];
    drawHandSkeleton(landmarks, ui.canvas.width, ui.canvas.height);

    const { letter, confidence } = classifyLibras(landmarks);
    state.currentLetter = letter;
    state.confidence = confidence;

    updateDetectedDisplay(letter, confidence);
    handleAutoAdd(letter, confidence);
  } else {
    state.currentLetter = null;
    state.confidence = 0;
    resetAutoAdd();
    clearDetectedDisplay();
  }

  syncActionButtons();
}

async function initMediaPipe() {
  setStatus("loading", "Carregando modelo");
  setLoad(10, "Conferindo ambiente");
  await sleep(120);

  if (!window.Hands || !window.Camera) {
    setLoad(100, "Falha ao carregar bibliotecas");
    setStatus("off", "Falha no carregamento");
    showToast("Não foi possível carregar o MediaPipe. Recarregue a página.");
    return;
  }

  setLoad(35, "Inicializando MediaPipe Hands");
  await sleep(120);

  hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/${file}`
  });

  hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.5
  });

  hands.onResults(onHandResults);

  setLoad(70, "Aplicando configurações");
  await sleep(160);
  setLoad(100, "Pronto para uso");

  setStatus("off", "Pronto para iniciar");

  setTimeout(() => {
    hideLoading();
  }, 260);
}

async function startCamera() {
  if (!hands) {
    showToast("Modelo ainda está carregando.");
    return;
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    showToast("Seu navegador não suporta câmera neste contexto.");
    return;
  }

  setStatus("loading", "Iniciando câmera");
  ui.btnStart.disabled = true;
  ui.btnStart.textContent = "Iniciando...";
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
    ui.placeholder.hidden = true;
    ui.cameraWrapper.classList.add("active");
    ui.fpsDisplay.hidden = false;
    ui.detectedDisplay.hidden = false;

    setStatus("live", "Ao vivo");

    ui.btnStart.disabled = false;
    ui.btnStart.textContent = "Parar câmera";
    syncActionButtons();
  } catch (error) {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      ui.video.srcObject = null;
    }

    setStatus("off", "Aguardando câmera");
    ui.btnStart.disabled = false;
    ui.btnStart.textContent = "Iniciar câmera";
    showToast(`Erro de câmera: ${error.message}`);
  }
}

function stopCamera() {
  state.isRunning = false;

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
  ui.detectedDisplay.hidden = true;
  ui.btnStart.textContent = "Iniciar câmera";
  ui.btnStart.disabled = false;

  state.currentLetter = null;
  state.confidence = 0;

  resetAutoAdd();
  clearDetectedDisplay();
  setStatus("off", "Pronto para iniciar");
  syncActionButtons();

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

function bindEvents() {
  ui.btnStart.addEventListener("click", toggleCamera);

  ui.btnAdd.addEventListener("click", () => {
    addLetterToSentence(state.currentLetter, state.confidence);
  });

  ui.btnBackspace.addEventListener("click", removeLastChar);
  ui.btnSpace.addEventListener("click", addSpaceToSentence);
  ui.btnClear.addEventListener("click", clearSentence);
  ui.btnCopy.addEventListener("click", copySentence);
  window.addEventListener("keydown", handleHotkeys);
}

function init() {
  buildAlphabetGrid();
  updateSentenceDisplay();
  updateStats();
  bindEvents();
  initMediaPipe();
}

init();
