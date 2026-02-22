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

  if (noFingersUp) {
    if (f.thumb.extended && f.distances.thumbPalm > 0.055) {
      add("A", 0.84);
    } else if (f.thumb.extended) {
      add("A", 0.72);
    }
  }

  if (fourFingersUp && !f.thumb.extended) {
    const fingersTight = f.distances.indexMiddle < 0.05 && f.distances.middleRing < 0.05;
    add("B", fingersTight ? 0.9 : 0.78);
  }
  if (f.extCount === 5) {
    add("B", 0.62);
  }

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

  if (onlyIndex && !f.index.pointingSideways) {
    if (f.thumbTouchingMiddle || f.distances.thumbMiddle < 0.06) {
      add("D", 0.85);
    } else {
      add("D", 0.72);
    }
  }

  if (noFingersUp && !f.thumb.extended) {
    if (f.distances.thumbIndex < 0.04 && f.distances.thumbPalm < 0.07) {
      add("E", 0.78);
    } else if (f.distances.thumbPalm < 0.06) {
      add("E", 0.65);
    }
  }

  if (f.middle.extended && f.ring.extended && f.pinky.extended && !f.index.extended) {
    if (f.thumbTouchingIndex || f.distances.thumbIndex < 0.05) {
      add("F", 0.88);
    }
  }
  if (f.middle.extended && f.ring.extended && f.pinky.extended && f.distances.thumbIndex < 0.04) {
    add("F", 0.82);
  }

  if (onlyIndex && f.index.pointingSideways && f.thumb.extended) {
    if (!f.index.pointingDown) {
      add("G", 0.80);
    }
  }

  if (twoFingersUp && f.index.pointingSideways && f.middle.pointingSideways) {
    add("H", 0.82);
  }

  if (!f.index.extended && !f.middle.extended && !f.ring.extended && f.pinky.extended) {
    if (!f.thumb.extended) {
      add("I", 0.88);
    } else {
      add("I", 0.74);
    }
  }

  if (!f.index.extended && !f.middle.extended && !f.ring.extended && f.pinky.extended) {
    add("J", 0.52);
  }

  if (twoFingersUp && !f.index.pointingSideways && f.thumb.extended) {
    if (f.distances.indexMiddle > 0.035) {
      add("K", 0.80);
    }
  }

  if (onlyIndex && f.thumb.extended && !f.index.pointingSideways) {
    if (f.distances.thumbIndex > 0.07) {
      add("L", 0.86);
    }
  }

  if (noFingersUp && !f.thumb.extended) {
    if (f.distances.thumbPalm < 0.06 && f.thumb.tip.y > f.index.mcp.y) {
      add("M", 0.62);
    }
  }

  if (noFingersUp && !f.thumb.extended) {
    if (f.distances.thumbPalm < 0.065) {
      add("N", 0.58);
    }
  }

  if (noFingersUp || f.extCount <= 1) {
    if (f.thumbTouchingIndex && f.distances.thumbPalm > 0.03) {
      add("O", 0.80);
    }
  }

  if (twoFingersUp && f.index.pointingDown) {
    add("P", 0.76);
  }

  if (onlyIndex && f.index.pointingDown && f.thumb.extended) {
    add("Q", 0.74);
  }

  if (twoFingersUp && !f.index.pointingSideways) {
    if (f.distances.indexMiddle < 0.025) {
      add("R", 0.83);
    }
  }

  if (noFingersUp && !f.thumb.extended) {
    if (f.distances.thumbPalm < 0.08 && !f.thumbBetweenIndexMiddle) {
      add("S", 0.70);
    }
  }

  if (noFingersUp && f.thumbBetweenIndexMiddle) {
    add("T", 0.78);
  }

  if (twoFingersUp && !f.index.pointingSideways) {
    if (f.distances.indexMiddle < 0.04 && f.distances.indexMiddle >= 0.01) {
      add("U", 0.84);
    }
  }

  if (twoFingersUp && !f.index.pointingSideways) {
    if (f.distances.indexMiddle >= 0.04) {
      add("V", 0.85);
    }
  }

  if (threeFingersUp && !f.thumb.extended) {
    add("W", 0.85);
  }
  if (threeFingersUp && f.thumb.extended) {
    add("W", 0.75);
  }

  if (f.index.hooked && !f.middle.extended && !f.ring.extended && !f.pinky.extended) {
    add("X", 0.78);
  }

  if (f.thumb.extended && !f.index.extended && !f.middle.extended && !f.ring.extended && f.pinky.extended) {
    add("Y", 0.88);
  }

  if (onlyIndex && !f.index.pointingSideways && !f.thumb.extended) {
    add("Z", 0.48);
  }

  if (!results.length) {
    return { letter: null, confidence: 0 };
  }

  results.sort((a, b) => b.conf - a.conf);
  return { letter: results[0].letter, confidence: results[0].conf };
}
