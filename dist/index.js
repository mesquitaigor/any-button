"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AnyIcon: () => AnyIcon,
  AnyIconsManager: () => AnyIconsManager,
  IconColors: () => IconColors,
  IconModel: () => IconModel,
  IconSizes: () => IconSizes,
  createManager: () => createManager
});
module.exports = __toCommonJS(index_exports);

// src/any-icons.type.ts
var IconSizes = /* @__PURE__ */ ((IconSizes4) => {
  IconSizes4[IconSizes4["NANO"] = 0] = "NANO";
  IconSizes4[IconSizes4["MICRO"] = 1] = "MICRO";
  IconSizes4[IconSizes4["TINY"] = 2] = "TINY";
  IconSizes4[IconSizes4["SMALL"] = 3] = "SMALL";
  IconSizes4[IconSizes4["MEDIUM"] = 4] = "MEDIUM";
  IconSizes4[IconSizes4["LARGE"] = 5] = "LARGE";
  IconSizes4[IconSizes4["HUGE"] = 6] = "HUGE";
  IconSizes4[IconSizes4["EXTRA_HUGE"] = 7] = "EXTRA_HUGE";
  IconSizes4[IconSizes4["GIANT"] = 8] = "GIANT";
  return IconSizes4;
})(IconSizes || {});
var IconColors = /* @__PURE__ */ ((IconColors3) => {
  IconColors3[IconColors3["PRIMARY"] = 0] = "PRIMARY";
  IconColors3[IconColors3["SECUNDARY"] = 1] = "SECUNDARY";
  IconColors3[IconColors3["TERTIARY"] = 2] = "TERTIARY";
  IconColors3[IconColors3["DANGER"] = 3] = "DANGER";
  IconColors3[IconColors3["WARNING"] = 4] = "WARNING";
  IconColors3[IconColors3["SUCCESS"] = 5] = "SUCCESS";
  IconColors3[IconColors3["BLACK"] = 6] = "BLACK";
  return IconColors3;
})(IconColors || {});
var ColorsPropName = {
  [0 /* PRIMARY */]: "primary",
  [1 /* SECUNDARY */]: "secundary",
  [2 /* TERTIARY */]: "tertiary",
  [3 /* DANGER */]: "danger",
  [4 /* WARNING */]: "warning",
  [5 /* SUCCESS */]: "success",
  [6 /* BLACK */]: "black"
};
var SizeNames = {
  [0 /* NANO */]: "nano",
  [1 /* MICRO */]: "micro",
  [2 /* TINY */]: "tiny",
  [3 /* SMALL */]: "small",
  [4 /* MEDIUM */]: "medium",
  [5 /* LARGE */]: "large",
  [6 /* HUGE */]: "huge",
  [7 /* EXTRA_HUGE */]: "extra-huge",
  [8 /* GIANT */]: "giant"
};

// src/models/AnyIconRenderer.ts
var import_lit_html = require("lit-html");
var AnyIconRenderer = class {
  constructor(shadow) {
    this.shadow = shadow;
    this.className = "any-icon-img";
  }
  render(element) {
    const icon = element.getIcon();
    if (icon) {
      this.template = import_lit_html.html`
        <style>
          :host {
            display: flex;
            width: min-content;
          }
          :host img.${this.className}{
            user-select: none;
            pointer-events: none;
            background-color: ${icon.getColor()};
            -webkit-mask: url(${icon.getPatch()}) no-repeat center;
            mask: url(${icon.getPatch()}) no-repeat center;
            mark-size: cover;
            object-fit: contain;
          }
        </style>
        <img 
          class="${this.className}"
          width="${icon.width}" 
          height="auto" 
          loading="${icon.getLoadingType()}"
          id="${icon.randomId}" 
          src="${icon.getPatch() || ""}" 
          alt="${element.getAttribute("alt") || ""}"
        >
      `;
      this.update();
    }
  }
  update() {
    (0, import_lit_html.render)(this.template, this.shadow);
  }
};

