import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotfoundComponent } from 'src/app/pages/not-found/components/notfound/notfound.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [NotfoundComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([{ path: '', component: NotfoundComponent }]),
    ],
})
export class NotFoundModule {}
