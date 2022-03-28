import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from './task-modal/task-modal.component';

@Component({
  selector: 'pf-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addPayment() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '50%',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log({ result });
      // this.animal = result;
    });
  }
}
