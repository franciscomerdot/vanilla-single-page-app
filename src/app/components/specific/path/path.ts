import { Component } from '../../../../componetize/index';
import pathHtml from './path.html';
import { PathContext } from './pathContext';

export class PathComponent implements Component {
  public get selector(): string { return 'path'; }
  public get name(): string  { return 'Path'; }
  public get template(): string   { return pathHtml; }
  public get bridgeProperties(): string[]   { 
    return [
      'pathItems',
    ]; 
  }
  public get context(): Function { return PathContext; }
}
