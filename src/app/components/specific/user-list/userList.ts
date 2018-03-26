import { Component } from '../../../../componetize/index';
import userListHtml from './userList.html';

export class UserListComponent implements Component {
  public get selector(): string { return 'user-list'; }
  public get name(): string  { return 'User List'; }
  public get template(): string   { return userListHtml; }
  public get bridgeProperties(): string[]   { 
    return []; 
  }
}
