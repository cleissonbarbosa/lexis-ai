export function smoothDetection(state, letter, confidence) {
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

  const counts = {};
  const totalConf = {};
  for (const entry of state.smoothingBuffer) {
    counts[entry.letter] = (counts[entry.letter] || 0) + 1;
    totalConf[entry.letter] = (totalConf[entry.letter] || 0) + entry.confidence;
  }

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
