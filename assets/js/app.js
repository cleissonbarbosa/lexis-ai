// ─── Per-Language Sign Gesture Data ────────────────────────────
const SIGN_GESTURES = {
  libras: {
    label: "Libras",
    system: "one-hand",
    alphabet: {
      A: { emoji: "✊", desc: "Punho fechado, polegar ao lado do indicador" },
      B: { emoji: "🖐️", desc: "Mão aberta, dedos juntos, polegar sobre a palma" },
      C: { emoji: "🤌", desc: "Mão curvada em forma de C" },
      D: { emoji: "☝️", desc: "Indicador estendido, demais dedos e polegar formam círculo" },
      E: { emoji: "✊", desc: "Dedos curvados sobre o polegar" },
      F: { emoji: "👌", desc: "Indicador e polegar em círculo, demais dedos estendidos" },
      G: { emoji: "👉", desc: "Indicador e polegar apontando para o lado" },
      H: { emoji: "👉", desc: "Indicador e médio estendidos apontando para o lado" },
      I: { emoji: "🤙", desc: "Punho com mindinho estendido" },
      J: { emoji: "🤙", desc: "Como I, traçando um J no ar" },
      K: { emoji: "✌️", desc: "Indicador e médio abertos, polegar entre eles" },
      L: { emoji: "🤟", desc: "Indicador para cima, polegar para o lado (forma L)" },
      M: { emoji: "✊", desc: "Polegar sob três dedos (indicador, médio, anelar)" },
      N: { emoji: "✊", desc: "Polegar sob dois dedos (indicador e médio)" },
      O: { emoji: "👌", desc: "Todos os dedos e polegar formam um O" },
      P: { emoji: "👇", desc: "Como K apontando para baixo" },
      Q: { emoji: "👇", desc: "Como G apontando para baixo" },
      R: { emoji: "🤞", desc: "Indicador e médio cruzados" },
      S: { emoji: "✊", desc: "Punho fechado, polegar sobre os dedos" },
      T: { emoji: "✊", desc: "Polegar entre indicador e médio" },
      U: { emoji: "✌️", desc: "Indicador e médio estendidos juntos" },
      V: { emoji: "✌️", desc: "Indicador e médio estendidos e separados" },
      W: { emoji: "🤟", desc: "Indicador, médio e anelar estendidos e separados" },
      X: { emoji: "☝️", desc: "Indicador curvado em gancho" },
      Y: { emoji: "🤙", desc: "Polegar e mindinho estendidos" },
      Z: { emoji: "☝️", desc: "Indicador traça um Z no ar" }
    }
  },
  asl: {
    label: "ASL",
    system: "one-hand",
    alphabet: {
      A: { emoji: "✊", desc: "Closed fist, thumb pressed against side of index finger" },
      B: { emoji: "🖐️", desc: "Flat hand, fingers together pointing up, thumb folded across palm" },
      C: { emoji: "🤌", desc: "Hand curved into C shape" },
      D: { emoji: "☝️", desc: "Index finger up, other fingers and thumb form a circle" },
      E: { emoji: "✊", desc: "Fingers curled down over thumb" },
      F: { emoji: "👌", desc: "Index and thumb form circle, other three fingers extended" },
      G: { emoji: "👉", desc: "Fist with thumb and index pointing sideways" },
      H: { emoji: "👉", desc: "Index and middle pointing sideways together" },
      I: { emoji: "🤙", desc: "Fist with pinky extended" },
      J: { emoji: "🤙", desc: "Like I, traced in J motion" },
      K: { emoji: "✌️", desc: "Index and middle up spread apart, thumb between them" },
      L: { emoji: "🤟", desc: "Index up, thumb out at right angle forming L" },
      M: { emoji: "✊", desc: "Thumb tucked under three fingers" },
      N: { emoji: "✊", desc: "Thumb tucked under two fingers" },
      O: { emoji: "👌", desc: "All fingers and thumb meet forming O circle" },
      P: { emoji: "👇", desc: "Like K pointing downward" },
      Q: { emoji: "👇", desc: "Like G pointing downward" },
      R: { emoji: "🤞", desc: "Index and middle fingers crossed" },
      S: { emoji: "✊", desc: "Closed fist, thumb across fingers" },
      T: { emoji: "✊", desc: "Thumb tucked between index and middle fingers" },
      U: { emoji: "✌️", desc: "Index and middle fingers up held together" },
      V: { emoji: "✌️", desc: "Index and middle fingers up spread apart (peace sign)" },
      W: { emoji: "🤟", desc: "Index, middle, and ring fingers up spread apart" },
      X: { emoji: "☝️", desc: "Index finger hooked/bent" },
      Y: { emoji: "🤙", desc: "Thumb and pinky extended outward" },
      Z: { emoji: "☝️", desc: "Index finger traces Z shape in air" }
    }
  },
  bsl: {
    label: "BSL",
    system: "two-hand",
    alphabet: {
      A: { emoji: "👆", desc: "Point to thumb tip of open non-dominant hand" },
      B: { emoji: "👆", desc: "Point to index finger of open non-dominant hand" },
      C: { emoji: "🤏", desc: "Curved hand forming C shape" },
      D: { emoji: "👆", desc: "Point to middle finger of non-dominant hand" },
      E: { emoji: "👆", desc: "Point to ring finger of non-dominant hand" },
      F: { emoji: "🤞", desc: "Index and middle crossed on non-dominant palm" },
      G: { emoji: "👉", desc: "Point with index at non-dominant fist" },
      H: { emoji: "✋", desc: "Flat hands side by side, dominant over non-dominant" },
      I: { emoji: "☝️", desc: "Point to pinky of non-dominant hand" },
      J: { emoji: "✋", desc: "Point to pinky, then curve downward (J motion)" },
      K: { emoji: "✌️", desc: "Index and middle on non-dominant palm" },
      L: { emoji: "👐", desc: "L-shape with thumb and index of both hands" },
      M: { emoji: "✋", desc: "Three fingers down on non-dominant palm" },
      N: { emoji: "✋", desc: "Two fingers down on non-dominant palm" },
      O: { emoji: "👌", desc: "Thumb and fingers form O (circle shape)" },
      P: { emoji: "👇", desc: "Index down on non-dominant palm" },
      Q: { emoji: "👇", desc: "Fist against non-dominant palm, twist" },
      R: { emoji: "✋", desc: "Tap non-dominant palm twice" },
      S: { emoji: "✊", desc: "Fist on non-dominant palm" },
      T: { emoji: "✋", desc: "Tap side of non-dominant hand" },
      U: { emoji: "✌️", desc: "Two fingers up on non-dominant palm" },
      V: { emoji: "✌️", desc: "V on non-dominant hand" },
      W: { emoji: "🤟", desc: "W shape with three fingers on non-dominant palm" },
      X: { emoji: "✊", desc: "Crossed fists" },
      Y: { emoji: "🤙", desc: "Thumb and pinky on non-dominant palm" },
      Z: { emoji: "☝️", desc: "Index traces Z on non-dominant palm" }
    }
  },
  ipsl: {
    label: "IPSL",
    system: "one-hand",
    alphabet: {
      A: { emoji: "✊", desc: "بند مُٹھی، انگوٹھا باہر" },
      B: { emoji: "🖐️", desc: "کھلی ہتھیلی، انگلیاں اوپر" },
      C: { emoji: "🤌", desc: "ہاتھ C شکل میں خمیدہ" },
      D: { emoji: "☝️", desc: "شہادت کی انگلی اوپر، باقی بند" },
      E: { emoji: "✊", desc: "انگلیاں نیچے مڑی ہوئی، انگوٹھا اندر" },
      F: { emoji: "👌", desc: "انگوٹھا اور شہادت کا حلقہ، باقی کھلی" },
      G: { emoji: "👉", desc: "شہادت اور انگوٹھا سائیڈ کی طرف" },
      H: { emoji: "👉", desc: "شہادت اور درمیانی سائیڈ کی طرف" },
      I: { emoji: "🤙", desc: "چھنگلی کھلی، باقی بند" },
      J: { emoji: "🤙", desc: "چھنگلی سے J بنائیں" },
      K: { emoji: "✌️", desc: "شہادت اور درمیانی کھلی، انگوٹھا بیچ میں" },
      L: { emoji: "🤟", desc: "شہادت اوپر، انگوٹھا باہر (L شکل)" },
      M: { emoji: "✊", desc: "تین انگلیوں کے نیچے انگوٹھا" },
      N: { emoji: "✊", desc: "دو انگلیوں کے نیچے انگوٹھا" },
      O: { emoji: "👌", desc: "تمام انگلیاں اور انگوٹھا ملا کر O" },
      P: { emoji: "👇", desc: "K شکل نیچے کی طرف" },
      Q: { emoji: "👇", desc: "G شکل نیچے کی طرف" },
      R: { emoji: "🤞", desc: "شہادت اور درمیانی کراس" },
      S: { emoji: "✊", desc: "بند مُٹھی، انگوٹھا اوپر" },
      T: { emoji: "✊", desc: "انگوٹھا شہادت اور درمیانی کے بیچ" },
      U: { emoji: "✌️", desc: "شہادت اور درمیانی ملی ہوئی" },
      V: { emoji: "✌️", desc: "شہادت اور درمیانی کھلی" },
      W: { emoji: "🤟", desc: "تین انگلیاں کھلی" },
      X: { emoji: "☝️", desc: "شہادت خمیدہ" },
      Y: { emoji: "🤙", desc: "انگوٹھا اور چھنگلی کھلی" },
      Z: { emoji: "☝️", desc: "شہادت سے Z بنائیں" }
    }
  },
  csl: {
    label: "CSL",
    system: "one-hand",
    alphabet: {
      A: { emoji: "✊", desc: "握拳，拇指在侧面" },
      B: { emoji: "🖐️", desc: "手掌张开，五指并拢向上" },
      C: { emoji: "🤌", desc: "手指弯曲成C形" },
      D: { emoji: "☝️", desc: "食指竖起，其余弯曲" },
      E: { emoji: "✊", desc: "手指弯曲覆盖拇指" },
      F: { emoji: "👌", desc: "拇指和食指成圈，其余伸开" },
      G: { emoji: "👉", desc: "食指和拇指横指" },
      H: { emoji: "👉", desc: "食指和中指横指" },
      I: { emoji: "🤙", desc: "小指伸出，其余握拳" },
      J: { emoji: "🤙", desc: "小指伸出画J" },
      K: { emoji: "✌️", desc: "食指和中指伸开，拇指在中间" },
      L: { emoji: "🤟", desc: "食指向上，拇指向外（L形）" },
      M: { emoji: "✊", desc: "拇指在三指下方" },
      N: { emoji: "✊", desc: "拇指在两指下方" },
      O: { emoji: "👌", desc: "手指和拇指围成O形" },
      P: { emoji: "👇", desc: "类似K但向下" },
      Q: { emoji: "👇", desc: "类似G但向下" },
      R: { emoji: "🤞", desc: "食指和中指交叉" },
      S: { emoji: "✊", desc: "握拳，拇指在手指上方" },
      T: { emoji: "✊", desc: "拇指夹在食指和中指之间" },
      U: { emoji: "✌️", desc: "食指和中指并拢伸出" },
      V: { emoji: "✌️", desc: "食指和中指分开伸出" },
      W: { emoji: "🤟", desc: "食指、中指、无名指分开伸出" },
      X: { emoji: "☝️", desc: "食指弯曲成钩" },
      Y: { emoji: "🤙", desc: "拇指和小指伸出" },
      Z: { emoji: "☝️", desc: "食指画Z字" }
    }
  },
  jsl: {
    label: "JSL",
    system: "one-hand",
    alphabet: {
      A: { emoji: "✊", desc: "握り拳で親指を横に" },
      B: { emoji: "🖐️", desc: "手のひらを開き指を揃えて上に" },
      C: { emoji: "🤌", desc: "手をC字型に曲げる" },
      D: { emoji: "☝️", desc: "人差し指を立て、他は曲げる" },
      E: { emoji: "✊", desc: "指を曲げて親指を包む" },
      F: { emoji: "👌", desc: "親指と人差し指で輪、他は伸ばす" },
      G: { emoji: "👉", desc: "人差し指と親指を横に" },
      H: { emoji: "👉", desc: "人差し指と中指を横に" },
      I: { emoji: "🤙", desc: "小指を伸ばし他は握る" },
      J: { emoji: "🤙", desc: "小指でJの動きを描く" },
      K: { emoji: "✌️", desc: "人差し指と中指を開き親指を間に" },
      L: { emoji: "🤟", desc: "人差し指を上、親指を横に（L字型）" },
      M: { emoji: "✊", desc: "3本の指の下に親指" },
      N: { emoji: "✊", desc: "2本の指の下に親指" },
      O: { emoji: "👌", desc: "全ての指と親指でO字を作る" },
      P: { emoji: "👇", desc: "Kの形を下に" },
      Q: { emoji: "👇", desc: "Gの形を下に" },
      R: { emoji: "🤞", desc: "人差し指と中指を交差" },
      S: { emoji: "✊", desc: "握り拳で親指を指の上に" },
      T: { emoji: "✊", desc: "親指を人差し指と中指の間に" },
      U: { emoji: "✌️", desc: "人差し指と中指を揃えて伸ばす" },
      V: { emoji: "✌️", desc: "人差し指と中指を開いて伸ばす" },
      W: { emoji: "🤟", desc: "人差し指・中指・薬指を開いて伸ばす" },
      X: { emoji: "☝️", desc: "人差し指を鉤形に曲げる" },
      Y: { emoji: "🤙", desc: "親指と小指を伸ばす" },
      Z: { emoji: "☝️", desc: "人差し指でZ形を描く" }
    }
  },
  lgp: {
    label: "LGP",
    system: "one-hand",
    alphabet: {
      A: { emoji: "✊", desc: "Punho fechado, polegar ao lado do indicador" },
      B: { emoji: "🖐️", desc: "Mão aberta, dedos juntos a apontar para cima" },
      C: { emoji: "🤌", desc: "Mão curvada em forma de C" },
      D: { emoji: "☝️", desc: "Indicador para cima, restantes formam círculo com polegar" },
      E: { emoji: "✊", desc: "Dedos curvados sobre o polegar" },
      F: { emoji: "👌", desc: "Polegar e indicador em círculo, restantes estendidos" },
      G: { emoji: "👉", desc: "Indicador e polegar a apontar para o lado" },
      H: { emoji: "👉", desc: "Indicador e médio a apontar para o lado" },
      I: { emoji: "🤙", desc: "Mindinho estendido, restantes fechados" },
      J: { emoji: "🤙", desc: "Como I, a traçar um J" },
      K: { emoji: "✌️", desc: "Indicador e médio abertos, polegar entre eles" },
      L: { emoji: "🤟", desc: "Indicador para cima, polegar para o lado (forma L)" },
      M: { emoji: "✊", desc: "Polegar sob três dedos" },
      N: { emoji: "✊", desc: "Polegar sob dois dedos" },
      O: { emoji: "👌", desc: "Dedos e polegar formam um O" },
      P: { emoji: "👇", desc: "Como K a apontar para baixo" },
      Q: { emoji: "👇", desc: "Como G a apontar para baixo" },
      R: { emoji: "🤞", desc: "Indicador e médio cruzados" },
      S: { emoji: "✊", desc: "Punho fechado, polegar sobre os dedos" },
      T: { emoji: "✊", desc: "Polegar entre indicador e médio" },
      U: { emoji: "✌️", desc: "Indicador e médio juntos, estendidos" },
      V: { emoji: "✌️", desc: "Indicador e médio separados" },
      W: { emoji: "🤟", desc: "Indicador, médio e anelar separados e estendidos" },
      X: { emoji: "☝️", desc: "Indicador curvado em gancho" },
      Y: { emoji: "🤙", desc: "Polegar e mindinho estendidos" },
      Z: { emoji: "☝️", desc: "Indicador traça um Z no ar" }
    }
  }
};

