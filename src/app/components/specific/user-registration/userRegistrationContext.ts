import { ComponentContext } from '../../../../componetize';
import { User } from './user';

export class UserRegistrationContext implements ComponentContext {
  public users: User[] = [{
    fullName: 'User 1',
    email: 'user1@example.com',
    city: 'user 1 city',
    ridePreferences: 'Always',
    registrationDate: new Date(),
    daysOfTheWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  },{
    fullName: 'User 2',
    email: 'user2@example.com',
    city: 'user 2 city',
    ridePreferences: 'Always',
    registrationDate: new Date(),
    daysOfTheWeek: ['Sat', 'Sun'],
  },{
    fullName: 'User 3',
    email: 'user3@example.com',
    city: 'user 3 city',
    ridePreferences: 'Always',
    registrationDate: new Date(),
    daysOfTheWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },{
    fullName: 'User 4',
    email: 'user4@example.com',
    city: 'user 4 city',
    ridePreferences: 'Always',
    registrationDate: new Date(),
    daysOfTheWeek: ['Mon', 'Sat', 'Wed'],
  }];
}
