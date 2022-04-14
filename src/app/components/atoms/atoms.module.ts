import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { ImageComponent } from './image/image.component';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { TitleComponent } from './title/title.component';

@NgModule({
  declarations: [LogoComponent, ImageComponent, InputComponent, ButtonComponent, TitleComponent],
  exports: [LogoComponent, ImageComponent, InputComponent, ButtonComponent, TitleComponent],
  imports: [
    CommonModule
  ]
})
export class AtomsModule { }
