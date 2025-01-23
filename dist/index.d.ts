declare enum ImgLoadingType {
    LAZY = "lazy",
    EAGER = "eager"
}
interface IconRecord<Names> {
    name: Names;
    src: string;
}
declare enum IconSizes {
    NANO = 0,
    MICRO = 1,
    TINY = 2,
    SMALL = 3,
    MEDIUM = 4,
    LARGE = 5,
    HUGE = 6,
    EXTRA_HUGE = 7,
    GIANT = 8
}
declare enum IconColors {
    PRIMARY = 0,
    SECUNDARY = 1,
    TERTIARY = 2,
    DANGER = 3,
    WARNING = 4,
    SUCCESS = 5,
    BLACK = 6
}
interface SizeData {
    size: IconSizes;
    value: number | string;
}
interface ColorsData {
    name: IconColors;
    color: string;
}
interface IHTMLElement {
    disconnectedCallback(): void;
}

declare class AnyIcon<Names> extends HTMLElement implements IHTMLElement {
    private icon?;
    private static __manager__?;
    private static __manager_define_events__;
    private static readonly attributeName;
    static readonly elementName = "any-icon";
    private anyIconRenderer?;
    constructor();
    private render;
    getIcon(): IconModel<Names> | undefined;
    private managerDefineEventCallback;
    connectedCallback(): void;
    private defineColor;
    setColor(color: IconColors): void;
    disconnectedCallback(): void;
    static get observedAttributes(): string[];
    private defineIcon;
    static defineManager<ManagerNames>(manager: AnyIconsManager<ManagerNames>): void;
    setIcon(name: Names): void;
    setSize(size: IconSizes): void;
    private defineAltByProp;
    private defineSizeByProp;
    private defineLoadingByProp;
}

type elementImageId = `any-icon-img-element-${number}`;
declare class IconModel<IconNames> {
    private name;
    private path;
    private loadingTypeProp?;
    color: string;
    randomId?: elementImageId;
    width?: number;
    alt?: string;
    height?: number;
    constructor(name: IconNames, path: string);
    getPath(): string;
    loadingType(type: ImgLoadingType): this;
    getLoadingType(): ImgLoadingType | undefined;
    getName(): IconNames;
    getPatch(): string;
    getColor(): string;
    createElement(): HTMLImageElement;
    defineRandomId(): void;
}

declare class AnyIconsManager<Names> {
    private readonly _sizes;
    private readonly _colors;
    private readonly names;
    static build<Names>(): AnyIconsManager<Names>;
    addIcon(icon: IconModel<Names>): void;
    icons(records: IconRecord<Names>[]): void;
    getSizeValue(sizeName: IconSizes): number | string;
    getIconElement(name: Names): HTMLImageElement | void;
    getIcon(iconName: Names): IconModel<Names> | undefined;
    update(): void;
    colors(colorsList: ColorsData[]): void;
    getColor(color: IconColors): ColorsData;
    sizes(sizes: SizeData[]): void;
    createElement(): AnyIcon<Names>;
}

declare const createManager: <Names>() => AnyIconsManager<Names>;

export { AnyIcon, AnyIconsManager, IconColors, IconModel, IconSizes, createManager };
