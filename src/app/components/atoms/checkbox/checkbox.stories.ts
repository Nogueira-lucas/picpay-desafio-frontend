import { Story, Meta } from '@storybook/angular/types-6-0';
import { CheckboxComponent } from './checkbox.component';

export default {
  title: 'Atoms/CheckboxComponent',
  component: CheckboxComponent,
} as Meta;

const Template: Story<CheckboxComponent> = (args: CheckboxComponent) => ({
  props: args,
});

export const Default = Template.bind({});

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
  name: "teste"
};


