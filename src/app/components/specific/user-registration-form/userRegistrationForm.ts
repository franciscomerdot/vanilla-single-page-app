import { Component } from '../../../../componetize/index';
import userRegistrationFormHtml from './userRegistrationForm.html';

export class UserRegistrationFormComponent implements Component {
  public get selector(): string { return 'user-registration-form'; }
  public get name(): string  { return 'User Resgistration Form'; }
  public get template(): string   { return userRegistrationFormHtml; }
  public get bridgeProperties(): string[]   { 
    return [
      'users',
    ]; 
  }
}
