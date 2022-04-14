import { Story, Meta } from '@storybook/angular/types-6-0';
import { ButtonComponent } from './button.component';

export default {
  title: 'Atoms/ButtonComponent',
  component: ButtonComponent,
} as Meta;

const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  primary: false,
  label: 'Button',
};
Secondary.parameters = {
  backgrounds: {
    default: 'black'
  }
}

export const Icon = Template.bind({});
Icon.args = {
  primary: false,
  size: 'small',
  label: 'filter',
  icon: 'tune',
};

Icon.parameters = {
  backgrounds: {
    default: 'black'
  }
}
