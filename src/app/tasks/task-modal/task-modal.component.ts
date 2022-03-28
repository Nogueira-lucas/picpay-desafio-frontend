import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '@core/task.service';
import { TaskModel } from '@models/task.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'pf-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {

  addPaymentFormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    value: new FormControl('', [
      Validators.required
    ]),
    date: new FormControl('', [
      Validators.required
    ]),
    title: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskModel,
    private _taskService: TaskService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.isEdit) {
      this.addPaymentFormGroup.patchValue({
        ...this.data
      })
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save() {
    if (!this.addPaymentFormGroup.valid) {
      this._snackBar.open('Todos os campos são obrigatórios.');
      return;
    }

    if (this.isEdit) {
      this._taskService.updateTask({ ...this.data, ...this.addPaymentFormGroup.value })
        .pipe(take(1))
        .subscribe(_ => {
          this._snackBar.open('Pagamento atualizado com sucesso!');
          this.dialogRef.close();
        }, _ => this._snackBar.open('Ocorreu um erro ao tentar atualizar o pagamento'));
    } else {
      this._taskService.createTask({ ...this.addPaymentFormGroup.value })
        .pipe(take(1))
        .subscribe(_ => {
          this._snackBar.open('Pagamento criado com sucesso!');
          this.dialogRef.close();
        }, _ => this._snackBar.open('Ocorreu um erro ao tentar criar um pagamento'));
    }
  }

  get isEdit() {
    return this.data.id == null ? false : true;
  }
}
