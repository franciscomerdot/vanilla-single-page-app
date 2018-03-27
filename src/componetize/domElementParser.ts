import { ComponentContext, Component } from '.';
import { DomElementExpressionResolver } from './domElementExpressionResolver';
import { ComponentRepository } from './domain/componentRepository';

const privateScope: WeakMap<DomElementParser, {
  componentRepository: ComponentRepository,
  domElementExpressionResolver: DomElementExpressionResolver,
  placeHolderRegex: RegExp,
}> = new WeakMap();

export class  DomElementParser {
  constructor(    
    componentRepository: ComponentRepository,
    domElementExpressionResolver: DomElementExpressionResolver,
  )  {
    privateScope.set(this, {
      componentRepository,
      domElementExpressionResolver,
      placeHolderRegex: /\[\((.|[^\(]|[^\)]*)\)\]/gmi,
    });
  }

  public parsedElement(
    element: Element,
    containingComponentContext: ComponentContext,
  ): void {

    const scope = privateScope.get(this);
    const childElements: Element[] = [];
    
    Array.from(element.children).forEach((childElement) => {
      // Recursively parsing each element in the document.  
      if (!this.canElementBeRendered(childElement, containingComponentContext)) {
        element.removeChild(childElement);
      } else {
        if (childElement.hasAttribute('repeatFor')) {
          this.getElementRepetition(childElement, containingComponentContext)
              .forEach(parsedElement => element.insertBefore(parsedElement, childElement));
          element.removeChild(childElement);          
        } else {
          this.parsedElement(childElement, containingComponentContext);
        }
      }
    });
  
    if (scope.componentRepository.hasComponentWithSelector(element.localName)) {
      const component: Component =
        scope.componentRepository.getComponentWithSelector(element.localName);
      let componentContext: ComponentContext = {};
  
      if (component.context) {
        if (typeof component.context !== 'function') {
          throw new Error(`Can not instantiate the component ${component.name} context because ` +
                          'is not a function');
        }
  
        componentContext = new (<any>component.context)();
      }
  
      component.bridgeProperties.forEach((property) => {
        const propertyContent: string = element.getAttribute(property);

        if (propertyContent) {  
          componentContext[property] =
              scope.domElementExpressionResolver.resolveExpression(
                propertyContent,
                component.name,
                containingComponentContext,
              ) ;
        } 
      });  
      
      const fromTemplateElements: Element[] = this.getElementsFromComponent(
        component,
        componentContext,
        Array.from(element.children),
      );

      element.innerHTML = '';

      fromTemplateElements.forEach(childElement => element.appendChild(childElement));
    }
  }

  private getElementsFromComponent(
    component: Component,
    componentContext: ComponentContext,
    elements: Element[],
  ): Element[] {
    if (!component.acceptContent && elements.length) {
      throw new Error(`Can not compile component [${component.name}], ` +
                      'because has content when it does not accept it.');
    }

    const baseElement: Element = document.createElement('div');
    baseElement.innerHTML = component.template;

    const repeaters = baseElement.querySelectorAll('[repeatFor]');
    
    Array.from(repeaters).forEach((repeater, index) => {
      const placeHolderElement = document.createElement('repeater-' + index);
      repeater.parentElement.setAttribute('repeater-' + index, 'repeatFor:');
      repeater.parentElement.replaceChild(placeHolderElement, repeater);
    });

    baseElement.innerHTML = this.getNormalizeTemplate(
      baseElement.innerHTML,
      component.name,
      componentContext,
    );

    repeaters.forEach((repeater, index) => {
      const parent: Element = baseElement.querySelectorAll('[repeater-' + index + ']').item(0);
      const placeHolder: Element = baseElement.getElementsByTagName('repeater-' + index).item(0);
      parent.replaceChild(repeater, placeHolder);
    });

    const compontizeContainerElements = baseElement.getElementsByTagName('componetize-container');

    if (elements.length) {
      if (compontizeContainerElements.length !== 1) {
        throw new Error(
          `Can not compile component [${component.name}], because has ` +
          `[${compontizeContainerElements.length}] componetize-contaner when it must be 1`,
        );
      }

      const compontizeContainerElement = compontizeContainerElements.item(0);
      compontizeContainerElement.setAttribute('style', 'with:100%');
      elements.forEach(childElement => compontizeContainerElement.appendChild(childElement));
    }

    Array.from(baseElement.children).forEach(childElement =>
      this.parsedElement(childElement, componentContext),
    );

    return Array.from(baseElement.children);
  }

  private canElementBeRendered(
      element: Element,
      containingComponentContext: ComponentContext,
    ): boolean {
    
    const scope = privateScope.get(this);

    if (!element.hasAttribute('renderIf')) {
      return true;
    }

    return !!scope.domElementExpressionResolver.resolveExpression(
             element.getAttribute('renderIf'),
             element.localName,
             containingComponentContext,
    );
  }
      
  private getElementRepetition(
    element: Element,
    containingComponentContext: ComponentContext,
  ): Element[] {  
      
    const scope = privateScope.get(this);
    const parsedElements: Element[] = [];
    const collection: any[] = scope.domElementExpressionResolver.resolveExpression(
        element.getAttribute('repeatFor'),
        element.localName,
        containingComponentContext,
      );
    const collectionItemIentifier = element.getAttribute('repeatItem');
    
    if (!(collection instanceof Array)) {
      throw new Error('Should provide an array for iterations in element.' + element.localName);
    }

    if (!collectionItemIentifier) {
      throw new Error('Should provide repeatItem for element. ->' + element.localName);
    }

    (<any[]>collection).forEach((collectionItem, index) => {
      const iterationElement: Element = <Element>element.cloneNode(true);
      const iterationContext: any = {};
      Object.keys(containingComponentContext)
            .forEach(key => iterationContext[key] = containingComponentContext[key]);
      iterationContext[collectionItemIentifier] = collectionItem;
      iterationContext['__index'] = index;
     
      iterationElement.innerHTML = this.getNormalizeTemplate(
        iterationElement.innerHTML,
        iterationElement.localName,
        iterationContext,
      );

      Array.from(iterationElement.attributes).forEach((attribute) => {
        attribute.value = this.getNormalizeTemplate(
          attribute.value,
          iterationElement.localName,
          iterationContext,
        );
      });

      this.parsedElement(iterationElement, iterationContext);
      parsedElements.push(iterationElement);
    });

    return parsedElements;
  }

  private getNormalizeTemplate(
    template: string,
    componentOrElement: string,
    componentContext: ComponentContext,
  ): string {
    const scope = privateScope.get(this);
    const match = template.match(scope.placeHolderRegex);

    let normalizeTemplate: string = template;    

    if (match) {
      match.forEach((expression) => {
        const expressionContent = expression.substr(2, expression.length - 4);

        normalizeTemplate =
          normalizeTemplate.split(expression)
            .join(
              scope.domElementExpressionResolver.resolveExpression(
                expressionContent,
                componentOrElement,
                componentContext,
              ),
            );
      });
    }

    return normalizeTemplate;
  }
}
