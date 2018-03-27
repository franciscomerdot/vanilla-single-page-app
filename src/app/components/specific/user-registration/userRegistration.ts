import { Component } from '../../../../componetize/index';
import userRegistrationHtml from './userRegistration.html';
import { UserRegistrationContext } from './userRegistrationContext';

export class UserRegistrationComponent implements Component {
  public get selector(): string { return 'user-registration'; }
  public get name(): string  { return 'User Registration'; }
  public get template(): string   { return userRegistrationHtml; }
  public get bridgeProperties(): string[]   { 
    return []; 
  }
  public get context(): Function { return UserRegistrationContext; }
}
