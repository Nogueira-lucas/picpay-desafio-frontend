import { Story, Meta } from '@storybook/angular/types-6-0';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { ModalPaymentComponent } from './modal-payment.component';

import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../atoms/title/title.component';
import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';

export default {
  title: 'Organisms/ModalPaymentComponent',
  component: ModalPaymentComponent,
  args: {
    disabled: false
  },
  decorators: [
    moduleMetadata({
      declarations: [ TitleComponent, InputComponent, ButtonComponent],
      imports: [CommonModule],
    }),
    componentWrapperDecorator(story => story),
  ]
} as Meta;

const Template: Story<ModalPaymentComponent> = (args: ModalPaymentComponent) => ({
  props: args,
});

export const Default = Template.bind({});

export const Mobile = Template.bind({});
Mobile.parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone5',
  },
}
