import { ComponentContext } from '.';
import { DomElementParser } from '../domElementParser';

export interface DomElmentDecorator {
  attributes: string[];
  decorateElement(
    decorationAttribute: string,
    element: Element,
    componentContext: ComponentContext,
  );
}
