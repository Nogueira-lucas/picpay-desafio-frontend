import { Story, Meta } from '@storybook/angular/types-6-0';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { PaymentListComponent } from './payment-list.component';

import { CommonModule } from '@angular/common';
import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { SelectComponent } from '../../atoms/select/select.component';
import { CountPageComponent } from '../../molecules/count-page/count-page.component';
import { TableComponent } from '../../molecules/table/table.component';
import { IconButtonComponent } from '../../atoms/icon-button/icon-button.component';
import { ItemListComponent } from '../../atoms/item-list/item-list.component';
import { CheckboxComponent } from '../../atoms/checkbox/checkbox.component';

export default {
  title: 'Organisms/PaymentListComponent',
  component: PaymentListComponent,
  decorators: [
    moduleMetadata({
      declarations: [InputComponent, ButtonComponent, SelectComponent, CountPageComponent, TableComponent, IconButtonComponent, ItemListComponent, CheckboxComponent],
      imports: [CommonModule],
    }),
    componentWrapperDecorator(story => story),
  ]
} as Meta;

const Template: Story<PaymentListComponent> = (args: PaymentListComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  limit: 10,
  dataSource: {
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
    ],
    tableHead: ['Usuário', 'Título', 'Data', 'Valor', 'Pago'],
    total: 170
  }
}


