import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([{ path: '', component: LoginComponent }]),
    ],
})
export class LoginModule {}
