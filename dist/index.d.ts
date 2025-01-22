declare enum ImgLoadingType {
    LAZY = "lazy",
    EAGER = "eager"
}
interface IconRecord<Names> {
    name: Names[keyof Names];
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
interface SizeData {
    size: IconSizes;
    value: number | string;
}

declare class AnyIcon<Names> extends HTMLElement {
    private image?;
    private shadow?;
    private static __manager__?;
    private static __manager_define_events__;
    private static readonly attributeName;
    private static readonly imgIdPrefix;
    static readonly elementName = "any-icon";
    private randomId?;
    private managerDefineEventCallback;
    constructor();
    disconnectedCallback(): void;
    static get observedAttributes(): string[];
    private createImage;
    static defineManager<ManagerNames>(manager: AnyIconsManager<ManagerNames>): void;
    attributeChangedCallback(): void;
    private appendStyle;
    private appendImage;
    private genRandomId;
    private getIconId;
    private defineStyle;
    setIcon(name: Names): void;
    setSize(size: IconSizes): void;
    connectedCallback(): void;
    private defineImgLoading;
    private defineAltByProp;
    private defineSizeByProp;
    private defineLoadingByProp;
}

declare class IconModel<RN> {
    private name;
    private path;
    private loadingTypeProp?;
    constructor(name: RN[keyof RN], path: string);
    getPath(): string;
    loadingType(type: ImgLoadingType): this;
    getLoadingType(): ImgLoadingType | undefined;
    getName(): RN[keyof RN];
    createElement(): HTMLImageElement;
}

declare class AnyIconsManager<Names> {
    private readonly sizes;
    private readonly names;
    static build<Names>(): AnyIconsManager<Names>;
    addIcon(icon: IconModel<Names>): void;
    register(records: IconRecord<Names>[]): void;
    getSizeValue(sizeName: IconSizes): number | string;
    getIconElement(name: keyof Names): HTMLImageElement | void;
    update(): void;
    registerSizes(sizes: SizeData[]): void;
    createElement(): AnyIcon<Names>;
}

declare const createManager: <Names>() => AnyIconsManager<Names>;

export { AnyIcon, AnyIconsManager, IconModel, IconSizes, createManager };
