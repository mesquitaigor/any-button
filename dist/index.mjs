// src/index.ts
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
export {
  AnyIcon,
  RegisterIcons
};
//# sourceMappingURL=index.mjs.map