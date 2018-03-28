import { ComponentContext } from '../../../../componetize/index';
import { BreadcrumbItem } from '../../general/breadcrumb/breadCrumbItem';

const defaultNavigationAction = () => { alert('Working on it'); };

export class MainContext implements ComponentContext {
  public navigationItems: BreadcrumbItem[] = [{
    fontAwsomeIcon: 'home',
    action: defaultNavigationAction,
  }, {      
    description: 'Page 1',
    action: defaultNavigationAction,
  }, {
    description: 'Breadcrumb',
    action: defaultNavigationAction,
  }, {
    description: 'Custom Page',
    action: defaultNavigationAction,
  }];
}
