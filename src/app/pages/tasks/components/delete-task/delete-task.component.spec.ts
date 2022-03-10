import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '../../../../shared/shared.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTaskComponent } from './delete-task.component';
import { ToastrModule } from 'ngx-toastr';

describe('DeleteTaskComponent', () => {
  let component: DeleteTaskComponent;
  let fixture: ComponentFixture<DeleteTaskComponent>;

  const TASK_MOCK = {
    "id": 170,
      "name": "Morganica O'Sheils",
      "username": "mosheils4p",
      "title": "Analyst Programmer",
      "value": 207.4,
      "date": "2021-05-05T10:22:13Z",
      "image": "https://robohash.org/illumexpeditadeleniti.png?size=150x150&set=set1",
      "isPayed": true
  };
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTaskComponent ],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      },
      {provide:MAT_DIALOG_DATA,useValue:{source:TASK_MOCK}}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
