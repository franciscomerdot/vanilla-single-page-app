import { ComponentContext } from '../../../../componetize/domain/componentContext';

export class AccordionContext implements ComponentContext {
  title: string;
  isOpen: boolean;    

  onInit(): void {
    throw new Error('Method not implemented.');
  }
}
