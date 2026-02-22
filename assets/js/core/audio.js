export function createAudioController(state) {
  const audioCtx = (() => {
    try {
      return new (window.AudioContext || window.webkitAudioContext)();
    } catch {
      return null;
    }
  })();

  function playTone(freq = 880, duration = 80, type = "sine") {
    if (!state.soundFeedback || !audioCtx) {
      return;
    }

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
    } catch {
      // Ignore audio runtime errors.
    }
  }

  function playAutoAddSound() {
    playTone(1046, 120, "sine");
  }

  function playDetectionSound() {
    playTone(660, 60, "triangle");
  }

  return {
    playTone,
    playAutoAddSound,
    playDetectionSound
  };
}
