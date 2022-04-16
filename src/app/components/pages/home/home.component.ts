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
  
  constructor(private apiSevice: ApiService, private taskSevice: TasksService){
  }

  getApiTasks(limit, offset, name?){
    this.apiSevice.getTasks(limit, offset).subscribe((res) => {
      this.paymentList = {
        tableHead: ['Usuário', 'Título', 'Data', 'Valor', 'Pago'],
        list: this.taskSevice.getAllPayments(res.body),
        total: res.headers.get('X-Total-Count')
      }
    })
  }
  
  ngOnInit(){
    this.getApiTasks(this.limit, this.offset)
  }


  trigger(value){
    this.limit = value.limit
    this.offset = value.offset

    this.getApiTasks(value.limit, value.offset)
  }

}
