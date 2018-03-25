import {
  ComponentRendererFactory,
  BuildInComponentRendererFactory,
  ComponentRenderer,
} from '../componetize/index';

import * as components from './components/index';

const componentRendererFactory: ComponentRendererFactory = new BuildInComponentRendererFactory();
const componentRenderer: ComponentRenderer = componentRendererFactory.createComponentRenderer([
  new components.MainComponent(),
  new components.NavBarComponent(),
  new components.BreadcrumbComponent(),
  // Put components here so componetize can render those :).
]);

// Here is where all the magics hapens, enjoy the code reading :)
componentRenderer.renderDocumentElementsWithName('main'); 

