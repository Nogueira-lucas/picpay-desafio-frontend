import { AuthService } from './../../services/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { SharedModule } from '../../shared.module';
import { TransactionStatusModule } from '../transaction-status/transaction-status.module';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let auth: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{
          path: 'not-found',
          loadChildren: () =>
            import(`../../../pages/not-found/not-found.module`).then((m) => m.NotFoundModule)
       },
       {
        path: 'login',
        loadChildren: () =>
          import(`../../../pages/login/login.module`).then((m) => m.LoginModule)
     }]),
        SharedModule,
        TransactionStatusModule
      ]
    })
      .compileComponents();

    router = TestBed.inject(Router);
    auth = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to not found page', () => {
    const spy = spyOn(router, 'navigate').and.callThrough();

    component.goTo('not-found');

    expect(spy).toHaveBeenCalled();
  });

  it('should finalize user session', () => {
    const spy = spyOn(auth, 'logout').and.callThrough();

    component.logout();

    expect(spy).toHaveBeenCalled();
    expect(router.url).toBe('/');
  });
});
