import { ComponentContext } from '.';

export interface DomElmentDecorator {
  attribute: string;
  decorateElement(element: Element, componentContext: ComponentContext);
}
