import {
    ComponentRendererFactory,
    BuildInComponentRendererFactory,
    ComponentRenderer
} from '../componetize'

let componentRendererFactory: ComponentRendererFactory = new BuildInComponentRendererFactory();
let componentRenderer: ComponentRenderer = componentRendererFactory.createComponentRenderer([
    // TODO: Put components here so componetize can render those :).
]);

// Here is where all the magics hapens, enjoy the code reading :)
componentRenderer.renderDocumentElementsWithName('main'); 

