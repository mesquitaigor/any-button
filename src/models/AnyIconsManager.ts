import { IconRecord, IconSizes, SizeData } from '../any-icons.type';
import AnyIcon from './AnyIcon';
import IconModel from './IconModel';

export default class AnyIconsManager<Names>{
  private readonly sizes: SizeData[] = [];
  private readonly names = new Map<string, IconModel<Names>>()
  public static build<Names>(): AnyIconsManager<Names>{
    return new AnyIconsManager<Names>();
  }
  public addIcon(icon: IconModel<Names>): void{
    this.names.set(icon.getName() as string, icon);
  }
  public register(
    records: IconRecord<Names>[]
  ): void{
    records.forEach(({name, src}) => {
      this.addIcon(new IconModel<Names>(name, src));
    });
  }
  public getSizeValue(sizeName: IconSizes): number | string{
    return this.sizes.find(size => size.size === sizeName)?.value || 16;
  }
  public getIconElement(name: keyof Names): HTMLImageElement | void{
    const icon = this.names.get(name as string);
    if(icon){
      const icont = icon.createElement();
      return icont
    }
  }
  public update(): void{
    AnyIcon.defineManager<Names>(this)
  }
  public registerSizes(sizes: SizeData[]): void{
    this.sizes.push(...sizes);
  }
  public createElement(): AnyIcon<Names>{
    return document.createElement(AnyIcon.elementName) as AnyIcon<Names>
  }
}