import { Component, ComponentRenderer, ComponentContext } from './domain/index';

const privateScope: WeakMap<BuildInComponentRenderer, {
  components: Component[],
  placeHolderRegex: RegExp
}> = new WeakMap();

/**
 * Represents a renderer that render components.
 */
export class BuildInComponentRenderer implements ComponentRenderer {

  constructor(components: Component[]) {
    components.forEach(component => this.validateComponent(component));
    privateScope.set(this, {
      components: components || [],
      placeHolderRegex: /\[\((.|[^\(]|[^\)]*)\)\]/gmi,
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

    Array.from(documentElements).forEach(element => this.parseElementChildElements(element, null));
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

  private parseElementChildElements(element: Element, containingComponentContext: ComponentContext): void {

    let elementHtml: string = element.innerHTML;

    Array.from(element.children).forEach((childElement) => {
      // Recursively parsing each element in the document.
      // Yes, I should take care about performance.

      let shouldRender: boolean =
        childElement.hasAttribute('renderIf') ?
          this.resolveExpressionWithComponentContext(
            childElement.getAttribute('renderIf'),
            element.localName,
            containingComponentContext
          ) : true;
        
      if (shouldRender) {
        this.parseElementChildElements(childElement, containingComponentContext);
        elementHtml += childElement.outerHTML;
      }
    });

    if (this.hasComponentWithSelector(element.localName)) {
      let component: Component = this.getComponentWithSelector(element.localName);
      let componentContext: ComponentContext;

      if (component.context) {
        if (typeof component.context !== 'function') {
          throw new Error(`Can not instantiate the component ${component.name} context because is not a function`);
        }

        componentContext = new (<any>component.context)();
      }

      component.bridgeProperties.forEach((property) => {
        let propertyContent: string = element.getAttribute(property);

          componentContext[property] =
            propertyContent ?
              this.resolveExpressionWithComponentContext(propertyContent, component.name, containingComponentContext) :
              undefined;  
      });

      element.innerHTML = this.getCompiledHtmlFromComponent(component, componentContext, elementHtml);
    } else {
      element.innerHTML = elementHtml;
    }
  }

  private getCompiledHtmlFromComponent(
    component: Component,
    componentContext: ComponentContext,
    elementHtml: string,
  ): string {

    if (!component.acceptContent && elementHtml) {
      throw new Error(`Can not compile component [${component.name}], ` +
        'because has content when it does not accept it.');
    }

    const baseElement: Element = document.createElement('div');
    baseElement.innerHTML = this.getNormalizeTemplateFromComponent(component, componentContext);

    const compontizeContainerElements = baseElement.getElementsByTagName('componetize-container');

    if (elementHtml) {
      if (compontizeContainerElements.length !== 1) {
        throw new Error(
          `Can not compile component [${component.name}], because has ` +
          `[${compontizeContainerElements.length}] componetize-contaner when it must be 1`,
        );
      }

      compontizeContainerElements.item(0).setAttribute('style', 'with:100%');
      compontizeContainerElements.item(0).innerHTML = elementHtml;
    }

    Array.from(baseElement.children).forEach(childElement =>
      this.parseElementChildElements(childElement, componentContext),
    );

    return baseElement.innerHTML;
  }

  private getNormalizeTemplateFromComponent(
    component: Component,
    componentContext: ComponentContext
  ): string {
    let normalizeTemplate: string = component.template;
    let match = normalizeTemplate.match(privateScope.get(this).placeHolderRegex);

    if (match) {
      match.forEach((expression) => {
        let expressionContent = expression.substr(2, expression.length - 4);

        normalizeTemplate =
          normalizeTemplate.split(expression)
            .join(
              this.resolveExpressionWithComponentContext(expressionContent, component.name, componentContext)
            )
      })
    }

    return normalizeTemplate;
  }

  private resolveExpressionWithComponentContext(expression: string, componentOrElement: string, componentContext: ComponentContext): any {
    let expressionContext: string = '';

    if (componentContext) {
      expressionContext = Object.keys(componentContext).map(key => `var ${key} = componentContext.${key};`).join('\n');
    }

    let expressionResolver =
      `
          var componentContext = this;
          return(           
            function(){ 
              ${expressionContext}
              var __result = ${expression};

              if (__result === undefined) {
                return 'undefined';
              } else if (__result === null) {
                return 'null';
              } else {
                return __result;
              }                
            }
          )                
        `;

    try {
      // Function just like eval :( -> please good, kill me now.
      return Function(expressionResolver).bind(componentContext)()();
    } catch (error) {
      throw new Error(`Can not render component or element [${componentOrElement}] due error \n\n` + error)
    }
  }
}
