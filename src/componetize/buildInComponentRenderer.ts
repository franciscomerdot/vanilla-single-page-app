import { Component, ComponentRenderer, ComponentContext } from './domain/index';
import { ComponentRepository } from './domain/componentRepository';
import { DomElementParser } from './domElementParser';
import { BuildInComponentRepository } from './buildInComponentRepository';
import { DomElementExpressionResolver } from './domElementExpressionResolver';

const privateScope: WeakMap<BuildInComponentRenderer, {
  componentRepository: ComponentRepository,
  domElementParser: DomElementParser,
}> = new WeakMap();

/**
 * Represents a renderer that render components.
 */
export class BuildInComponentRenderer implements ComponentRenderer {

  constructor(components: Component[]) {    
    // Poors man constructor here intead of inverse the dependencies [Time]. :(
    const componentRepository: ComponentRepository = new BuildInComponentRepository();
    const domElementParser: DomElementParser = new DomElementParser(
      componentRepository,
      new DomElementExpressionResolver(),
    );

    privateScope.set(this, {
      componentRepository,
      domElementParser,
    });

    components.forEach((component) => {
      this.validateComponent(component);
      componentRepository.addComponent(component);
    });
  }

  /**
  * Renders the documents elements with the provided element tag name.
  * @param documentElementId Represents the tag name of the document elements that will be rendered.
  */
  public renderDocumentElementsWithName(documentElementName: string) {
    const scope = privateScope.get(this);
    const documentElements: NodeListOf<Element> =
      document.getElementsByTagName(documentElementName);

    if (!scope.componentRepository.hasComponentWithSelector(documentElementName)) {
      throw new Error(
        `Can not render the element [${documentElementName}] because there is no component`,
      );
    }

    if (!documentElements.length) {
      throw new Error(
        `Can not find any element with the provided element name [${documentElementName}]`,
      );
    }

    Array.from(documentElements)
         .forEach(element => scope.domElementParser.parsedElement(element, {}));
  }

  /**
   * Validates the provided componen1t
   * @param component Represents the component to be validated.
   */
  private validateComponent(component: Component): void {

  }

  
}
