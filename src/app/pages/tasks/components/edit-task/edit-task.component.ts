import { TaskService } from '../../services/task/task.service';
import { ITask, Task, TaskAction } from '../../interfaces/task.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditTaskComponent implements OnInit {

  form: FormGroup;
  hide = true;
  taskSource: ITask;
  dialogType: string;
  inputDateFormatted: string;
  constructor(private readonly fb: FormBuilder, private readonly dialogRef: MatDialogRef<EditTaskComponent>, @Inject(MAT_DIALOG_DATA) private readonly data, private readonly taskService: TaskService, private readonly toastr: ToastrService) { }

  ngOnInit(): void {
    this.taskSource = (this.data.source) ? this.data.source : new Task();
    this.dialogType = this.data.type;

    this.inputDateFormatted = this.taskSource.date;
    this.form = this.fb.group({
      name: [this.taskSource.name, Validators.required],
      date: [this.taskSource.date, Validators.required],
      title: [this.taskSource.title, Validators.required],
      value: [this.taskSource.value, Validators.required]
    });
  }

  updateDatetime() {
    let inputDateTime = this.form.get('date').value;
    this.inputDateFormatted = (typeof inputDateTime !== 'string') ? inputDateTime._d : inputDateTime;
    this.taskSource.date = this.inputDateFormatted;
  }

  dismiss() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.invalid)
      return false;

    this.taskSource = { ...this.taskSource, ...this.form.value }; 
    this.updateDatetime();

    if(this.dialogType === 'edit') {
      this.taskService.updateTask(this.taskSource.id, this.taskSource).subscribe(data => {
        this.taskService.emit(TaskAction.GET_TASKS, null);
        this.toastr.success( 'Alteração do cadastro feito com êxito.', 'Deu tudo certo!');
        this.dialogRef.close();
      });
    } else {
      this.taskService.createTask(this.taskSource).subscribe(data => {
        this.taskService.emit(TaskAction.GET_TASKS, null);
        this.toastr.success( 'Pagamento cadastrado com êxito.', 'Deu tudo certo!');
        this.dialogRef.close();
      });
    }
  }
}
