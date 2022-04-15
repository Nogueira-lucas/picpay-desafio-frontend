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
  
  constructor(private apiSevice: ApiService, private taskSevice: TasksService){
  }
  
  ngOnInit(){
    this.apiSevice.getTasks(this.limit).subscribe((res) => {
      this.paymentList = {
        tableHead: ['Usuário', 'Título', 'Data', 'Valor', 'Pago'],
        list: this.taskSevice.getAllPayments(res.body),
        total: res.headers.get('X-Total-Count')
      }
    })
    
  }

  triggerLimit(value){
    this.limit = value
  }

}
