/**
 * Represents a component that can manipulate data.
 */
export interface Component {
  /**
   * Gets or set the selector which that the components will be recognized in the dom.
   */
  selector: string;

  /**
   * Get o set a friendly name for the component.
   */
  name: string;

  /**
   * Get or set the template in which the component will render the layout.
   */
  template: string;

  /**
   * Get the component properties that can be assigned or read from others components.
   */
  bridgeProperties: string[];

  /**
   * Get a boolean value specifiying if the component accept other element as content.
   */
  acceptContent?: boolean;
}
