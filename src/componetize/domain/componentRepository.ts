import { Component } from '.';

/**
 * Represents a respository that allows store and query components.
 */
export interface ComponentRepository {
  /**
   * Returns a boolean value specifying if thee is a component with provided selector.
   * @param selector Represents the component selector to look for.
   * @returns A boolean value.
   */
  hasComponentWithSelector(selector: string): boolean;

  /**
   * Returns the component with the provided selector
   * @param selector Represents the component selector to look for.
   * @returns A Component
   */
  getComponentWithSelector(selector: string): Component;

  /**
   * Adds a component with unique selector to the repository.
   * @param component Represents the component to be added.
   */
  addComponent(component:Component): void;
}
