import { Component } from '../../../componetize/index';
import informativeInputHtml from './informativeInput.html';

export class InformativeInputComponent implements Component {
  public get selector(): string { return 'informative-input'; }
  public get name(): string  { return 'Informative Input'; }
  public get template(): string   { return informativeInputHtml; }
  public get acceptContent(): boolean { return true; }
  public get bridgeProperties(): string[]   { 
    return []; 
  }
}
