export const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
export const STORAGE_KEY = "lexis-ai-sign-language";
export const SETTINGS_STORAGE_KEY = "lexis-ai-settings";
export const FALLBACK_LOCALE = "en";

export const DEFAULT_SETTINGS = {
  holdDurationMs: 1500,
  minConfidence: 0.65,
  autoAddConfidence: 0.70,
  cooldownMs: 900,
  detectionSmoothing: 3,
  darkMode: false,
  soundFeedback: true
};

export const SIGN_LANGUAGES = [
  {
    id: "libras",
    locale: "pt-BR",
    support: "core",
    available: true,
    label: "Libras"
  },
  {
    id: "asl",
    locale: "en",
    support: "core",
    available: false,
    label: "ASL (American Sign Language)"
  },
  {
    id: "bsl",
    locale: "en",
    support: "experimental",
    available: false,
    label: "BSL (British Sign Language)"
  },
  {
    id: "ipsl",
    locale: "ur",
    support: "experimental",
    available: false,
    label: "Indo-Pakistani Sign Language"
  },
  {
    id: "csl",
    locale: "zh-CN",
    support: "experimental",
    available: false,
    label: "Chinese Sign Language (Zhōngguó Shǒuyǔ)"
  },
  {
    id: "jsl",
    locale: "ja",
    support: "experimental",
    available: false,
    label: "Japanese Sign Language (Nihon Shūwa)"
  },
  {
    id: "lgp",
    locale: "pt-PT",
    support: "experimental",
    available: false,
    label: "LGP (Língua Gestual Portuguesa)"
  }
];
