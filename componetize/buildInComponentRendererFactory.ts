import { Component, ComponentRenderer, ComponentRendererFactory } from "./domain";
import { BuildInComponentRenderer } from './buildInComponentRenderer'

/**
 * Represents a factory that allow build components renderers.
 */
export class BuildInComponentRendererFactory implements ComponentRendererFactory {
    /**
     * Returns a component renderer as result of his building.
     * @param components Represents the components that can be rendered.
     * @returns A Componenet Renderer
     */
    public createComponentRenderer(components: Component[]): ComponentRenderer {
        return new BuildInComponentRenderer(components);
    }
}