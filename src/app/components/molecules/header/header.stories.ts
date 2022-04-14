import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { HeaderComponent } from './header.component';

export default {
  title: 'Molecules/HeaderComponent',
  component: HeaderComponent,
} as Meta;

const Template: Story<HeaderComponent> = (args: HeaderComponent) => ({
  props: args,
});

export const Default = Template.bind({});


