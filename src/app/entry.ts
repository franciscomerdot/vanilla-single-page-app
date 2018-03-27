import {
  ComponentRendererFactory,
  BuildInComponentRendererFactory,
  ComponentRenderer,
} from '../componetize/index';

import * as components from './components/index';

const componentRendererFactory: ComponentRendererFactory = new BuildInComponentRendererFactory();
const componentRenderer: ComponentRenderer = componentRendererFactory.createComponentRenderer([
  // Generals
  new components.BreadcrumbComponent(),
  new components.CardComponent(),
  new components.AcordionComponent(),
  new components.InformativeInputComponent(),
  
  // Specifics
  new components.MainComponent(),
  new components.PathComponent(),  
  new components.NavBarComponent(),
  new components.UserRegistrationComponent(),
  new components.UserRegistrationHelpComponent(),
  new components.UserRegistrationFormComponent(),
  new components.UserRegistrationListComponent(),
  
  // Put components here so componetize can render those :).
]);

// Here is where all the magics hapens, enjoy the code reading :)
componentRenderer.renderDocumentElementsWithName('main'); 

