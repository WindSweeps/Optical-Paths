const svg = document.querySelector("#canvas");
const tablePreset = document.querySelector("#tablePreset");
const openComponentPicker = document.querySelector("#openComponentPicker");
const resetView = document.querySelector("#resetView");
const clearAll = document.querySelector("#clearAll");
const placementBar = document.querySelector("#placementBar");
const pendingComponentName = document.querySelector("#pendingComponentName");
const cancelPlacement = document.querySelector("#cancelPlacement");
const confirmPlacement = document.querySelector("#confirmPlacement");
const componentPicker = document.querySelector("#componentPicker");
const closeComponentPicker = document.querySelector("#closeComponentPicker");
const cancelComponentPicker = document.querySelector("#cancelComponentPicker");
const confirmComponentPicker = document.querySelector("#confirmComponentPicker");
const componentSearch = document.querySelector("#componentSearch");
const componentTypeFilter = document.querySelector("#componentTypeFilter");
const componentCatalog = document.querySelector("#componentCatalog");
const pickerSelectionSummary = document.querySelector("#pickerSelectionSummary");
const inspector = document.querySelector("#inspector");
const emptyState = document.querySelector("#emptyState");
const componentRotation = document.querySelector("#componentRotation");
const componentRotationNumber = document.querySelector("#componentRotationNumber");
const componentRotationValue = document.querySelector("#componentRotationValue");
const clampRotation = document.querySelector("#clampRotation");
const clampRotationValue = document.querySelector("#clampRotationValue");
const clampFlex = document.querySelector("#clampFlex");
const clampFlexValue = document.querySelector("#clampFlexValue");
const wavelengthControls = document.querySelector("#wavelengthControls");
const wavelengthInput = document.querySelector("#wavelengthInput");
const wavelengthValue = document.querySelector("#wavelengthValue");
const lockStatus = document.querySelector("#lockStatus");
const readout = document.querySelector("#readout");

const NS = "http://www.w3.org/2000/svg";
const presets = {
  "300x300": { width: 300, height: 300, pitch: 25, margin: 25 },
  "450x300": { width: 450, height: 300, pitch: 25, margin: 25 },
  "600x450": { width: 600, height: 450, pitch: 25, margin: 25 },
};
const catalog = [
  {
    id: "laser-source",
    name: "激光光源",
    type: "source",
    typeLabel: "光源",
    kind: "source",
    thumbnailClass: "thumbnail-source",
  },
  {
    id: "mirror-mount",
    name: "反射镜架",
    type: "reflector",
    typeLabel: "反射元件",
    kind: "mirror",
    thumbnailClass: "thumbnail-mirror",
  },
  {
    id: "lens-mount",
    name: "透镜架",
    type: "transmissive",
    typeLabel: "透射元件",
    kind: "lens",
    thumbnailClass: "thumbnail-lens",
  },
];

const state = {
  table: presets["300x300"],
  scale: 1.55,
  offset: { x: 54, y: 42 },
  components: [],
  selectedId: null,
  maxAutoTurnDeg: 180,
  drag: null,
  clickContext: null,
  suppressNextClick: false,
  pendingComponentId: null,
  pickerSelectedCatalogId: null,
};

function createSvg(tag, attrs = {}) {
  const node = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (value !== undefined && value !== null) node.setAttribute(key, value);
  });
  return node;
}

function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function radToDeg(rad) {
  return (rad * 180) / Math.PI;
}

function normalizeAngleDeg(deg) {
  return ((deg + 180) % 360 + 360) % 360 - 180;
}

function rotatePoint(point, deg) {
  const rad = degToRad(deg);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: point.x * cos - point.y * sin,
    y: point.x * sin + point.y * cos,
  };
}

function add(a, b) {
  return { x: a.x + b.x, y: a.y + b.y };
}

function sub(a, b) {
  return { x: a.x - b.x, y: a.y - b.y };
}

function mul(point, value) {
  return { x: point.x * value, y: point.y * value };
}

function length(point) {
  return Math.hypot(point.x, point.y);
}

function normalize(point) {
  const pointLength = length(point);
  if (pointLength === 0) return { x: 1, y: 0 };
  return { x: point.x / pointLength, y: point.y / pointLength };
}

function dot(a, b) {
  return a.x * b.x + a.y * b.y;
}

function cross(a, b) {
  return a.x * b.y - a.y * b.x;
}

function reflect(direction, mirrorDirection) {
  const tangent = normalize(mirrorDirection);
  const normal = { x: -tangent.y, y: tangent.x };
  const reflected = sub(direction, mul(normal, 2 * dot(direction, normal)));
  return normalize(reflected);
}

function gammaCorrect(value) {
  return Math.round(255 * Math.max(0, Math.min(1, value)) ** 0.8);
}

