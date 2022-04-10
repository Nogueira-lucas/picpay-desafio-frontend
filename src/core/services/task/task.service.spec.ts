import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { TaskService } from './task.service';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';


describe('Service: Task', () => {
    let service: TaskService;
    let httpController: HttpTestingController;
    let httpClient: HttpClient;
    const API_URL = environment.serverUrl + '/tasks';

    const mockTaskListResponseDto =
        [{
            id: 55,
            name: 'Lilith Graver',
            username: 'lgraver1i',
            title: 'Accounting Assistant II',
            value: 121.42,
            date: '2020-10-23T06:36:48Z',
            image: 'https://robohash.org/dictaexnumquam.png?size=150x150&set=set1',
            isPayed: false
        }];


    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TaskService]
        });

        service = TestBed.inject(TaskService);
        httpController = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);

    });


    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it(`Given the TaskService
    When findAll method successfully returns
    Then must return payment from client Lilith Graver`, () => {

        const params = { filter: 'Lilith Graver' };

        service.findAll(params.filter, null, null, null, null, null, 'asc', 1, 10).subscribe(response => {
            expect(response.length).toEqual(1);
            expect(response[0].value).toEqual(121.42);
        });

        const req = httpController.expectOne(`${API_URL}?name_like=${params.filter}&_order=asc&_page=1&_limit=10`);
        expect(req.request.method).toBe('GET');

        req.flush(mockTaskListResponseDto);
    });

    it(`Given the taskService
    When getAll method returns with error
    Then you must pass the error`, () => {
        let taskResponse;
        const params = { filter: 'Lilith Graver' };

        spyOn(httpClient, 'get').and.returnValue(throwError({ status: 400 }));

        service.findAll(params.filter, null, null, null, null, null, 'asc', 1, 10).subscribe(() => { }, (err) => {
            taskResponse = err;
        });

        expect(taskResponse).toEqual({ status: 400 });
    });

    it(`Given the TaskService
    When create method successfully returns
    Then must return payment data`, () => {

        const body = {name: 'Lilith Graver', value: 1.00, date: new Date(), username: 'lgraver1i', isPayed: true, image: 'https://robohash.org/dictaexnumquam.png?size=150x150&set=set1', title: 'Accounting Assistant II' };

        service.create(body).subscribe(response => {
            expect(response.value).toEqual(1.00);
        });

        const req = httpController.expectOne(`${API_URL}`);
        expect(req.request.method).toBe('POST');

    });

    it(`Given the TaskService
    When delete method successfully returns `, () => {

        const deleteResponse = '{}';
        service.delete(mockTaskListResponseDto[0].id).subscribe(response => {
            expect(response).toBeNull();
        });

        const req = httpController.expectOne(`${API_URL}/${mockTaskListResponseDto[0].id}`);
        expect(req.request.method).toBe('DELETE');

    });

    it(`Given the TaskService
    When the update method returns successfully
    Then it must return the payment data with the value equal to 100.00`, () => {

        const body = {
            value: 100.00,
        };

        service.update(mockTaskListResponseDto[0].id, body).subscribe(response => {
            expect(response.value).toEqual(1000.00);
        });

        const req = httpController.expectOne(`${API_URL}/${mockTaskListResponseDto[0].id}`);
        expect(req.request.method).toBe('PATCH');

    });

});
