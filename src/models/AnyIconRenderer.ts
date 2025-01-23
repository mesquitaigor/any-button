import { html, render, TemplateResult } from 'lit-html';
import AnyIcon from './AnyIcon';

export class AnyIconRenderer {
  private template?: TemplateResult<1>;
  private readonly className = 'any-icon-img';
  public constructor(private shadow: ShadowRoot){}
  public render(element: AnyIcon<unknown>): void {
    const icon = element.getIcon();
    if(icon){
      this.template = html`
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
          src="${icon.getPatch() || ''}" 
          alt="${element.getAttribute('alt') || ''}"
        >
      `;
      this.update();
    }
  }
  private update(): void {
    render(this.template, this.shadow);
  }
}