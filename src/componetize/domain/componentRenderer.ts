import { Component } from './component';

/**
 * Represents a renderer that render components.
 */
export interface ComponentRenderer {
  /**
   * Get or set the components that can be rendered. 
   */
  components: Component[];

  /**
   * Renders the documents elements with the provided element tag name.
   * @param documentElementId Represents the tag name of the elements that will be rendered.
   */
  renderDocumentElementsWithName(documentElementName: string);
}
