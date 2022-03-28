import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '@core/task.service';
import { TaskModel } from '@models/task.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'pf-task-delete-confirm-modal',
  templateUrl: './task-delete-confirm-modal.component.html',
  styleUrls: ['./task-delete-confirm-modal.component.scss']
})
export class TaskDeleteConfirmModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TaskDeleteConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskModel,
    private _taskService: TaskService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close();
  }

  deleteTask() {
    this._taskService.deleteTask(this.data.id)
      .pipe(take(1))
      .subscribe((_) => {
        this._snackBar.open('Pagamento excluído com sucesso!');
        this.dialogRef.close();
      }, _ => this._snackBar.open('Ocorreu um erro ao excluir o pagamento.'));
  }
}
