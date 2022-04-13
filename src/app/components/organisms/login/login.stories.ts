import { Story, Meta } from '@storybook/angular/types-6-0';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { LoginComponent } from './login.component';

import { CommonModule } from '@angular/common';
import { FormLoginComponent } from '../../molecules/form-login/form-login.component';
import { ImageComponent } from '../../atoms/image/image.component';
import { LogoComponent } from '../../atoms/logo/logo.component';
import { TitleComponent } from '../../atoms/title/title.component';
import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';

export default {
  title: 'Organisms/LoginComponent',
  component: LoginComponent,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'pixelxl',
    },
  },
  decorators: [
    moduleMetadata({
      declarations: [ImageComponent, LogoComponent, TitleComponent, FormLoginComponent, InputComponent, ButtonComponent],
      imports: [CommonModule],
    }),
    componentWrapperDecorator(story => story),
  ]
} as Meta;

const Template: Story<LoginComponent> = (args: LoginComponent) => ({
  props: args,
});

export const Default = Template.bind({});


