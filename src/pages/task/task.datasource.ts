import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { TaskService } from 'src/core/services/task/task.service';
import { Task } from 'src/core/models/tasks.model';

export class TasksDataSource implements DataSource<Task> {

    private dataSubject = new BehaviorSubject<Task[]>([]);

    private totalElementsSubject = new BehaviorSubject<number>(0);

    public totalElements$ = this.totalElementsSubject.asObservable();

    constructor(private taskService: TaskService) {
    }

    load(
        name: string,
        username: string,
        isPaye: boolean,
        date: string,
        title: string,
        sortField: string,
        sortDirection: string,
        pageIndex: number,
        pageSize: number) {
        this.taskService.findAll(
            name,
            username,
            isPaye,
            date,
            title,
            sortField,
            sortDirection,
            pageIndex,
            pageSize).pipe(
                catchError(() => [])
            )
            .subscribe(result => {

                const tasks = result;

                this.taskService.findAll(
                    name,
                    username,
                    isPaye,
                    date,
                    title,
                    sortField,
                    sortDirection,
                    null,
                    null).pipe(
                        catchError(() => [])
                    )
                    .subscribe(resultLength => {
                        this.totalElementsSubject.next(resultLength.length);
                        this.dataSubject.next(tasks);
                    });

            });

    }

    connect(collectionViewer: CollectionViewer): Observable<Task[]> {
        return this.dataSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
        this.totalElementsSubject.complete();
    }
}
