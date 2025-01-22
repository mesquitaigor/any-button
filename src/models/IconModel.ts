import { ImgLoadingType } from '../any-icons.type';

export default class IconModel<RN>{
  private loadingTypeProp?: ImgLoadingType;
  public constructor(private name: RN[keyof RN], private path: string){}
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
  public getName(): RN[keyof RN]{
    return this.name;
  }
  public createElement(): HTMLImageElement{
    console.log('IconModel.create')
    const img = document.createElement('img');
    img.src = this.path;
    img.loading = 'lazy';
    img.height = 12;
    img.width = 12;
    img.classList.add('any-icon-img')
    img.onerror = (): void => {
      console.error(`Falha ao carregar o ícone "${this.name}". Verifique o caminho: ${this.path}`);
    }
    return img;
  }
}