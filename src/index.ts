import { IconSizes } from './any-icons.type';
import AnyIcon from './models/AnyIcon';
import AnyIconsManager from './models/AnyIconsManager';
import IconModel from './models/IconModel';

async function loadCssFile(url: string): Promise<string | void> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Falha ao carregar o arquivo CSS");
    }

    const cssText = await response.text();
    console.log(cssText);

    return cssText;
  } catch (error) {
    console.error(error);
  }
}

loadCssFile('./style.css').then(cssContent => {
  console.log(cssContent)
});

const createManager = <Names>(): AnyIconsManager<Names> => {
  const instance = AnyIconsManager.build<Names>();
  AnyIcon.defineManager<Names>(instance)
  return instance
}

customElements.define(AnyIcon.elementName, AnyIcon);
export {AnyIconsManager, AnyIcon, createManager, IconModel, IconSizes}

