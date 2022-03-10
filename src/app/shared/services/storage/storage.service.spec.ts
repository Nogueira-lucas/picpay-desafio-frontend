import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set storage', () => {
    const spySetStorage = spyOn(service, 'setStorage').and.callThrough();

    service.setStorage("PAYFRIENDS.account", {});

    expect(spySetStorage).toBeDefined();
  });

  it('should update storage', () => {
    const spyUpdateStorage = spyOn(service, 'updateStorage').and.callThrough();
    service.setStorage("PAYFRIENDS.account", {});
    service.updateStorage("PAYFRIENDS.account", { name: 'Usuário', username: 'user' });

    expect(spyUpdateStorage).toBeDefined();
  });

  it('should remove storage', () => {
    const spyRemoveStorage = spyOn(service, 'removeStorage').and.callThrough();

    service.removeStorage("PAYFRIENDS.account");

    expect(spyRemoveStorage).toHaveBeenCalled();
  });


  it('should get storage', () => {
    const spy = spyOn(service, 'getStorage').and.callThrough().and.returnValue(null);

    service.getStorage("PAYFRIENDS.account");

    expect(spy).toHaveBeenCalled();
  });

  it('should clear storage', () => {
    const spy = spyOn(service, 'clearStorage').and.callThrough();

    service.clearStorage();

    expect(spy).toHaveBeenCalled();
  });
});