// Legacy compat helper – returns emoji for current language
function getAlphabetEmoji(letter) {
  const langData = SIGN_GESTURES[state.signLanguageId] || SIGN_GESTURES.libras;
  return langData.alphabet[letter]?.emoji || "❓";
}

function getAlphabetDesc(letter) {
  const langData = SIGN_GESTURES[state.signLanguageId] || SIGN_GESTURES.libras;
  return langData.alphabet[letter]?.desc || "";
}

function getSignSystem() {
  const langData = SIGN_GESTURES[state.signLanguageId] || SIGN_GESTURES.libras;
  return langData.system;
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const STORAGE_KEY = "lexis-ai-sign-language";
const SETTINGS_STORAGE_KEY = "lexis-ai-settings";
const FALLBACK_LOCALE = "en";

const DEFAULT_SETTINGS = {
  holdDurationMs: 1500,
  minConfidence: 0.65,
  autoAddConfidence: 0.70,
  cooldownMs: 900,
  detectionSmoothing: 3,
  darkMode: false,
  soundFeedback: true
};

const SIGN_LANGUAGES = [
  {
    id: "libras",
    locale: "pt-BR",
    support: "core",
    label: "Libras"
  },
  {
    id: "asl",
    locale: "en",
    support: "core",
    label: "ASL (American Sign Language)"
  },
  {
    id: "bsl",
    locale: "en",
    support: "experimental",
    label: "BSL (British Sign Language)"
  },
  {
    id: "ipsl",
    locale: "ur",
    support: "experimental",
    label: "Indo-Pakistani Sign Language"
  },
  {
    id: "csl",
    locale: "zh-CN",
    support: "experimental",
    label: "Chinese Sign Language (Zhōngguó Shǒuyǔ)"
  },
  {
    id: "jsl",
    locale: "ja",
    support: "experimental",
    label: "Japanese Sign Language (Nihon Shūwa)"
  },
  {
    id: "lgp",
    locale: "pt-PT",
    support: "experimental",
    label: "LGP (Língua Gestual Portuguesa)"
  }
];

const I18N = {
  "pt-BR": {
    pageTitle: "Lexis AI | Reconhecimento de Língua de Sinais no Navegador",
    pageDescription: "Lexis AI: reconhecimento em tempo real de língua de sinais, 100% no navegador.",
    loadingSubtitle: "Reconhecimento de língua de sinais em tempo real no browser",
    loadingInitializing: "Inicializando...",
    loadingCheckEnvironment: "Conferindo ambiente",
    loadingInitHands: "Inicializando MediaPipe Hands",
    loadingApplyConfig: "Aplicando configurações",
    loadingReady: "Pronto para uso",
    loadingLibFail: "Falha ao carregar bibliotecas",
    brandTagline: "Língua de sinais em tempo real, sem backend",
    badgeBrowserFirst: "Browser-first",
    badgePages: "GitHub Pages",
    cameraCardTitle: "Câmera e Detecção",
    cameraCardSubtitle: "Posicione a mão no centro e mantenha o sinal estável por 1.5s.",
    signLanguageLabel: "Língua de sinais ativa",
    signLanguageAria: "Selecionar língua de sinais",
    modeNoteCore: "Modo {language}: reconhecimento com melhor desempenho no alfabeto manual A-Z de uma mão.",
    modeNoteExperimental: "Modo {language}: interface traduzida. O classificador atual usa baseline A-Z de uma mão (modo experimental para este idioma).",
    cameraPlaceholderTemplate: "Clique em {action} para começar o reconhecimento.",
    controlsAriaLabel: "Controles de reconhecimento",
    btnStart: "Iniciar câmera",
    btnStop: "Parar câmera",
    btnStarting: "Iniciando...",
    btnAdd: "Adicionar letra",
    btnBackspace: "Apagar",
    btnSpace: "Espaço",
    btnClear: "Limpar",
    btnCopy: "Copiar",
    sentenceTitle: "Palavra / Frase formada",
    characterSingular: "caractere",
    characterPlural: "caracteres",
    shortcutHint: "Atalhos: <kbd>Enter</kbd> iniciar/parar, <kbd>+</kbd> adicionar, <kbd>Backspace</kbd> apagar.",
    panelStatsTitle: "Estatísticas",
    statLettersLabel: "Letras detectadas",
    statConfLabel: "Confiança média",
    panelHistoryTitle: "Histórico recente",
    historyEmpty: "Nenhuma letra detectada ainda.",
    panelReferenceTitle: "Referência do Alfabeto Manual",
    panelHowToTitle: "Como usar",
    inst1: "Inicie a câmera e permita acesso no navegador.",
    inst2: "Posicione a mão com boa iluminação e fundo limpo.",
    inst3: "Mantenha o sinal por ~1.5s para auto-adicionar.",
    inst4: "Use os botões para editar o texto reconhecido.",
    footerText: "Lexis AI roda 100% no navegador. Nenhum vídeo é enviado para servidor.",
    statusReady: "Pronto para iniciar",
    statusLoadingModel: "Carregando modelo",
    statusLoadFailed: "Falha no carregamento",
    statusStartingCamera: "Iniciando câmera",
    statusLive: "Ao vivo",
    statusWaitingCamera: "Aguardando câmera",
    detectedNoDetection: "Sem detecção",
    detectedNoHand: "Sem mão detectada",
    confidencePattern: "{value}% de confiança",
    holdToAutoAdd: "Segure para auto-adicionar",
    holdSignalDetected: "Sinal detectado. Mantenha estável...",
    holdAutoIn: "Auto-adiciona em {seconds}s",
    holdConfirming: "Confirmando...",
    toastAutoAdded: "\"{letter}\" adicionada automaticamente",
    toastTextCleared: "Texto limpo",
    toastTextCopied: "Texto copiado",
    toastModelLoading: "Modelo ainda está carregando.",
    toastCameraUnsupported: "Seu navegador não suporta câmera neste contexto.",
    toastMediaPipeFailed: "Não foi possível carregar o MediaPipe. Recarregue a página.",
    toastCameraError: "Erro de câmera: {error}",
    toastLanguageChanged: "Modo alterado para {language}",
    referenceDescription: "Forma de referência para a letra {letter} em {language}.",
    fpsUnit: "fps",
    settingsTitle: "Configurações",
    settingsClose: "Fechar",
    settingHoldDuration: "Tempo para auto-adicionar",
    settingHoldDurationHint: "Tempo que o sinal precisa ser mantido para auto-adicionar a letra.",
    settingMinConfidence: "Confiança mínima",
    settingMinConfidenceHint: "Confiança mínima para considerar uma detecção válida.",
    settingAutoAddConfidence: "Confiança para auto-adicionar",
    settingAutoAddConfidenceHint: "Confiança mínima necessária para auto-adicionar uma letra.",
    settingCooldown: "Intervalo entre adições",
    settingCooldownHint: "Tempo de espera após auto-adicionar antes de aceitar novo sinal.",
    settingSmoothing: "Suavização da detecção",
    settingSmoothingHint: "Frames consecutivos com o mesmo sinal para confirmar. Maior = mais estável.",
    settingReset: "Restaurar padrões",
    settingSaved: "Configuração salva",
    settingsReset: "Configurações restauradas",
    twoHandNote: "Nota: {language} usa sistema de duas mãos. O classificador atual é otimizado para uma mão (modo experimental).",
    signDescriptionLabel: "Descrição do sinal",
    framesUnit: "frames",
    btnSpeak: "Falar",
    btnExportImg: "Exportar imagem",
    btnFullscreen: "Tela cheia",
    btnExitFullscreen: "Sair tela cheia",
    toastSpeaking: "Reproduzindo texto...",
    toastExported: "Imagem exportada!",
    settingDarkMode: "Tema escuro",
    settingSoundFeedback: "Feedback sonoro",
    settingSoundFeedbackHint: "Emitir um som ao detectar/adicionar uma letra.",
    sessionLabel: "sessão",
    themeToggle: "Alternar tema"
  },
  en: {
    pageTitle: "Lexis AI | Browser Sign Language Recognition",
    pageDescription: "Lexis AI: real-time sign language recognition running 100% in the browser.",
    loadingSubtitle: "Real-time sign language recognition in the browser",
    loadingInitializing: "Initializing...",
    loadingCheckEnvironment: "Checking environment",
    loadingInitHands: "Initializing MediaPipe Hands",
    loadingApplyConfig: "Applying settings",
    loadingReady: "Ready to use",
    loadingLibFail: "Failed to load libraries",
    brandTagline: "Real-time sign language, no backend",
    badgeBrowserFirst: "Browser-first",
    badgePages: "GitHub Pages",
    cameraCardTitle: "Camera and Detection",
    cameraCardSubtitle: "Keep your hand centered and hold a stable sign for 1.5s.",
    signLanguageLabel: "Active sign language",
    signLanguageAria: "Select sign language",
    modeNoteCore: "Mode {language}: tuned for one-hand A-Z manual alphabet detection.",
    modeNoteExperimental: "Mode {language}: translated interface. The current classifier still uses a one-hand A-Z baseline (experimental for this language).",
    cameraPlaceholderTemplate: "Click {action} to start recognition.",
    controlsAriaLabel: "Recognition controls",
    btnStart: "Start camera",
    btnStop: "Stop camera",
    btnStarting: "Starting...",
    btnAdd: "Add letter",
    btnBackspace: "Backspace",
    btnSpace: "Space",
    btnClear: "Clear",
    btnCopy: "Copy",
    sentenceTitle: "Built Word / Sentence",
    characterSingular: "character",
    characterPlural: "characters",
    shortcutHint: "Shortcuts: <kbd>Enter</kbd> start/stop, <kbd>+</kbd> add, <kbd>Backspace</kbd> erase.",
    panelStatsTitle: "Statistics",
    statLettersLabel: "Detected letters",
    statConfLabel: "Average confidence",
    panelHistoryTitle: "Recent history",
    historyEmpty: "No letters detected yet.",
    panelReferenceTitle: "Manual Alphabet Reference",
    panelHowToTitle: "How to use",
    inst1: "Start the camera and allow browser permission.",
    inst2: "Keep your hand well lit with a clean background.",
    inst3: "Hold the sign for ~1.5s for auto-add.",
    inst4: "Use the buttons to edit recognized text.",
    footerText: "Lexis AI runs 100% in your browser. No video is sent to any server.",
    statusReady: "Ready to start",
    statusLoadingModel: "Loading model",
    statusLoadFailed: "Load failed",
    statusStartingCamera: "Starting camera",
    statusLive: "Live",
    statusWaitingCamera: "Waiting for camera",
    detectedNoDetection: "No detection",
    detectedNoHand: "No hand detected",
    confidencePattern: "{value}% confidence",
    holdToAutoAdd: "Hold to auto-add",
    holdSignalDetected: "Sign detected. Keep it stable...",
    holdAutoIn: "Auto-add in {seconds}s",
    holdConfirming: "Confirming...",
    toastAutoAdded: "\"{letter}\" was auto-added",
    toastTextCleared: "Text cleared",
    toastTextCopied: "Text copied",
    toastModelLoading: "Model is still loading.",
    toastCameraUnsupported: "Your browser does not support camera access in this context.",
    toastMediaPipeFailed: "Could not load MediaPipe. Please reload the page.",
    toastCameraError: "Camera error: {error}",
    toastLanguageChanged: "Switched to {language}",
    referenceDescription: "Reference handshape for letter {letter} in {language}.",
    fpsUnit: "fps",
    settingsTitle: "Settings",
    settingsClose: "Close",
    settingHoldDuration: "Hold time for auto-add",
    settingHoldDurationHint: "How long the sign must be held to auto-add the letter.",
    settingMinConfidence: "Minimum confidence",
    settingMinConfidenceHint: "Minimum confidence to consider a valid detection.",
    settingAutoAddConfidence: "Auto-add confidence",
    settingAutoAddConfidenceHint: "Minimum confidence required to auto-add a letter.",
    settingCooldown: "Cooldown between additions",
    settingCooldownHint: "Wait time after auto-adding before accepting a new sign.",
    settingSmoothing: "Detection smoothing",
    settingSmoothingHint: "Consecutive frames with same sign to confirm. Higher = more stable.",
    settingReset: "Reset to defaults",
    settingSaved: "Setting saved",
    settingsReset: "Settings reset to defaults",
    twoHandNote: "Note: {language} uses a two-hand system. The current classifier is optimized for one hand (experimental mode).",
    signDescriptionLabel: "Sign description",
    framesUnit: "frames",
    btnSpeak: "Speak",
    btnExportImg: "Export image",
    btnFullscreen: "Fullscreen",
    btnExitFullscreen: "Exit fullscreen",
    toastSpeaking: "Speaking text...",
    toastExported: "Image exported!",
    settingDarkMode: "Dark mode",
    settingSoundFeedback: "Sound feedback",
    settingSoundFeedbackHint: "Play a sound when detecting/adding a letter.",
    sessionLabel: "session",
    themeToggle: "Toggle theme"
  },
  ur: {
    pageTitle: "Lexis AI | براؤزر میں سائن لینگویج شناخت",
    pageDescription: "Lexis AI: حقیقی وقت میں سائن لینگویج شناخت، 100% براؤزر میں۔",
    loadingSubtitle: "براؤزر میں حقیقی وقت کی سائن لینگویج شناخت",
    loadingInitializing: "شروع کیا جا رہا ہے...",
    loadingCheckEnvironment: "ماحول چیک کیا جا رہا ہے",
    loadingInitHands: "MediaPipe Hands شروع کیا جا رہا ہے",
    loadingApplyConfig: "ترتیبات لاگو کی جا رہی ہیں",
    loadingReady: "استعمال کے لیے تیار",
    loadingLibFail: "لائبریریاں لوڈ نہیں ہو سکیں",
    brandTagline: "حقیقی وقت کی سائن لینگویج، بغیر بیک اینڈ",
    badgeBrowserFirst: "Browser-first",
    badgePages: "GitHub Pages",
    cameraCardTitle: "کیمرہ اور شناخت",
    cameraCardSubtitle: "ہاتھ کو مرکز میں رکھیں اور اشارہ 1.5 سیکنڈ تک مستحکم رکھیں۔",
    signLanguageLabel: "فعال سائن لینگویج",
    signLanguageAria: "سائن لینگویج منتخب کریں",
    modeNoteCore: "موڈ {language}: ایک ہاتھ کے A-Z مینوئل الفابیٹ کے لیے بہتر بنایا گیا ہے۔",
    modeNoteExperimental: "موڈ {language}: انٹرفیس ترجمہ شدہ ہے۔ موجودہ کلاسیفائر ابھی ایک ہاتھ کے A-Z بیس لائن پر چلتا ہے (اس زبان کے لیے تجرباتی).",
    cameraPlaceholderTemplate: "شناخت شروع کرنے کے لیے {action} پر کلک کریں۔",
    controlsAriaLabel: "شناخت کے کنٹرولز",
    btnStart: "کیمرہ شروع کریں",
    btnStop: "کیمرہ بند کریں",
    btnStarting: "شروع ہو رہا ہے...",
    btnAdd: "حرف شامل کریں",
    btnBackspace: "مٹائیں",
    btnSpace: "اسپیس",
    btnClear: "صاف کریں",
    btnCopy: "کاپی کریں",
    sentenceTitle: "بننے والا لفظ / جملہ",
    characterSingular: "حرف",
    characterPlural: "حروف",
    shortcutHint: "شارٹ کٹس: <kbd>Enter</kbd> شروع/بند، <kbd>+</kbd> شامل کریں، <kbd>Backspace</kbd> مٹائیں۔",
    panelStatsTitle: "اعداد و شمار",
    statLettersLabel: "پہچانے گئے حروف",
    statConfLabel: "اوسط اعتماد",
    panelHistoryTitle: "حالیہ ہسٹری",
    historyEmpty: "ابھی تک کوئی حرف نہیں پہچانا گیا۔",
    panelReferenceTitle: "مینوئل الفابیٹ ریفرنس",
    panelHowToTitle: "استعمال کا طریقہ",
    inst1: "کیمرہ شروع کریں اور براؤزر کی اجازت دیں۔",
    inst2: "اچھی روشنی اور صاف پس منظر میں ہاتھ رکھیں۔",
    inst3: "خودکار اضافہ کے لیے اشارہ تقریباً 1.5 سیکنڈ رکھیں۔",
    inst4: "پہچانے گئے متن میں ترمیم کے لیے بٹن استعمال کریں۔",
    footerText: "Lexis AI مکمل طور پر براؤزر میں چلتا ہے۔ کوئی ویڈیو سرور پر نہیں بھیجی جاتی۔",
    statusReady: "شروع کرنے کے لیے تیار",
    statusLoadingModel: "ماڈل لوڈ ہو رہا ہے",
    statusLoadFailed: "لوڈ ناکام",
    statusStartingCamera: "کیمرہ شروع ہو رہا ہے",
    statusLive: "لائیو",
    statusWaitingCamera: "کیمرہ کا انتظار",
    detectedNoDetection: "کوئی شناخت نہیں",
    detectedNoHand: "ہاتھ نظر نہیں آیا",
    confidencePattern: "{value}% اعتماد",
    holdToAutoAdd: "خودکار اضافہ کے لیے تھامیں",
    holdSignalDetected: "اشارہ ملا۔ مستحکم رکھیں...",
    holdAutoIn: "خودکار اضافہ {seconds}s میں",
    holdConfirming: "تصدیق ہو رہی ہے...",
    toastAutoAdded: "\"{letter}\" خودکار طور پر شامل ہو گیا",
    toastTextCleared: "متن صاف کر دیا گیا",
    toastTextCopied: "متن کاپی ہو گیا",
    toastModelLoading: "ماڈل ابھی لوڈ ہو رہا ہے۔",
    toastCameraUnsupported: "اس ماحول میں براؤزر کیمرہ سپورٹ نہیں کرتا۔",
    toastMediaPipeFailed: "MediaPipe لوڈ نہیں ہو سکا۔ صفحہ دوبارہ لوڈ کریں۔",
    toastCameraError: "کیمرہ خرابی: {error}",
    toastLanguageChanged: "{language} موڈ منتخب ہو گیا",
    referenceDescription: "{language} میں حرف {letter} کے لیے ریفرنس ہینڈشَیپ۔",
    fpsUnit: "fps",
    settingsTitle: "ترتیبات",
    settingsClose: "بند کریں",
    settingHoldDuration: "خودکار اضافہ کے لیے وقت",
    settingHoldDurationHint: "اشارہ کتنی دیر تک رکھنا ہے تاکہ حرف خودکار شامل ہو۔",
    settingMinConfidence: "کم از کم اعتماد",
    settingMinConfidenceHint: "درست شناخت کے لیے کم از کم اعتماد۔",
    settingAutoAddConfidence: "خودکار اضافہ اعتماد",
    settingAutoAddConfidenceHint: "خودکار اضافہ کے لیے کم از کم اعتماد۔",
    settingCooldown: "اضافہ کے بعد وقفہ",
    settingCooldownHint: "خودکار اضافہ کے بعد اگلے اشارے سے پہلے وقفہ۔",
    settingSmoothing: "شناخت ہمواری",
    settingSmoothingHint: "تصدیق کے لیے مسلسل فریمز۔ زیادہ = زیادہ مستحکم۔",
    settingReset: "ڈیفالٹ بحال کریں",
    settingSaved: "ترتیب محفوظ ہو گئی",
    settingsReset: "ترتیبات بحال ہو گئیں",
    twoHandNote: "نوٹ: {language} دو ہاتھ کا نظام استعمال کرتی ہے۔ فی الحال ایک ہاتھ کے لیے (تجرباتی)۔",
    signDescriptionLabel: "اشارے کی تفصیل",
    framesUnit: "فریمز",
    btnSpeak: "بولیں",
    btnExportImg: "تصویر ایکسپورٹ",
    btnFullscreen: "فل اسکرین",
    btnExitFullscreen: "فل اسکرین سے باہر",
    toastSpeaking: "متن بول رہا ہے...",
    toastExported: "تصویر ایکسپورٹ ہو گئی!",
    settingDarkMode: "ڈارک موڈ",
    settingSoundFeedback: "آواز فیڈبیک",
    settingSoundFeedbackHint: "حرف پہچاننے/شامل کرنے پر آواز۔",
    sessionLabel: "سیشن",
    themeToggle: "تھیم تبدیل"
  },
  "zh-CN": {
    pageTitle: "Lexis AI | 浏览器手语识别",
    pageDescription: "Lexis AI：实时手语识别，100% 在浏览器中运行。",
    loadingSubtitle: "在浏览器中进行实时手语识别",
    loadingInitializing: "正在初始化...",
    loadingCheckEnvironment: "正在检查环境",
    loadingInitHands: "正在初始化 MediaPipe Hands",
    loadingApplyConfig: "正在应用配置",
    loadingReady: "已准备就绪",
    loadingLibFail: "库加载失败",
    brandTagline: "实时手语识别，无后端",
    badgeBrowserFirst: "Browser-first",
    badgePages: "GitHub Pages",
    cameraCardTitle: "摄像头与识别",
    cameraCardSubtitle: "将手置于画面中央，并稳定保持手势约 1.5 秒。",
    signLanguageLabel: "当前手语",
    signLanguageAria: "选择手语",
    modeNoteCore: "{language} 模式：针对单手 A-Z 手指字母识别进行了优化。",
    modeNoteExperimental: "{language} 模式：界面已翻译。当前分类器仍使用单手 A-Z 基线（该语言为实验模式）。",
    cameraPlaceholderTemplate: "点击 {action} 开始识别。",
    controlsAriaLabel: "识别控制",
    btnStart: "启动摄像头",
    btnStop: "停止摄像头",
    btnStarting: "启动中...",
    btnAdd: "添加字母",
    btnBackspace: "删除",
    btnSpace: "空格",
    btnClear: "清空",
    btnCopy: "复制",
    sentenceTitle: "已组成单词 / 句子",
    characterSingular: "个字符",
    characterPlural: "个字符",
    shortcutHint: "快捷键：<kbd>Enter</kbd> 启动/停止，<kbd>+</kbd> 添加，<kbd>Backspace</kbd> 删除。",
    panelStatsTitle: "统计",
    statLettersLabel: "已识别字母",
    statConfLabel: "平均置信度",
    panelHistoryTitle: "最近记录",
    historyEmpty: "还没有识别到字母。",
    panelReferenceTitle: "手指字母参考",
    panelHowToTitle: "使用方式",
    inst1: "启动摄像头并允许浏览器权限。",
    inst2: "保持手部光线充足，背景尽量干净。",
    inst3: "保持手势约 1.5 秒以自动添加。",
    inst4: "使用按钮编辑识别文本。",
    footerText: "Lexis AI 完全在浏览器中运行，不会将视频发送到服务器。",
    statusReady: "准备就绪",
    statusLoadingModel: "正在加载模型",
    statusLoadFailed: "加载失败",
    statusStartingCamera: "正在启动摄像头",
    statusLive: "实时中",
    statusWaitingCamera: "等待摄像头",
    detectedNoDetection: "未识别",
    detectedNoHand: "未检测到手",
    confidencePattern: "置信度 {value}%",
    holdToAutoAdd: "保持以自动添加",
    holdSignalDetected: "检测到手势，请保持稳定...",
    holdAutoIn: "{seconds}s 后自动添加",
    holdConfirming: "确认中...",
    toastAutoAdded: "已自动添加 \"{letter}\"",
    toastTextCleared: "文本已清空",
    toastTextCopied: "文本已复制",
    toastModelLoading: "模型仍在加载中。",
    toastCameraUnsupported: "当前环境下浏览器不支持摄像头访问。",
    toastMediaPipeFailed: "MediaPipe 加载失败，请刷新页面。",
    toastCameraError: "摄像头错误：{error}",
    toastLanguageChanged: "已切换到 {language}",
    referenceDescription: "{language} 中字母 {letter} 的参考手势。",
    fpsUnit: "fps",
    settingsTitle: "设置",
    settingsClose: "关闭",
    settingHoldDuration: "自动添加时间",
    settingHoldDurationHint: "保持手势多长时间以自动添加字母。",
    settingMinConfidence: "最低置信度",
    settingMinConfidenceHint: "认定有效检测的最低置信度。",
    settingAutoAddConfidence: "自动添加置信度",
    settingAutoAddConfidenceHint: "自动添加字母所需的最低置信度。",
    settingCooldown: "添加间隔",
    settingCooldownHint: "自动添加后等待时间。",
    settingSmoothing: "检测平滑",
    settingSmoothingHint: "确认同一手势所需的连续帧数。越高越稳定。",
    settingReset: "恢复默认",
    settingSaved: "设置已保存",
    settingsReset: "已恢复默认设置",
    twoHandNote: "注意：{language} 使用双手系统。当前分类器针对单手优化（实验模式）。",
    signDescriptionLabel: "手势描述",
    framesUnit: "帧",
    btnSpeak: "朗读",
    btnExportImg: "导出图片",
    btnFullscreen: "全屏",
    btnExitFullscreen: "退出全屏",
    toastSpeaking: "正在朗读...",
    toastExported: "图片已导出！",
    settingDarkMode: "深色模式",
    settingSoundFeedback: "声音反馈",
    settingSoundFeedbackHint: "检测/添加字母时播放声音。",
    sessionLabel: "会话",
    themeToggle: "切换主题"
  },
  ja: {
    pageTitle: "Lexis AI | ブラウザ手話認識",
    pageDescription: "Lexis AI: リアルタイム手話認識を100%ブラウザ内で実行します。",
    loadingSubtitle: "ブラウザでリアルタイム手話認識",
    loadingInitializing: "初期化中...",
    loadingCheckEnvironment: "環境を確認中",
    loadingInitHands: "MediaPipe Hands を初期化中",
    loadingApplyConfig: "設定を適用中",
    loadingReady: "準備完了",
    loadingLibFail: "ライブラリの読み込みに失敗しました",
    brandTagline: "リアルタイム手話認識、バックエンド不要",
    badgeBrowserFirst: "Browser-first",
    badgePages: "GitHub Pages",
    cameraCardTitle: "カメラと認識",
    cameraCardSubtitle: "手を中央に置き、手話サインを約1.5秒安定して保持してください。",
    signLanguageLabel: "現在の手話",
    signLanguageAria: "手話を選択",
    modeNoteCore: "{language} モード: 片手の A-Z 指文字認識向けに最適化されています。",
    modeNoteExperimental: "{language} モード: UI は翻訳済みです。現在の分類器は片手 A-Z ベースラインのため、この言語では実験的です。",
    cameraPlaceholderTemplate: "認識を開始するには {action} をクリックしてください。",
    controlsAriaLabel: "認識コントロール",
    btnStart: "カメラ開始",
    btnStop: "カメラ停止",
    btnStarting: "開始中...",
    btnAdd: "文字を追加",
    btnBackspace: "削除",
    btnSpace: "スペース",
    btnClear: "クリア",
    btnCopy: "コピー",
    sentenceTitle: "作成中の単語 / 文",
    characterSingular: "文字",
    characterPlural: "文字",
    shortcutHint: "ショートカット: <kbd>Enter</kbd> 開始/停止、<kbd>+</kbd> 追加、<kbd>Backspace</kbd> 削除。",
    panelStatsTitle: "統計",
    statLettersLabel: "検出された文字",
    statConfLabel: "平均信頼度",
    panelHistoryTitle: "最近の履歴",
    historyEmpty: "まだ文字は検出されていません。",
    panelReferenceTitle: "指文字リファレンス",
    panelHowToTitle: "使い方",
    inst1: "カメラを開始し、ブラウザの許可を与えてください。",
    inst2: "明るい場所で、背景をできるだけシンプルにしてください。",
    inst3: "約1.5秒サインを保持すると自動追加されます。",
    inst4: "ボタンで認識テキストを編集できます。",
    footerText: "Lexis AI は100%ブラウザ内で動作し、動画はサーバーに送信されません。",
    statusReady: "開始準備完了",
    statusLoadingModel: "モデル読み込み中",
    statusLoadFailed: "読み込み失敗",
    statusStartingCamera: "カメラ起動中",
    statusLive: "ライブ",
    statusWaitingCamera: "カメラ待機中",
    detectedNoDetection: "未検出",
    detectedNoHand: "手が検出されません",
    confidencePattern: "信頼度 {value}%",
    holdToAutoAdd: "保持して自動追加",
    holdSignalDetected: "サインを検出。安定して保持してください...",
    holdAutoIn: "{seconds}秒で自動追加",
    holdConfirming: "確認中...",
    toastAutoAdded: "\"{letter}\" を自動追加しました",
    toastTextCleared: "テキストをクリアしました",
    toastTextCopied: "テキストをコピーしました",
    toastModelLoading: "モデルはまだ読み込み中です。",
    toastCameraUnsupported: "この環境ではカメラアクセスがサポートされていません。",
    toastMediaPipeFailed: "MediaPipe を読み込めませんでした。ページを再読み込みしてください。",
    toastCameraError: "カメラエラー: {error}",
    toastLanguageChanged: "{language} モードに切り替えました",
    referenceDescription: "{language} における文字 {letter} の参考ハンドシェイプ。",
    fpsUnit: "fps",
    settingsTitle: "設定",
    settingsClose: "閉じる",
    settingHoldDuration: "自動追加の保持時間",
    settingHoldDurationHint: "文字を自動追加するためにサインを保持する時間。",
    settingMinConfidence: "最低信頼度",
    settingMinConfidenceHint: "有効な検出と判定する最低信頼度。",
    settingAutoAddConfidence: "自動追加の信頼度",
    settingAutoAddConfidenceHint: "文字を自動追加するために必要な最低信頼度。",
    settingCooldown: "追加後のクールダウン",
    settingCooldownHint: "自動追加後、次のサインを受け付けるまでの待機時間。",
    settingSmoothing: "検出スムージング",
    settingSmoothingHint: "確認に必要な連続フレーム数。大きいほど安定。",
    settingReset: "デフォルトに戻す",
    settingSaved: "設定が保存されました",
    settingsReset: "設定をデフォルトに戻しました",
    twoHandNote: "注意：{language} は両手システムです。現在の分類器は片手用に最適化されています（実験モード）。",
    signDescriptionLabel: "サインの説明",
    framesUnit: "フレーム",
    btnSpeak: "読み上げ",
    btnExportImg: "画像エクスポート",
    btnFullscreen: "フルスクリーン",
    btnExitFullscreen: "フルスクリーン終了",
    toastSpeaking: "読み上げ中...",
    toastExported: "画像をエクスポートしました！",
    settingDarkMode: "ダークモード",
    settingSoundFeedback: "サウンドフィードバック",
    settingSoundFeedbackHint: "文字検出/追加時に音を鳴らします。",
    sessionLabel: "セッション",
    themeToggle: "テーマ切替"
  },
  "pt-PT": {
    pageTitle: "Lexis AI | Reconhecimento de Língua Gestual no Navegador",
    pageDescription: "Lexis AI: reconhecimento de língua gestual em tempo real, 100% no navegador.",
    loadingSubtitle: "Reconhecimento de língua gestual em tempo real no browser",
    loadingInitializing: "A iniciar...",
    loadingCheckEnvironment: "A verificar ambiente",
    loadingInitHands: "A inicializar MediaPipe Hands",
    loadingApplyConfig: "A aplicar configurações",
    loadingReady: "Pronto a usar",
    loadingLibFail: "Falha ao carregar bibliotecas",
    brandTagline: "Língua gestual em tempo real, sem backend",
    badgeBrowserFirst: "Browser-first",
    badgePages: "GitHub Pages",
    cameraCardTitle: "Câmara e Deteção",
    cameraCardSubtitle: "Posiciona a mão no centro e mantém o gesto estável por 1.5s.",
    signLanguageLabel: "Língua gestual ativa",
    signLanguageAria: "Selecionar língua gestual",
    modeNoteCore: "Modo {language}: otimizado para deteção do alfabeto manual A-Z com uma mão.",
    modeNoteExperimental: "Modo {language}: interface traduzida. O classificador atual ainda usa baseline A-Z de uma mão (experimental para este idioma).",
    cameraPlaceholderTemplate: "Clica em {action} para iniciar o reconhecimento.",
    controlsAriaLabel: "Controlos de reconhecimento",
    btnStart: "Iniciar câmara",
    btnStop: "Parar câmara",
    btnStarting: "A iniciar...",
    btnAdd: "Adicionar letra",
    btnBackspace: "Apagar",
    btnSpace: "Espaço",
    btnClear: "Limpar",
    btnCopy: "Copiar",
    sentenceTitle: "Palavra / Frase formada",
    characterSingular: "caractere",
    characterPlural: "caracteres",
    shortcutHint: "Atalhos: <kbd>Enter</kbd> iniciar/parar, <kbd>+</kbd> adicionar, <kbd>Backspace</kbd> apagar.",
    panelStatsTitle: "Estatísticas",
    statLettersLabel: "Letras detetadas",
    statConfLabel: "Confiança média",
    panelHistoryTitle: "Histórico recente",
    historyEmpty: "Ainda não foi detetada nenhuma letra.",
    panelReferenceTitle: "Referência do Alfabeto Manual",
    panelHowToTitle: "Como usar",
    inst1: "Inicia a câmara e permite acesso no navegador.",
    inst2: "Posiciona a mão com boa iluminação e fundo limpo.",
    inst3: "Mantém o gesto por ~1.5s para auto-adicionar.",
    inst4: "Usa os botões para editar o texto reconhecido.",
    footerText: "Lexis AI corre 100% no navegador. Nenhum vídeo é enviado para servidor.",
    statusReady: "Pronto para iniciar",
    statusLoadingModel: "A carregar modelo",
    statusLoadFailed: "Falha no carregamento",
    statusStartingCamera: "A iniciar câmara",
    statusLive: "Ao vivo",
    statusWaitingCamera: "A aguardar câmara",
    detectedNoDetection: "Sem deteção",
    detectedNoHand: "Sem mão detetada",
    confidencePattern: "{value}% de confiança",
    holdToAutoAdd: "Mantém para auto-adicionar",
    holdSignalDetected: "Gesto detetado. Mantém estável...",
    holdAutoIn: "Auto-adiciona em {seconds}s",
    holdConfirming: "A confirmar...",
    toastAutoAdded: "\"{letter}\" adicionada automaticamente",
    toastTextCleared: "Texto limpo",
    toastTextCopied: "Texto copiado",
    toastModelLoading: "O modelo ainda está a carregar.",
    toastCameraUnsupported: "O navegador não suporta câmara neste contexto.",
    toastMediaPipeFailed: "Não foi possível carregar o MediaPipe. Recarrega a página.",
    toastCameraError: "Erro de câmara: {error}",
    toastLanguageChanged: "Modo alterado para {language}",
    referenceDescription: "Forma de referência para a letra {letter} em {language}.",
    fpsUnit: "fps",
    settingsTitle: "Configurações",
    settingsClose: "Fechar",
    settingHoldDuration: "Tempo para auto-adicionar",
    settingHoldDurationHint: "Tempo que o gesto precisa ser mantido para auto-adicionar a letra.",
    settingMinConfidence: "Confiança mínima",
    settingMinConfidenceHint: "Confiança mínima para considerar uma deteção válida.",
    settingAutoAddConfidence: "Confiança para auto-adicionar",
    settingAutoAddConfidenceHint: "Confiança mínima necessária para auto-adicionar uma letra.",
    settingCooldown: "Intervalo entre adições",
    settingCooldownHint: "Tempo de espera após auto-adicionar antes de aceitar novo gesto.",
    settingSmoothing: "Suavização da deteção",
    settingSmoothingHint: "Frames consecutivos com o mesmo gesto para confirmar. Maior = mais estável.",
    settingReset: "Restaurar padrões",
    settingSaved: "Configuração guardada",
    settingsReset: "Configurações restauradas",
    twoHandNote: "Nota: {language} usa sistema de duas mãos. O classificador atual é otimizado para uma mão (modo experimental).",
    signDescriptionLabel: "Descrição do gesto",
    framesUnit: "frames",
    btnSpeak: "Falar",
    btnExportImg: "Exportar imagem",
    btnFullscreen: "Ecrã inteiro",
    btnExitFullscreen: "Sair do ecrã inteiro",
    toastSpeaking: "A reproduzir texto...",
    toastExported: "Imagem exportada!",
    settingDarkMode: "Tema escuro",
    settingSoundFeedback: "Feedback sonoro",
    settingSoundFeedbackHint: "Emitir um som ao detetar/adicionar uma letra.",
    sessionLabel: "sessão",
    themeToggle: "Alternar tema"
  }
};

const state = {
  isRunning: false,
  isStartingCamera: false,
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
  holdDurationMs: DEFAULT_SETTINGS.holdDurationMs,
  holdCooldownUntil: 0,
  signLanguageId: "libras",
  locale: "pt-BR",
  statusMode: "off",
  statusKey: "statusReady",
  statusVars: {},
  loadStatusKey: "loadingInitializing",
  loadStatusVars: {},
  loadingProgress: 0,
  loadingVisible: true,
  // Settings
  minConfidence: DEFAULT_SETTINGS.minConfidence,
  autoAddConfidence: DEFAULT_SETTINGS.autoAddConfidence,
  cooldownMs: DEFAULT_SETTINGS.cooldownMs,
  detectionSmoothing: DEFAULT_SETTINGS.detectionSmoothing,
  darkMode: DEFAULT_SETTINGS.darkMode,
  soundFeedback: DEFAULT_SETTINGS.soundFeedback,
  // Smoothing buffer
  smoothingBuffer: [],
  smoothedLetter: null,
  smoothedConfidence: 0,
  // Settings modal
  settingsOpen: false,
  // Session timer
  sessionStartTime: null,
  sessionTimerInterval: null,
  // Fullscreen
  isFullscreen: false
};

const ui = {
  loadingOverlay: document.getElementById("loadingOverlay"),
  loadingSubtitle: document.getElementById("loadingSubtitle"),
  loadFill: document.getElementById("loadFill"),
  loadStatus: document.getElementById("loadStatus"),
  appStatus: document.getElementById("appStatus"),
  brandTagline: document.getElementById("brandTagline"),
  badgeBrowserFirst: document.getElementById("badgeBrowserFirst"),
  badgePages: document.getElementById("badgePages"),
  cameraCardTitle: document.getElementById("cameraCardTitle"),
  cameraCardSubtitle: document.getElementById("cameraCardSubtitle"),
  signLanguageLabel: document.getElementById("signLanguageLabel"),
  signLanguageSelect: document.getElementById("signLanguageSelect"),
  modeNote: document.getElementById("modeNote"),
  cameraWrapper: document.getElementById("cameraWrapper"),
  placeholder: document.getElementById("placeholder"),
  cameraPlaceholderText: document.getElementById("cameraPlaceholderText"),
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
  controlsGroup: document.getElementById("controlsGroup"),
  btnStart: document.getElementById("btnStart"),
  btnAdd: document.getElementById("btnAdd"),
  btnBackspace: document.getElementById("btnBackspace"),
  btnSpace: document.getElementById("btnSpace"),
  btnClear: document.getElementById("btnClear"),
  btnCopy: document.getElementById("btnCopy"),
  btnSpeak: document.getElementById("btnSpeak"),
  btnSpeakText: document.getElementById("btnSpeakText"),
  btnExportImg: document.getElementById("btnExportImg"),
  btnExportImgText: document.getElementById("btnExportImgText"),
  btnCopyText: document.getElementById("btnCopyText"),
  btnFullscreen: document.getElementById("btnFullscreen"),
  btnExitFullscreen: document.getElementById("btnExitFullscreen"),
  btnThemeToggle: document.getElementById("btnThemeToggle"),
  sessionTimerRow: document.getElementById("sessionTimerRow"),
  sessionTimerValue: document.getElementById("sessionTimerValue"),
  sessionTimerLabel: document.getElementById("sessionTimerLabel"),
  sentenceTitle: document.getElementById("sentenceTitle"),
  sentenceText: document.getElementById("sentenceText"),
  sentenceCount: document.getElementById("sentenceCount"),
  shortcutHint: document.getElementById("shortcutHint"),
  panelStatsTitle: document.getElementById("panelStatsTitle"),
  statLetters: document.getElementById("statLetters"),
  statLettersLabel: document.getElementById("statLettersLabel"),
  statConf: document.getElementById("statConf"),
  statConfLabel: document.getElementById("statConfLabel"),
  panelHistoryTitle: document.getElementById("panelHistoryTitle"),
  historyRow: document.getElementById("historyRow"),
  panelReferenceTitle: document.getElementById("panelReferenceTitle"),
  alphabetGrid: document.getElementById("alphabetGrid"),
  referenceCard: document.getElementById("referenceCard"),
  refLetter: document.getElementById("refLetter"),
  refEmoji: document.getElementById("refEmoji"),
  refDesc: document.getElementById("refDesc"),
  panelHowToTitle: document.getElementById("panelHowToTitle"),
  inst1: document.getElementById("inst1"),
  inst2: document.getElementById("inst2"),
  inst3: document.getElementById("inst3"),
  inst4: document.getElementById("inst4"),
  footerText: document.getElementById("footerText"),
  toast: document.getElementById("toast"),
  toastMessage: document.getElementById("toastMessage"),
  // Settings
  btnSettings: document.getElementById("btnSettings"),
  settingsOverlay: document.getElementById("settingsOverlay"),
  settingsModalTitle: document.getElementById("settingsModalTitle"),
  btnCloseSettings: document.getElementById("btnCloseSettings"),
  settingHoldDuration: document.getElementById("settingHoldDuration"),
  settingHoldDurationValue: document.getElementById("settingHoldDurationValue"),
  settingHoldDurationLabel: document.getElementById("settingHoldDurationLabel"),
  settingHoldDurationHint: document.getElementById("settingHoldDurationHint"),
  settingMinConfidence: document.getElementById("settingMinConfidence"),
  settingMinConfidenceValue: document.getElementById("settingMinConfidenceValue"),
  settingMinConfidenceLabel: document.getElementById("settingMinConfidenceLabel"),
  settingMinConfidenceHint: document.getElementById("settingMinConfidenceHint"),
  settingAutoAddConfidence: document.getElementById("settingAutoAddConfidence"),
  settingAutoAddConfidenceValue: document.getElementById("settingAutoAddConfidenceValue"),
  settingAutoAddConfidenceLabel: document.getElementById("settingAutoAddConfidenceLabel"),
  settingAutoAddConfidenceHint: document.getElementById("settingAutoAddConfidenceHint"),
  settingCooldown: document.getElementById("settingCooldown"),
  settingCooldownValue: document.getElementById("settingCooldownValue"),
  settingCooldownLabel: document.getElementById("settingCooldownLabel"),
  settingCooldownHint: document.getElementById("settingCooldownHint"),
  settingDetectionSmoothing: document.getElementById("settingDetectionSmoothing"),
  settingDetectionSmoothingValue: document.getElementById("settingDetectionSmoothingValue"),
  settingDetectionSmoothingLabel: document.getElementById("settingDetectionSmoothingLabel"),
  settingDetectionSmoothingHint: document.getElementById("settingDetectionSmoothingHint"),
  btnResetSettings: document.getElementById("btnResetSettings"),
  settingDarkMode: document.getElementById("settingDarkMode"),
  settingDarkModeLabel: document.getElementById("settingDarkModeLabel"),
  settingSoundFeedback: document.getElementById("settingSoundFeedback"),
  settingSoundFeedbackLabel: document.getElementById("settingSoundFeedbackLabel"),
  settingSoundFeedbackHint: document.getElementById("settingSoundFeedbackHint")
};

const metaDescription = document.querySelector('meta[name="description"]');
const ctx = ui.canvas.getContext("2d");

let hands = null;
let camera = null;
let toastTimer = null;

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
    if (value && SIGN_LANGUAGES.some((item) => item.id === value)) {
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
  ui.appStatus.textContent = text;
  ui.statusDot.className = "dot";

  if (state.statusMode === "live") {
    ui.statusDot.classList.add("live");
  }

  if (state.statusMode === "loading") {
    ui.statusDot.classList.add("loading");
  }

  ui.appStatus.classList.remove("badge-live", "badge-warn", "badge-off");

  if (state.statusMode === "live") {
    ui.appStatus.classList.add("badge-live");
  } else if (state.statusMode === "loading") {
    ui.appStatus.classList.add("badge-warn");
  } else {
    ui.appStatus.classList.add("badge-off");
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

function showToastKey(key, vars = {}) {
  showToast(t(key, vars));
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

async function copySentence() {
  if (!state.sentence) {
    return;
  }

  const text = state.sentence.trimEnd();

  try {
    await navigator.clipboard.writeText(text);
    showToastKey("toastTextCopied");
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    showToastKey("toastTextCopied");
  }
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

  for (const letter of LETTERS) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "letter-chip";
    chip.dataset.letter = letter;
    chip.textContent = letter;
    chip.title = getReferenceDescription(letter);
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
  ui.refEmoji.textContent = gestureInfo.emoji;
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

function getLandmarkPos(lms, idx) {
  return { x: lms[idx].x, y: lms[idx].y, z: lms[idx].z };
}

function dist3d(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
}

function vec(a, b) {
  return { x: b.x - a.x, y: b.y - a.y, z: (b.z || 0) - (a.z || 0) };
}

function angleBetweenVectors(v1, v2) {
  const dot = v1.x * v2.x + v1.y * v2.y + (v1.z || 0) * (v2.z || 0);
  const mag1 = Math.sqrt(v1.x ** 2 + v1.y ** 2 + (v1.z || 0) ** 2);
  const mag2 = Math.sqrt(v2.x ** 2 + v2.y ** 2 + (v2.z || 0) ** 2);
  if (mag1 === 0 || mag2 === 0) return 0;
  return Math.acos(Math.max(-1, Math.min(1, dot / (mag1 * mag2))));
}

function fingerJointAngle(mcp, pip, tip) {
  const v1 = vec(pip, mcp);
  const v2 = vec(pip, tip);
  return angleBetweenVectors(v1, v2);
}

function extractHandFeatures(lms) {
  const wrist = lms[0];
  const thumbCmc = lms[1], thumbMcp = lms[2], thumbIp = lms[3], thumbTip = lms[4];
  const indexMcp = lms[5], indexPip = lms[6], indexDip = lms[7], indexTip = lms[8];
  const middleMcp = lms[9], middlePip = lms[10], middleDip = lms[11], middleTip = lms[12];
  const ringMcp = lms[13], ringPip = lms[14], ringDip = lms[15], ringTip = lms[16];
  const pinkyMcp = lms[17], pinkyPip = lms[18], pinkyDip = lms[19], pinkyTip = lms[20];

  // Finger extension – tip above PIP
  const indexExtended = indexTip.y < indexPip.y;
  const middleExtended = middleTip.y < middlePip.y;
  const ringExtended = ringTip.y < ringPip.y;
  const pinkyExtended = pinkyTip.y < pinkyPip.y;

  // Thumb extension – depends on hand side
  const isRightHand = indexMcp.x < pinkyMcp.x;
  const thumbExtended = isRightHand
    ? (thumbTip.x < thumbIp.x && thumbTip.x < thumbMcp.x)
    : (thumbTip.x > thumbIp.x && thumbTip.x > thumbMcp.x);

  // Finger curl angles (smaller = more curled, via joint angle)
  const indexCurl = fingerJointAngle(indexMcp, indexPip, indexTip);
  const middleCurl = fingerJointAngle(middleMcp, middlePip, middleTip);
  const ringCurl = fingerJointAngle(ringMcp, ringPip, ringTip);
  const pinkyCurl = fingerJointAngle(pinkyMcp, pinkyPip, pinkyTip);
  const thumbCurl = fingerJointAngle(thumbCmc, thumbMcp, thumbTip);

  // DIP-based curl for more precise hook detection
  const indexDipAngle = fingerJointAngle(indexPip, indexDip, indexTip);
  const indexHooked = !indexExtended && indexDip.y < indexPip.y && indexTip.y > indexDip.y;

  // Key distances (normalized)
  const thumbIndexDist = dist3d(thumbTip, indexTip);
  const thumbMiddleDist = dist3d(thumbTip, middleTip);
  const thumbRingDist = dist3d(thumbTip, ringTip);
  const indexMiddleDist = dist3d(indexTip, middleTip);
  const middleRingDist = dist3d(middleTip, ringTip);
  const ringPinkyDist = dist3d(ringTip, pinkyTip);
  const thumbPalmDist = dist3d(thumbTip, middleMcp);
  const thumbToIndexMcp = dist3d(thumbTip, indexMcp);

  // Palm-finger distances for closer classification
  const indexTipToPalm = dist3d(indexTip, wrist);
  const thumbTipToWrist = dist3d(thumbTip, wrist);
  const palmWidth = dist3d(indexMcp, pinkyMcp);

  // Fingers pointing direction (sideways vs up vs down)
  const indexPointingSideways = Math.abs(indexTip.y - indexPip.y) < 0.06;
  const indexPointingDown = indexTip.y > indexMcp.y;
  const middlePointingSideways = Math.abs(middleTip.y - middlePip.y) < 0.06;

  // Thumb between index and middle (for T)
  const thumbYBetween = thumbTip.y > Math.min(indexMcp.y, middleMcp.y) - 0.02
    && thumbTip.y < Math.max(indexPip.y, middlePip.y) + 0.02;
  const thumbXBetween = (isRightHand)
    ? (thumbTip.x > middleMcp.x && thumbTip.x < indexMcp.x)
    : (thumbTip.x < middleMcp.x && thumbTip.x > indexMcp.x);
  const thumbBetweenIndexMiddle = thumbYBetween && thumbXBetween;

  // Thumb touching index (for O and similar)
  const thumbTouchingIndex = thumbIndexDist < 0.045;
  const thumbTouchingMiddle = thumbMiddleDist < 0.045;

  const extCount = [thumbExtended, indexExtended, middleExtended, ringExtended, pinkyExtended].filter(Boolean).length;

  return {
    thumb: { extended: thumbExtended, curl: thumbCurl, tip: thumbTip, mcp: thumbMcp },
    index: { extended: indexExtended, curl: indexCurl, tip: indexTip, pip: indexPip, mcp: indexMcp, hooked: indexHooked, dipAngle: indexDipAngle, pointingSideways: indexPointingSideways, pointingDown: indexPointingDown },
    middle: { extended: middleExtended, curl: middleCurl, tip: middleTip, pip: middlePip, mcp: middleMcp, pointingSideways: middlePointingSideways },
    ring: { extended: ringExtended, curl: ringCurl, tip: ringTip },
    pinky: { extended: pinkyExtended, curl: pinkyCurl, tip: pinkyTip },
    distances: {
      thumbIndex: thumbIndexDist,
      thumbMiddle: thumbMiddleDist,
      thumbRing: thumbRingDist,
      indexMiddle: indexMiddleDist,
      middleRing: middleRingDist,
      ringPinky: ringPinkyDist,
      thumbPalm: thumbPalmDist,
      thumbToIndexMcp: thumbToIndexMcp,
      indexTipToPalm: indexTipToPalm,
      thumbTipToWrist: thumbTipToWrist,
      palmWidth: palmWidth
    },
    thumbBetweenIndexMiddle,
    thumbTouchingIndex,
    thumbTouchingMiddle,
    extCount,
    isRightHand,
    wrist,
    landmarks: lms
  };
}

function classifyGesture(lms) {
  if (!lms || lms.length < 21) {
    return { letter: null, confidence: 0 };
  }

  const f = extractHandFeatures(lms);
  const results = [];
  const add = (letter, conf) => results.push({ letter, conf: Math.min(conf, 0.98) });

  const noFingersUp = !f.index.extended && !f.middle.extended && !f.ring.extended && !f.pinky.extended;
  const twoFingersUp = f.index.extended && f.middle.extended && !f.ring.extended && !f.pinky.extended;
  const threeFingersUp = f.index.extended && f.middle.extended && f.ring.extended && !f.pinky.extended;
  const fourFingersUp = f.index.extended && f.middle.extended && f.ring.extended && f.pinky.extended;
  const onlyIndex = f.index.extended && !f.middle.extended && !f.ring.extended && !f.pinky.extended;

  // ── A: Fist, thumb to side ──
  if (noFingersUp) {
    if (f.thumb.extended && f.distances.thumbPalm > 0.055) {
      add("A", 0.84);
    } else if (f.thumb.extended) {
      add("A", 0.72);
    }
  }

  // ── B: All 4 fingers up, thumb folded ──
  if (fourFingersUp && !f.thumb.extended) {
    const fingersTight = f.distances.indexMiddle < 0.05 && f.distances.middleRing < 0.05;
    add("B", fingersTight ? 0.9 : 0.78);
  }
  // B variant: all 5 up
  if (f.extCount === 5) {
    add("B", 0.62);
  }

  // ── C: Curved hand (C shape) ──
  if (f.extCount <= 2 && !noFingersUp) {
    if (f.distances.thumbIndex > 0.05 && f.distances.thumbIndex < 0.16) {
      if (f.index.curl > 0.4 && f.index.curl < 2.8) {
        add("C", 0.74);
      }
    }
  }
  if (noFingersUp && f.thumb.extended && f.distances.thumbIndex > 0.08 && f.distances.thumbIndex < 0.16) {
    add("C", 0.68);
  }

  // ── D: Index up, others + thumb form circle ──
  if (onlyIndex && !f.index.pointingSideways) {
    if (f.thumbTouchingMiddle || f.distances.thumbMiddle < 0.06) {
      add("D", 0.85);
    } else {
      add("D", 0.72);
    }
  }

  // ── E: Fingers curled over thumb ──
  if (noFingersUp && !f.thumb.extended) {
    if (f.distances.thumbIndex < 0.04 && f.distances.thumbPalm < 0.07) {
      add("E", 0.78);
    } else if (f.distances.thumbPalm < 0.06) {
      add("E", 0.65);
    }
  }

  // ── F: OK sign (thumb+index circle), 3 fingers up ──
  if (f.middle.extended && f.ring.extended && f.pinky.extended && !f.index.extended) {
    if (f.thumbTouchingIndex || f.distances.thumbIndex < 0.05) {
      add("F", 0.88);
    }
  }
  if (f.middle.extended && f.ring.extended && f.pinky.extended && f.distances.thumbIndex < 0.04) {
    add("F", 0.82);
  }

  // ── G: Index and thumb pointing sideways ──
  if (onlyIndex && f.index.pointingSideways && f.thumb.extended) {
    if (!f.index.pointingDown) {
      add("G", 0.80);
    }
  }

  // ── H: Index and middle pointing sideways ──
  if (twoFingersUp && f.index.pointingSideways && f.middle.pointingSideways) {
    add("H", 0.82);
  }

  // ── I: Pinky extended only ──
  if (!f.index.extended && !f.middle.extended && !f.ring.extended && f.pinky.extended) {
    if (!f.thumb.extended) {
      add("I", 0.88);
    } else {
      add("I", 0.74);
    }
  }

  // ── J: Like I but traced (motion – static same as I, lower conf) ──
  if (!f.index.extended && !f.middle.extended && !f.ring.extended && f.pinky.extended) {
    add("J", 0.52);
  }

  // ── K: Index and middle up spread, thumb between ──
  if (twoFingersUp && !f.index.pointingSideways && f.thumb.extended) {
    if (f.distances.indexMiddle > 0.035) {
      add("K", 0.80);
    }
  }

  // ── L: Index up, thumb out (L shape) ──
  if (onlyIndex && f.thumb.extended && !f.index.pointingSideways) {
    if (f.distances.thumbIndex > 0.07) {
      add("L", 0.86);
    }
  }

  // ── M: Fist, thumb under 3 fingers ──
  if (noFingersUp && !f.thumb.extended) {
    if (f.distances.thumbPalm < 0.06 && f.thumb.tip.y > f.index.mcp.y) {
      add("M", 0.62);
    }
  }

  // ── N: Fist, thumb under 2 fingers ──
  if (noFingersUp && !f.thumb.extended) {
    if (f.distances.thumbPalm < 0.065) {
      add("N", 0.58);
    }
  }

  // ── O: All fingers and thumb meet forming circle ──
  if (noFingersUp || f.extCount <= 1) {
    if (f.thumbTouchingIndex && f.distances.thumbPalm > 0.03) {
      add("O", 0.80);
    }
  }

  // ── P: Like K pointing down ──
  if (twoFingersUp && f.index.pointingDown) {
    add("P", 0.76);
  }

  // ── Q: Like G pointing down ──
  if (onlyIndex && f.index.pointingDown && f.thumb.extended) {
    add("Q", 0.74);
  }

  // ── R: Index and middle crossed ──
  if (twoFingersUp && !f.index.pointingSideways) {
    if (f.distances.indexMiddle < 0.025) {
      add("R", 0.83);
    }
  }

  // ── S: Fist with thumb over fingers ──
  if (noFingersUp && !f.thumb.extended) {
    if (f.distances.thumbPalm < 0.08 && !f.thumbBetweenIndexMiddle) {
      add("S", 0.70);
    }
  }

  // ── T: Thumb between index and middle ──
  if (noFingersUp && f.thumbBetweenIndexMiddle) {
    add("T", 0.78);
  }

  // ── U: Index and middle up together ──
  if (twoFingersUp && !f.index.pointingSideways) {
    if (f.distances.indexMiddle < 0.04 && f.distances.indexMiddle >= 0.01) {
      add("U", 0.84);
    }
  }

  // ── V: Index and middle up spread (peace sign) ──
  if (twoFingersUp && !f.index.pointingSideways) {
    if (f.distances.indexMiddle >= 0.04) {
      add("V", 0.85);
    }
  }

  // ── W: Three fingers up spread ──
  if (threeFingersUp && !f.thumb.extended) {
    add("W", 0.85);
  }
  if (threeFingersUp && f.thumb.extended) {
    add("W", 0.75);
  }

  // ── X: Index hooked ──
  if (f.index.hooked && !f.middle.extended && !f.ring.extended && !f.pinky.extended) {
    add("X", 0.78);
  }

  // ── Y: Thumb and pinky out ──
  if (f.thumb.extended && !f.index.extended && !f.middle.extended && !f.ring.extended && f.pinky.extended) {
    add("Y", 0.88);
  }

  // ── Z: Index traces Z (motion-based, static ≈ just index up) ──
  if (onlyIndex && !f.index.pointingSideways && !f.thumb.extended) {
    add("Z", 0.48);
  }

  if (!results.length) {
    return { letter: null, confidence: 0 };
  }

  results.sort((a, b) => b.conf - a.conf);
  return { letter: results[0].letter, confidence: results[0].conf };
}

function smoothDetection(letter, confidence) {
  if (!letter) {
    state.smoothingBuffer = [];
    state.smoothedLetter = null;
    state.smoothedConfidence = 0;
    return { letter: null, confidence: 0 };
  }

  state.smoothingBuffer.push({ letter, confidence });
  if (state.smoothingBuffer.length > state.detectionSmoothing) {
    state.smoothingBuffer.shift();
  }

  if (state.smoothingBuffer.length < Math.min(state.detectionSmoothing, 2)) {
    return { letter, confidence: confidence * 0.8 };
  }

  // Count occurrences in buffer
  const counts = {};
  let totalConf = {};
  for (const entry of state.smoothingBuffer) {
    counts[entry.letter] = (counts[entry.letter] || 0) + 1;
    totalConf[entry.letter] = (totalConf[entry.letter] || 0) + entry.confidence;
  }

  // Find most common letter
  let bestLetter = null;
  let bestCount = 0;
  for (const [l, c] of Object.entries(counts)) {
    if (c > bestCount) {
      bestCount = c;
      bestLetter = l;
    }
  }

  const consistency = bestCount / state.smoothingBuffer.length;
  const avgConf = totalConf[bestLetter] / bestCount;
  const smoothedConf = avgConf * (0.7 + 0.3 * consistency);

  state.smoothedLetter = bestLetter;
  state.smoothedConfidence = smoothedConf;

  return { letter: bestLetter, confidence: smoothedConf };
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

    const raw = classifyGesture(landmarks);
    const { letter, confidence } = smoothDetection(raw.letter, raw.confidence);
    state.currentLetter = letter;
    state.confidence = confidence;

    updateDetectedDisplay(letter, confidence);
    handleAutoAdd(letter, confidence);
  } else {
    state.currentLetter = null;
    state.confidence = 0;
    smoothDetection(null, 0);
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
  ui.badgeBrowserFirst.textContent = t("badgeBrowserFirst");
  ui.badgePages.textContent = t("badgePages");

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
  const selected = getSignLanguageById(signLanguageId);

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
    option.textContent = signLanguage.label;
    ui.signLanguageSelect.appendChild(option);
  }
}

// ─── Settings Management ────────────────────────────────────

function readStoredSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch {
    // Ignore
  }
  return { ...DEFAULT_SETTINGS };
}

function saveSettings() {
  try {
    const settings = {
      holdDurationMs: state.holdDurationMs,
      minConfidence: state.minConfidence,
      autoAddConfidence: state.autoAddConfidence,
      cooldownMs: state.cooldownMs,
      detectionSmoothing: state.detectionSmoothing,
      darkMode: state.darkMode,
      soundFeedback: state.soundFeedback
    };
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Ignore
  }
}

function applySettings(settings) {
  state.holdDurationMs = settings.holdDurationMs;
  state.minConfidence = settings.minConfidence;
  state.autoAddConfidence = settings.autoAddConfidence;
  state.cooldownMs = settings.cooldownMs;
  state.detectionSmoothing = settings.detectionSmoothing;
  state.darkMode = settings.darkMode ?? DEFAULT_SETTINGS.darkMode;
  state.soundFeedback = settings.soundFeedback ?? DEFAULT_SETTINGS.soundFeedback;

  // Update range inputs
  ui.settingHoldDuration.value = settings.holdDurationMs;
  ui.settingMinConfidence.value = Math.round(settings.minConfidence * 100);
  ui.settingAutoAddConfidence.value = Math.round(settings.autoAddConfidence * 100);
  ui.settingCooldown.value = settings.cooldownMs;
  ui.settingDetectionSmoothing.value = settings.detectionSmoothing;
  ui.settingDarkMode.checked = state.darkMode;
  ui.settingSoundFeedback.checked = state.soundFeedback;

  applyTheme(state.darkMode);
  renderSettingsValues();
}

function renderSettingsValues() {
  ui.settingHoldDurationValue.textContent = `${(state.holdDurationMs / 1000).toFixed(1)}s`;
  ui.settingMinConfidenceValue.textContent = `${Math.round(state.minConfidence * 100)}%`;
  ui.settingAutoAddConfidenceValue.textContent = `${Math.round(state.autoAddConfidence * 100)}%`;
  ui.settingCooldownValue.textContent = `${(state.cooldownMs / 1000).toFixed(1)}s`;
  ui.settingDetectionSmoothingValue.textContent = `${state.detectionSmoothing} ${t("framesUnit")}`;
}

function resetSettings() {
  applySettings(DEFAULT_SETTINGS);
  saveSettings();
  showToastKey("settingsReset");
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

// ─── Sound Feedback ──────────────────────────────────────────

const audioCtx = (() => {
  try { return new (window.AudioContext || window.webkitAudioContext)(); }
  catch { return null; }
})();

function playTone(freq = 880, duration = 80, type = "sine") {
  if (!state.soundFeedback || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration / 1000);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration / 1000);
  } catch { /* ignore */ }
}

function playAutoAddSound() { playTone(1046, 120, "sine"); }
function playDetectionSound() { playTone(660, 60, "triangle"); }

// ─── Text-to-Speech ──────────────────────────────────────────

function speakText() {
  if (!state.sentence || !window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(state.sentence.trim());
  
  // Map locale to speech lang
  const langMap = {
    "pt-BR": "pt-BR",
    "pt-PT": "pt-PT",
    "en": "en-US",
    "ur": "ur",
    "zh-CN": "zh-CN",
    "ja": "ja-JP"
  };
  utterance.lang = langMap[state.locale] || state.locale;
  utterance.rate = 0.9;
  utterance.pitch = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  showToastKey("toastSpeaking");
}

// ─── Export as Image ─────────────────────────────────────────

function exportAsImage() {
  if (!state.sentence) return;

  const canvas = document.createElement("canvas");
  const w = 800, h = 400;
  canvas.width = w;
  canvas.height = h;
  const c = canvas.getContext("2d");

  // Background gradient
  const grad = c.createLinearGradient(0, 0, w, h);
  if (state.darkMode) {
    grad.addColorStop(0, "#0b1120");
    grad.addColorStop(1, "#1e293b");
  } else {
    grad.addColorStop(0, "#f0f9ff");
    grad.addColorStop(1, "#e0f2fe");
  }
  c.fillStyle = grad;
  c.fillRect(0, 0, w, h);

  // Border (manual rounded rect for broader browser support)
  c.strokeStyle = state.darkMode ? "rgba(34,211,238,0.3)" : "rgba(14,116,144,0.2)";
  c.lineWidth = 3;
  const bx = 8, by = 8, bw = w - 16, bh = h - 16, br = 16;
  c.beginPath();
  c.moveTo(bx + br, by);
  c.lineTo(bx + bw - br, by);
  c.quadraticCurveTo(bx + bw, by, bx + bw, by + br);
  c.lineTo(bx + bw, by + bh - br);
  c.quadraticCurveTo(bx + bw, by + bh, bx + bw - br, by + bh);
  c.lineTo(bx + br, by + bh);
  c.quadraticCurveTo(bx, by + bh, bx, by + bh - br);
  c.lineTo(bx, by + br);
  c.quadraticCurveTo(bx, by, bx + br, by);
  c.closePath();
  c.stroke();

  // Logo
  c.font = "bold 20px 'Sora', sans-serif";
  c.fillStyle = state.darkMode ? "#22d3ee" : "#0e7490";
  c.textAlign = "left";
  c.fillText("Lexis AI", 32, 48);

  // Language badge
  const lang = getActiveSignLanguage();
  c.font = "12px 'IBM Plex Mono', monospace";
  c.fillStyle = state.darkMode ? "#94a3b8" : "#64748b";
  c.fillText(lang.label, 32, 68);

  // Main text
  c.font = "bold 36px 'Sora', sans-serif";
  c.fillStyle = state.darkMode ? "#f1f5f9" : "#0f172a";
  c.textAlign = "center";

  // Word wrap
  const words = state.sentence.split("");
  const maxWidth = w - 80;
  let line = "";
  let y = h / 2 - 10;
  const lines = [];
  
  for (const char of words) {
    const testLine = line + char;
    if (c.measureText(testLine).width > maxWidth) {
      lines.push(line);
      line = char;
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  const lineHeight = 46;
  const startY = y - ((lines.length - 1) / 2) * lineHeight;
  
  for (let i = 0; i < lines.length; i++) {
    c.fillText(lines[i], w / 2, startY + i * lineHeight);
  }

  // Footer
  c.font = "11px 'IBM Plex Mono', monospace";
  c.fillStyle = state.darkMode ? "#64748b" : "#94a3b8";
  c.textAlign = "center";
  c.fillText("lexis-ai • sign language recognition", w / 2, h - 28);

  // Download
  const link = document.createElement("a");
  link.download = `lexis-ai-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
  showToastKey("toastExported");
}

// ─── Session Timer ───────────────────────────────────────────

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
  if (!state.sessionStartTime) return;
  const elapsed = Math.floor((Date.now() - state.sessionStartTime) / 1000);
  const mins = Math.floor(elapsed / 60).toString().padStart(2, "0");
  const secs = (elapsed % 60).toString().padStart(2, "0");
  ui.sessionTimerValue.textContent = `${mins}:${secs}`;
}

// ─── Confetti ────────────────────────────────────────────────

function spawnConfetti() {
  const container = document.createElement("div");
  container.className = "confetti-container";
  document.body.appendChild(container);

  const colors = ["#22d3ee", "#f97316", "#4ade80", "#f472b6", "#a78bfa", "#fbbf24"];

  for (let i = 0; i < 40; i++) {
    const piece = document.createElement("div");
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

// ─── Fullscreen Mode ─────────────────────────────────────────

function enterFullscreen() {
  const card = document.querySelector(".camera-card");
  card.classList.add("fullscreen-mode");
  state.isFullscreen = true;
  document.body.style.overflow = "hidden";
}

function exitFullscreen() {
  const card = document.querySelector(".camera-card");
  card.classList.remove("fullscreen-mode");
  state.isFullscreen = false;
  document.body.style.overflow = "";
}

function toggleFullscreen() {
  if (state.isFullscreen) {
    exitFullscreen();
  } else {
    enterFullscreen();
  }
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
    if (e.target === ui.settingsOverlay) closeSettings();
  });

  ui.settingHoldDuration.addEventListener("input", (e) => {
    state.holdDurationMs = parseInt(e.target.value, 10);
    renderSettingsValues();
    saveSettings();
  });

  ui.settingMinConfidence.addEventListener("input", (e) => {
    state.minConfidence = parseInt(e.target.value, 10) / 100;
    renderSettingsValues();
    saveSettings();
  });

  ui.settingAutoAddConfidence.addEventListener("input", (e) => {
    state.autoAddConfidence = parseInt(e.target.value, 10) / 100;
    renderSettingsValues();
    saveSettings();
  });

  ui.settingCooldown.addEventListener("input", (e) => {
    state.cooldownMs = parseInt(e.target.value, 10);
    renderSettingsValues();
    saveSettings();
  });

  ui.settingDetectionSmoothing.addEventListener("input", (e) => {
    state.detectionSmoothing = parseInt(e.target.value, 10);
    state.smoothingBuffer = [];
    renderSettingsValues();
    saveSettings();
  });

  ui.btnResetSettings.addEventListener("click", resetSettings);

  // Dark mode toggle
  ui.settingDarkMode.addEventListener("change", (e) => {
    applyTheme(e.target.checked);
    saveSettings();
  });

  // Sound feedback toggle
  ui.settingSoundFeedback.addEventListener("change", (e) => {
    state.soundFeedback = e.target.checked;
    saveSettings();
    if (e.target.checked) playDetectionSound();
  });

  // Close on Escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && state.settingsOpen) {
      closeSettings();
    }
  });
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
