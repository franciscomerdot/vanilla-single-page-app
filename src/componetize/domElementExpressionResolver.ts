import { ComponentContext } from '.';

export class DomElementExpressionResolver {
    
  public resolveExpression(
    expression: string,
    componentOrElementName: string,
    componentContext: ComponentContext): any {
    let expressionContext: string = '';
  
    if (componentContext) {
      expressionContext =
       Object.keys(componentContext).map(key => 
       `
          var ${key} = componentContext.${key}.bind ? 
                         componentContext.${key}.bind(componentContext) :
                         componentContext.${key};
       `,
       ).join('\n');
    }
  
    const expressionResolver =
      ` var componentContext = this;
        return(       
          function(){ 
            ${expressionContext}
            var __result = ${expression};
            return __result;
          }
        )`;
  
    try {
      // Function just like eval :( -> please good, kill me now.
      return Function(expressionResolver).bind(componentContext)()();
    } catch (error) {
      throw new Error(`Can not render component or element [${componentOrElementName}] due error ` +
              '\n\n' + error);
    }
  }
}
