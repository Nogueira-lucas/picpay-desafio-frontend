import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tasks } from '@api/index';
import { TasksService } from '@api/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { DeletePaymentComponent } from '../delete-payment/delete-payment.component';
import { NewUpdatePaymentComponent } from '../new-update-payment/new-update-payment.component';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  tasks: Tasks[]
  caseActualSelect?: number
  userFilter: any = { username: '' };
  values: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  perPage:number = 5
  p:number = 1

  constructor(
    private readonly tasksService: TasksService,
    private readonly toastr: ToastrService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getTasks()
  }


  getTasks(): void {
    this.tasksService.getTasks().subscribe(response => {
      this.tasks = response
    }, error => {
      this.toastr.error('Não foi possível carregar os pagamentos')
    })
  }

  putTaskPayment(task: Tasks): void {
    const taskEdit = { ...task, isPayed: !task.isPayed }
    this.tasksService.putTasks(taskEdit, task.id).subscribe(() => {
      this.getTasks()
      this.toastr.success('Pagamento alterado', 'Sucesso!')
    }, error => {
      this.toastr.error(`${error.error.message}`)
    })
  }

  sortTable(type: number) {
    switch (type) {
      case 1:
        if (this.caseActualSelect == type) {
          this.tasks.sort((a: Tasks, b: Tasks) => ('' + a.username).localeCompare('' + b.username))
          this.caseActualSelect = 0
        } else {
          this.tasks.sort((a: Tasks, b: Tasks) => ('' + b.username).localeCompare('' + a.username))
          this.caseActualSelect = type
        }
        break;
      case 2:
        if (this.caseActualSelect == type) {
          this.tasks.sort((a: Tasks, b: Tasks) => ('' + a.title).localeCompare('' + b.title))
          this.caseActualSelect = 0
        } else {
          this.tasks.sort((a: Tasks, b: Tasks) => ('' + b.title).localeCompare('' + a.title))
          this.caseActualSelect = type
        }
        break;
      case 3:
        if (this.caseActualSelect == type) {
          this.tasks.sort((a: Tasks, b: Tasks) => ('' + a.date).localeCompare('' + b.date))
          this.caseActualSelect = 0
        } else {
          this.tasks.sort((a: Tasks, b: Tasks) => ('' + b.date).localeCompare('' + a.date))
          this.caseActualSelect = type
        }
        break;
      case 4:
        if (this.caseActualSelect == type) {
          this.tasks.sort((a: Tasks, b: Tasks) => { return a.value - b.value });
          this.caseActualSelect = 0
        } else {
          this.tasks.sort((a: Tasks, b: Tasks) => { return b.value - a.value });
          this.caseActualSelect = type
        }
        break;
      case 5:
        if (this.caseActualSelect == type) {
          this.tasks.sort((a: Tasks, b: Tasks) => ('' + a.isPayed).localeCompare('' + b.isPayed))
          this.caseActualSelect = 0
        } else {
          this.tasks.sort((a: Tasks, b: Tasks) => ('' + b.isPayed).localeCompare('' + a.isPayed))
          this.caseActualSelect = type
        }
        break;
    }
  }

  openDialog(id?: number) {
    const dialogRef = this.dialog.open(NewUpdatePaymentComponent, { data: { id: id ? id : null }, width: '90vw' });

    dialogRef.afterClosed().subscribe(result => {
      this.getTasks()
    });
  }

  openDialogDelete(id: number) {
    const dialogRef = this.dialog.open(DeletePaymentComponent, { data: { id: id }, width: '90vw' });

    dialogRef.afterClosed().subscribe(result => {
      this.getTasks()
    });
  }
}
