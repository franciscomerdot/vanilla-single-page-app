import { ComponentContext } from './index';
import { DomElementParser } from '../domElementParser';

export interface DomElmentDecorator {
  attributes: string[];
  decorateElement(
    decorationAttribute: string,
    element: Element,
    componentContext: ComponentContext,
  );
}