function wavelengthToColor(wavelengthNm) {
  const wavelength = Math.max(380, Math.min(780, wavelengthNm));
  let red = 0;
  let green = 0;
  let blue = 0;

  if (wavelength < 440) {
    red = -(wavelength - 440) / 60;
    blue = 1;
  } else if (wavelength < 490) {
    green = (wavelength - 440) / 50;
    blue = 1;
  } else if (wavelength < 510) {
    green = 1;
    blue = -(wavelength - 510) / 20;
  } else if (wavelength < 580) {
    red = (wavelength - 510) / 70;
    green = 1;
  } else if (wavelength < 645) {
    red = 1;
    green = -(wavelength - 645) / 65;
  } else {
    red = 1;
  }

  const edgeFactor =
    wavelength < 420
      ? 0.3 + (0.7 * (wavelength - 380)) / 40
      : wavelength > 700
        ? 0.3 + (0.7 * (780 - wavelength)) / 80
        : 1;
  return `rgb(${gammaCorrect(red * edgeFactor)}, ${gammaCorrect(green * edgeFactor)}, ${gammaCorrect(blue * edgeFactor)})`;
}

function worldToScreen(point) {
  return {
    x: state.offset.x + point.x * state.scale,
    y: state.offset.y + point.y * state.scale,
  };
}

function screenToWorld(point) {
  return {
    x: (point.x - state.offset.x) / state.scale,
    y: (point.y - state.offset.y) / state.scale,
  };
}

function localToWorld(component, localPoint) {
  return add(component.position, rotatePoint(localPoint, component.rotation));
}

function clampLocalToWorld(component, clamp, localPoint) {
  const pivotWorld = localToWorld(component, clamp.pivot);
  const rotated = rotatePoint(localPoint, component.rotation + clamp.rotation);
  return add(pivotWorld, rotated);
}

function generateHoles(table) {
  const holes = [];
  for (let x = table.margin; x <= table.width - table.margin; x += table.pitch) {
    for (let y = table.margin; y <= table.height - table.margin; y += table.pitch) {
      holes.push({ x, y });
    }
  }
  return holes;
}

function distancePointToSegment(point, start, end) {
  const segment = sub(end, start);
  const segmentLengthSq = segment.x * segment.x + segment.y * segment.y;
  if (segmentLengthSq === 0) return { distance: length(sub(point, start)), t: 0 };
  const rawT =
    ((point.x - start.x) * segment.x + (point.y - start.y) * segment.y) /
    segmentLengthSq;
  const t = Math.max(0, Math.min(1, rawT));
  const projection = add(start, mul(segment, t));
  return { distance: length(sub(point, projection)), t: rawT };
}

function rectPolygon(x, y, width, height) {
  return [
    { x, y },
    { x: x + width, y },
    { x: x + width, y: y + height },
    { x, y: y + height },
  ];
}

function transformComponentPolygon(component, points) {
  return points.map((point) => localToWorld(component, point));
}

function transformClampPolygon(component, clampRotationDeg) {
  const pivotWorld = localToWorld(component, component.clamp.pivot);
  const totalRotation = component.rotation + clampRotationDeg;
  return rectPolygon(8, -7, 72, 14).map((point) => add(pivotWorld, rotatePoint(point, totalRotation)));
}

function projectPolygon(points, axis) {
  const values = points.map((point) => dot(point, axis));
  return { min: Math.min(...values), max: Math.max(...values) };
}

function polygonsOverlap(a, b) {
  const polygons = [a, b];
  for (const polygon of polygons) {
    for (let index = 0; index < polygon.length; index += 1) {
      const current = polygon[index];
      const next = polygon[(index + 1) % polygon.length];
      const edge = sub(next, current);
      const axis = normalize({ x: -edge.y, y: edge.x });
      const projectionA = projectPolygon(a, axis);
      const projectionB = projectPolygon(b, axis);
      if (projectionA.max <= projectionB.min || projectionB.max <= projectionA.min) {
        return false;
      }
    }
  }
  return true;
}

function getComponentCollisionPolygons(component) {
  const { width, height } = component.size;
  return [
    transformComponentPolygon(component, rectPolygon(-width / 2, -height / 2, width, height)),
    transformComponentPolygon(component, rectPolygon(-10, height / 2 - 3, 20, 18)),
  ];
}

function pointInPolygon(point, polygon) {
  let inside = false;
  for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index, index += 1) {
    const currentPoint = polygon[index];
    const previousPoint = polygon[previous];
    const intersects =
      currentPoint.y > point.y !== previousPoint.y > point.y &&
      point.x <
        ((previousPoint.x - currentPoint.x) * (point.y - currentPoint.y)) /
          (previousPoint.y - currentPoint.y) +
          currentPoint.x;
    if (intersects) inside = !inside;
  }
  return inside;
}

