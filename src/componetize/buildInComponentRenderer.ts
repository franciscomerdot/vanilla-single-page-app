import { Component, ComponentRenderer } from './domain/index';

const privateScope: WeakMap<BuildInComponentRenderer, {
  components: Component[],
}> = new WeakMap();

/**
 * Represents a renderer that render components.
 */
export class BuildInComponentRenderer implements ComponentRenderer {
  
  constructor(components: Component[]) {
    components.forEach(component => this.validateComponent(component));
    privateScope.set(this, {
      components: components || [],
    });
  }

  /**
   * Get or set the components that can be rendered. 
   */
  public get components(): Component[] { return privateScope.get(this).components; }

  /**
  * Renders the documents elements with the provided element tag name.
  * @param documentElementId Represents the tag name of the document elements that will be rendered.
  */
  public renderDocumentElementsWithName(documentElementName: string) {
    const documentElements: NodeListOf<Element> =
        document.getElementsByTagName(documentElementName);

    if (!this.hasComponentWithSelector(documentElementName)) {
      throw new Error(
        `Can not render the element [${documentElementName}] because there is no component`,
      );
    }

    if (!documentElements.length) {
      throw new Error(
          `Can not find any element with the provided element name [${documentElementName}]`,
      );
    }

    Array.from(documentElements).forEach(element => this.parseElementChildElements(element));
  }

  /**
   * Validates the provided componen1t
   * @param component Represents the component to be validated.
   */
  private validateComponent(component: Component): void {

  }

  /**
   * Return the component with the provided selector
   * @param selector Represents the component selector to look for.
   * @returns A Component
   */
  private getComponentWithSelector(selector: string): Component {
    const component: Component = this.components.find(component => component.selector === selector);

    if (!component) {
      throw new Error(`There is not any component with the provided selector [${selector}]`);
    }

    return component;
  }

  /**
   * Return a boolean value specifying if thee is a component with provided selector.
   * @param selector Represents the component selector to look for.
   * @returns A boolean value.
   */
  private hasComponentWithSelector(selector: string): boolean {
    const component: Component = this.components.find(component => component.selector === selector);

    return !!component;
  }

  private parseElementChildElements(element: Element, cotaininComponent?: Component): void {
    Array.from(element.children).forEach((childElement) => {
      // Recursively parching each element in the document.
      // Yes, I should take care about performance.
      this.parseElementChildElements(childElement, cotaininComponent);
    });

    // If the selector is a component render it below the elements.
    if (this.hasComponentWithSelector(element.localName)) {
      element.innerHTML =
        this.getCompiledHtmlFromComponent(
          this.getComponentWithSelector(element.localName), cotaininComponent,
        );
    }
  }

  private getCompiledHtmlFromComponent(
      component: Component,
      cotaininComponent: Component,
    ): string {
    
    const baseElement: Element = document.createElement('div');
    baseElement.innerHTML = component.template;

    Array.from(baseElement.children).forEach(childElement =>
      this.parseElementChildElements(childElement, component),
    );

    return baseElement.innerHTML;
  }
}
