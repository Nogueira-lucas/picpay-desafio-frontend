import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tasks } from '@api/index';
import { TasksService } from '@api/tasks.service';
import { ToastrService } from 'ngx-toastr';

interface DialogData {
  id: number
}
@Component({
  selector: 'app-delete-payment',
  templateUrl: './delete-payment.component.html',
  styleUrls: ['./delete-payment.component.scss']
})
export class DeletePaymentComponent implements OnInit {

  task: Tasks

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<DeletePaymentComponent>,
    private readonly tasksService: TasksService,
    private toastr: ToastrService
  ) {
    this.getTasksId()
  }

  ngOnInit(): void {
  }


  getTasksId(): void {
    this.tasksService.getTasksId(this.data.id).subscribe(response => {
      this.task = response
    }, error => this.toastr.error('Não foi possível carregar o pagamento'))
  }
  
  deleteTask(): void {
    this.tasksService.deleteTasks(this.data.id).subscribe(response => {
      this.toastr.success('Pagamento excluído', 'Sucesso!')
      this.dialogRef.close()
    }, error => {
      this.toastr.error(`${error.error.message}`)
    })
  }
}
