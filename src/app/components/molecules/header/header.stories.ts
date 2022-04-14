import { Story, Meta } from '@storybook/angular/types-6-0';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { HeaderComponent } from './header.component';

import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../atoms/logo/logo.component';
import { ImageComponent } from '../../atoms/image/image.component';

export default {
  title: 'Molecules/HeaderComponent',
  component: HeaderComponent,
  decorators: [
    moduleMetadata({
      declarations: [LogoComponent, ImageComponent],
      imports: [CommonModule],
    }),
    componentWrapperDecorator(story => story),
  ]
} as Meta;

const Template: Story<HeaderComponent> = (args: HeaderComponent) => ({
  props: args,
});

export const Default = Template.bind({});


