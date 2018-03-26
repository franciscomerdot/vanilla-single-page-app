import { Component } from '../../../componetize/index';
import cardCollectionHtml from './cardCollection.html';

export class CardCollectionComponent implements Component {
  public get selector(): string { return 'card-collection'; }
  public get name(): string  { return 'Card Collection'; }
  public get template(): string   { return cardCollectionHtml; }
  public get bridgeProperties(): string[]   { 
    return []; 
  }
}
