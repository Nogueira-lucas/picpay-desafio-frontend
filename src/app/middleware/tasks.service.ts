import { Injectable } from '@angular/core';

@Injectable()
export class TasksService {

  constructor() { }

  getAllPayments(data){
    return this.mountPaymentList(data)
  }

  mountPaymentList(data){
    
    const result = data.map(item => ({
      id: item.id,
      items: [
        this.mountItem(item.name.match(/\w+/ig)[0], `@${item.username}`),
        this.mountItem(item.title),
        this.mountItem(new Date(item.date).toLocaleDateString('pt-BR'), new Date(item.date).toLocaleTimeString('pt-BR')),
        this.mountItem(`R$ ${this.formatPrice(item.value)}`),
        this.mountItem(item.isPayed),
      ]
    }))
    
    return result
  }

  mountItem(item, subItem?) {
    return {item, subItem}
  }

  formatPrice(number){
    if (typeof number !== 'number' || isNaN(number)) {
      return null;
    }
  
    number = number.toFixed(2).split('.');
    number[0] = `${number[0].split(/(?=(?:...)*$)/).join('.')}`;
    return number.join(',');
  };
  
}
