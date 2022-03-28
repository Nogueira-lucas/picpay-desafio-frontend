import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDeleteConfirmModalComponent } from './task-delete-confirm-modal.component';

describe('TaskDeleteConfirmModalComponent', () => {
  let component: TaskDeleteConfirmModalComponent;
  let fixture: ComponentFixture<TaskDeleteConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDeleteConfirmModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDeleteConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
