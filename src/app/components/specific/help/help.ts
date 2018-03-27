import { Component } from '../../../../componetize/index';
import helpHtml from './help.html';

export class HelpComponent implements Component {
  public get selector(): string { return 'help'; }
  public get name(): string  { return 'Help'; }
  public get template(): string   { return helpHtml; }
  public get bridgeProperties(): string[]   { 
    return []; 
  }
}