function clampCollidesWithOtherClamps(component, clampRotationDeg) {
  const clampPolygon = transformClampPolygon(component, clampRotationDeg);
  return state.components.some((otherComponent) =>
    otherComponent.id !== component.id &&
    polygonsOverlap(clampPolygon, transformClampPolygon(otherComponent, otherComponent.clamp.rotation)),
  );
}

function screwBlockedBySupport(screwPoint) {
  return state.components.some((component) =>
    getComponentCollisionPolygons(component).some((polygon) => pointInPolygon(screwPoint, polygon)),
  );
}

function evaluateClamp(component) {
  const clamp = component.clamp;
  const pivot = localToWorld(component, clamp.pivot);
  const slotVector = sub(clamp.slotEnd, clamp.slotStart);
  const slotAngleLocal = radToDeg(Math.atan2(slotVector.y, slotVector.x));
  const holes = generateHoles(state.table);
  const rawCandidates = holes
    .map((hole) => {
      const fromPivot = sub(hole, pivot);
      if (length(fromPivot) < 0.001) return null;

      const requiredTotalRotation = radToDeg(Math.atan2(fromPivot.y, fromPivot.x)) - slotAngleLocal;
      const desiredTotalRotation = component.rotation + clamp.rotation;
      const effectiveTotalRotation =
        desiredTotalRotation + normalizeAngleDeg(requiredTotalRotation - desiredTotalRotation);
      const effectiveClampRotation = normalizeAngleDeg(effectiveTotalRotation - component.rotation);
      const angleDelta = normalizeAngleDeg(effectiveClampRotation - clamp.rotation);
      const holeInClamp = rotatePoint(fromPivot, -effectiveTotalRotation);
      const slotDistance = distancePointToSegment(holeInClamp, clamp.slotStart, clamp.slotEnd);
      const clampOverlap = clampCollidesWithOtherClamps(component, effectiveClampRotation);
      const screwBlocked = screwBlockedBySupport(hole);

      return {
        hole,
        angleDelta,
        effectiveClampRotation,
        clampOverlap,
        screwBlocked,
        ...slotDistance,
      };
    })
    .filter(Boolean)
    .filter((candidate) => {
      return (
        Math.abs(candidate.angleDelta) <= state.maxAutoTurnDeg &&
        candidate.distance <= 0.25 &&
        candidate.t >= 0 &&
        candidate.t <= 1
      );
    });
  const candidates = rawCandidates
    .filter((candidate) => !candidate.clampOverlap)
    .sort((a, b) => {
      if (a.screwBlocked !== b.screwBlocked) return Number(a.screwBlocked) - Number(b.screwBlocked);
      return Math.abs(a.angleDelta) - Math.abs(b.angleDelta);
    });

  const candidate = candidates[0] ?? null;
  const effectiveRotation = candidate?.effectiveClampRotation ?? clamp.rotation;
  const slotStart = clampLocalToWorld(
    { ...component, clamp: { ...clamp, rotation: effectiveRotation } },
    { ...clamp, rotation: effectiveRotation },
    clamp.slotStart,
  );
  const slotEnd = clampLocalToWorld(
    { ...component, clamp: { ...clamp, rotation: effectiveRotation } },
    { ...clamp, rotation: effectiveRotation },
    clamp.slotEnd,
  );
  return {
    valid: Boolean(candidate),
    candidate: candidate?.hole ?? null,
    angleDelta: candidate?.angleDelta ?? 0,
    effectiveClampRotation: effectiveRotation,
    screwBlocked: Boolean(candidate?.screwBlocked),
    blockedByClampOverlap: !candidate && rawCandidates.some((item) => item.clampOverlap),
    slotStart,
    slotEnd,
  };
}

function snapshotClampResult(result) {
  return {
    valid: result.valid,
    candidate: result.candidate ? { ...result.candidate } : null,
    angleDelta: result.angleDelta,
    effectiveClampRotation: result.effectiveClampRotation,
    screwBlocked: result.screwBlocked,
    blockedByClampOverlap: result.blockedByClampOverlap,
  };
}

function getStoredClampResult(component) {
  const stored = component.resolvedClamp ?? snapshotClampResult(evaluateClamp(component));
  const clamp = component.clamp;
  const effectiveRotation = stored.effectiveClampRotation ?? clamp.rotation;
  const virtualClamp = { ...clamp, rotation: effectiveRotation };
  const virtualComponent = { ...component, clamp: virtualClamp };
  return {
    ...stored,
    effectiveClampRotation: effectiveRotation,
    slotStart: clampLocalToWorld(virtualComponent, virtualClamp, clamp.slotStart),
    slotEnd: clampLocalToWorld(virtualComponent, virtualClamp, clamp.slotEnd),
  };
}

