import { Component } from './component';
import { ComponentRenderer } from './componentRenderer';

/**
 * Represents a factory that allow build components renderers.
 */
export interface ComponentRendererFactory {
  /**
   * Returns a component renderer as result of his building.
   * @param components Represents the components that can be rendered.
   * @returns A Componenet Renderer
   */
  createComponentRenderer(components: Component[]): ComponentRenderer;
}
