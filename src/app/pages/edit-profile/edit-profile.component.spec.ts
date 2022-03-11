import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { EditProfileComponent } from './edit-profile.component';

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;
  let auth: AuthService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileComponent ],
      imports: [ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: '', redirectTo: '/', pathMatch: 'full' }]),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        SharedModule]
    })
    .compileComponents();

    auth = TestBed.inject(AuthService);
    auth.login('usuario@gmail.com', 'usuario').subscribe();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
