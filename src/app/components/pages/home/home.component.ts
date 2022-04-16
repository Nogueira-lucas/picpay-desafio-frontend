import { Component } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { TasksService } from '../../../middleware/tasks.service';

class Data {
  id: number
  name: string
  username: string
  title: string
  value: number
  date: string
  image: string
  isPayed: boolean
}

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
  disabled: boolean = true
  
  constructor(private apiSevice: ApiService, private taskSevice: TasksService){
  }

  getApiTasks(limit, offset, name?){
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

  ngOnChanges(){
    console.log('change');
  }

  openModal(){
    this.disabled = false
  }


  addPayment(value){
    this.disabled = true
    Object.keys(value).length > 0 && this.taskSevice.mountPostTask(value).subscribe((data: Data) => {
      alert(`task do ${data.username} adicionado com sucesso`)
      this.getApiTasks(this.limit, this.offset)
    })
  }
  
  onEvent({type, id}){
    type === 'delete' && this.apiSevice.deleteTasks(id).subscribe(() => {
      alert(`task ${id} deletado com sucesso`)
      this.getApiTasks(this.limit, this.offset)
    })
    // type === 'edit' && this.apiSevice.deleteTasks(id)

  }

  trigger(value){
    this.limit = value?.limit || 10
    this.offset = value?.offset || 0
    this.name = value?.search || ''

    Object.keys(value).length > 0 && this.getApiTasks(value.limit, value.offset, value?.search)
  }

}
