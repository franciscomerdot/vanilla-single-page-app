import { Component } from '../../../../componetize/index';
import userRegistrationHelpHtml from './userRegistrationHelp.html';

export class UserRegistrationHelpComponent implements Component {
  public get selector(): string { return 'user-registration-help'; }
  public get name(): string  { return 'User Registration Help'; }
  public get template(): string   { return userRegistrationHelpHtml; }
  public get bridgeProperties(): string[]   { 
    return []; 
  }
}
