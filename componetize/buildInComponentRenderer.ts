import { Component, ComponentRenderer } from './domain'

let privateScope:WeakMap<BuildInComponentRenderer, {
    components: Component[]
}> = new WeakMap()

/**
 * Represents a renderer that render components.
 */
export class BuildInComponentRenderer implements ComponentRenderer {

    constructor(components: Component[]) {
        privateScope.set(this, {
            components: components || []
        })
    }

    /**
     * Get or set the components that can be rendered. 
     */
    public get components(): Component[] { return privateScope.get(this).components };

    /**
     * Renders the documents elements with the provided element tag name.
     * @param documentElementId Represents the tag name of the document elements that will be rendered.
     */
    public renderDocumentElementsWithName(documentElementName: string) {
        // TODO: Implements the componenets rendering.
    };
}