import { Story, Meta } from '@storybook/angular/types-6-0';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { TableComponent } from './table.component';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import { CommonModule } from '@angular/common';
import { CheckboxComponent } from '../../atoms/checkbox/checkbox.component';
import { IconButtonComponent } from '../../atoms/icon-button/icon-button.component';
import { ItemListComponent } from '../../atoms/item-list/item-list.component';

export default {
  title: 'Molecules/TableComponent',
  component: TableComponent,
  decorators: [
    moduleMetadata({
      declarations: [CheckboxComponent, IconButtonComponent, ItemListComponent],
      imports: [CommonModule],
    }),
    componentWrapperDecorator(story => story),
  ]
} as Meta;

const Template: Story<TableComponent> = (args: TableComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  tableHead: ['Usuário', 'Título', 'Data', 'Valor', 'Pago'],
  list: [
    {
      id: '1',
      items: [
        {item: 'Monique', subItem: '@monique'},
        {item: 'developr'},
        {item: '23 Abr 2020', subItem: '16:00 AM'},
        {item: 'R$ 500'},
        {item: true}
      ],
    },
    {
      id: '2',
      items: [
        {item: 'Claudia', subItem: '@claudia'},
        {item: 'QA'},
        {item: '23 Jun 2020', subItem: '11:00 AM'},
        {item: 'R$ 100'},
        {item: true}
      ],
    },
    {
      id: '3',
      items: [
        {item: 'Fulano', subItem: '@Fulano'},
        {item: 'professor'},
        {item: '30 Jan 2021', subItem: '09:00 PM'},
        {item: 'R$ 515'},
        {item: false}
      ]
    }
  ]
};

export const Responsive = Template.bind({});
Responsive.parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone5',
  },
},
Responsive.args = {
  tableHead: ['Usuário', 'Título', 'Data', 'Valor', 'Pago'],
  list: [
    {
      id: '1',
      items: [
        {item: 'Monique', subItem: '@monique'},
        {item: 'developr'},
        {item: '23 Abr 2020', subItem: '16:00 AM'},
        {item: 'R$ 500'},
        {item: true}
      ],
    },
    {
      id: '2',
      items: [
        {item: 'Claudia', subItem: '@claudia'},
        {item: 'QA'},
        {item: '23 Jun 2020', subItem: '11:00 AM'},
        {item: 'R$ 100'},
        {item: true}
      ],
    },
    {
      id: '3',
      items: [
        {item: 'Fulano', subItem: '@Fulano'},
        {item: 'professor'},
        {item: '30 Jan 2021', subItem: '09:00 PM'},
        {item: 'R$ 515'},
        {item: false}
      ]
    }
  ]
};