function resolveClampAngle(component) {
  const result = evaluateClamp(component);
  component.lastClampAdjustmentDeg = result.valid ? result.angleDelta : 0;
  component.lastScrewBlocked = result.valid && result.screwBlocked;
  if (result.valid) {
    component.clamp.rotation = result.effectiveClampRotation;
  }
  component.resolvedClamp = snapshotClampResult(result);
  component.needsClampResolve = false;
}

function autoResolveClampAngles() {
  const activeId = state.pendingComponentId ?? state.drag?.id;
  if (activeId) {
    const activeComponent = state.components.find((component) => component.id === activeId);
    if (activeComponent) resolveClampAngle(activeComponent);
    return;
  }

  state.components
    .filter((component) => component.needsClampResolve || !component.resolvedClamp)
    .forEach(resolveClampAngle);
}

function makeComponent(kind, options = {}) {
  const base = {
    id: crypto.randomUUID(),
    kind,
    catalogId: options.catalogId ?? null,
    placementState: options.placementState ?? "placed",
    needsClampResolve: true,
    position: { x: 105 + state.components.length * 35, y: 120 },
    rotation: 0,
    clamp: {
      pivot: { x: -25, y: 24 },
      slotStart: { x: 16, y: 0 },
      slotEnd: { x: 72, y: 0 },
      rotation: kind === "mirror" ? 20 : -15,
    },
  };

  if (kind === "source") {
    return {
      ...base,
      name: "光源",
      position: { x: 70, y: 150 },
      rotation: 0,
      clamp: {
        ...base.clamp,
        pivot: { x: -24, y: 25 },
        rotation: 22,
      },
      size: { width: 46, height: 28 },
      optic: "source",
      wavelengthNm: 650,
    };
  }

  if (kind === "lens") {
    return {
      ...base,
      name: "透镜架",
      size: { width: 34, height: 54 },
      optic: "lens",
    };
  }

  return {
    ...base,
    name: "反射镜架",
    size: { width: 46, height: 38 },
    optic: "mirror",
  };
}

function clearSvg() {
  while (svg.firstChild) svg.removeChild(svg.firstChild);
}

function render() {
  clearSvg();
  const tableScreen = worldToScreen({ x: state.table.width, y: state.table.height });
  svg.setAttribute("width", Math.max(720, tableScreen.x + 54));
  svg.setAttribute("height", Math.max(540, tableScreen.y + 42));
  svg.setAttribute("viewBox", `0 0 ${svg.getAttribute("width")} ${svg.getAttribute("height")}`);

  autoResolveClampAngles();
  renderDefs();
  renderTable();
  renderInactiveClamps();
  state.components.forEach(renderComponent);
  renderBeams();
  renderActiveClamp();
  renderInspector();
  renderPlacementUi();
  readout.textContent = `${state.scale.toFixed(2)} px = 1 mm`;
}

function renderDefs() {
  const defs = createSvg("defs");
  svg.appendChild(defs);
}

function renderTable() {
  const topLeft = worldToScreen({ x: 0, y: 0 });
  const size = {
    width: state.table.width * state.scale,
    height: state.table.height * state.scale,
  };
  svg.appendChild(
    createSvg("rect", {
      class: "table",
      x: topLeft.x,
      y: topLeft.y,
      width: size.width,
      height: size.height,
      rx: 4,
    }),
  );

  const selected = getSelected();
  const selectedClamp = selected ? getStoredClampResult(selected) : null;
  generateHoles(state.table).forEach((hole) => {
    const screen = worldToScreen(hole);
    const isCandidate =
      selectedClamp?.candidate &&
      Math.abs(selectedClamp.candidate.x - hole.x) < 0.001 &&
      Math.abs(selectedClamp.candidate.y - hole.y) < 0.001;
    svg.appendChild(
      createSvg("circle", {
        class: isCandidate ? "hole candidate" : "hole",
        cx: screen.x,
        cy: screen.y,
        r: 3.2,
      }),
    );
  });
}

