import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ITask } from './../../interfaces/task.interface';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '../../../../shared/shared.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTaskComponent } from './delete-task.component';
import { ToastrModule } from 'ngx-toastr';
import { DebugElement } from '@angular/core';
import { from } from 'rxjs';
import { TaskService } from '../../services/task/task.service';

describe('DeleteTaskComponent', () => {
  let component: DeleteTaskComponent;
  let fixture: ComponentFixture<DeleteTaskComponent>;
  let debugElement: DebugElement;
  let taskService: TaskService;

  const TASK_MOCK: ITask = {
    "id": 170,
    "name": "Morganica O'Sheils",
    "username": "mosheils4p",
    "title": "Analyst Programmer",
    "value": "207.4",
    "date": "2021-05-05T10:22:13Z",
    "image": "https://robohash.org/illumexpeditadeleniti.png?size=150x150&set=set1",
    "isPayed": true
  };

  const DIALOG_MOCK = {
    close: () => { },
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteTaskComponent],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
      ],
      providers: [{
        provide: MatDialogRef,
        useValue: DIALOG_MOCK
      },
      { provide: MAT_DIALOG_DATA, useValue: { source: TASK_MOCK } }]
    })
      .compileComponents();
    taskService = TestBed.inject(TaskService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss dialog', (() => {
    debugElement = fixture.debugElement;
    const spy = spyOn(TestBed.inject(MatDialogRef), 'close').and.callThrough();

    let dismiss = debugElement.query(By.css('#dismiss')).nativeElement;

    dismiss.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    expect(spy).toHaveBeenCalled()
  }));

  it('should save task edition with success', (() => {
    debugElement = fixture.debugElement;
    const spy = spyOn(taskService, 'deleteTask').and.callThrough().and.returnValue(from([TASK_MOCK]));

    let save = debugElement.query(By.css('#save')).nativeElement;

    save.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    expect(spy).toHaveBeenCalled()
  }));
});
