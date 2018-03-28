import { ComponentContext } from '../../../../componetize/index';
import { PathItem } from './pathItem';

export class PathContext implements ComponentContext {
  public pathItems: PathItem[] = [
    {
      fontAwsomeIcon: 'puzzle-piece',
      title: 'Sector',
      description: 'Sports',
    },
    {
      fontAwsomeIcon: 'futbol',
      title: 'Sport Type',
      description: 'Bicycles'},
    {
      fontAwsomeIcon: 'bicycle',
      title: 'Mode',
      description: 'Mountain Cross',
    }];
}
