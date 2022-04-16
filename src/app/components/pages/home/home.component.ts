import { Component } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { TasksService } from '../../../middleware/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public paymentList
  public limit = 10
  public offset = 0
  public name: string = ''
  
  constructor(private apiSevice: ApiService, private taskSevice: TasksService){
  }

  getApiTasks(limit, offset, name){
    this.apiSevice.getTasks(limit, offset, name).subscribe((res) => {
      this.paymentList = {
        tableHead: ['Usuário', 'Título', 'Data', 'Valor', 'Pago'],
        list: this.taskSevice.getAllPayments(res.body),
        total: res.headers.get('X-Total-Count')
      }
    })
  }
  
  ngOnInit(){
    this.getApiTasks(this.limit, this.offset, this.name)
  }


  trigger(value){
    console.log(value?.search);
    console.log('value: ', value);
    this.limit = value?.limit || 10
    this.offset = value?.offset || 0
    this.name = value?.search || ''

    this.getApiTasks(value.limit, value.offset, value?.search)
  }

}