function renderComponent(component) {
  const isSelected = component.id === state.selectedId;
  const isPending = component.id === state.pendingComponentId;
  const group = createSvg("g", {
    class: `component${isSelected ? " selected" : ""}${isPending ? " pending" : ""}`,
    "data-id": component.id,
    "data-component-id": component.id,
  });

  const center = worldToScreen(component.position);
  group.setAttribute(
    "transform",
    `translate(${center.x} ${center.y}) rotate(${component.rotation}) scale(${state.scale})`,
  );

  const { width, height } = component.size;
  if (isPending) {
    group.appendChild(
      createSvg("rect", {
        class: "pending-outline",
        x: -width / 2 - 10,
        y: -height / 2 - 10,
        width: width + 20,
        height: height + 20,
        rx: 9,
      }),
    );
  } else if (isSelected) {
    group.appendChild(
      createSvg("rect", {
        class: "selected-outline",
        x: -width / 2 - 7,
        y: -height / 2 - 7,
        width: width + 14,
        height: height + 14,
        rx: 7,
      }),
    );
  }
  group.appendChild(
    createSvg("rect", {
      class: "component-body",
      x: -width / 2,
      y: -height / 2,
      width,
      height,
      rx: 3,
    }),
  );
  group.appendChild(
    createSvg("rect", {
      class: "mount",
      x: -10,
      y: height / 2 - 3,
      width: 20,
      height: 18,
      rx: 2,
    }),
  );

  if (component.optic === "source") {
    group.appendChild(
      createSvg("circle", {
        class: "source-aperture",
        cx: width / 2,
        cy: 0,
        r: 5,
      }),
    );
    group.appendChild(
      createSvg("path", {
        class: "source-symbol",
        d: `M ${-width / 2 + 7} ${-height / 2 + 6} L ${-4} 0 L ${-width / 2 + 7} ${height / 2 - 6} Z`,
      }),
    );
  } else if (component.optic === "lens") {
    group.appendChild(
      createSvg("ellipse", {
        class: "optic",
        cx: 0,
        cy: -2,
        rx: 8,
        ry: height / 2 - 6,
      }),
    );
  } else {
    group.appendChild(
      createSvg("line", {
        class: "optic",
        x1: -13,
        y1: 10,
        x2: 13,
        y2: -10,
      }),
    );
  }

  const pivot = component.clamp.pivot;
  group.appendChild(createSvg("circle", { class: "pivot", cx: pivot.x, cy: pivot.y, r: 3 }));
  group.appendChild(
    createSvg("text", {
      class: "label",
      x: -width / 2,
      y: -height / 2 - 6,
    }),
  ).textContent = component.name;

  svg.appendChild(group);
}

function getActiveClampComponentId() {
  return state.drag?.id ?? state.pendingComponentId ?? state.selectedId;
}

function renderInactiveClamps() {
  const activeId = getActiveClampComponentId();
  state.components.forEach((component) => {
    if (component.id !== activeId) {
      renderClamp(component, getStoredClampResult(component), false);
    }
  });
}

function renderActiveClamp() {
  const activeId = getActiveClampComponentId();
  const component = state.components.find((item) => item.id === activeId);
  if (!component) return;
  renderClamp(component, getStoredClampResult(component), true);
}

function getSourceRay(component) {
  return {
    origin: localToWorld(component, { x: component.size.width / 2 + 3, y: 0 }),
    direction: normalize(rotatePoint({ x: 1, y: 0 }, component.rotation)),
    wavelengthNm: component.wavelengthNm ?? 650,
  };
}

function getMirrorSegment(component) {
  return {
    component,
    start: localToWorld(component, { x: -13, y: 10 }),
    end: localToWorld(component, { x: 13, y: -10 }),
  };
}

function raySegmentIntersection(origin, direction, start, end) {
  const segment = sub(end, start);
  const denominator = cross(direction, segment);
  if (Math.abs(denominator) < 0.000001) return null;

  const offset = sub(start, origin);
  const rayT = cross(offset, segment) / denominator;
  const segmentT = cross(offset, direction) / denominator;
  if (rayT <= 0.5 || segmentT < 0 || segmentT > 1) return null;

  return {
    point: add(origin, mul(direction, rayT)),
    rayT,
    segmentT,
  };
}

function distanceToTableEdge(origin, direction) {
  const distances = [];
  if (direction.x > 0) distances.push((state.table.width - origin.x) / direction.x);
  if (direction.x < 0) distances.push((0 - origin.x) / direction.x);
  if (direction.y > 0) distances.push((state.table.height - origin.y) / direction.y);
  if (direction.y < 0) distances.push((0 - origin.y) / direction.y);
  return Math.min(...distances.filter((value) => value > 0));
}

function applyOpticalInteraction(component, beamState) {
  if (component.optic === "mirror") {
    return {
      ...beamState,
      direction: reflect(beamState.direction, beamState.surfaceDirection),
    };
  }

  return beamState;
}

