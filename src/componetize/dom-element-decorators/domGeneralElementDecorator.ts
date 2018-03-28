import { DomElmentDecorator } from '../domain/domElementDecorator';
import { ComponentContext, ComponentRenderer } from '..';
import { DomElementExpressionResolver } from '../domElementExpressionResolver';
import { DomElementParser } from '../domElementParser';

const privateScope: WeakMap<DomGeneralElmentDecorator, {
  domElementExpressionResolver: DomElementExpressionResolver,
  componentRenderer: ComponentRenderer,
}> = new WeakMap();

export class DomGeneralElmentDecorator implements DomElmentDecorator {
  constructor(
    domElementExpressionResolver: DomElementExpressionResolver,
    componentRenderer: ComponentRenderer,
  ) {
    privateScope.set(this, {
      domElementExpressionResolver,
      componentRenderer,
    });
  }

  public get attributes(): string[] { 
    return [
      'click',
      'mouseenter',
      'mouseleave',
    ];
  }
  public decorateElement(
    decorationAttribute: string,
    element: Element,
    componentContext: ComponentContext,
  ) {
    const scope = privateScope.get(this);
    
    element.addEventListener(decorationAttribute, () => {
      scope.domElementExpressionResolver.resolveExpression(
        element.getAttribute(decorationAttribute),
        element.localName,
        componentContext,
      );
      scope.componentRenderer.renderDocumentElementsWithName('main');
    });

    if (decorationAttribute === 'click') {
      const style = element.getAttribute('style');
      element.setAttribute('style', (style || '') + 'cursor:pointer');
    }
  }
}
