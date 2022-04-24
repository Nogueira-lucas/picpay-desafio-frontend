import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './login/login.component';
import { PayButtonModule } from '../_components/button/pay-button.module';
import { PayInputModule } from '../_components/input/pay-input.module';
import { ProfileComponent } from './profile/profile.component';
import { PayModalModule } from '../_components/modal/pay-modal.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UserRoutingModule,
        PayButtonModule,
        PayInputModule,
        PayModalModule
    ],
    declarations: [
        UserComponent,
        ProfileComponent
    ],
    exports: [
        ProfileComponent
    ]
})
export class UserModule { }