import { AnyIconsManager } from '..';
import { IconSizes, ImgLoadingType, SizeNames } from '../any-icons.type';

export default class AnyIcon<Names> extends HTMLElement {
  private image?: HTMLImageElement;
  private shadow?: ShadowRoot;
  private static __manager__?: AnyIconsManager<Record<string, unknown>>;
  private static __manager_define_events__: (() => void)[] = [];
  private static readonly attributeName = 'icon-name';
  private static readonly imgIdPrefix = 'any-icon-img-element-';
  public static readonly elementName = 'any-icon';
  private randomId?: number
  private managerDefineEventCallback = (): void => {
    if(!this.image || (this.image && !this.image.getAttribute('src'))){
      const image = this.createImage();
      if(image){
        this.image = image;
      }
      this.appendImage();
      this.connectedCallback()
    }
  }
  public constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    const image = this.createImage();
    if(image){
      this.image = image;
    }
    this.appendImage();
    this.appendStyle();
    AnyIcon.__manager_define_events__?.push(this.managerDefineEventCallback);
  }

  public disconnectedCallback(): void{
    const index = AnyIcon.__manager_define_events__?.indexOf(this.managerDefineEventCallback);
    if (index > -1) {
      AnyIcon.__manager_define_events__?.splice(index, 1);
    }
  }

  public static get observedAttributes(): string[] {
    return [this.attributeName];
  }

  private createImage(): HTMLImageElement | void{
    const iconName: string | null = this.getAttribute(AnyIcon.attributeName)
    if(iconName){
      return AnyIcon.__manager__?.getIconElement(iconName);
    }else{
      return document.createElement("img");
    }
  }

  public static defineManager<ManagerNames>(manager: AnyIconsManager<ManagerNames>): void{
    AnyIcon.__manager__ = manager as AnyIconsManager<Record<string, unknown>>;
    if(AnyIcon.__manager_define_events__?.length){
      AnyIcon.__manager_define_events__.forEach(event => {
        if(typeof event == 'function'){
          event();
        }
      });
    }
  }

  public attributeChangedCallback(): void{
    if(!this.image?.getAttribute('src')){
      const image = this.createImage();
      if(image){
        this.image = image;
      }
      this.appendImage()
    }
  }

  private appendStyle(): void{
    const style = this.defineStyle();
    if(this.shadow){
      this.shadow.appendChild(style);
    }
  }

  private appendImage(): void{
    if(this.image && this.shadow){
      const indentifiedImg = this.shadow.getElementById(this.getIconId());
      if(indentifiedImg){
        indentifiedImg.remove();
      }
      this.randomId = this.genRandomId();
      this.image.id = this.getIconId();
      this.shadow.appendChild(this.image);
    }
  }

  private genRandomId(): number{
    const randomId = Math.floor(Math.random() * 1000);
    const windowWithId = document.getElementById(this.getIconId(randomId));
    if(windowWithId){
      return this.genRandomId();
    }
    return randomId;
  }

  private getIconId(randomId?: number): string{
    return AnyIcon.imgIdPrefix + String(randomId ? randomId : this.randomId)
  }

  private defineStyle(): HTMLStyleElement{
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
    return style
  }

  public setIcon(name: Names): void{
    this.setAttribute(AnyIcon.attributeName, name as string)
  }

  public setSize(size: IconSizes): void{
    this.setAttribute(SizeNames[size], '');
  }

  public connectedCallback(): void {
    if(this.image){
      this.defineLoadingByProp();
      this.defineAltByProp();
      this.defineSizeByProp();
    }
  }


  private defineImgLoading(loading: ImgLoadingType): void{
    if(this.image){
      this.image.loading = loading;
    }    
  }
  private defineAltByProp(): void{
    const alt = this.getAttribute("alt");
    if(alt && this.image){
      this.image.alt = alt;
    }
  }
  private defineSizeByProp(): void{
    Object.values(SizeNames).forEach((size: string, key: IconSizes) => {
      if(this.hasAttribute(size) && AnyIcon.__manager__ && this.image){
        const sizeValue = AnyIcon.__manager__.getSizeValue(key);
        if(typeof sizeValue === 'number'){
          this.image.height = sizeValue;
          this.image.width = sizeValue;
        }
      }
    });
  }
  private defineLoadingByProp(): void{
    const loadingLazy: boolean = this.hasAttribute(ImgLoadingType.LAZY);
    const loadingEager: boolean = this.hasAttribute(ImgLoadingType.EAGER);
    if(loadingLazy){
      this.defineImgLoading(ImgLoadingType.LAZY);
    }else if(loadingEager){
      this.defineImgLoading(ImgLoadingType.EAGER);
    }
  }
}