import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class EventsService {
  private subjectName = new Subject<any>();

  sendEvent(message: string) {
    this.subjectName.next({ text: message });
  }

  getEvent(): Observable<any> {
    return this.subjectName.asObservable();
  }
}
