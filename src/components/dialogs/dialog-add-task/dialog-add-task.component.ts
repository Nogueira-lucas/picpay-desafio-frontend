import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { Task } from 'src/core/models/tasks.model';
import { TaskService } from 'src/core/services/task/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogAddTaskComponent implements OnInit {

  taskForm: FormGroup;
  minDate: Date;
  minValue = 1;
  message = 'Pagamento feito com sucesso!';

  constructor(
    private dialogRef: MatDialogRef<DialogAddTaskComponent>,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    if (this.data) {
      this.minDate = this.data.date;
      this.message = 'Pagamento atualizado com sucesso!';
    } else {
      this.minDate = new Date();
    }
  }

  ngOnInit(): void {

    this.taskForm = this.formBuilder.group({
      name: [this.data ? this.data.name : '', Validators.required],
      value: [this.data ? this.data.value : '', Validators.required],
      date: [this.data ? this.data.date : '', Validators.required],
      title: [this.data ? this.data.title : '', Validators.required],
      isPayed: [this.data ? this.data.isPayed : true],
      image: [this.data ? this.data.image : 'assets/task/png/default-user.png'],
      username: [this.data ? this.data.username : '']
    });

  }


  onSubmit() {
    try {

      if (!this.data) {

        let username = '';

        if (this.taskForm.value.name) {
          username = this.taskForm.value.name.toLowerCase().replace(/\s/g, '');
        }

        this.taskForm.patchValue({ username });

        this.createTask(this.taskForm.value);

      } else {
        this.updateTask(this.taskForm.value);
      }

    } catch (error) {

    }

  }

  cancel() {
    this.dialogRef.close({ data: { confirm: false } });
  }

  createTask(task: Task) {

    try {

      this.taskService.create(task).subscribe(response => {

        this.dialogRef.close({ data: { confirm: true } });

        this.snackbar.open('Pagamento feito com sucesso!', 'Sucesso', {
          duration: 6000,
          panelClass: ['blue-snackbar']
        });
      }, error => {
        this.snackbar.open(error.error.statusCode === 400 ? error.error.message : 'Ocorreu um erro na sua requisição. tente novamente.', 'Error', { duration: 6000, panelClass: ['red-snackbar'] });
      });
    } catch (error) {
      this.snackbar.open('Não é possível adicionar um novo pagamento no momento.', 'Error', { duration: 6000, panelClass: ['red-snackbar'] });
    }
  }

  updateTask(task: Task) {

    try {

      this.taskService.update(this.data.id, task).subscribe(response => {

        this.dialogRef.close({ data: { confirm: true } });

        this.snackbar.open('Pagamento atualizado com sucesso!', 'Sucesso', {
          duration: 6000,
          panelClass: ['blue-snackbar']
        });
      }, error => {
        this.snackbar.open(error.error.statusCode === 400 ? error.error.message : 'Ocorreu um erro na sua requisição. tente novamente.', 'Error', { duration: 6000,panelClass: ['red-snackbar'] });
      });
    } catch (error) {
      this.snackbar.open('Não é possível atualizar o pagamento.', 'Error', { duration: 6000, panelClass: ['red-snackbar'] });
    }
  }

}