function traceBeam(source) {
  const segments = [];
  const mirrors = state.components
    .filter((item) => item.optic === "mirror" && item.placementState === "placed")
    .map(getMirrorSegment);
  let { origin, direction, wavelengthNm } = getSourceRay(source);
  const usedHits = new Set();

  for (let bounce = 0; bounce < 4; bounce += 1) {
    const hits = mirrors
      .map((mirror) => ({
        mirror,
        hit: raySegmentIntersection(origin, direction, mirror.start, mirror.end),
      }))
      .filter((entry) => entry.hit && !usedHits.has(`${entry.mirror.component.id}:${bounce}`))
      .sort((a, b) => a.hit.rayT - b.hit.rayT);

    const nearest = hits[0];
    if (!nearest) {
      const edgeDistance = distanceToTableEdge(origin, direction);
      segments.push({
        start: origin,
        end: add(origin, mul(direction, edgeDistance)),
        wavelengthNm,
      });
      break;
    }

    segments.push({ start: origin, end: nearest.hit.point, wavelengthNm });
    usedHits.add(`${nearest.mirror.component.id}:${bounce}`);
    const nextBeam = applyOpticalInteraction(nearest.mirror.component, {
      direction,
      wavelengthNm,
      surfaceDirection: sub(nearest.mirror.end, nearest.mirror.start),
    });
    direction = nextBeam.direction;
    wavelengthNm = nextBeam.wavelengthNm;
    origin = add(nearest.hit.point, mul(direction, 0.8));
  }

  return segments;
}

function renderBeams() {
  const beamGroup = createSvg("g", { class: "beam-layer" });
  state.components
    .filter((component) => component.optic === "source" && component.placementState === "placed")
    .forEach((source) => {
      traceBeam(source).forEach((segment, index) => {
        const start = worldToScreen(segment.start);
        const end = worldToScreen(segment.end);
        beamGroup.appendChild(
          createSvg("line", {
            class: index === 0 ? "beam incoming" : "beam reflected",
            stroke: wavelengthToColor(segment.wavelengthNm),
            "data-wavelength-nm": segment.wavelengthNm,
            x1: start.x,
            y1: start.y,
            x2: end.x,
            y2: end.y,
          }),
        );
      });
    });
  svg.appendChild(beamGroup);
}

function renderClamp(component, result, isSelected) {
  const isPending = component.id === state.pendingComponentId;
  const pivot = localToWorld(component, component.clamp.pivot);
  const pivotScreen = worldToScreen(pivot);
  const angle = component.rotation + result.effectiveClampRotation;
  const clampGroup = createSvg("g", {
    class: `clamp-group${isSelected ? " selected" : ""}${isPending ? " pending" : ""}`,
    "data-component-id": component.id,
    transform: `translate(${pivotScreen.x} ${pivotScreen.y}) rotate(${angle}) scale(${state.scale})`,
  });

  clampGroup.appendChild(
    createSvg("rect", {
      class: "clamp",
      x: 8,
      y: -7,
      width: 72,
      height: 14,
      rx: 3,
    }),
  );
  clampGroup.appendChild(
    createSvg("line", {
      class: result.valid ? "slot" : "slot invalid",
      x1: component.clamp.slotStart.x,
      y1: component.clamp.slotStart.y,
      x2: component.clamp.slotEnd.x,
      y2: component.clamp.slotEnd.y,
    }),
  );
  svg.appendChild(clampGroup);

  const screwPoint = result.candidate ?? result.slotEnd;
  const screwScreen = worldToScreen(screwPoint);
  svg.appendChild(
    createSvg("circle", {
      class: result.valid ? (result.screwBlocked ? "screw warning" : "screw") : "screw invalid",
      "data-component-id": component.id,
      cx: screwScreen.x,
      cy: screwScreen.y,
      r: 7,
    }),
  );
}

function renderInspector() {
  const selected = getSelected();
  inspector.hidden = !selected;
  emptyState.hidden = Boolean(selected);
  if (!selected) return;

  componentRotation.value = selected.rotation;
  componentRotationNumber.value = Math.round(selected.rotation);
  componentRotationValue.textContent = `${Math.round(selected.rotation)} deg`;
  clampRotation.value = selected.clamp.rotation;
  clampRotationValue.textContent = `${Math.round(selected.clamp.rotation)} deg`;
  clampFlex.value = state.maxAutoTurnDeg;
  clampFlexValue.textContent = `${state.maxAutoTurnDeg} deg`;
  wavelengthControls.hidden = selected.optic !== "source";
  wavelengthControls.style.display = selected.optic === "source" ? "" : "none";
  if (selected.optic === "source") {
    wavelengthInput.value = selected.wavelengthNm ?? 650;
    wavelengthValue.textContent = `${selected.wavelengthNm ?? 650} nm`;
  }

  const result = getStoredClampResult(selected);
  lockStatus.className = `status ${result.valid ? (result.screwBlocked ? "warning" : "valid") : "invalid"}`;
  if (result.valid) {
    const lastAdjustment = selected.lastClampAdjustmentDeg ?? result.angleDelta;
    const adjustment =
      Math.abs(lastAdjustment) < 0.1
        ? "自动角度：无需调整"
        : `自动角度：${lastAdjustment.toFixed(1)} deg`;
    const warning = result.screwBlocked
      ? "<br><strong>警告：</strong>螺丝中心被支架挡住，实际安装时可能拧不到。"
      : "";
    lockStatus.innerHTML = `
      <strong>固定成功</strong><br>
      螺丝孔：(${result.candidate.x.toFixed(0)}, ${result.candidate.y.toFixed(0)}) mm<br>
      ${adjustment}<br>
      压板没有与其他压板重合。${warning}
    `;
  } else {
    const reason = result.blockedByClampOverlap
      ? "可用孔位会导致压板与其他压板重合。"
      : `在 ±${state.maxAutoTurnDeg} deg 自动转角范围内找不到可用孔位。`;
    lockStatus.innerHTML = `
      <strong>无法固定</strong><br>
      ${reason}<br>
      拖动元件即可重新自动寻找压板角度。
    `;
  }
}

