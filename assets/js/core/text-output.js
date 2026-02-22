export function createTextOutputController({
  state,
  getActiveSignLanguage,
  showToastKey
}) {
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

  function speakText() {
    const text = state.sentence?.trim();
    if (!text) {
      return;
    }

    const synth = window.speechSynthesis;
    if (!synth || typeof window.SpeechSynthesisUtterance === "undefined") {
      showToastKey("toastSpeechUnavailable");
      return;
    }

    const langMap = {
      "pt-BR": "pt-BR",
      "pt-PT": "pt-PT",
      en: "en-US",
      ur: "ur",
      "zh-CN": "zh-CN",
      ja: "ja-JP"
    };

    const preferredLang = langMap[state.locale] || state.locale || "pt-BR";

    const pickVoice = (voices) => {
      const exact = voices.find((voice) => voice.lang === preferredLang);
      if (exact) {
        return exact;
      }

      const preferredBase = preferredLang.split("-")[0];
      const sameFamily = voices.find((voice) => voice.lang?.toLowerCase().startsWith(`${preferredBase.toLowerCase()}-`));
      if (sameFamily) {
        return sameFamily;
      }

      return voices.find((voice) => voice.default) || voices[0] || null;
    };

    let spoken = false;

    const speakNow = () => {
      if (spoken) {
        return;
      }

      spoken = true;
      const utterance = new SpeechSynthesisUtterance(text);
      let started = false;
      let settled = false;

      utterance.lang = preferredLang;
      utterance.rate = 0.9;
      utterance.pitch = 1;

      utterance.onstart = () => {
        if (settled) {
          return;
        }
        started = true;
        showToastKey("toastSpeaking");
      };

      utterance.onerror = () => {
        if (settled) {
          return;
        }
        settled = true;
        showToastKey("toastSpeechUnavailable");
      };

      utterance.onend = () => {
        settled = true;
      };

      const voices = synth.getVoices();
      const voice = pickVoice(voices);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang || preferredLang;
      }

      synth.cancel();
      synth.speak(utterance);

      setTimeout(() => {
        if (started || settled) {
          return;
        }

        settled = true;
        showToastKey("toastSpeechUnavailable");
      }, 1200);
    };

    const voices = synth.getVoices();
    if (voices.length > 0) {
      speakNow();
      return;
    }

    const handleVoicesChanged = () => {
      if (typeof synth.removeEventListener === "function") {
        synth.removeEventListener("voiceschanged", handleVoicesChanged);
      }
      speakNow();
    };

    if (typeof synth.addEventListener === "function") {
      synth.addEventListener("voiceschanged", handleVoicesChanged, { once: true });
    }

    setTimeout(() => {
      if (typeof synth.removeEventListener === "function") {
        synth.removeEventListener("voiceschanged", handleVoicesChanged);
      }
      speakNow();
    }, 300);
  }

  function exportAsImage() {
    if (!state.sentence) {
      return;
    }

    const canvas = document.createElement("canvas");
    const w = 800;
    const h = 400;
    canvas.width = w;
    canvas.height = h;
    const c = canvas.getContext("2d");

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

    c.strokeStyle = state.darkMode ? "rgba(34,211,238,0.3)" : "rgba(14,116,144,0.2)";
    c.lineWidth = 3;
    const bx = 8;
    const by = 8;
    const bw = w - 16;
    const bh = h - 16;
    const br = 16;
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

    c.font = "bold 20px 'Sora', sans-serif";
    c.fillStyle = state.darkMode ? "#22d3ee" : "#0e7490";
    c.textAlign = "left";
    c.fillText("Lexis AI", 32, 48);

    const lang = getActiveSignLanguage();
    c.font = "12px 'IBM Plex Mono', monospace";
    c.fillStyle = state.darkMode ? "#94a3b8" : "#64748b";
    c.fillText(lang.label, 32, 68);

    c.font = "bold 36px 'Sora', sans-serif";
    c.fillStyle = state.darkMode ? "#f1f5f9" : "#0f172a";
    c.textAlign = "center";

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

    c.font = "11px 'IBM Plex Mono', monospace";
    c.fillStyle = state.darkMode ? "#64748b" : "#94a3b8";
    c.textAlign = "center";
    c.fillText("lexis-ai • sign language recognition", w / 2, h - 28);

    const link = document.createElement("a");
    link.download = `lexis-ai-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToastKey("toastExported");
  }

  return {
    copySentence,
    speakText,
    exportAsImage
  };
}
