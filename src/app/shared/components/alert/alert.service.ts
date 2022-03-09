import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  
  public type: string
  public message: string
  subscriptions: Subscription[] = [];


  set(message, type = "danger"){
    this.type = type
    this.message = message    
    setTimeout(() => { this.message = String() }, 5000)
  }
  
  success(message){
    this.set(message, "success")
  }
  
  error(message){
    this.set(message)
  }
}
