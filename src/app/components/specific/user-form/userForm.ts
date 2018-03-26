import { Component } from '../../../../componetize/index';
import userFormHtml from './userForm.html';

export class UserFormComponent implements Component {
  public get selector(): string { return 'user-form'; }
  public get name(): string  { return 'User Form'; }
  public get template(): string   { return userFormHtml; }
  public get bridgeProperties(): string[]   { 
    return []; 
  }
}
