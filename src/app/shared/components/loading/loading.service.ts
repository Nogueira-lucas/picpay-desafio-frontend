import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  hidden: boolean
  start() { this.hidden = true }
  end() { this.hidden = false }
}
