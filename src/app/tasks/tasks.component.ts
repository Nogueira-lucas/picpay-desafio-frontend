import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '@core/task.service';
import { TaskModalComponent } from './task-modal/task-modal.component';

@Component({
  selector: 'pf-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private _taskService: TaskService
  ) { }

  ngOnInit(): void {
  }

  addPayment() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '50%',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      this._taskService.triggerGetAll();
    });
  }
}
