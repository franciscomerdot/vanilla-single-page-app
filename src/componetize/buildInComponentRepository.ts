import { Component } from './index';
import { ComponentRepository } from './domain/componentRepository';

const privateScope: WeakMap<BuildInComponentRepository, {
  components: Component[],
}> = new WeakMap();

/**
 * Represents a respository that allows store and query components.
 */
export class BuildInComponentRepository implements ComponentRepository {

  constructor() {
    privateScope.set(this, {
      components: [],
    });
  }

  /**
   * Returns a boolean value specifying if thee is a component with provided selector.
   * @param selector Represents the component selector to look for.
   * @returns A boolean value.
   */
  public hasComponentWithSelector(selector: string): boolean {
    return !!this.internalGetComponentWithSlector(selector);
  }

  /**
   * Returns the component with the provided selector
   * @param selector Represents the component selector to look for.
   * @returns A Component
   */
  getComponentWithSelector(selector: string): Component {
    const component: Component = this.internalGetComponentWithSlector(selector);

    if (!component) {
      throw new Error(`There is not any component with the provided selector [${selector}]`);
    }

    return component;
  }

  /**
   * Adds a component with unique selector to the repository.
   * @param component Represents the component to be added.
   */
  public addComponent(component: Component): void {
    if (!component.selector) {
      throw new Error(`The provided selector [${component.selector}] is not valid.`);
    }

    if (this.hasComponentWithSelector(component.selector)) {
      throw new Error(`The provided selector [${component.selector}] already exists.`);
    }

    privateScope.get(this).components.push(component);
  }


  private internalGetComponentWithSlector(selector: string) {
    return privateScope.get(this).components.find(component => component.selector === selector);
  }
}
