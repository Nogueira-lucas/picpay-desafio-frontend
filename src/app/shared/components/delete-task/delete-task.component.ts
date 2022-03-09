import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ITask } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent implements OnInit {

  taskSource: ITask;

  constructor(private readonly dialogRef: MatDialogRef<DeleteTaskComponent>, @Inject(MAT_DIALOG_DATA) private readonly data, private readonly taskService: TaskService, private readonly toastr: ToastrService) { }

  ngOnInit(): void {
    this.taskSource = this.data.source;
  }

  dismiss() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.taskService.deleteTask(this.taskSource.id).subscribe(data => {
      this.toastr.success('Pagamento removido com êxito.', 'Deu tudo certo!');
      this.dialogRef.close();
    });
  }
}
