import { Component } from '../../../../componetize/index';
import acordionHtml from './acordion.html';

export class AcordionComponent implements Component {
  public get selector(): string { return 'acordion'; }
  public get name(): string  { return 'Acordion'; }
  public get template(): string   { return acordionHtml; }
  public get bridgeProperties(): string[]   { 
    return []; 
  }
}
