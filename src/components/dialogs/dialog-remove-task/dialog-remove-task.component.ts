import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
import { Task } from 'src/core/models/tasks.model';
import { TaskService } from 'src/core/services/task/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-dialog-remove-task',
  templateUrl: './dialog-remove-task.component.html',
  styleUrls: ['./dialog-remove-task.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogRemoveTaskComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogRemoveTaskComponent>,
    private taskService: TaskService,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {

  }

  ngOnInit(): void {

  }

  onSubmit() {
    try {

      this.deleteTask(this.data);

    } catch (error) {

    }

  }

  cancel() {
    this.dialogRef.close({ data: { confirm: false } });
  }

  deleteTask(task: Task) {

    try {

      this.taskService.delete(task.id).subscribe(response => {

        this.dialogRef.close({ data: { confirm: true } });

        this.snackbar.open('Pagamento excluído com sucesso!', 'Sucesso', {
          duration: 6000,
          panelClass: ['blue-snackbar']
        });
      }, error => {
        this.snackbar.open(error.error.statusCode === 400 ? error.error.message : 'Ocorreu um erro na sua requisição. tente novamente.', 'Error', { duration: 6000, panelClass: ['red-snackbar'] });
      });
    } catch (error) {
      this.snackbar.open('Não foi possível excluir o pagamento.', 'Error', { duration: 6000, panelClass: ['red-snackbar'] });
    }
  }
}
