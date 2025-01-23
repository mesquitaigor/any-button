import { ColorsData as ColorData, IconColors, IconRecord, IconSizes, SizeData } from '../any-icons.type';
import AnyIcon from './AnyIcon';
import IconModel from './IconModel';

export default class AnyIconsManager<Names>{
  private readonly _sizes: SizeData[] = [];
  private readonly _colors: ColorData[] = [];
  private readonly names = new Map<Names, IconModel<Names>>()
  public static build<Names>(): AnyIconsManager<Names>{
    return new AnyIconsManager<Names>();
  }
  public addIcon(icon: IconModel<Names>): void{
    this.names.set(icon.getName(), icon);
  }
  public icons(
    records: IconRecord<Names>[]
  ): void{
    records.forEach(({name, src}) => {
      this.addIcon(new IconModel<Names>(name, src));
    });
  }
  public getSizeValue(sizeName: IconSizes): number | string{
    return this._sizes.find(size => size.size === sizeName)?.value || 16;
  }
  public getIconElement(name: Names): HTMLImageElement | void{
    const icon = this.names.get(name);
    if(icon){
      const icont = icon.createElement();
      return icont
    }
  }
  public getIcon(iconName: Names): IconModel<Names> | undefined{
    return this.names.get(iconName);
  }
  public update(): void{
    AnyIcon.defineManager<Names>(this)
  }
  public colors(colorsList: ColorData[]): void{
    this._colors.push(...colorsList);
  }
  public getColor(color: IconColors): ColorData{
    return this._colors.find(c => c.name === color) || {color: 'black', name: IconColors.BLACK};
  }
  public sizes(sizes: SizeData[]): void{
    this._sizes.push(...sizes);
  }
  public createElement(): AnyIcon<Names>{
    return document.createElement(AnyIcon.elementName) as AnyIcon<Names>
  }
}