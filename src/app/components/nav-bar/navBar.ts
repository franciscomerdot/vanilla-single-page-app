import { Component } from '../../../componetize/index';
import navBarHtml from './navBar.html';

export class NavBarComponent implements Component {
  public get selector(): string { return 'nav-bar'; }
  public get name(): string  { return 'Navigation Bar'; }
  public get template(): string   { return navBarHtml; }
  public get bridgeProperties(): string[]   { 
    return []; 
  }
}
