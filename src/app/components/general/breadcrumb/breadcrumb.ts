import { Component } from '../../../../componetize/index';
import breadcrumbHtml from './breadcrumb.html';

export class BreadcrumbComponent implements Component {
  public get selector(): string { return 'breadcrumb'; }
  public get name(): string  { return 'Breadcrumb'; }
  public get template(): string   { return breadcrumbHtml; }
  public get bridgeProperties(): string[]   { 
    return [
      'items',
    ]; 
  }
}
