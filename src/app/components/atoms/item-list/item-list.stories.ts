import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { ItemListComponent } from './item-list.component';

export default {
  title: 'Atoms/ItemListComponent',
  component: ItemListComponent,
} as Meta;

const Template: Story<ItemListComponent> = (args: ItemListComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  item: 'Monique',
};

export const SubItem = Template.bind({});
SubItem.args = {
  item: 'Monique',
  subItem: '@monique'
};

