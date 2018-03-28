import { ComponentContext } from '../../../../componetize/index';

export class UserRegistrationContext implements ComponentContext {

  public isHovered: boolean = false;

  public getNormalizedDaysOfTheWeek(daysOfTheWeek: string[]): string {
    if (daysOfTheWeek.length === 7) {
      return 'Every day';
    }

    if (daysOfTheWeek.length === 5 &&
        daysOfTheWeek.indexOf('Mon') > -1 &&
        daysOfTheWeek.indexOf('Tue') > -1 &&
        daysOfTheWeek.indexOf('Wed') > -1 &&
        daysOfTheWeek.indexOf('Thu') > -1 &&
        daysOfTheWeek.indexOf('Fri') > -1) {
      return 'Week days';
    }

    if (daysOfTheWeek.length === 2 &&
        daysOfTheWeek.indexOf('Sat') > -1 &&
        daysOfTheWeek.indexOf('Sun') > -1) {
      return 'Weekends';
    }


    return daysOfTheWeek.join(', ');
  }

  public setIsHovered(value: boolean) {
    this.isHovered = value;
  }
}
