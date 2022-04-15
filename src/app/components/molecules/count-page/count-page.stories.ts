import { Story, Meta } from '@storybook/angular/types-6-0';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { IconButtonComponent } from '../../atoms/icon-button/icon-button.component';
import { CountPageComponent } from './count-page.component';

import { CommonModule } from '@angular/common';

export default {
  title: 'Molecules/CountPageComponent',
  component: CountPageComponent,
  decorators: [
    moduleMetadata({
      declarations: [IconButtonComponent],
      imports: [CommonModule],
    }),
    componentWrapperDecorator(story => story),
  ]
} as Meta;

const Template: Story<CountPageComponent> = (args: CountPageComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  list: ['1','2','3','4','5'],
  current: '1',
};

export const Middle = Template.bind({});
Middle.args = {
  list: ['1','2','3','4','5'],
  current: '3',
};



export const Last = Template.bind({});
Last.args = {
  list: ['1','2','3','4','5'],
  current: '5',
};


