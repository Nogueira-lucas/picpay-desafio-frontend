import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserFacade } from 'src/app/facade/user.facade';

import { HeaderComponent } from './header.component';

const userFacadeSpy = jasmine.createSpyObj('UserFacade', ['logout', 'getUser']);

describe('Header Component Test', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [ { provide: UserFacade, useValue: userFacadeSpy }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Component successfully created', () => {
    expect(component).toBeTruthy();
  });

  it('userFacadeSpy logout() should called ', () => {
    userFacadeSpy.logout.and.returnValue(of());
    fixture.detectChanges();

    spyOn(component, 'logout').and.callThrough();
    component.logout();

    expect(userFacadeSpy.logout.calls.any()).toBeTruthy();
    expect(userFacadeSpy.logout).toHaveBeenCalled();
  });
});
