import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            loadChildren: () => import('./pages/components/login/login.module').then( m => m.LoginModule)
          },
          {
            path: 'main',
            canActivate: [AuthGuard],
            loadChildren: () => import('./pages/components/main/main.module').then( m => m.MainModule)
          },
        ])

      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
