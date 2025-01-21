class AnyIcon extends HTMLElement {
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

customElements.define("any-icon", AnyIcon);


class Icon{
  constructor(private path: string){}
  public getPath(): string{
    return this.path;
  }
}
class RegisterIcons{
  private icons: Icon[] = [];
}

export {AnyIcon, RegisterIcons}