// src/models/AnyIcon.ts
var _AnyIcon = class _AnyIcon extends HTMLElement {
  constructor() {
    var _a;
    super();
    this.managerDefineEventCallback = () => {
      this.render();
    };
    this.anyIconRenderer = new AnyIconRenderer(this.attachShadow({ mode: "open" }));
    this.render();
    (_a = _AnyIcon.__manager_define_events__) == null ? void 0 : _a.push(this.managerDefineEventCallback);
  }
  render() {
    var _a;
    this.defineIcon();
    if (this.icon) {
      (_a = this.anyIconRenderer) == null ? void 0 : _a.render(this);
      this.defineLoadingByProp();
      this.defineAltByProp();
      this.defineSizeByProp();
      this.defineColor();
    }
  }
  getIcon() {
    return this.icon;
  }
  connectedCallback() {
    this.defineLoadingByProp();
    this.defineAltByProp();
    this.defineSizeByProp();
    this.defineColor();
  }
  defineColor() {
    if (this.icon) {
      const initialColor = this.icon.getColor();
      Object.values(ColorsPropName).forEach((propName, key) => {
        if (this.hasAttribute(propName) && _AnyIcon.__manager__ && this.icon) {
          const colorData = _AnyIcon.__manager__.getColor(key);
          this.icon.color = colorData.color;
        }
      });
      if (initialColor != this.icon.getColor()) {
        this.render();
      }
    }
  }
  setColor(color) {
    this.setAttribute(ColorsPropName[color], "");
  }
  disconnectedCallback() {
    var _a, _b;
    const index = (_a = _AnyIcon.__manager_define_events__) == null ? void 0 : _a.indexOf(this.managerDefineEventCallback);
    if (index > -1) {
      (_b = _AnyIcon.__manager_define_events__) == null ? void 0 : _b.splice(index, 1);
    }
  }
  static get observedAttributes() {
    return [this.attributeName];
  }
  defineIcon() {
    var _a;
    const iconName = this.getAttribute(_AnyIcon.attributeName);
    if (iconName) {
      this.icon = (_a = _AnyIcon.__manager__) == null ? void 0 : _a.getIcon(iconName);
    }
  }
  static defineManager(manager) {
    var _a;
    _AnyIcon.__manager__ = manager;
    if ((_a = _AnyIcon.__manager_define_events__) == null ? void 0 : _a.length) {
      _AnyIcon.__manager_define_events__.forEach((event) => {
        if (typeof event == "function") {
          event();
        }
      });
    }
  }
  setIcon(name) {
    this.setAttribute(_AnyIcon.attributeName, name);
  }
  setSize(size) {
    this.setAttribute(SizeNames[size], "");
  }
  defineAltByProp() {
    let changes = false;
    const alt = this.getAttribute("alt");
    if (alt && this.icon) {
      changes = true;
      this.icon.alt = alt;
    }
    return changes;
  }
  defineSizeByProp() {
    var _a, _b, _c, _d;
    const initialHeight = (_a = this.icon) == null ? void 0 : _a.height;
    const initialWidth = (_b = this.icon) == null ? void 0 : _b.width;
    Object.values(SizeNames).forEach((size, key) => {
      if (this.hasAttribute(size) && _AnyIcon.__manager__) {
        const sizeValue = _AnyIcon.__manager__.getSizeValue(key);
        if (typeof sizeValue === "number" && this.icon) {
          this.icon.height = sizeValue;
          this.icon.width = sizeValue;
        }
      }
    });
    return initialHeight != ((_c = this.icon) == null ? void 0 : _c.height) || initialWidth != ((_d = this.icon) == null ? void 0 : _d.width);
  }
  defineLoadingByProp() {
    var _a;
    let needRender = false;
    if ((_a = this.icon) == null ? void 0 : _a.getLoadingType()) {
      const loadingLazy = this.hasAttribute("lazy" /* LAZY */);
      const loadingEager = this.hasAttribute("eager" /* EAGER */);
      if (loadingLazy) {
        needRender = true;
        this.icon.loadingType("lazy" /* LAZY */);
      } else if (loadingEager) {
        needRender = true;
        this.icon.loadingType("eager" /* EAGER */);
      }
    }
    return needRender;
  }
};
_AnyIcon.__manager_define_events__ = [];
_AnyIcon.attributeName = "icon-name";
_AnyIcon.elementName = "any-icon";
var AnyIcon = _AnyIcon;

// src/models/IconModel.ts
var IconModel = class {
  constructor(name, path) {
    this.name = name;
    this.path = path;
    this.color = "black";
  }
  getPath() {
    return this.path;
  }
  loadingType(type) {
    this.loadingTypeProp = type;
    return this;
  }
  getLoadingType() {
    return this.loadingTypeProp;
  }
  getName() {
    return this.name;
  }
  getPatch() {
    return this.path;
  }
  getColor() {
    return this.color;
  }
  createElement() {
    const img = document.createElement("img");
    img.loading = "lazy";
    img.height = 12;
    img.width = 12;
    img.classList.add("any-icon-img");
    img.onerror = () => {
      console.error(`Falha ao carregar o \xEDcone "${this.name}". Verifique o caminho: ${this.path}`);
    };
    return img;
  }
  defineRandomId() {
    const randomIdNumber = Math.floor(Math.random() * 1e3);
    const elementIdName = `any-icon-img-element-${randomIdNumber}`;
    const windowWithId = document.getElementById(elementIdName);
    if (windowWithId) {
      return this.defineRandomId();
    }
    this.randomId = elementIdName;
  }
};

// src/models/AnyIconsManager.ts
var AnyIconsManager = class _AnyIconsManager {
  constructor() {
    this._sizes = [];
    this._colors = [];
    this.names = /* @__PURE__ */ new Map();
  }
  static build() {
    return new _AnyIconsManager();
  }
  addIcon(icon) {
    this.names.set(icon.getName(), icon);
  }
  icons(records) {
    records.forEach(({ name, src }) => {
      this.addIcon(new IconModel(name, src));
    });
  }
  getSizeValue(sizeName) {
    var _a;
    return ((_a = this._sizes.find((size) => size.size === sizeName)) == null ? void 0 : _a.value) || 16;
  }
  getIconElement(name) {
    const icon = this.names.get(name);
    if (icon) {
      const icont = icon.createElement();
      return icont;
    }
  }
  getIcon(iconName) {
    return this.names.get(iconName);
  }
  update() {
    AnyIcon.defineManager(this);
  }
  colors(colorsList) {
    this._colors.push(...colorsList);
  }
  getColor(color) {
    return this._colors.find((c) => c.name === color) || { color: "black", name: 6 /* BLACK */ };
  }
  sizes(sizes) {
    this._sizes.push(...sizes);
  }
  createElement() {
    return document.createElement(AnyIcon.elementName);
  }
};

// src/index.ts
var createManager = () => {
  const instance = AnyIconsManager.build();
  AnyIcon.defineManager(instance);
  return instance;
};
customElements.define(AnyIcon.elementName, AnyIcon);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AnyIcon,
  AnyIconsManager,
  IconColors,
  IconModel,
  IconSizes,
  createManager
});
//# sourceMappingURL=index.js.map