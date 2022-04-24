import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile.routing';
import { MatExpansionModule } from '@angular/material/expansion';
@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    //region Material Modules
    MatExpansionModule,
    MatIconModule
    //endregion
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
