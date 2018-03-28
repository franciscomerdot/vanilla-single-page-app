import { Component } from '../../../../componetize/index';
import footerHtml from './footer.html';

export class FooterComponent implements Component {
  public get selector(): string { return 'footer'; }
  public get name(): string  { return 'Footer'; }
  public get template(): string   { return footerHtml; }
  public get bridgeProperties(): string[]   { 
    return []; 
  }
}
