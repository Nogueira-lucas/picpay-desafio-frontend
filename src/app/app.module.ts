import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';

import { AuthService } from './services/auth/auth.service';
import { UserService } from './middleware/user.service';
import { ApiService } from './api/api.service';
import { AuthGuard } from './guards/auth.guards';

import { AppRoutingModule } from './app-routing.module';
import { AtomsModule } from './components/atoms/atoms.module';
import { MoleculesModule } from './components/molecules/molecules.module';
import { OrganismsModule } from './components/organisms/organisms.module';
import { LoginModule } from './components/pages/login/login.module';
import { HomeModule } from './components/pages/home/home.module';
import { TasksService } from './middleware/tasks.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HomeModule,
    AtomsModule,
    MoleculesModule,
    OrganismsModule,
  ],
  providers: [
    AuthService,
    ApiService,
    UserService,
    AuthGuard,
    TasksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
