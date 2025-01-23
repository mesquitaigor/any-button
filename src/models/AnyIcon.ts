import { AnyIconsManager, IconModel } from '..';
import { ColorsPropName, IconColors, IconSizes, IHTMLElement, ImgLoadingType, SizeNames } from '../any-icons.type';
import { AnyIconRenderer } from './AnyIconRenderer';

export default class AnyIcon<Names> extends HTMLElement implements IHTMLElement {
  
  private icon?: IconModel<Names>;
  private static __manager__?: AnyIconsManager<Record<string, unknown>>;
  private static __manager_define_events__: (() => void)[] = [];
  private static readonly attributeName = 'icon-name';
  public static readonly elementName = 'any-icon';
  private anyIconRenderer?: AnyIconRenderer;
  
  public constructor() {
    super();
    this.anyIconRenderer = new AnyIconRenderer(this.attachShadow({ mode: "open" }));
    this.render();
    AnyIcon.__manager_define_events__?.push(this.managerDefineEventCallback);
  }

  private render(): void {
    this.defineIcon()
    if(this.icon){
      this.anyIconRenderer?.render(this);
      this.defineLoadingByProp();
      this.defineAltByProp();
      this.defineSizeByProp();
      this.defineColor();
    }
    
  }

  public getIcon(): IconModel<Names> | undefined{
    return this.icon
  }
  
  private managerDefineEventCallback = (): void => {
    this.render();
  }

  public connectedCallback(): void {
    this.defineLoadingByProp();
    this.defineAltByProp();
    this.defineSizeByProp();
    this.defineColor();
  }

  private defineColor(): void{
    if(this.icon){
      const initialColor = this.icon.getColor();
      Object.values(ColorsPropName).forEach((propName: string, key: IconColors) => {
        if(this.hasAttribute(propName) && AnyIcon.__manager__ && this.icon){
          const colorData = AnyIcon.__manager__.getColor(key)
          this.icon.color = colorData.color;
        }
      })
      if(initialColor != this.icon.getColor()){
        this.render();
      }
    }
  }

  public setColor(color: IconColors): void{
    this.setAttribute(ColorsPropName[color], '');
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

  private defineIcon(): void{
    const iconName: Names | null = this.getAttribute(AnyIcon.attributeName) as Names | null;
    if(iconName){
      this.icon = AnyIcon.__manager__?.getIcon(iconName) as IconModel<Names>;
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

  public setIcon(name: Names): void{
    this.setAttribute(AnyIcon.attributeName, name as string)
  }

  public setSize(size: IconSizes): void{
    this.setAttribute(SizeNames[size], '');
  }
  private defineAltByProp(): boolean{
    let changes = false
    const alt = this.getAttribute("alt");
    if(alt && this.icon){
      changes = true
      this.icon.alt = alt;
    }
    return changes
  }
  private defineSizeByProp(): boolean{
    const initialHeight = this.icon?.height;
    const initialWidth = this.icon?.width;
    Object.values(SizeNames).forEach((size: string, key: IconSizes) => {
      if(this.hasAttribute(size) && AnyIcon.__manager__){
        const sizeValue = AnyIcon.__manager__.getSizeValue(key);
        if(typeof sizeValue === 'number' && this.icon){
          this.icon.height = sizeValue;
          this.icon.width = sizeValue;
        }
      }
    });
    return initialHeight != this.icon?.height || initialWidth != this.icon?.width
  }
  private defineLoadingByProp(): boolean{
    let needRender = false
    if(this.icon?.getLoadingType()){
      const loadingLazy: boolean = this.hasAttribute(ImgLoadingType.LAZY);
      const loadingEager: boolean = this.hasAttribute(ImgLoadingType.EAGER);
      if(loadingLazy){
        needRender = true
        this.icon.loadingType(ImgLoadingType.LAZY);
      }else if(loadingEager){
        needRender = true
        this.icon.loadingType(ImgLoadingType.EAGER);
      }
    }
    return needRender;
  }
}