import { Story, Meta } from '@storybook/angular/types-6-0';
import { SelectComponent } from './select.component';

export default {
  title: 'Atoms/SelectComponent',
  component: SelectComponent,
} as Meta;

const Template: Story<SelectComponent> = (args: SelectComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  items: ['5', '10', '20'],
  defaultSelected: '10',
  id: 'seletor',
  label: 'Exibir'
};