function renderPlacementUi() {
  const pending = state.components.find((component) => component.id === state.pendingComponentId);
  placementBar.hidden = !pending;
  openComponentPicker.disabled = Boolean(pending);
  if (!pending) return;

  const result = getStoredClampResult(pending);
  pendingComponentName.textContent = pending.name;
  confirmPlacement.disabled = !result.valid;
}

function getSelected() {
  return state.components.find((item) => item.id === state.selectedId) ?? null;
}

function pointerPosition(event) {
  const rect = svg.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

function selectComponent(id) {
  state.selectedId = id;
  render();
}

function componentIdFromEventTarget(target) {
  return target.closest("[data-component-id]")?.dataset.componentId ?? null;
}

function renderComponentCatalog() {
  const query = componentSearch.value.trim().toLowerCase();
  const type = componentTypeFilter.value;
  const filteredCatalog = catalog.filter((item) => {
    const matchesType = type === "all" || item.type === type;
    const matchesQuery =
      query === "" ||
      item.name.toLowerCase().includes(query) ||
      item.typeLabel.toLowerCase().includes(query);
    return matchesType && matchesQuery;
  });

  componentCatalog.replaceChildren();
  filteredCatalog.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `catalog-item${item.id === state.pickerSelectedCatalogId ? " selected" : ""}`;
    button.dataset.catalogId = item.id;
    button.innerHTML = `
      <div class="catalog-thumbnail ${item.thumbnailClass}"></div>
      <strong>${item.name}</strong>
      <span>${item.typeLabel}</span>
    `;
    componentCatalog.appendChild(button);
  });

  if (filteredCatalog.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "没有符合筛选条件的元件。";
    componentCatalog.appendChild(empty);
  }

  const selectedItem = catalog.find((item) => item.id === state.pickerSelectedCatalogId);
  pickerSelectionSummary.textContent = selectedItem
    ? `已选择：${selectedItem.name} · ${selectedItem.typeLabel}`
    : "尚未选择元件";
  confirmComponentPicker.disabled = !selectedItem;
}

function openPicker() {
  if (state.pendingComponentId) return;
  state.pickerSelectedCatalogId = null;
  componentSearch.value = "";
  componentTypeFilter.value = "all";
  componentPicker.hidden = false;
  renderComponentCatalog();
  componentSearch.focus();
}

function closePicker() {
  componentPicker.hidden = true;
  state.pickerSelectedCatalogId = null;
}

function addPendingComponent(catalogItem) {
  const component = makeComponent(catalogItem.kind, {
    catalogId: catalogItem.id,
    placementState: "pending",
  });
  component.name = catalogItem.name;
  component.position = {
    x: state.table.width / 2,
    y: state.table.height / 2,
  };
  state.components.push(component);
  state.pendingComponentId = component.id;
  state.selectedId = component.id;
  closePicker();
  render();
}

function discardPendingComponent() {
  if (!state.pendingComponentId) return;
  state.components = state.components.filter((component) => component.id !== state.pendingComponentId);
  state.pendingComponentId = null;
  state.selectedId = null;
  render();
}

function placePendingComponent() {
  const pending = state.components.find((component) => component.id === state.pendingComponentId);
  if (!pending) return;
  const result = getStoredClampResult(pending);
  if (!result.valid) return;
  pending.placementState = "placed";
  state.pendingComponentId = null;
  state.selectedId = pending.id;
  render();
}

