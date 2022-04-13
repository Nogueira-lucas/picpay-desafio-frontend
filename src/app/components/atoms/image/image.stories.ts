import { Story, Meta } from '@storybook/angular/types-6-0';
import { ImageComponent } from './image.component';

export default {
  title: 'Atoms/ImageComponent',
  component: ImageComponent,
} as Meta;

const Template: Story<ImageComponent> = (args: ImageComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  image: 'assets/images/image-login.png',
  alternativeText: 'Imagem de um homem pagando pelo celular',
};
