class IconElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const span = document.createElement("span");
    span.textContent = `Ícone: ${this.getAttribute("atributo")}`;

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
}

customElements.define("icon-element", IconElement);

export default IconElement;