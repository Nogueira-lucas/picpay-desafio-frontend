import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { LogoComponent } from './logo.component';

export default {
  title: 'Atoms/LogoComponent',
  component: LogoComponent,
} as Meta;

const Template: Story<LogoComponent> = (args: LogoComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  type: 'default',
};

export const White = Template.bind({});
White.args = {
  type: 'white',
}
White.parameters = {
  backgrounds: {
    default: 'black'
  }
}