svg.addEventListener("pointerdown", (event) => {
  const id = componentIdFromEventTarget(event.target);
  if (!id) return;
  const component = state.components.find((item) => item.id === id);
  if (!component) return;
  const world = screenToWorld(pointerPosition(event));
  const screen = pointerPosition(event);
  const wasSelected = state.selectedId === id;
  state.selectedId = id;
  state.clickContext = { id, wasSelected };
  state.drag = {
    id,
    wasSelected,
    pointerOffset: sub(world, component.position),
    startScreen: screen,
    moved: false,
  };
  svg.setPointerCapture(event.pointerId);
  render();
});

svg.addEventListener("pointermove", (event) => {
  if (!state.drag) return;
  const component = state.components.find((item) => item.id === state.drag.id);
  if (!component) return;
  const screen = pointerPosition(event);
  const world = screenToWorld(screen);
  if (length(sub(screen, state.drag.startScreen)) > 3) {
    state.drag.moved = true;
  }
  component.position = sub(world, state.drag.pointerOffset);
  render();
});

svg.addEventListener("pointerup", (event) => {
  if (state.drag) {
    const finishedDrag = state.drag;
    state.suppressNextClick = true;
    if (!finishedDrag.moved && finishedDrag.wasSelected && finishedDrag.id !== state.pendingComponentId) {
      state.selectedId = null;
    } else {
      state.selectedId = finishedDrag.id;
    }
    state.drag = null;
    svg.releasePointerCapture(event.pointerId);
    render();
  }
});

svg.addEventListener("click", (event) => {
  if (state.suppressNextClick) {
    state.suppressNextClick = false;
    state.clickContext = null;
    return;
  }

  const id = componentIdFromEventTarget(event.target);
  if (!id) {
    if (!state.pendingComponentId) state.selectedId = null;
    state.clickContext = null;
    render();
    return;
  }

  if (state.clickContext?.id === id && state.clickContext.wasSelected) {
    state.selectedId = null;
  } else {
    state.selectedId = id;
  }
  state.clickContext = null;
  render();
});

componentRotation.addEventListener("input", () => {
  const selected = getSelected();
  if (!selected) return;
  selected.rotation = Number(componentRotation.value);
  selected.needsClampResolve = true;
  render();
});

componentRotationNumber.addEventListener("input", () => {
  const selected = getSelected();
  if (!selected) return;
  const rawValue = componentRotationNumber.value;
  if (rawValue === "" || rawValue === "-") return;
  const numericValue = Number(rawValue);
  if (!Number.isFinite(numericValue)) return;
  selected.rotation = Math.max(-180, Math.min(180, numericValue));
  selected.needsClampResolve = true;
  render();
});

clampRotation.addEventListener("input", () => {
  const selected = getSelected();
  if (!selected) return;
  selected.clamp.rotation = Number(clampRotation.value);
  selected.needsClampResolve = true;
  render();
});

clampFlex.addEventListener("input", () => {
  state.maxAutoTurnDeg = Number(clampFlex.value);
  const selected = getSelected();
  if (selected) selected.needsClampResolve = true;
  render();
});

wavelengthInput.addEventListener("input", () => {
  const selected = getSelected();
  if (!selected || selected.optic !== "source") return;
  selected.wavelengthNm = Number(wavelengthInput.value);
  render();
});

tablePreset.addEventListener("change", () => {
  state.table = presets[tablePreset.value];
  state.components.forEach((component) => {
    component.needsClampResolve = true;
  });
  render();
});

openComponentPicker.addEventListener("click", openPicker);
closeComponentPicker.addEventListener("click", closePicker);
cancelComponentPicker.addEventListener("click", closePicker);
cancelPlacement.addEventListener("click", discardPendingComponent);
confirmPlacement.addEventListener("click", placePendingComponent);
componentSearch.addEventListener("input", renderComponentCatalog);
componentTypeFilter.addEventListener("change", renderComponentCatalog);
componentCatalog.addEventListener("click", (event) => {
  const item = event.target.closest("[data-catalog-id]");
  if (!item) return;
  state.pickerSelectedCatalogId = item.dataset.catalogId;
  renderComponentCatalog();
});
confirmComponentPicker.addEventListener("click", () => {
  const selectedItem = catalog.find((item) => item.id === state.pickerSelectedCatalogId);
  if (selectedItem) addPendingComponent(selectedItem);
});
componentPicker.addEventListener("click", (event) => {
  if (event.target === componentPicker) closePicker();
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !componentPicker.hidden) closePicker();
});

resetView.addEventListener("click", () => {
  state.scale = 1.55;
  state.offset = { x: 54, y: 42 };
  render();
});

clearAll.addEventListener("click", () => {
  state.components = [];
  state.selectedId = null;
  state.pendingComponentId = null;
  render();
});

state.components.push(makeComponent("source"));
state.components.push({
  ...makeComponent("mirror"),
  position: { x: 150, y: 150 },
  rotation: 45,
});
state.selectedId = state.components[1].id;
render();
