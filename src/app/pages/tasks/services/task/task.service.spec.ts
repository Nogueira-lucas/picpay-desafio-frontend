import { ITask } from './../../interfaces/task.interface';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { from, throwError } from 'rxjs';

import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let http: HttpClient;

  const TASKS_MOCK: ITask[] = [
    {
      id: 1,
      name: 'Pennie Dumphries',
      username: 'pdumphries0',
      title: 'Dentatist rtest',
      value: '0.01',
      date: '2020-08-21T05:50:00.000Z',
      image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1',
      isPayed: true
    },
    {
      id: 2,
      name: 'Foster Orthmann',
      username: 'forthmann1',
      title: 'Professor xxxx',
      value: '207.36',
      date: '2021-01-28T14:01:29Z',
      image: 'https://robohash.org/quasetqui.png?size=150x150&set=set1',
      isPayed: true
    }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
    service = TestBed.inject(TaskService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Validate getTasks Suite', () => {
    it('should execute succesfully getTasks request', (done) => {
      spyOn(http, 'get').and.returnValue(from([TASKS_MOCK]));

      service.getTasks(1, null).subscribe(response => {
        expect(response).toBeDefined();
        expect(response).toBe(TASKS_MOCK);
        done();
      });
    });

    it('should execute get tasks request and throws error', (done) => {
      spyOn(http, 'get').and.returnValue(throwError(new Error()));

      service.getTasks(1, 10).subscribe(data => { },
        error => {
          expect(error).toBeDefined();
          done();
        });
    });
  });

  describe('Validate createTask Suite', () => {
    it('should create task succesfully', (done) => {
      spyOn(http, 'post').and.returnValue(from([TASKS_MOCK[0]]));

      service.createTask(TASKS_MOCK[0]).subscribe(response => {
        expect(response).toBeDefined();
        expect(response).toBe(TASKS_MOCK[0]);
        done();
      });
    });

    it('shouldn\'t create task request and throws error', (done) => {
      spyOn(http, 'post').and.returnValue(throwError(new Error()));

      service.createTask(TASKS_MOCK[0]).subscribe(_ => { },
        error => {
          expect(error).toBeDefined();
          done();
        });
    });
  });

  describe('Validate updateTask Suite', () => {
    it('should update task succesfully', (done) => {
      spyOn(http, 'put').and.returnValue(from([TASKS_MOCK[0]]));

      service.updateTask(TASKS_MOCK[0].id, TASKS_MOCK[0]).subscribe(response => {
        expect(response).toBeDefined();
        expect(response).toBe(TASKS_MOCK[0]);
        done();
      });
    });

    it('shouldn\'t update task request and throws error', (done) => {
      spyOn(http, 'put').and.returnValue(throwError(new Error()));

      service.updateTask(TASKS_MOCK[0].id, TASKS_MOCK[0]).subscribe(_ => { },
        error => {
          expect(error).toBeDefined();
          done();
        });
    });
  });

  describe('Validate deleteTask Suite', () => {
    it('should delete task succesfully', () => {
      spyOn(http, 'delete').and.returnValue(from([TASKS_MOCK[0]]));

      service.deleteTask(TASKS_MOCK[1].id).subscribe(response => {
        expect(response).toBeDefined();
      });
    });

    it('shouldn\'t update task request and throws error', () => {
      spyOn(http, 'delete').and.returnValue(throwError(new Error()));

      service.deleteTask(TASKS_MOCK[0].id).subscribe(_ => { },
        error => {
          expect(error).toBeDefined();
        });
    });
  });
});
