import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Error404Component } from './error404.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Component: Error404', () => {
  let component: Error404Component;
  let fixture: ComponentFixture<Error404Component>;
  let router: Router;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Error404Component ],
      imports: [RouterTestingModule, MatSnackBarModule, BrowserAnimationsModule]
    })
    .compileComponents();

    router = TestBed.inject(Router);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Error404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`When accessing the page
  Must redirect to 'login' route`, () => {
    spyOn(router, 'navigate');

    expect(component).toBeTruthy();
    fixture.whenStable().then(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});


