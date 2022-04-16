import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable()
export class TasksService {

  constructor(private apiSevice: ApiService) { }

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

  mountPostTask(value){
    console.log('value: ', value);
    console.log(this.convertPrice(value.valor));
    const data = {
      "name": value.usuario.trim(),
      "username": `${value.usuario.replace(/\s*/ig, '').toLowerCase()}`,
      "title": value.titulo.trim(),
      "value": this.convertPrice(value.valor),
      "date": this.convertDate(value.data),
      "image": "https://picsum.photos/400/400",
      "isPayed": false
    }
    return this.apiSevice.postTasks(data)
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
    console.log('number: ', number);
    return number.join(',');
  };

  convertPrice(value) {
    return parseInt(parseInt(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&'))
  }

  convertDate(date){
    const datearray = date.split("/");
    const newdate = `${datearray[1]}-${datearray[0]}-${datearray[2]}`
    return new Date(newdate).toISOString()
  }
  
}
