// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { TitleComponent } from './title.component';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Atoms/TitleComponent',
  component: TitleComponent,
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<TitleComponent> = (args: TitleComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  size: 'small',
  title: 'Component de titulo',
};

