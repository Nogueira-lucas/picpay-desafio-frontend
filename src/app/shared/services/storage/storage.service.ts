import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public getStorage(name: string, storageType = 'session') {
      if(storageType === 'session')
        return (sessionStorage.getItem(name)) ? JSON.parse(sessionStorage.getItem(name)) : null;
      else 
        return (localStorage.getItem(name)) ? JSON.parse(localStorage.getItem(name)) : null;
  } 

  public setStorage(name: string, content: any, storageType = 'session') {
    if(storageType === 'session')
      sessionStorage.setItem(name, JSON.stringify(content));
    else
      localStorage.setItem(name, JSON.stringify(content));
  } 

  public updateStorage(name: string, content: any, storageType = 'session') {

    let sessionData = this.getStorage(name, storageType);
  
    sessionData = Object.assign(sessionData, content);
    this.setStorage(name, sessionData, storageType);
    return sessionData;
  }

  public removeStorage(name: string, storageType = 'session') {
    if(storageType === 'session') {
      sessionStorage.removeItem(name);
    } else {
      localStorage.removeItem(name);
    }
  }

  public clearStorage(storageType = 'session') {
    if(storageType === 'session') {
      sessionStorage.clear();
    } else {
      localStorage.clear();
    }
  }
}
