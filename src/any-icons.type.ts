enum ImgLoadingType{
  LAZY = 'lazy',
  EAGER = 'eager'
}
interface IconRecord<Names>{
  name: Names,
  src: string
}
enum IconSizes{
  NANO,
  MICRO,
  TINY,
  SMALL,
  MEDIUM,
  LARGE,
  HUGE,
  EXTRA_HUGE,
  GIANT,
}
enum IconColors{
  PRIMARY,
  SECUNDARY,
  TERTIARY,
  DANGER,
  WARNING,
  SUCCESS,
  BLACK
}
interface SizeData{
  size: IconSizes, value: number | string
}
interface ColorsData{
  name: IconColors,
  color: string
}
const ColorsPropName: Record<IconColors, string> = {
  [IconColors.PRIMARY]: "primary",
  [IconColors.SECUNDARY]: "secundary",
  [IconColors.TERTIARY]: "tertiary",
  [IconColors.DANGER]: "danger",
  [IconColors.WARNING]: "warning",
  [IconColors.SUCCESS]: "success",
  [IconColors.BLACK]: "black",
}
const SizeNames: Record<IconSizes, string> = {
  [IconSizes.NANO]: "nano",
  [IconSizes.MICRO]: "micro",
  [IconSizes.TINY]: "tiny",
  [IconSizes.SMALL]: "small",
  [IconSizes.MEDIUM]: "medium",
  [IconSizes.LARGE]: "large",
  [IconSizes.HUGE]: "huge",
  [IconSizes.EXTRA_HUGE]: "extra-huge",
  [IconSizes.GIANT]: "giant",
};
interface IHTMLElement{
  disconnectedCallback(): void
}
export { IconColors, ImgLoadingType, IconRecord, IconSizes, SizeNames, SizeData, ColorsData, ColorsPropName, IHTMLElement };