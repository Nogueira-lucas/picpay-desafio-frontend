import { Story, Meta } from '@storybook/angular/types-6-0';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { FormLoginComponent } from './form-login.component';

import { CommonModule } from '@angular/common';
import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';

export default {
  title: 'Molecules/FormLoginComponent',
  component: FormLoginComponent,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'pixelxl',
    },
  },
  decorators: [
    moduleMetadata({
      declarations: [InputComponent, ButtonComponent],
      imports: [CommonModule],
    }),
    componentWrapperDecorator(story => story),
  ]
} as Meta;

const Template: Story<FormLoginComponent> = (args: FormLoginComponent) => ({
  props: args,
});

export const Default = Template.bind({});


