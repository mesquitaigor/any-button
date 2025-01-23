import { IconSizes, IconColors } from './any-icons.type';
import AnyIcon from './models/AnyIcon';
import AnyIconsManager from './models/AnyIconsManager';
import IconModel from './models/IconModel';

const createManager = <Names>(): AnyIconsManager<Names> => {
  const instance = AnyIconsManager.build<Names>();
  AnyIcon.defineManager<Names>(instance)
  return instance
}

customElements.define(AnyIcon.elementName, AnyIcon);
export {AnyIconsManager, AnyIcon, createManager, IconModel, IconSizes, IconColors}

