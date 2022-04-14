import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { ImageComponent } from './image/image.component';

@NgModule({
  declarations: [LogoComponent, ImageComponent],
  exports: [LogoComponent, ImageComponent],
  imports: [
    CommonModule
  ]
})
export class AtomsModule { }
