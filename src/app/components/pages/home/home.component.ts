import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  paymentList = {
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
    tableHead: ['Usuário', 'Título', 'Data', 'Valor', 'Pago']
  }
}
