import { Component } from '../../../../componetize/index';
import { AccordionContext } from './acordionContext';
import acordionHtml from './acordion.html';

export class AcordionComponent implements Component {
  public get selector(): string { return 'acordion'; }
  public get name(): string  { return 'Acordion'; }
  public get template(): string   { return acordionHtml; }
  public get bridgeProperties(): string[]   { 
    return [
      'title',
      'isOpen',
    ]; 
  }
  public get acceptContent(): boolean { return true; }
  public get context(): Function { return AccordionContext; }
}
