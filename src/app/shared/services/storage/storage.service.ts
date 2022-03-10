import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public getStorage(name: string) {
      return (localStorage.getItem(name)) ? JSON.parse(localStorage.getItem(name)) : null;
  } 

  public setStorage(name: string, content: any) {
    localStorage.setItem(name, JSON.stringify(content));
  } 

  public updateStorage(name: string, content: any) {

    let sessionData = this.getStorage(name);
  
    sessionData = Object.assign(sessionData, content);
    this.setStorage(name, sessionData);
    return sessionData;
  }

  public removeStorage(name: string) {

    localStorage.removeItem(name);
  }

  public clearStorage() {

    localStorage.clear();  
  }
}
