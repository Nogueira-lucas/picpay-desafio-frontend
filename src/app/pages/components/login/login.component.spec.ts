import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { LoginRouteModule } from './login.routing';
import { SharedModule } from './../../../shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';



describe ("LoginComponent", () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                MatInputModule,
                MatFormFieldModule,
                MatIconModule,
                MatSnackBarModule,
                MatDialogModule,
                SharedModule,
                LoginRouteModule,
                CommonModule,
                RouterTestingModule,
                HttpClientModule,
                RouterModule,
                BrowserAnimationsModule
            ]

        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have a defined component", () => {
        expect(component).toBeDefined();
    });

    it('component initial state', () => {
        expect(component.loginForm).toBeDefined();
        expect(component.loginForm.valid).toBeFalsy();
    });

    it('submitted should be true when loginForm is submitted', () => {
        component.loginForm.controls['emailFormControl'].setValue('teste@teste.com');
        component.loginForm.controls['senhaFormControl'].setValue('teste123');
        component.login();
        expect(component.submitted).toBeTruthy();
    });

    it('submitted should be true when cadastroForm is submitted', () => {
        component.cadastroForm.controls['nameFormControl'].setValue('teste');
        component.cadastroForm.controls['emailFormControl'].setValue('teste@teste.com');
        component.cadastroForm.controls['senhaFormControl'].setValue('teste123');
        component.cadastroForm.controls['confirmaSenhaFormControl'].setValue('teste123');
        component.registrar();
        expect(component.submitted).toBeTruthy();
    });
});
