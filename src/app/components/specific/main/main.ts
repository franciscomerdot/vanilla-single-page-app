import { Component } from '../../../../componetize/index';
import mainHtml from './main.html';
import { MainContext } from './mainContext';

export class MainComponent implements Component {
  public get selector(): string { return 'main'; }
  public get name(): string  { return 'Main'; }
  public get template(): string   { return mainHtml; }  
  public get bridgeProperties(): string[]   { 
    return []; 
  }  
  public get context(): Function { return MainContext; }
}
