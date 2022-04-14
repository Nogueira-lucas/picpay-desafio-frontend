import { Story, Meta } from '@storybook/angular/types-6-0';
import { IconButtonComponent } from './icon-button.component';

export default {
  title: 'Atoms/IconButtonComponent',
  component: IconButtonComponent,
} as Meta;

const Template: Story<IconButtonComponent> = (args: IconButtonComponent) => ({
  props: args,
});

export const Edit = Template.bind({});
Edit.args = {
  name: 'edit'
};

export const Delete = Template.bind({});
Delete.args = {
  name: 'highlight_off'
};

