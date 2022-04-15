import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { ImageComponent } from './image/image.component';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { TitleComponent } from './title/title.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { SelectComponent } from './select/select.component';
import { ItemListComponent } from './item-list/item-list.component';

@NgModule({
  declarations: [LogoComponent, ImageComponent, InputComponent, ButtonComponent, TitleComponent, CheckboxComponent, IconButtonComponent, SelectComponent, ItemListComponent],
  exports: [LogoComponent, ImageComponent, InputComponent, ButtonComponent, TitleComponent, CheckboxComponent, IconButtonComponent, SelectComponent, ItemListComponent],
  imports: [
    CommonModule
  ]
})
export class AtomsModule { }
