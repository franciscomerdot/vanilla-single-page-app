import { Component } from '../../../componetize/index';
import mainHtml from './main.html';

export class MainComponent implements Component {
  public get selector(): string { return 'main'; }
  public get name(): string  { return 'Man Componenet'; }
  public get template(): string   { return mainHtml; }
  public get bridgeProperties(): string[]   { 
    return [
      'applicationName',
    ]; 
  }

  public applicationName: string;
}
