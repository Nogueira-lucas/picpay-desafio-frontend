// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { InputComponent } from './input.component';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Atoms/InputComponent',
  component: InputComponent,
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<InputComponent> = (args: InputComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  type: 'text',
  placeholder: 'Texto'
};

export const Login = Template.bind({});
Login.args = {
  type: 'text',
  style: 'login',
  placeholder: 'Email',
  label: 'Email'
};
