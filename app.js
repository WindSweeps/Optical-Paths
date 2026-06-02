const svg = document.querySelector("#canvas");
const tablePreset = document.querySelector("#tablePreset");
const openComponentPicker = document.querySelector("#openComponentPicker");
const resetView = document.querySelector("#resetView");
const clearAll = document.querySelector("#clearAll");
const exportSvg = document.querySelector("#exportSvg");
const exportPng = document.querySelector("#exportPng");
const exportStatus = document.querySelector("#exportStatus");
const exportPreview = document.querySelector("#exportPreview");
const closeExportPreview = document.querySelector("#closeExportPreview");
const cancelExportPreview = document.querySelector("#cancelExportPreview");
const downloadExportPreview = document.querySelector("#downloadExportPreview");
const exportPreviewImage = document.querySelector("#exportPreviewImage");
const exportPreviewFilename = document.querySelector("#exportPreviewFilename");
const exportPreviewMeta = document.querySelector("#exportPreviewMeta");
const languageSelect = document.querySelector("#languageSelect");
const placementBar = document.querySelector("#placementBar");
const pendingComponentName = document.querySelector("#pendingComponentName");
const pendingComponentLabel = document.querySelector("#pendingComponentLabel");
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
const componentLibraryName = document.querySelector("#componentLibraryName");
const componentLabel = document.querySelector("#componentLabel");
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
  "900x600": { width: 900, height: 600, pitch: 25, margin: 12.5 },
  "600x600": { width: 600, height: 600, pitch: 25, margin: 12.5 },
  "600x300": { width: 600, height: 300, pitch: 25, margin: 12.5 },
  "450x300": { width: 450, height: 300, pitch: 25, margin: 12.5 },
  "300x300": { width: 300, height: 300, pitch: 25, margin: 12.5 },
};
const translations = {
  zh: {
    documentTitle: "光路图孔位固定原型",
    brandTitle: "光路图绘制",
    brandSubtitle: "孔位固定原型",
    opticalTable: "光学桌",
    tableSize: "桌面尺寸",
    table900x600: "900 x 600 mm 面包板",
    table600x600: "600 x 600 mm 面包板",
    table600x300: "600 x 300 mm 面包板",
    table450x300: "450 x 300 mm 面包板",
    table300x300: "300 x 300 mm 面包板",
    holePitch: "孔距",
    edgeMargin: "边距",
    componentLibrary: "元件库",
    addComponent: "添加元件",
    selectedComponent: "选中元件",
    emptyInspector: "点击元件后编辑固定方式",
    libraryName: "元件库名称：",
    componentLabel: "元件标签",
    componentRotation: "元件角度",
    clampRotation: "压板角度",
    maxAutoTurn: "最大自动转角",
    sourceWavelength: "光源波长",
    mountingRules: "固定规则",
    mountingRulesText: "拖动元件后压板会自动选择最小转角的可用孔位。压板之间不能重合；螺丝被柱子挡住时仍可固定，但会显示警告。",
    opticalRules: "光路规则",
    opticalRulesText: "光源沿元件角度发射光线。光线碰到反射镜后按入射角等于反射角反射；碰到分束立方时同时生成反射与透射分支。",
    resetView: "重置视图",
    clearAll: "清空元件",
    exportSvg: "导出 SVG",
    exportPng: "导出 PNG",
    language: "语言",
    pendingPrefix: "悬置：",
    pendingHelp: "拖动元件预览孔位与压板位置，确认后再置入光路。",
    label: "标签",
    cancel: "取消",
    place: "置入",
    canvasLabel: "光学桌画布",
    pickerTitle: "选择光学元件",
    pickerSubtitle: "从元件库中选择一个器件加入画布。",
    close: "关闭",
    searchComponent: "搜索元件",
    searchPlaceholder: "输入名称",
    componentType: "元件类型",
    allTypes: "全部类型",
    sourceType: "光源",
    reflectorType: "反射元件",
    transmissiveType: "透射元件",
    beamsplitterType: "分束元件",
    nothingSelected: "尚未选择元件",
    confirm: "确定",
    exportPreviewTitle: "导出预览",
    downloadFolderHelp: "下载后由浏览器保存到系统默认下载文件夹。",
    closeExportPreview: "关闭导出预览",
    exportPreviewAlt: "光路图导出预览",
    downloadLocal: "下载到本地",
    thumbnailLabel: "{name} 缩略图",
    downloaded: "已下载 {filename}",
    previewReady: "已生成 {filename} 预览",
    svgFormat: "SVG 矢量图",
    pngFormat: "PNG 图片",
    generatingPng: "正在生成 PNG 预览...",
    pngFailed: "PNG 生成失败",
    svgFailed: "SVG 生成失败",
    noAdjustment: "自动角度：无需调整",
    adjustment: "自动角度：{angle} deg",
    warningLabel: "警告：",
    blockedScrew: "螺丝中心被柱子挡住，实际安装时可能拧不到。",
    mounted: "固定成功",
    screwHole: "螺丝孔：({x}, {y}) mm",
    noClampOverlap: "压板没有与其他压板重合。",
    overlapFailure: "可用孔位会导致压板与其他压板重合。",
    noHoleFailure: "在 ±{angle} deg 自动转角范围内找不到可用孔位。",
    mountingFailed: "无法固定",
    retryMounting: "拖动元件即可重新自动寻找压板角度。",
    noCatalogResults: "没有符合筛选条件的元件。",
    selectedCatalog: "已选择：{name} · {type}",
  },
  en: {
    documentTitle: "Optical Layout Mounting Prototype",
    brandTitle: "Optical Layout",
    brandSubtitle: "Hole Mounting Prototype",
    opticalTable: "Optical Table",
    tableSize: "Table Size",
    table900x600: "900 x 600 mm Breadboard",
    table600x600: "600 x 600 mm Breadboard",
    table600x300: "600 x 300 mm Breadboard",
    table450x300: "450 x 300 mm Breadboard",
    table300x300: "300 x 300 mm Breadboard",
    holePitch: "Hole Pitch",
    edgeMargin: "Edge Margin",
    componentLibrary: "Component Library",
    addComponent: "Add Component",
    selectedComponent: "Selected Component",
    emptyInspector: "Select a component to edit its mounting",
    libraryName: "Library name: ",
    componentLabel: "Component Label",
    componentRotation: "Component Angle",
    clampRotation: "Clamp Angle",
    maxAutoTurn: "Maximum Auto Rotation",
    sourceWavelength: "Source Wavelength",
    mountingRules: "Mounting Rules",
    mountingRulesText: "After dragging a component, the clamp automatically selects an available hole with the smallest rotation. Clamps cannot overlap. A blocked screw is allowed but shown as a warning.",
    opticalRules: "Optical Rules",
    opticalRulesText: "Sources emit along the component angle. Mirrors reflect with equal angles of incidence and reflection. Beamsplitter cubes generate reflected and transmitted branches.",
    resetView: "Reset View",
    clearAll: "Clear Components",
    exportSvg: "Export SVG",
    exportPng: "Export PNG",
    language: "Language",
    pendingPrefix: "Pending: ",
    pendingHelp: "Drag the component to preview the hole and clamp positions, then place it into the layout.",
    label: "Label",
    cancel: "Cancel",
    place: "Place",
    canvasLabel: "Optical table canvas",
    pickerTitle: "Select Optical Component",
    pickerSubtitle: "Choose a component from the library to add it to the canvas.",
    close: "Close",
    searchComponent: "Search Components",
    searchPlaceholder: "Enter a name",
    componentType: "Component Type",
    allTypes: "All Types",
    sourceType: "Source",
    reflectorType: "Reflective Element",
    transmissiveType: "Transmissive Element",
    beamsplitterType: "Beamsplitter",
    nothingSelected: "No component selected",
    confirm: "Confirm",
    exportPreviewTitle: "Export Preview",
    downloadFolderHelp: "Your browser will save the download to its default downloads folder.",
    closeExportPreview: "Close export preview",
    exportPreviewAlt: "Optical layout export preview",
    downloadLocal: "Download",
    thumbnailLabel: "{name} thumbnail",
    downloaded: "Downloaded {filename}",
    previewReady: "Generated preview for {filename}",
    svgFormat: "SVG vector image",
    pngFormat: "PNG image",
    generatingPng: "Generating PNG preview...",
    pngFailed: "Failed to generate PNG",
    svgFailed: "Failed to generate SVG",
    noAdjustment: "Auto rotation: no adjustment needed",
    adjustment: "Auto rotation: {angle} deg",
    warningLabel: "Warning: ",
    blockedScrew: "The screw center is blocked by a post and may be inaccessible during installation.",
    mounted: "Mounted",
    screwHole: "Screw hole: ({x}, {y}) mm",
    noClampOverlap: "The clamp does not overlap another clamp.",
    overlapFailure: "Available holes would cause the clamp to overlap another clamp.",
    noHoleFailure: "No available hole was found within the ±{angle} deg auto-rotation range.",
    mountingFailed: "Cannot mount",
    retryMounting: "Drag the component to automatically search for a new clamp angle.",
    noCatalogResults: "No components match the current filters.",
    selectedCatalog: "Selected: {name} · {type}",
  },
};
const componentTranslations = {
  "laser-source": {
    en: { name: "Ultrastable Mount Beam Coupler", typeLabel: "Source" },
  },
  "mirror-mount": {
    en: { name: "Ultrastable 1-inch Mirror Mount", typeLabel: "Reflective Element" },
  },
  "lens-mount": {
    en: { name: "Lens Mount", typeLabel: "Transmissive Element" },
  },
  waveplate1inch: {
    en: { name: "1-inch Wave Plate Mount", typeLabel: "Polarization Element" },
  },
  "beamsplitter-cube-1inch": {
    en: { name: "1-inch Beamsplitter Cube", typeLabel: "Beamsplitter" },
  },
};
const publishedLibrary = window.OPTICAL_COMPONENT_LIBRARY;
if (!publishedLibrary?.components?.length) {
  throw new Error("Published component library is missing or empty.");
}
const catalog = publishedLibrary.components;

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
  exportPreview: null,
  locale: localStorage.getItem("optical-layout-locale") === "en" ? "en" : "zh",
};

