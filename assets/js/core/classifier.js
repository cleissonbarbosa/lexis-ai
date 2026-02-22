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
      indexTipToPalm: indexTipToPalm,
      thumbTipToWrist: thumbTipToWrist,
      palmWidth: palmWidth
    },
    thumbBetweenIndexMiddle,
    thumbTouchingIndex,
    thumbTouchingMiddle,
    thumbAboveKnuckles,
    thumbBelowPips,
    fingersTight,
    extCount,
    isRightHand,
    wrist,
    landmarks: lms
  };
}

export function classifyGesture(lms) {
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
  const onlyPinky = !f.index.extended && !f.middle.extended && !f.ring.extended && f.pinky.extended;

  // ── B ──────────────────────────────────────────────────────────────
  // Four fingers up, thumb folded, fingers together
  if (fourFingersUp && !f.thumb.extended) {
    const tight = f.distances.indexMiddle < 0.05 && f.distances.middleRing < 0.05 && f.distances.ringPinky < 0.05;
    add("B", tight ? 0.92 : 0.80);
  }
  if (f.extCount === 5) {
    // All 5: lower confidence B (open hand, thumb not fully tucked)
    add("B", 0.60);
  }

  // ── C / Ç ──────────────────────────────────────────────────────────
  // Curved hand forming a "C", index curled and distance from thumb moderate
  if (f.extCount <= 2 && !noFingersUp) {
    if (f.distances.thumbIndex > 0.05 && f.distances.thumbIndex < 0.17) {
      if (f.index.curl > 0.35 && f.index.curl < 2.9) {
        add("C", 0.76);
        add("Ç", 0.72); // Ç is same static shape
      }
    }
  }
  if (noFingersUp && f.thumb.extended && f.distances.thumbIndex > 0.08 && f.distances.thumbIndex < 0.17) {
    add("C", 0.70);
    add("Ç", 0.66);
  }

  // ── D ──────────────────────────────────────────────────────────────
  // Index up, thumb and other fingers form a circle (thumb near middle)
  if (onlyIndex && !f.index.pointingSideways) {
    if (f.thumbTouchingMiddle || f.distances.thumbMiddle < 0.06) {
      add("D", 0.87);
    } else if (f.distances.thumbIndex < 0.07) {
      add("D", 0.76);
    } else {
      add("D", 0.68);
    }
  }

  // ── F ──────────────────────────────────────────────────────────────
  // Middle+ring+pinky extended, thumb and index form a circle
  if (f.middle.extended && f.ring.extended && f.pinky.extended && !f.index.extended) {
    if (f.thumbTouchingIndex || f.distances.thumbIndex < 0.05) {
      add("F", 0.90);
    } else if (f.distances.thumbIndex < 0.07) {
      add("F", 0.80);
    }
  }

  // ── G ──────────────────────────────────────────────────────────────
  // Index and thumb pointing sideways (horizontal extension)
  if (onlyIndex && f.index.pointingSideways && f.thumb.extended && !f.index.pointingDown) {
    add("G", 0.82);
  }

  // ── H ──────────────────────────────────────────────────────────────
  // Index and middle pointing sideways together
  if (twoFingersUp && f.index.pointingSideways && f.middle.pointingSideways) {
    add("H", 0.84);
  }

  // ── I / J ──────────────────────────────────────────────────────────
  // Only pinky extended, thumb NOT extended → I (J is same static shape)
  if (onlyPinky && !f.thumb.extended) {
    add("I", 0.90);
    add("J", 0.50); // J = I + movement, can't distinguish statically
  }

  // ── K ──────────────────────────────────────────────────────────────
  // Index and middle up and spread, thumb between them pointing up
  if (twoFingersUp && !f.index.pointingSideways && f.thumb.extended) {
    if (f.distances.indexMiddle > 0.04) {
      add("K", 0.82);
    }
  }

  // ── L ──────────────────────────────────────────────────────────────
  // Index pointing up, thumb pointing sideways (L shape), others curled
  if (onlyIndex && f.thumb.extended && !f.index.pointingSideways) {
    if (f.distances.thumbIndex > 0.07) {
      add("L", 0.88);
    }
  }

  // ── O ──────────────────────────────────────────────────────────────
  // All fingers and thumb form a circle
  if (noFingersUp || f.extCount <= 1) {
    if (f.thumbTouchingIndex && f.distances.thumbPalm > 0.03) {
      // Make sure it's a full O (more fingers bundled), not just A
      if (!f.thumb.extended) {
        add("O", 0.84);
      }
    }
  }

  // ── P ──────────────────────────────────────────────────────────────
  // Like K but pointing downward
  if (twoFingersUp && f.index.pointingDown) {
    add("P", 0.78);
  }

  // ── Q ──────────────────────────────────────────────────────────────
  // Like G but pointing downward
  if (onlyIndex && f.index.pointingDown && f.thumb.extended) {
    add("Q", 0.76);
  }

  // ── R ──────────────────────────────────────────────────────────────
  // Index and middle crossed (very close together)
  if (twoFingersUp && !f.index.pointingSideways) {
    if (f.distances.indexMiddle < 0.025) {
      add("R", 0.85);
    }
  }

  // ── U ──────────────────────────────────────────────────────────────
  // Index and middle extended together (parallel, close), thumb NOT extended between them
  if (twoFingersUp && !f.index.pointingSideways && !f.thumb.extended) {
    if (f.distances.indexMiddle >= 0.015 && f.distances.indexMiddle < 0.042) {
      add("U", 0.86);
    }
  }

  // ── V ──────────────────────────────────────────────────────────────
  // Index and middle spread apart (V / peace sign)
  if (twoFingersUp && !f.index.pointingSideways && !f.thumb.extended) {
    if (f.distances.indexMiddle >= 0.042) {
      add("V", 0.87);
    }
  }

  // ── W ──────────────────────────────────────────────────────────────
  // Index, middle, ring up and spread
  if (threeFingersUp) {
    const spread = f.distances.indexMiddle > 0.03 && f.distances.middleRing > 0.03;
    add("W", spread ? 0.88 : 0.75);
  }

  // ── X ──────────────────────────────────────────────────────────────
  // Index finger hooked/bent (curved downward)
  if (f.index.hooked && !f.middle.extended && !f.ring.extended && !f.pinky.extended) {
    add("X", 0.80);
  }

  // ── Y ──────────────────────────────────────────────────────────────
  // Thumb and pinky extended, others curled
  if (f.thumb.extended && onlyPinky) {
    add("Y", 0.90);
  }

  // ── Z ──────────────────────────────────────────────────────────────
  // Index pointing up, traced Z — statically same as D without thumb circle
  if (onlyIndex && !f.index.pointingSideways && !f.thumb.extended) {
    add("Z", 0.50);
  }

  // ── Closed-fist cluster: A / E / M / N / S / T ────────────────────
  // All have noFingersUp. We disambiguate by thumb position and distances.
  if (noFingersUp) {

    // T (highest priority): thumb clearly between index and middle fingers
    if (f.thumbBetweenIndexMiddle) {
      add("T", 0.86);
    }

    // A: thumb extended to the side — NOT crossing over or under fingers
    if (f.thumb.extended && !f.thumbBetweenIndexMiddle) {
      add("A", f.distances.thumbPalm > 0.055 ? 0.88 : 0.74);
    }

    if (!f.thumb.extended && !f.thumbBetweenIndexMiddle) {
      const ti = f.distances.thumbIndex;
      const tm = f.distances.thumbMiddle;
      const tr = f.distances.thumbRing;

      // E: thumb very close to ALL fingertips (tucked under entire bunch)
      if (ti < 0.05 && tm < 0.065 && tr < 0.09) {
        add("E", 0.84);
      }

      // M: thumb under 3 fingers — reaches ring finger area
      if (tm < 0.085 && tr < 0.105 && ti < 0.09) {
        add("M", 0.72);
      }

      // N: thumb under 2 fingers — reaches middle but NOT ring
      if (tm < 0.085 && tr >= 0.085 && ti < 0.09) {
        add("N", 0.68);
      }

      // S: thumb folded over/across curled fingers from outside
      // — thumb NOT touching fingers closely, moderate palm distance
      if (ti >= 0.05 && tm >= 0.055 && f.distances.thumbPalm < 0.10) {
        add("S", 0.74);
      }
    }
  }

  if (!results.length) {
    return { letter: null, confidence: 0 };
  }

  results.sort((a, b) => b.conf - a.conf);
  return { letter: results[0].letter, confidence: results[0].conf };
}

