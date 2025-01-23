import { ImgLoadingType } from '../any-icons.type';
type elementImageId = `any-icon-img-element-${number}`;
export default class IconModel<IconNames>{
  private loadingTypeProp?: ImgLoadingType;
  public color: string = 'black';
  public randomId?: elementImageId;
  public width?: number;
  public alt?: string
  public height?: number;
  public constructor(private name: IconNames, private path: string){}
  public getPath(): string{
    return this.path;
  }
  public loadingType(type: ImgLoadingType): this{
    this.loadingTypeProp = type;
    return this;
  }
  public getLoadingType(): ImgLoadingType | undefined{
    return this.loadingTypeProp;
  }
  public getName(): IconNames{
    return this.name;
  }
  public getPatch(): string{
    return this.path;
  }
  public getColor(): string{
    return this.color;
  }
  public createElement(): HTMLImageElement{
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.height = 12;
    img.width = 12;
    img.classList.add('any-icon-img')
    img.onerror = (): void => {
      console.error(`Falha ao carregar o ícone "${this.name}". Verifique o caminho: ${this.path}`);
    }
    return img;
  }
  public defineRandomId(): void{
    const randomIdNumber = Math.floor(Math.random() * 1000);
    const elementIdName: elementImageId = `any-icon-img-element-${randomIdNumber}`
    const windowWithId = document.getElementById(elementIdName);
    if(windowWithId){
      return this.defineRandomId();
    }
    this.randomId = elementIdName;
  }
}