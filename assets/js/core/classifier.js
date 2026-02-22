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

  const indexExtended = indexTip.y < indexPip.y;
  const middleExtended = middleTip.y < middlePip.y;
  const ringExtended = ringTip.y < ringPip.y;
  const pinkyExtended = pinkyTip.y < pinkyPip.y;

  const isRightHand = indexMcp.x < pinkyMcp.x;
  const thumbExtended = isRightHand
    ? (thumbTip.x < thumbIp.x && thumbTip.x < thumbMcp.x)
    : (thumbTip.x > thumbIp.x && thumbTip.x > thumbMcp.x);

  const indexCurl = fingerJointAngle(indexMcp, indexPip, indexTip);
  const middleCurl = fingerJointAngle(middleMcp, middlePip, middleTip);
  const ringCurl = fingerJointAngle(ringMcp, ringPip, ringTip);
  const pinkyCurl = fingerJointAngle(pinkyMcp, pinkyPip, pinkyTip);
  const thumbCurl = fingerJointAngle(thumbCmc, thumbMcp, thumbTip);

  const indexDipAngle = fingerJointAngle(indexPip, indexDip, indexTip);
  const indexHooked = !indexExtended && indexDip.y < indexPip.y && indexTip.y > indexDip.y;

  const thumbIndexDist = dist3d(thumbTip, indexTip);
  const thumbMiddleDist = dist3d(thumbTip, middleTip);
  const thumbRingDist = dist3d(thumbTip, ringTip);
  const thumbPinkyDist = dist3d(thumbTip, pinkyTip);
  const indexMiddleDist = dist3d(indexTip, middleTip);
  const middleRingDist = dist3d(middleTip, ringTip);
  const ringPinkyDist = dist3d(ringTip, pinkyTip);
  const thumbPalmDist = dist3d(thumbTip, middleMcp);
  const thumbToIndexMcp = dist3d(thumbTip, indexMcp);
  const thumbToIndexPip = dist3d(thumbTip, indexPip);

  const indexTipToPalm = dist3d(indexTip, wrist);
  const thumbTipToWrist = dist3d(thumbTip, wrist);
  const palmWidth = dist3d(indexMcp, pinkyMcp);

  const indexPointingSideways = Math.abs(indexTip.y - indexPip.y) < 0.06;
  const indexPointingDown = indexTip.y > indexMcp.y;
  const middlePointingSideways = Math.abs(middleTip.y - middlePip.y) < 0.06;

  const thumbYBetween = thumbTip.y > Math.min(indexMcp.y, middleMcp.y) - 0.02
    && thumbTip.y < Math.max(indexPip.y, middlePip.y) + 0.02;
  const thumbXBetween = (isRightHand)
    ? (thumbTip.x > middleMcp.x && thumbTip.x < indexMcp.x)
    : (thumbTip.x < middleMcp.x && thumbTip.x > indexMcp.x);
  const thumbBetweenIndexMiddle = thumbYBetween && thumbXBetween;

  const thumbTouchingIndex = thumbIndexDist < 0.045;
  const thumbTouchingMiddle = thumbMiddleDist < 0.045;

  // thumb tip is above (visually higher than) all finger knuckles — S posture
  const thumbAboveKnuckles = thumbTip.y < Math.min(indexMcp.y, middleMcp.y, ringMcp.y, pinkyMcp.y);

  // thumb is below finger PIPs — thumb tucked under (M/N/E posture)
  const thumbBelowPips = thumbTip.y > Math.min(indexPip.y, middlePip.y);

  // thumb tip pointing upward (tip higher than its own MCP)
  const thumbPointingUp = thumbTip.y < thumbMcp.y;

  // fingers spread: check distances between adjacent fingertips
  const fingersTight = indexMiddleDist < 0.05 && middleRingDist < 0.05 && ringPinkyDist < 0.05;

  const extCount = [thumbExtended, indexExtended, middleExtended, ringExtended, pinkyExtended].filter(Boolean).length;

  return {
    thumb: { extended: thumbExtended, curl: thumbCurl, tip: thumbTip, mcp: thumbMcp, ip: thumbIp },
    index: { extended: indexExtended, curl: indexCurl, tip: indexTip, pip: indexPip, mcp: indexMcp, hooked: indexHooked, dipAngle: indexDipAngle, pointingSideways: indexPointingSideways, pointingDown: indexPointingDown },
    middle: { extended: middleExtended, curl: middleCurl, tip: middleTip, pip: middlePip, mcp: middleMcp, pointingSideways: middlePointingSideways },
    ring: { extended: ringExtended, curl: ringCurl, tip: ringTip, mcp: ringMcp, pip: ringPip },
    pinky: { extended: pinkyExtended, curl: pinkyCurl, tip: pinkyTip, mcp: pinkyMcp, pip: pinkyPip },
    distances: {
      thumbIndex: thumbIndexDist,
      thumbMiddle: thumbMiddleDist,
      thumbRing: thumbRingDist,
      thumbPinky: thumbPinkyDist,
      indexMiddle: indexMiddleDist,
      middleRing: middleRingDist,
      ringPinky: ringPinkyDist,
      thumbPalm: thumbPalmDist,
      thumbToIndexMcp: thumbToIndexMcp,
      thumbToIndexPip: thumbToIndexPip,
      indexTipToPalm: indexTipToPalm,
      thumbTipToWrist: thumbTipToWrist,
      palmWidth: palmWidth
    },
    thumbBetweenIndexMiddle,
    thumbTouchingIndex,
    thumbTouchingMiddle,
    thumbAboveKnuckles,
    thumbBelowPips,
    thumbPointingUp,
    fingersTight,
    extCount,
    isRightHand,
    wrist,
    landmarks: lms
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Generic / ASL classifier
// ─────────────────────────────────────────────────────────────────────────────
function classifyGeneric(f) {
  const results = [];
  const add = (letter, conf) => results.push({ letter, conf: Math.min(conf, 0.98) });

  const noFingersUp = !f.index.extended && !f.middle.extended && !f.ring.extended && !f.pinky.extended;
  const twoFingersUp = f.index.extended && f.middle.extended && !f.ring.extended && !f.pinky.extended;
  const threeFingersUp = f.index.extended && f.middle.extended && f.ring.extended && !f.pinky.extended;
  const fourFingersUp = f.index.extended && f.middle.extended && f.ring.extended && f.pinky.extended;
  const onlyIndex = f.index.extended && !f.middle.extended && !f.ring.extended && !f.pinky.extended;
  const onlyPinky = !f.index.extended && !f.middle.extended && !f.ring.extended && f.pinky.extended;

  // ── B ──────────────────────────────────────────────────────────────
  if (fourFingersUp && !f.thumb.extended) {
    const tight = f.distances.indexMiddle < 0.05 && f.distances.middleRing < 0.05 && f.distances.ringPinky < 0.05;
    add("B", tight ? 0.92 : 0.80);
  }
  if (f.extCount === 5) add("B", 0.60);

  // ── C / Ç ──────────────────────────────────────────────────────────
  if (f.extCount <= 2 && !noFingersUp) {
    if (f.distances.thumbIndex > 0.05 && f.distances.thumbIndex < 0.17) {
      if (f.index.curl > 0.35 && f.index.curl < 2.9) {
        add("C", 0.76);
        add("Ç", 0.72);
      }
    }
  }
  if (noFingersUp && f.thumb.extended && f.distances.thumbIndex > 0.08 && f.distances.thumbIndex < 0.17) {
    add("C", 0.70);
    add("Ç", 0.66);
  }

  // ── D ──────────────────────────────────────────────────────────────
  if (onlyIndex && !f.index.pointingSideways) {
    if (f.thumbTouchingMiddle || f.distances.thumbMiddle < 0.06) add("D", 0.87);
    else if (f.distances.thumbIndex < 0.07) add("D", 0.76);
    else add("D", 0.68);
  }

  // ── F ──────────────────────────────────────────────────────────────
  if (f.middle.extended && f.ring.extended && f.pinky.extended && !f.index.extended) {
    if (f.thumbTouchingIndex || f.distances.thumbIndex < 0.05) add("F", 0.90);
    else if (f.distances.thumbIndex < 0.07) add("F", 0.80);
  }

  // ── G ──────────────────────────────────────────────────────────────
  // ASL G: index and thumb pointing sideways
  if (onlyIndex && f.index.pointingSideways && f.thumb.extended && !f.index.pointingDown) {
    add("G", 0.82);
  }

  // ── H ──────────────────────────────────────────────────────────────
  // ASL H: index and middle pointing sideways
  if (twoFingersUp && f.index.pointingSideways && f.middle.pointingSideways) {
    add("H", 0.84);
  }

  // ── I / J ──────────────────────────────────────────────────────────
  if (onlyPinky && !f.thumb.extended) {
    add("I", 0.90);
    add("J", 0.50);
  }

  // ── K ──────────────────────────────────────────────────────────────
  if (twoFingersUp && !f.index.pointingSideways && f.thumb.extended) {
    if (f.distances.indexMiddle > 0.04) add("K", 0.82);
  }

  // ── L ──────────────────────────────────────────────────────────────
  if (onlyIndex && f.thumb.extended && !f.index.pointingSideways) {
    if (f.distances.thumbIndex > 0.07) add("L", 0.88);
  }

  // ── O ──────────────────────────────────────────────────────────────
  if (noFingersUp || f.extCount <= 1) {
    if (f.thumbTouchingIndex && f.distances.thumbPalm > 0.03 && !f.thumb.extended) {
      add("O", 0.84);
    }
  }

  // ── P ──────────────────────────────────────────────────────────────
  // ASL P: like K but pointing downward
  if (twoFingersUp && f.index.pointingDown) add("P", 0.78);

  // ── Q ──────────────────────────────────────────────────────────────
  if (onlyIndex && f.index.pointingDown && f.thumb.extended) add("Q", 0.76);

  // ── R ──────────────────────────────────────────────────────────────
  if (twoFingersUp && !f.index.pointingSideways && f.distances.indexMiddle < 0.025) {
    add("R", 0.85);
  }

  // ── U ──────────────────────────────────────────────────────────────
  if (twoFingersUp && !f.index.pointingSideways && !f.thumb.extended) {
    if (f.distances.indexMiddle >= 0.015 && f.distances.indexMiddle < 0.042) add("U", 0.86);
  }

  // ── V ──────────────────────────────────────────────────────────────
  if (twoFingersUp && !f.index.pointingSideways && !f.thumb.extended) {
    if (f.distances.indexMiddle >= 0.042) add("V", 0.87);
  }

  // ── W ──────────────────────────────────────────────────────────────
  if (threeFingersUp) {
    const spread = f.distances.indexMiddle > 0.03 && f.distances.middleRing > 0.03;
    add("W", spread ? 0.88 : 0.75);
  }

  // ── X ──────────────────────────────────────────────────────────────
  if (f.index.hooked && !f.middle.extended && !f.ring.extended && !f.pinky.extended) {
    add("X", 0.80);
  }

  // ── Y ──────────────────────────────────────────────────────────────
  if (f.thumb.extended && onlyPinky) add("Y", 0.90);

  // ── Z ──────────────────────────────────────────────────────────────
  if (onlyIndex && !f.index.pointingSideways && !f.thumb.extended) add("Z", 0.50);

  // ── Closed-fist cluster: A / E / M / N / S / T ────────────────────
  if (noFingersUp) {
    if (f.thumbBetweenIndexMiddle) add("T", 0.86);

    if (f.thumb.extended && !f.thumbBetweenIndexMiddle) {
      add("A", f.distances.thumbPalm > 0.055 ? 0.88 : 0.74);
    }

    if (!f.thumb.extended && !f.thumbBetweenIndexMiddle) {
      const ti = f.distances.thumbIndex;
      const tm = f.distances.thumbMiddle;
      const tr = f.distances.thumbRing;

      if (ti < 0.05 && tm < 0.065 && tr < 0.09) add("E", 0.84);
      if (tm < 0.085 && tr < 0.105 && ti < 0.09) add("M", 0.72);
      if (tm < 0.085 && tr >= 0.085 && ti < 0.09) add("N", 0.68);
      if (ti >= 0.05 && tm >= 0.055 && f.distances.thumbPalm < 0.10) add("S", 0.74);
    }
  }

  return results;
}

// ─────────────────────────────────────────────────────────────────────────────
// Libras-specific classifier
// Based on official Libras alphabet gesture descriptions.
// Key differences from ASL:
//   G  → indicador E polegar apontando para CIMA (não para o lado)
//   H  → dois dedos em V com polegar ENTRE eles (não sideways)
//   P  → forma K mas HORIZONTAL/sideways (não pointing down)
//   T  → indicador dobrado, polegar ao lado do indicador (não entre I+M)
//   S  → polegar claramente SOBRE os dedos (thumbAboveKnuckles)
//   F  → indicador dobrado, polegar no lado externo do indicador
// ─────────────────────────────────────────────────────────────────────────────
function classifyLibras(f) {
  const results = [];
  const add = (letter, conf) => results.push({ letter, conf: Math.min(conf, 0.98) });

  const noFingersUp = !f.index.extended && !f.middle.extended && !f.ring.extended && !f.pinky.extended;
  const twoFingersUp = f.index.extended && f.middle.extended && !f.ring.extended && !f.pinky.extended;
  const threeFingersUp = f.index.extended && f.middle.extended && f.ring.extended && !f.pinky.extended;
  const fourFingersUp = f.index.extended && f.middle.extended && f.ring.extended && f.pinky.extended;
  const onlyIndex = f.index.extended && !f.middle.extended && !f.ring.extended && !f.pinky.extended;
  const onlyPinky = !f.index.extended && !f.middle.extended && !f.ring.extended && f.pinky.extended;

  // ── B ──────────────────────────────────────────────────────────────
  // Mão aberta, dedos juntos, polegar sobre a palma
  if (fourFingersUp && !f.thumb.extended) {
    const tight = f.distances.indexMiddle < 0.05 && f.distances.middleRing < 0.05 && f.distances.ringPinky < 0.05;
    add("B", tight ? 0.93 : 0.81);
  }
  if (f.extCount === 5) add("B", 0.60);

  // ── C / Ç ──────────────────────────────────────────────────────────
  // Mão curvada em C: todos os dedos moderadamente dobrados (nenhum reto),
  // abertura moderada entre polegar e indicador.
  // Problema anterior: dependia de !noFingersUp e thumb.extended, que
  // são ambos falsos para a forma C real em Libras.
  {
    const noFullyExtended = !f.index.extended && !f.middle.extended;
    const thumbIndexOk   = f.distances.thumbIndex > 0.07 && f.distances.thumbIndex < 0.22;
    const indexCurlOk    = f.index.curl > 0.55 && f.index.curl < 2.65;  // moderadamente dobrado
    const middleCurlOk   = f.middle.curl > 0.40;  // médio também curvado
    const notO           = !f.thumbTouchingIndex;  // O tem polegar tocando indicador
    const notE           = f.distances.thumbIndex > 0.07;  // E tem polegar colado a todos
    const notA           = !(f.thumb.extended && f.thumbAboveKnuckles);
    if (noFullyExtended && thumbIndexOk && indexCurlOk && middleCurlOk && notO && notE && notA && f.extCount <= 1) {
      add("C", 0.83);
      add("Ç", 0.79);
    }
  }

  // ── D ──────────────────────────────────────────────────────────────
  // Indicador estendido, demais dedos e polegar formam círculo
  if (onlyIndex && !f.index.pointingSideways) {
    if (f.thumbTouchingMiddle || f.distances.thumbMiddle < 0.06) add("D", 0.88);
    else if (f.distances.thumbIndex < 0.07) add("D", 0.77);
    else add("D", 0.68);
  }

  // ── F ──────────────────────────────────────────────────────────────
  // Indicador dobrado, polegar encostado no lado externo do indicador.
  // Médio, anelar e mindinho estendidos; indicador flexionado; polegar
  // próximo ao lado/PIP do indicador (não à ponta).
  if (f.middle.extended && f.ring.extended && f.pinky.extended && !f.index.extended) {
    const thumbNearIndexSide = f.distances.thumbToIndexPip < 0.08 || f.distances.thumbToIndexMcp < 0.09;
    if (thumbNearIndexSide) add("F", 0.92);
    else if (f.distances.thumbIndex < 0.10) add("F", 0.82);
  }

  // ── G ──────────────────────────────────────────────────────────────
  // Indicador E polegar apontando para CIMA (ambos verticais, próximos)
  // Diferente de L: no L o polegar aponta para o lado (perpendicular ao indicador)
  if (onlyIndex && f.thumb.extended && f.thumbPointingUp && !f.index.pointingDown) {
    const notLShape = f.distances.thumbIndex < 0.13;
    if (!f.index.pointingSideways && notLShape) add("G", 0.88);
  }

  // ── H ──────────────────────────────────────────────────────────────
  // Dedos indicador e médio em V, polegar entre eles, com movimento de rotação
  // (estaticamente igual a K — diferenciado pelo movimento)
  if (twoFingersUp && f.thumb.extended && f.thumbBetweenIndexMiddle && !f.index.pointingSideways) {
    add("H", 0.82);
    add("K", 0.78); // mesma forma estática — K tem movimento diferente
  }

  // ── K ──────────────────────────────────────────────────────────────
  // Dedos indicador e médio em V, polegar entre eles, movendo para cima
  if (twoFingersUp && f.thumb.extended && !f.index.pointingSideways) {
    if (f.distances.indexMiddle > 0.04 && !f.thumbBetweenIndexMiddle) {
      add("K", 0.83);
    }
  }

  // ── I / J ──────────────────────────────────────────────────────────
  // Punho com mindinho BEM estendido (não apenas levemente levantado).
  // Exigimos margem mínima entre tip e pip para distinguir de M onde
  // o mindinho pode ficar levemente acima do pip sem estar reto.
  if (onlyPinky && !f.thumb.extended) {
    const pinkyWellExtended = (f.pinky.pip.y - f.pinky.tip.y) > 0.025;
    add("I", pinkyWellExtended ? 0.91 : 0.65);
    add("J", 0.50);
  }

  // ── L ──────────────────────────────────────────────────────────────
  // Indicador para cima, polegar para o LADO (forma L perpendicular).
  // No L o polegar NÃO aponta para cima — aponta lateralmente.
  if (onlyIndex && f.thumb.extended && !f.index.pointingSideways && !f.index.pointingDown) {
    if (f.distances.thumbIndex > 0.07 && !f.thumbPointingUp) {
      add("L", 0.89);
    }
  }

  // ── O ──────────────────────────────────────────────────────────────
  // Todos os dedos e polegar formam um O
  if (noFingersUp || f.extCount <= 1) {
    if (f.thumbTouchingIndex && f.distances.thumbPalm > 0.03 && !f.thumb.extended) {
      add("O", 0.85);
    }
  }

  // ── P ──────────────────────────────────────────────────────────────
  // Forma K mas mão na HORIZONTAL (sideways) — indicador e médio apontam para o lado
  if (twoFingersUp && f.index.pointingSideways && f.thumb.extended) {
    add("P", 0.84);
  }

  // ── Q ──────────────────────────────────────────────────────────────
  // Como G (Libras) apontando para baixo
  if (onlyIndex && f.index.pointingDown && f.thumb.extended) {
    add("Q", 0.79);
  }

  // ── R ──────────────────────────────────────────────────────────────
  // Indicador e médio cruzados
  if (twoFingersUp && !f.index.pointingSideways && f.distances.indexMiddle < 0.025) {
    add("R", 0.86);
  }

  // ── U ──────────────────────────────────────────────────────────────
  // Indicador e médio estendidos juntos (paralelos, próximos)
  if (twoFingersUp && !f.index.pointingSideways && !f.thumb.extended) {
    if (f.distances.indexMiddle >= 0.015 && f.distances.indexMiddle < 0.042) add("U", 0.86);
  }

  // ── V ──────────────────────────────────────────────────────────────
  // Indicador e médio estendidos e separados
  if (twoFingersUp && !f.index.pointingSideways && !f.thumb.extended) {
    if (f.distances.indexMiddle >= 0.042) add("V", 0.87);
  }

  // ── W ──────────────────────────────────────────────────────────────
  // Indicador, médio e anelar estendidos e separados
  if (threeFingersUp) {
    const spread = f.distances.indexMiddle > 0.03 && f.distances.middleRing > 0.03;
    add("W", spread ? 0.88 : 0.75);
  }

  // ── X ──────────────────────────────────────────────────────────────
  // Indicador em gancho (sem polegar estendido para distinguir de T)
  if (f.index.hooked && !f.middle.extended && !f.ring.extended && !f.pinky.extended && !f.thumb.extended) {
    add("X", 0.82);
  }

  // ── Y ──────────────────────────────────────────────────────────────
  // Polegar e mindinho estendidos
  if (f.thumb.extended && onlyPinky) add("Y", 0.91);

  // ── Z ──────────────────────────────────────────────────────────────
  // Indicador traça um Z no ar — estaticamente similar a D sem círculo
  if (onlyIndex && !f.index.pointingSideways && !f.thumb.extended) add("Z", 0.50);

  // ── Punho fechado: A / E / M / N / S / T ──────────────────────────
  if (noFingersUp) {

    // T (Libras): indicador dobrado, polegar encostado no lado INTERNO do indicador.
    // Diferente do ASL: não é polegar ENTRE indicador e médio, mas ao LADO do indicador.
    // Detectar: indicador curled/hooked + polegar próximo ao lado do indicador
    // + polegar NÃO entre indicador e médio.
    const indexCurled = !f.index.extended && f.index.curl < 2.2;
    if (indexCurled && f.distances.thumbToIndexPip < 0.07 && !f.thumbBetweenIndexMiddle) {
      add("T", 0.87);
    }
    if (f.index.hooked && f.distances.thumbIndex < 0.08 && !f.thumbBetweenIndexMiddle) {
      add("T", 0.83);
    }

    // A: punho fechado, polegar ao lado do indicador (estendido para o lado)
    if (f.thumb.extended && !f.thumbBetweenIndexMiddle) {
      add("A", f.distances.thumbPalm > 0.055 ? 0.88 : 0.74);
    }

    if (!f.thumb.extended && !f.thumbBetweenIndexMiddle) {
      const ti = f.distances.thumbIndex;
      const tm = f.distances.thumbMiddle;
      const tr = f.distances.thumbRing;

      // E: dedos dobrados sobre a palma, polegar encostado na frente deles
      if (ti < 0.05 && tm < 0.065 && tr < 0.09) add("E", 0.85);

      // M: polegar sob três dedos (indicador, médio, anelar)
      if (tm < 0.085 && tr < 0.105 && ti < 0.09) add("M", 0.78);

      // N: polegar sob dois dedos (indicador e médio)
      if (tm < 0.085 && tr >= 0.085 && ti < 0.09) add("N", 0.69);

      // S: punho fechado, polegar SOBRE os dedos (cobrindo-os por cima)
      // thumbAboveKnuckles: ponta do polegar está acima (y menor) de todos os knuckles
      if (f.thumbAboveKnuckles && ti >= 0.04 && f.distances.thumbPalm < 0.12) {
        add("S", 0.87);
      } else if (ti >= 0.05 && tm >= 0.055 && f.distances.thumbPalm < 0.10) {
        add("S", 0.74);
      }
    }
  }

  // ── M com mindinho levemente levantado ─────────────────────────────
  // No gesto M em Libras o polegar vai sob três dedos; o mindinho
  // frequentemente fica levemente acima do pip, fazendo noFingersUp=false
  // e onlyPinky=true → confunde com I. Capturamos esse caso aqui:
  if (!f.index.extended && !f.middle.extended && !f.ring.extended
      && f.pinky.extended && !f.thumb.extended && !f.thumbBetweenIndexMiddle) {
    const pinkyBarelyUp = (f.pinky.pip.y - f.pinky.tip.y) < 0.04;
    if (pinkyBarelyUp) {
      const ti = f.distances.thumbIndex;
      const tm = f.distances.thumbMiddle;
      const tr = f.distances.thumbRing;
      if (tm < 0.085 && tr < 0.105 && ti < 0.09) {
        add("M", 0.82); // alta confiança — mindinho mal levantado é típico de M
      }
    }
  }

  return results;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public entry point
// ─────────────────────────────────────────────────────────────────────────────
export function classifyGesture(lms, signLanguageId = "asl") {
  if (!lms || lms.length < 21) {
    return { letter: null, confidence: 0 };
  }

  const f = extractHandFeatures(lms);

  const results = signLanguageId === "libras"
    ? classifyLibras(f)
    : classifyGeneric(f);

  if (!results.length) {
    return { letter: null, confidence: 0 };
  }

  results.sort((a, b) => b.conf - a.conf);
  return { letter: results[0].letter, confidence: results[0].conf };
}
