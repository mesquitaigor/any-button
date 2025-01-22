// src/any-icons.type.ts
var IconSizes = /* @__PURE__ */ ((IconSizes3) => {
  IconSizes3[IconSizes3["NANO"] = 0] = "NANO";
  IconSizes3[IconSizes3["MICRO"] = 1] = "MICRO";
  IconSizes3[IconSizes3["TINY"] = 2] = "TINY";
  IconSizes3[IconSizes3["SMALL"] = 3] = "SMALL";
  IconSizes3[IconSizes3["MEDIUM"] = 4] = "MEDIUM";
  IconSizes3[IconSizes3["LARGE"] = 5] = "LARGE";
  IconSizes3[IconSizes3["HUGE"] = 6] = "HUGE";
  IconSizes3[IconSizes3["EXTRA_HUGE"] = 7] = "EXTRA_HUGE";
  IconSizes3[IconSizes3["GIANT"] = 8] = "GIANT";
  return IconSizes3;
})(IconSizes || {});
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

// src/models/AnyIcon.ts
var _AnyIcon = class _AnyIcon extends HTMLElement {
  constructor() {
    var _a;
    super();
    this.managerDefineEventCallback = () => {
      if (!this.image || this.image && !this.image.getAttribute("src")) {
        const image = this.createImage();
        if (image) {
          this.image = image;
        }
        this.appendImage();
        this.connectedCallback();
      }
    };
    this.shadow = this.attachShadow({ mode: "open" });
    const image = this.createImage();
    if (image) {
      this.image = image;
    }
    this.appendImage();
    this.appendStyle();
    (_a = _AnyIcon.__manager_define_events__) == null ? void 0 : _a.push(this.managerDefineEventCallback);
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
  createImage() {
    var _a;
    const iconName = this.getAttribute(_AnyIcon.attributeName);
    if (iconName) {
      return (_a = _AnyIcon.__manager__) == null ? void 0 : _a.getIconElement(iconName);
    } else {
      return document.createElement("img");
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
  attributeChangedCallback() {
    var _a;
    if (!((_a = this.image) == null ? void 0 : _a.getAttribute("src"))) {
      const image = this.createImage();
      if (image) {
        this.image = image;
      }
      this.appendImage();
    }
  }
  appendStyle() {
    const style = this.defineStyle();
    if (this.shadow) {
      this.shadow.appendChild(style);
    }
  }
  appendImage() {
    if (this.image && this.shadow) {
      const indentifiedImg = this.shadow.getElementById(this.getIconId());
      if (indentifiedImg) {
        indentifiedImg.remove();
      }
      this.randomId = this.genRandomId();
      this.image.id = this.getIconId();
      this.shadow.appendChild(this.image);
    }
  }
  genRandomId() {
    const randomId = Math.floor(Math.random() * 1e3);
    const windowWithId = document.getElementById(this.getIconId(randomId));
    if (windowWithId) {
      return this.genRandomId();
    }
    return randomId;
  }
  getIconId(randomId) {
    return _AnyIcon.imgIdPrefix + String(randomId ? randomId : this.randomId);
  }
  defineStyle() {
    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: flex;
        width: min-content;
      }
      :host img.any-icon-img{
        user-select: none;
        pointer-events: none;
      }
    `;
    return style;
  }
  setIcon(name) {
    this.setAttribute(_AnyIcon.attributeName, name);
  }
  setSize(size) {
    this.setAttribute(SizeNames[size], "");
  }
  connectedCallback() {
    if (this.image) {
      this.defineLoadingByProp();
      this.defineAltByProp();
      this.defineSizeByProp();
    }
  }
  defineImgLoading(loading) {
    if (this.image) {
      this.image.loading = loading;
    }
  }
  defineAltByProp() {
    const alt = this.getAttribute("alt");
    if (alt && this.image) {
      this.image.alt = alt;
    }
  }
  defineSizeByProp() {
    Object.values(SizeNames).forEach((size, key) => {
      if (this.hasAttribute(size) && _AnyIcon.__manager__ && this.image) {
        const sizeValue = _AnyIcon.__manager__.getSizeValue(key);
        if (typeof sizeValue === "number") {
          this.image.height = sizeValue;
          this.image.width = sizeValue;
        }
      }
    });
  }
  defineLoadingByProp() {
    const loadingLazy = this.hasAttribute("lazy" /* LAZY */);
    const loadingEager = this.hasAttribute("eager" /* EAGER */);
    if (loadingLazy) {
      this.defineImgLoading("lazy" /* LAZY */);
    } else if (loadingEager) {
      this.defineImgLoading("eager" /* EAGER */);
    }
  }
};
_AnyIcon.__manager_define_events__ = [];
_AnyIcon.attributeName = "icon-name";
_AnyIcon.imgIdPrefix = "any-icon-img-element-";
_AnyIcon.elementName = "any-icon";
var AnyIcon = _AnyIcon;

// src/models/IconModel.ts
var IconModel = class {
  constructor(name, path) {
    this.name = name;
    this.path = path;
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
  createElement() {
    console.log("IconModel.create");
    const img = document.createElement("img");
    img.src = this.path;
    img.loading = "lazy";
    img.height = 12;
    img.width = 12;
    img.classList.add("any-icon-img");
    img.onerror = () => {
      console.error(`Falha ao carregar o \xEDcone "${this.name}". Verifique o caminho: ${this.path}`);
    };
    return img;
  }
};

// src/models/AnyIconsManager.ts
var AnyIconsManager = class _AnyIconsManager {
  constructor() {
    this.sizes = [];
    this.names = /* @__PURE__ */ new Map();
  }
  static build() {
    return new _AnyIconsManager();
  }
  addIcon(icon) {
    this.names.set(icon.getName(), icon);
  }
  register(records) {
    records.forEach(({ name, src }) => {
      this.addIcon(new IconModel(name, src));
    });
  }
  getSizeValue(sizeName) {
    var _a;
    return ((_a = this.sizes.find((size) => size.size === sizeName)) == null ? void 0 : _a.value) || 16;
  }
  getIconElement(name) {
    const icon = this.names.get(name);
    if (icon) {
      const icont = icon.createElement();
      return icont;
    }
  }
  update() {
    AnyIcon.defineManager(this);
  }
  registerSizes(sizes) {
    this.sizes.push(...sizes);
  }
  createElement() {
    return document.createElement(AnyIcon.elementName);
  }
};

// src/index.ts
async function loadCssFile(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Falha ao carregar o arquivo CSS");
    }
    const cssText = await response.text();
    console.log(cssText);
    return cssText;
  } catch (error) {
    console.error(error);
  }
}
loadCssFile("./style.css").then((cssContent) => {
  console.log(cssContent);
});
var createManager = () => {
  const instance = AnyIconsManager.build();
  AnyIcon.defineManager(instance);
  return instance;
};
customElements.define(AnyIcon.elementName, AnyIcon);
export {
  AnyIcon,
  AnyIconsManager,
  IconModel,
  IconSizes,
  createManager
};
//# sourceMappingURL=index.mjs.map