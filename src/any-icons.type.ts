enum ImgLoadingType{
  LAZY = 'lazy',
  EAGER = 'eager'
}
interface IconRecord<Names>{
  name: Names[keyof Names],
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
interface SizeData{
  size: IconSizes, value: number | string
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
export { ImgLoadingType, IconRecord, IconSizes, SizeNames, SizeData };