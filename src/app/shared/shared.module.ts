import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';



const components = [
  NavbarComponent
]

const imports = [
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule  
]


@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    ...imports,
  ],
  exports: [
    ...components,
    ...imports,
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule  
  ]
})
export class SharedModule { }
