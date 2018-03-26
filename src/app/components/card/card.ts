import { Component } from '../../../componetize/index';
import cardHtml from './card.html';

export class CardComponent implements Component {
  public get selector(): string { return 'card'; }
  public get name(): string  { return 'Card'; }
  public get template(): string   { return cardHtml; }
  public get bridgeProperties(): string[]   { 
    return []; 
  }
}