function t(key, variables = {}) {
  const template = translations[state.locale][key] ?? translations.zh[key] ?? key;
  return Object.entries(variables).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, value),
    template,
  );
}

function formatMm(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function getCatalogName(definition) {
  return componentTranslations[definition.id]?.[state.locale]?.name ?? definition.name;
}

function getCatalogTypeLabel(definition) {
  return componentTranslations[definition.id]?.[state.locale]?.typeLabel ?? definition.typeLabel;
}

function getComponentDefinition(component) {
  return catalog.find((definition) => definition.id === component.catalogId);
}

function getComponentLibraryName(component) {
  const definition = getComponentDefinition(component);
  return definition ? getCatalogName(definition) : component.name;
}

function applyStaticTranslations() {
  document.documentElement.lang = state.locale === "en" ? "en" : "zh-CN";
  document.title = t("documentTitle");
  languageSelect.value = state.locale;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((node) => {
    node.setAttribute("alt", t(node.dataset.i18nAlt));
  });
}

function setLocale(locale) {
  state.locale = locale === "en" ? "en" : "zh";
  localStorage.setItem("optical-layout-locale", state.locale);
  state.components.forEach((component) => {
    if (!component.labelIsDefault) return;
    component.label = getComponentLibraryName(component);
  });
  exportStatus.textContent = "";
  applyStaticTranslations();
  if (!componentPicker.hidden) renderComponentCatalog();
  if (state.exportPreview) {
    exportPreviewMeta.textContent =
      `${t(state.exportPreview.formatKey)} · ${(state.exportPreview.blob.size / 1024).toFixed(1)} KB`;
  }
  render();
}

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

function getLensEllipseGeometry(surface) {
  const start = { x: surface.startXmm, y: surface.startYmm };
  const end = { x: surface.endXmm, y: surface.endYmm };
  const direction = sub(end, start);
  const center = mul(add(start, end), 0.5);
  return {
    cx: center.x,
    cy: center.y,
    rx: Math.max(0.5, length(direction) / 2),
    ry: 1.5,
    transform: `rotate(${radToDeg(Math.atan2(direction.y, direction.x))} ${center.x} ${center.y})`,
  };
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

function getPostCenter(component) {
  return { x: component.post.centerX, y: component.post.centerY };
}

function clampLocalToWorld(component, clamp, localPoint) {
  const pivotWorld = localToWorld(component, getPostCenter(component));
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

function circlePolygon(centerX, centerY, radius, segments = 20) {
  return Array.from({ length: segments }, (_, index) => {
    const angle = (index / segments) * Math.PI * 2;
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    };
  });
}

function arcPoints(center, radius, startAngle, endAngle, segments = 12) {
  return Array.from({ length: segments + 1 }, (_, index) => {
    const angle = startAngle + ((endAngle - startAngle) * index) / segments;
    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius,
    };
  });
}

function ellipseArcPoints(center, radiusX, radiusY, startAngle, endAngle, segments = 12) {
  return Array.from({ length: segments + 1 }, (_, index) => {
    const angle = startAngle + ((endAngle - startAngle) * index) / segments;
    return {
      x: center.x + Math.cos(angle) * radiusX,
      y: center.y + Math.sin(angle) * radiusY,
    };
  });
}

function forkClampPolygon(clamp) {
  const end = clamp.slotEnd;
  const lengthToEnd = length(end);
  if (lengthToEnd < 0.001) return circlePolygon(0, 0, clamp.width / 2);
  const rotation = Math.atan2(end.y, end.x);
  const halfWidth = Math.max(0.5, clamp.width / 2);
  const endLength = Math.max(0.5, clamp.endLength);
  const forkRadius = Math.max(halfWidth + 0.5, clamp.forkOuterDiameter / 2);
  const clearanceRadius = Math.min(forkRadius - 0.5, Math.max(0.5, clamp.forkClearanceDiameter / 2));
  const bodyAngle = Math.asin(halfWidth / forkRadius);
  const joinX = Math.sqrt(forkRadius * forkRadius - halfWidth * halfWidth);
  const points = [
    { x: 0, y: -forkRadius },
    { x: 0, y: -clearanceRadius },
    ...arcPoints({ x: 0, y: 0 }, clearanceRadius, -Math.PI / 2, Math.PI / 2).slice(1),
    { x: 0, y: forkRadius },
    ...arcPoints({ x: 0, y: 0 }, forkRadius, Math.PI / 2, bodyAngle).slice(1),
    { x: joinX, y: halfWidth },
    { x: lengthToEnd, y: halfWidth },
    ...ellipseArcPoints({ x: lengthToEnd, y: 0 }, endLength, halfWidth, Math.PI / 2, -Math.PI / 2).slice(1),
    { x: joinX, y: -halfWidth },
    ...arcPoints({ x: 0, y: 0 }, forkRadius, -bodyAngle, -Math.PI / 2).slice(1),
  ];
  return points.map((point) => rotatePoint(point, radToDeg(rotation)));
}

function forkClampPath(clamp) {
  const points = forkClampPolygon(clamp);
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ") + " Z";
}

function transformComponentPolygon(component, points) {
  return points.map((point) => localToWorld(component, point));
}

function transformClampPolygon(component, clampRotationDeg) {
  const pivotWorld = localToWorld(component, getPostCenter(component));
  const totalRotation = component.rotation + clampRotationDeg;
  return forkClampPolygon(component.clamp).map((point) =>
    add(pivotWorld, rotatePoint(point, totalRotation)),
  );
}

function pointOnSegment(point, start, end) {
  const epsilon = 0.000001;
  if (Math.abs(cross(sub(end, start), sub(point, start))) > epsilon) return false;
  return (
    point.x >= Math.min(start.x, end.x) - epsilon &&
    point.x <= Math.max(start.x, end.x) + epsilon &&
    point.y >= Math.min(start.y, end.y) - epsilon &&
    point.y <= Math.max(start.y, end.y) + epsilon
  );
}

function segmentsIntersect(aStart, aEnd, bStart, bEnd) {
  const epsilon = 0.000001;
  const aToBStart = cross(sub(aEnd, aStart), sub(bStart, aStart));
  const aToBEnd = cross(sub(aEnd, aStart), sub(bEnd, aStart));
  const bToAStart = cross(sub(bEnd, bStart), sub(aStart, bStart));
  const bToAEnd = cross(sub(bEnd, bStart), sub(aEnd, bStart));
  if (aToBStart * aToBEnd < -epsilon && bToAStart * bToAEnd < -epsilon) return true;
  return (
    (Math.abs(aToBStart) <= epsilon && pointOnSegment(bStart, aStart, aEnd)) ||
    (Math.abs(aToBEnd) <= epsilon && pointOnSegment(bEnd, aStart, aEnd)) ||
    (Math.abs(bToAStart) <= epsilon && pointOnSegment(aStart, bStart, bEnd)) ||
    (Math.abs(bToAEnd) <= epsilon && pointOnSegment(aEnd, bStart, bEnd))
  );
}

function polygonsOverlap(a, b) {
  for (let aIndex = 0; aIndex < a.length; aIndex += 1) {
    const aStart = a[aIndex];
    const aEnd = a[(aIndex + 1) % a.length];
    for (let bIndex = 0; bIndex < b.length; bIndex += 1) {
      const bStart = b[bIndex];
      const bEnd = b[(bIndex + 1) % b.length];
      if (segmentsIntersect(aStart, aEnd, bStart, bEnd)) return true;
    }
  }
  return pointInPolygon(a[0], b) || pointInPolygon(b[0], a);
}

function getComponentCollisionPolygons(component) {
  const { width, height } = component.size;
  const post = component.post;
  return [
    transformComponentPolygon(component, rectPolygon(-width / 2, -height / 2, width, height)),
    transformComponentPolygon(
      component,
      circlePolygon(post.centerX, post.centerY, post.diameter / 2),
    ),
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
  const pivot = localToWorld(component, getPostCenter(component));
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

function mmPoint(point) {
  return { x: point.xMm, y: point.yMm };
}

function makeComponent(definition, options = {}) {
  const body = definition.geometry.body;
  const post = definition.geometry.post;
  const clamp = definition.geometry.clamp;
  const placement = definition.defaultPlacement ?? {};
  const localizedName = getCatalogName(definition);
  return {
    id: crypto.randomUUID(),
    catalogId: definition.id,
    name: definition.name,
    label: localizedName,
    labelIsDefault: true,
    type: definition.type,
    typeLabel: definition.typeLabel,
    visualKind: definition.visualKind,
    placementState: options.placementState ?? "placed",
    needsClampResolve: true,
    position: {
      x: (placement.xMm ?? 105) + state.components.length * 35,
      y: placement.yMm ?? 120,
    },
    rotation: placement.rotationDeg ?? 0,
    size: { width: body.widthMm, height: body.heightMm },
    post: {
      centerX: post.centerXmm,
      centerY: post.centerYmm,
      diameter: post.diameterMm,
    },
    clamp: {
      width: clamp.widthMm,
      forkOuterDiameter: clamp.forkOuterDiameterMm,
      forkClearanceDiameter: clamp.forkClearanceDiameterMm,
      endLength: clamp.endLengthMm ?? clamp.widthMm / 2,
      slotStart: { x: clamp.slot.startXmm, y: clamp.slot.startYmm },
      slotEnd: { x: clamp.slot.endXmm, y: clamp.slot.endYmm },
      rotation: clamp.defaultRotationDeg,
    },
    optics: structuredClone(definition.optics),
    wavelengthNm: definition.optics.wavelengthNm,
  };
}

function getCatalogThumbnailBounds(component) {
  const { width, height } = component.size;
  const pivot = getPostCenter(component);
  const clampRotation = component.clamp.rotation;
  const clampPoints = forkClampPolygon(component.clamp).map((point) =>
    add(pivot, rotatePoint(point, clampRotation)),
  );
  const screw = add(pivot, rotatePoint(component.clamp.slotEnd, clampRotation));
  const points = [
    ...rectPolygon(-width / 2, -height / 2, width, height),
    ...circlePolygon(pivot.x, pivot.y, component.post.diameter / 2),
    ...clampPoints,
    { x: screw.x - 5, y: screw.y - 5 },
    { x: screw.x + 5, y: screw.y + 5 },
  ];
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const padding = 7;
  const minX = Math.min(...xs) - padding;
  const minY = Math.min(...ys) - padding;
  const maxX = Math.max(...xs) + padding;
  const maxY = Math.max(...ys) + padding;
  return { minX, minY, width: maxX - minX, height: maxY - minY };
}

function createCatalogThumbnail(definition) {
  const component = makeComponent(definition);
  component.position = { x: 0, y: 0 };
  component.rotation = 0;
  const bounds = getCatalogThumbnailBounds(component);
  const pivot = getPostCenter(component);
  const thumbnail = createSvg("svg", {
    class: "catalog-thumbnail",
    viewBox: `${bounds.minX} ${bounds.minY} ${bounds.width} ${bounds.height}`,
    preserveAspectRatio: "xMidYMid meet",
    role: "img",
    "aria-label": t("thumbnailLabel", { name: getCatalogName(definition) }),
  });
  const clampGroup = createSvg("g", {
    transform: `translate(${pivot.x} ${pivot.y}) rotate(${component.clamp.rotation})`,
  });
  clampGroup.appendChild(createSvg("path", {
    class: "clamp",
    d: forkClampPath(component.clamp),
  }));
  clampGroup.appendChild(createSvg("line", {
    class: "slot",
    x1: component.clamp.slotStart.x,
    y1: component.clamp.slotStart.y,
    x2: component.clamp.slotEnd.x,
    y2: component.clamp.slotEnd.y,
  }));
  clampGroup.appendChild(createSvg("circle", {
    class: "screw",
    cx: component.clamp.slotEnd.x,
    cy: component.clamp.slotEnd.y,
    r: 4,
  }));
  thumbnail.appendChild(clampGroup);

  const { width, height } = component.size;
  thumbnail.appendChild(createSvg("rect", {
    class: "component-body",
    x: -width / 2,
    y: -height / 2,
    width,
    height,
    rx: 3,
  }));
  thumbnail.appendChild(createSvg("circle", {
    class: "post",
    cx: pivot.x,
    cy: pivot.y,
    r: component.post.diameter / 2,
  }));

  if (component.visualKind === "source") {
    thumbnail.appendChild(createSvg("circle", {
      class: "source-aperture",
      cx: width / 2,
      cy: 0,
      r: 5,
    }));
    thumbnail.appendChild(createSvg("path", {
      class: "source-symbol",
      d: "M -12 -4 L -4 0 L -12 4 Z",
    }));
  } else if (component.visualKind === "lens") {
    thumbnail.appendChild(createSvg("ellipse", {
      class: "optic",
      ...getLensEllipseGeometry(component.optics.surface),
    }));
  } else if (component.visualKind === "beamsplitter") {
    const surface = component.optics.surface;
    thumbnail.appendChild(createSvg("line", {
      class: "splitter-face",
      x1: surface.startXmm,
      y1: surface.startYmm,
      x2: surface.endXmm,
      y2: surface.endYmm,
    }));
  } else {
    const surface = component.optics.surface;
    thumbnail.appendChild(createSvg("line", {
      class: "mirror-back",
      x1: surface.startXmm,
      y1: surface.startYmm,
      x2: surface.endXmm,
      y2: surface.endYmm,
    }));
    thumbnail.appendChild(createSvg("line", {
      class: "mirror-face",
      x1: surface.startXmm,
      y1: surface.startYmm,
      x2: surface.endXmm,
      y2: surface.endYmm,
    }));
  }

  thumbnail.appendChild(createSvg("circle", {
    class: "pivot",
    cx: pivot.x,
    cy: pivot.y,
    r: 3,
  }));
  return thumbnail;
}

function clearSvg() {
  while (svg.firstChild) svg.removeChild(svg.firstChild);
}

function getExportStyles() {
  return [...document.styleSheets]
    .flatMap((sheet) => {
      try {
        return [...sheet.cssRules].map((rule) => rule.cssText);
      } catch {
        return [];
      }
    })
    .join("\n");
}

function createExportSvg() {
  const clone = svg.cloneNode(true);
  const width = Number(svg.getAttribute("width"));
  const height = Number(svg.getAttribute("height"));
  clone.setAttribute("xmlns", NS);
  clone.setAttribute("width", width);
  clone.setAttribute("height", height);
  clone.setAttribute("viewBox", `0 0 ${width} ${height}`);

  clone.querySelectorAll(".selected-outline, .pending-outline").forEach((node) => node.remove());
  clone.querySelectorAll(".selected, .pending").forEach((node) => {
    node.classList.remove("selected", "pending");
  });
  state.components
    .filter((component) => component.placementState !== "placed")
    .forEach((component) => {
      clone.querySelectorAll(
        `[data-component-id="${component.id}"], [data-label-component-id="${component.id}"]`,
      ).forEach((node) => node.remove());
    });

  const background = createSvg("rect", {
    width,
    height,
    fill: "#e9edf3",
  });
  const defs = clone.querySelector("defs") ?? createSvg("defs");
  if (!defs.parentNode) clone.prepend(defs);
  const style = createSvg("style");
  style.textContent = getExportStyles();
  defs.appendChild(style);
  defs.after(background);
  return clone;
}

function createExportSvgMarkup() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(createExportSvg())}`;
}

function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  exportStatus.textContent = t("downloaded", { filename });
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

function closeExportDialog() {
  if (state.exportPreview?.url) URL.revokeObjectURL(state.exportPreview.url);
  state.exportPreview = null;
  exportPreviewImage.removeAttribute("src");
  exportPreview.hidden = true;
}

function openExportDialog(filename, blob, formatKey) {
  if (state.exportPreview?.url) URL.revokeObjectURL(state.exportPreview.url);
  const url = URL.createObjectURL(blob);
  state.exportPreview = { filename, blob, url, formatKey };
  exportPreviewFilename.textContent = filename;
  exportPreviewMeta.textContent = `${t(formatKey)} · ${(blob.size / 1024).toFixed(1)} KB`;
  exportPreviewImage.src = url;
  exportPreview.hidden = false;
  exportStatus.textContent = t("previewReady", { filename });
}

function previewSvg() {
  openExportDialog(
    "optical-layout.svg",
    new Blob([createExportSvgMarkup()], { type: "image/svg+xml;charset=utf-8" }),
    "svgFormat",
  );
}

async function createExportPngBlob() {
  const markup = createExportSvgMarkup();
  const svgUrl = URL.createObjectURL(new Blob([markup], { type: "image/svg+xml;charset=utf-8" }));
  const image = new Image();
  image.src = svgUrl;
  try {
    await image.decode();
    const width = Number(svg.getAttribute("width"));
    const height = Number(svg.getAttribute("height"));
    const pixelRatio = 2;
    const canvas = document.createElement("canvas");
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    const context = canvas.getContext("2d");
    context.fillStyle = "#e9edf3";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}

async function previewPng() {
  exportStatus.textContent = t("generatingPng");
  try {
    const blob = await createExportPngBlob();
    if (blob) openExportDialog("optical-layout.png", blob, "pngFormat");
  } catch {
    exportStatus.textContent = t("pngFailed");
  }
}

window.OPTICAL_LAYOUT_EXPORT = {
  createSvgMarkup: createExportSvgMarkup,
  createPngBlob: createExportPngBlob,
};

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
  renderLabels();
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
  if (component.visualKind === "source") {
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
        d: "M -12 -4 L -4 0 L -12 4 Z",
      }),
    );
  } else if (component.visualKind === "lens") {
    const lens = getLensEllipseGeometry(component.optics.surface);
    group.appendChild(
      createSvg("ellipse", {
        class: "optic",
        ...lens,
      }),
    );
  } else if (component.visualKind === "beamsplitter") {
    const surface = component.optics.surface;
    group.appendChild(
      createSvg("line", {
        class: "splitter-face",
        x1: surface.startXmm,
        y1: surface.startYmm,
        x2: surface.endXmm,
        y2: surface.endYmm,
      }),
    );
  } else {
    const surface = component.optics.surface;
    group.appendChild(
      createSvg("line", {
        class: "mirror-back",
        x1: surface.startXmm,
        y1: surface.startYmm,
        x2: surface.endXmm,
        y2: surface.endYmm,
      }),
    );
    group.appendChild(
      createSvg("line", {
        class: "mirror-face",
        x1: surface.startXmm,
        y1: surface.startYmm,
        x2: surface.endXmm,
        y2: surface.endYmm,
      }),
    );
  }

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

function getComponentLabelBounds(component) {
  const { width, height } = component.size;
  const post = component.post;
  const clampResult = getStoredClampResult(component);
  const points = [
    ...transformComponentPolygon(component, rectPolygon(-width / 2, -height / 2, width, height)),
    ...transformComponentPolygon(component, circlePolygon(post.centerX, post.centerY, post.diameter / 2)),
    ...transformClampPolygon(component, clampResult.effectiveClampRotation),
  ].map(worldToScreen);
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  return {
    centerX: (Math.min(...xs) + Math.max(...xs)) / 2,
    bottomY: Math.max(...ys),
  };
}

function renderLabels() {
  const labelLayer = createSvg("g", { class: "label-layer" });
  state.components.forEach((component) => {
    const label = component.label ?? component.name;
    if (!label) return;
    const bounds = getComponentLabelBounds(component);
    const text = createSvg("text", {
      class: "label",
      "data-label-component-id": component.id,
      x: bounds.centerX,
      y: bounds.bottomY + 10,
      "text-anchor": "middle",
      "dominant-baseline": "hanging",
    });
    text.textContent = label;
    labelLayer.appendChild(text);
  });
  svg.appendChild(labelLayer);
}

function updateRenderedLabel(component) {
  const label = component.label ?? component.name;
  svg.querySelectorAll(`[data-label-component-id="${component.id}"]`).forEach((node) => {
    node.textContent = label;
  });
}

function getSourceRay(component) {
  const sourcePort = component.optics.sourcePort ?? { xMm: component.size.width / 2 + 3, yMm: 0 };
  return {
    origin: localToWorld(component, mmPoint(sourcePort)),
    direction: normalize(rotatePoint({ x: 1, y: 0 }, component.rotation)),
    wavelengthNm: component.wavelengthNm ?? 650,
  };
}

function getInteractionSegment(component) {
  const surface = component.optics.surface;
  return {
    component,
    start: localToWorld(component, { x: surface.startXmm, y: surface.startYmm }),
    end: localToWorld(component, { x: surface.endXmm, y: surface.endYmm }),
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

function rayRectangleDistances(origin, direction, bounds) {
  const epsilon = 0.000001;
  const distances = [];
  const addVerticalEdge = (x) => {
    if (Math.abs(direction.x) < epsilon) return;
    const distance = (x - origin.x) / direction.x;
    const y = origin.y + direction.y * distance;
    if (distance > epsilon && y >= bounds.minY - epsilon && y <= bounds.maxY + epsilon) {
      distances.push(distance);
    }
  };
  const addHorizontalEdge = (y) => {
    if (Math.abs(direction.y) < epsilon) return;
    const distance = (y - origin.y) / direction.y;
    const x = origin.x + direction.x * distance;
    if (distance > epsilon && x >= bounds.minX - epsilon && x <= bounds.maxX + epsilon) {
      distances.push(distance);
    }
  };

  addVerticalEdge(bounds.minX);
  addVerticalEdge(bounds.maxX);
  addHorizontalEdge(bounds.minY);
  addHorizontalEdge(bounds.maxY);
  return distances;
}

function distanceToTableEdge(origin, direction) {
  const tableDistances = rayRectangleDistances(origin, direction, {
    minX: 0,
    minY: 0,
    maxX: state.table.width,
    maxY: state.table.height,
  });
  if (tableDistances.length > 0) return Math.max(...tableDistances);

  const canvasWidth = Number(svg.getAttribute("width"));
  const canvasHeight = Number(svg.getAttribute("height"));
  const canvasDistances = rayRectangleDistances(origin, direction, {
    minX: -state.offset.x / state.scale,
    minY: -state.offset.y / state.scale,
    maxX: (canvasWidth - state.offset.x) / state.scale,
    maxY: (canvasHeight - state.offset.y) / state.scale,
  });
  return canvasDistances.length > 0
    ? Math.max(...canvasDistances)
    : Math.hypot(state.table.width, state.table.height);
}

function applyOpticalInteraction(component, beamState) {
  if (component.optics.behavior === "split") {
    return [
      beamState,
      {
        ...beamState,
        direction: reflect(beamState.direction, beamState.surfaceDirection),
        kind: "reflected",
      },
    ];
  }

  if (component.optics.behavior === "reflect") {
    return [{
      ...beamState,
      direction: reflect(beamState.direction, beamState.surfaceDirection),
      kind: "reflected",
    }];
  }

  if (component.optics.behavior === "wavelength-shift") {
    return [{
      ...beamState,
      wavelengthNm: component.optics.outputWavelengthNm ?? beamState.wavelengthNm,
    }];
  }

  if (component.optics.behavior === "absorb") {
    return [];
  }

  return [beamState];
}

function traceBeam(source) {
  const segments = [];
  const interactions = state.components
    .filter((item) => item.optics.surface && item.placementState === "placed")
    .map(getInteractionSegment);
  const initialRay = getSourceRay(source);
  const rays = [{ ...initialRay, kind: "incoming", usedHits: new Set(), steps: 0 }];

  while (rays.length > 0) {
    const ray = rays.shift();
    const { origin, direction, wavelengthNm, usedHits, steps, kind } = ray;
    const hits = interactions
      .map((interaction) => ({
        interaction,
        hit: raySegmentIntersection(origin, direction, interaction.start, interaction.end),
      }))
      .filter((entry) => entry.hit && !usedHits.has(entry.interaction.component.id))
      .sort((a, b) => a.hit.rayT - b.hit.rayT);

    const nearest = hits[0];
    if (!nearest) {
      const edgeDistance = distanceToTableEdge(origin, direction);
      segments.push({
        start: origin,
        end: add(origin, mul(direction, edgeDistance)),
        wavelengthNm,
        kind,
      });
      continue;
    }

    segments.push({ start: origin, end: nearest.hit.point, wavelengthNm, kind });
    if (steps >= 3) continue;
    const nextUsedHits = new Set(usedHits);
    nextUsedHits.add(nearest.interaction.component.id);
    const nextBeams = applyOpticalInteraction(nearest.interaction.component, {
      direction,
      wavelengthNm,
      surfaceDirection: sub(nearest.interaction.end, nearest.interaction.start),
      kind,
    });
    nextBeams.forEach((nextBeam) => {
      rays.push({
        ...nextBeam,
        origin: add(nearest.hit.point, mul(nextBeam.direction, 0.8)),
        usedHits: new Set(nextUsedHits),
        steps: steps + 1,
      });
    });
  }

  return segments;
}

function renderBeams() {
  const beamGroup = createSvg("g", { class: "beam-layer" });
  state.components
    .filter((component) => component.optics.behavior === "source" && component.placementState === "placed")
    .forEach((source) => {
      traceBeam(source).forEach((segment) => {
        const start = worldToScreen(segment.start);
        const end = worldToScreen(segment.end);
        beamGroup.appendChild(
          createSvg("line", {
            class: `beam ${segment.kind}`,
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
  const pivot = localToWorld(component, getPostCenter(component));
  const pivotScreen = worldToScreen(pivot);
  const angle = component.rotation + result.effectiveClampRotation;
  const clampGroup = createSvg("g", {
    class: `clamp-group${isSelected ? " selected" : ""}${isPending ? " pending" : ""}`,
    "data-component-id": component.id,
    transform: `translate(${pivotScreen.x} ${pivotScreen.y}) rotate(${angle}) scale(${state.scale})`,
  });

  clampGroup.appendChild(
    createSvg("path", {
      class: "clamp",
      d: forkClampPath(component.clamp),
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
  clampGroup.appendChild(
    createSvg("circle", {
      class: "post",
      cx: 0,
      cy: 0,
      r: component.post.diameter / 2,
    }),
  );
  clampGroup.appendChild(createSvg("circle", { class: "pivot", cx: 0, cy: 0, r: 3 }));
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

  componentLibraryName.textContent = getComponentLibraryName(selected);
  componentLabel.value = selected.label ?? selected.name;
  componentRotation.value = selected.rotation;
  componentRotationNumber.value = Math.round(selected.rotation);
  componentRotationValue.textContent = `${Math.round(selected.rotation)} deg`;
  clampRotation.value = selected.clamp.rotation;
  clampRotationValue.textContent = `${Math.round(selected.clamp.rotation)} deg`;
  clampFlex.value = state.maxAutoTurnDeg;
  clampFlexValue.textContent = `${state.maxAutoTurnDeg} deg`;
  wavelengthControls.hidden = selected.optics.behavior !== "source";
  wavelengthControls.style.display = selected.optics.behavior === "source" ? "" : "none";
  if (selected.optics.behavior === "source") {
    wavelengthInput.value = selected.wavelengthNm ?? 650;
    wavelengthValue.textContent = `${selected.wavelengthNm ?? 650} nm`;
  }

  const result = getStoredClampResult(selected);
  lockStatus.className = `status ${result.valid ? (result.screwBlocked ? "warning" : "valid") : "invalid"}`;
  if (result.valid) {
    const lastAdjustment = selected.lastClampAdjustmentDeg ?? result.angleDelta;
    const adjustment =
      Math.abs(lastAdjustment) < 0.1
        ? t("noAdjustment")
        : t("adjustment", { angle: lastAdjustment.toFixed(1) });
    const warning = result.screwBlocked
      ? `<br><strong>${t("warningLabel")}</strong>${t("blockedScrew")}`
      : "";
    lockStatus.innerHTML = `
      <strong>${t("mounted")}</strong><br>
      ${t("screwHole", { x: formatMm(result.candidate.x), y: formatMm(result.candidate.y) })}<br>
      ${adjustment}<br>
      ${t("noClampOverlap")}${warning}
    `;
  } else {
    const reason = result.blockedByClampOverlap
      ? t("overlapFailure")
      : t("noHoleFailure", { angle: state.maxAutoTurnDeg });
    lockStatus.innerHTML = `
      <strong>${t("mountingFailed")}</strong><br>
      ${reason}<br>
      ${t("retryMounting")}
    `;
  }
}

function renderPlacementUi() {
  const pending = state.components.find((component) => component.id === state.pendingComponentId);
  placementBar.hidden = !pending;
  openComponentPicker.disabled = Boolean(pending);
  if (!pending) return;

  const result = getStoredClampResult(pending);
  pendingComponentName.textContent = getComponentLibraryName(pending);
  pendingComponentLabel.value = pending.label ?? pending.name;
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
    const localizedName = getCatalogName(item).toLowerCase();
    const localizedTypeLabel = getCatalogTypeLabel(item).toLowerCase();
    const matchesType = type === "all" || item.type === type;
    const matchesQuery =
      query === "" ||
      localizedName.includes(query) ||
      localizedTypeLabel.includes(query) ||
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
    const name = document.createElement("strong");
    name.textContent = getCatalogName(item);
    const typeLabel = document.createElement("span");
    typeLabel.textContent = getCatalogTypeLabel(item);
    button.append(createCatalogThumbnail(item), name, typeLabel);
    componentCatalog.appendChild(button);
  });

  if (filteredCatalog.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = t("noCatalogResults");
    componentCatalog.appendChild(empty);
  }

  const selectedItem = catalog.find((item) => item.id === state.pickerSelectedCatalogId);
  pickerSelectionSummary.textContent = selectedItem
    ? t("selectedCatalog", {
        name: getCatalogName(selectedItem),
        type: getCatalogTypeLabel(selectedItem),
      })
    : t("nothingSelected");
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
  const component = makeComponent(catalogItem, {
    placementState: "pending",
  });
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

pendingComponentLabel.addEventListener("input", () => {
  const pending = state.components.find((component) => component.id === state.pendingComponentId);
  if (!pending) return;
  pending.label = pendingComponentLabel.value;
  pending.labelIsDefault = false;
  componentLabel.value = pending.label;
  updateRenderedLabel(pending);
});

componentLabel.addEventListener("input", () => {
  const selected = getSelected();
  if (!selected) return;
  selected.label = componentLabel.value;
  selected.labelIsDefault = false;
  if (selected.id === state.pendingComponentId) pendingComponentLabel.value = selected.label;
  updateRenderedLabel(selected);
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
  if (!selected || selected.optics.behavior !== "source") return;
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
  if (event.key === "Escape" && !exportPreview.hidden) closeExportDialog();
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

exportSvg.addEventListener("click", () => {
  try {
    previewSvg();
  } catch {
    exportStatus.textContent = t("svgFailed");
  }
});
exportPng.addEventListener("click", previewPng);
closeExportPreview.addEventListener("click", closeExportDialog);
cancelExportPreview.addEventListener("click", closeExportDialog);
exportPreview.addEventListener("click", (event) => {
  if (event.target === exportPreview) closeExportDialog();
});
downloadExportPreview.addEventListener("click", () => {
  if (!state.exportPreview) return;
  downloadBlob(state.exportPreview.filename, state.exportPreview.blob);
});
languageSelect.addEventListener("change", () => {
  setLocale(languageSelect.value);
});

applyStaticTranslations();
state.components.push(makeComponent(catalog.find((item) => item.id === "laser-source")));
state.components.push({
  ...makeComponent(catalog.find((item) => item.id === "mirror-mount")),
  position: { x: 150, y: 160 },
});
state.selectedId = state.components[1].id;
render();
