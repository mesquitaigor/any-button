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
  RegisterIcons: () => RegisterIcons
});
module.exports = __toCommonJS(index_exports);
var AnyIcon = class extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const span = document.createElement("span");
    span.textContent = `\xCDcone: ${this.getAttribute("atributo")}`;
    const style = document.createElement("style");
    style.textContent = `
      span {
        font-size: 20px;
        color: #007bff;
        font-family: Arial, sans-serif;
      }
    `;
    shadow.appendChild(style);
    shadow.appendChild(span);
  }
};
customElements.define("any-icon", AnyIcon);
var RegisterIcons = class {
  constructor() {
    this.icons = [];
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AnyIcon,
  RegisterIcons
});
//# sourceMappingURL=index.js.map