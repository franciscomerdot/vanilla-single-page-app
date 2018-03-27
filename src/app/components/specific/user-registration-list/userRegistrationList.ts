import { Component } from '../../../../componetize/index';
import userRegistrationListHtml from './userRegistrationList.html';
import { UserRegistrationContext } from './userRegistrationContext';

export class UserRegistrationListComponent implements Component {
  public get selector(): string { return 'user-registration-list'; }
  public get name(): string  { return 'User Registration List'; }
  public get template(): string   { return userRegistrationListHtml; }
  public get bridgeProperties(): string[]   { 
    return [
      'users',
    ]; 
  }
  public get context(): Function { return UserRegistrationContext; }
}
