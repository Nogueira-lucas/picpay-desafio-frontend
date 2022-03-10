import { SharedModule } from './../../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageErrorComponent } from './message-error.component';



@NgModule({
  declarations: [
    MessageErrorComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [MessageErrorComponent]
})
export class MessageErrorModule { }
