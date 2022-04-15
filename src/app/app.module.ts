import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/middleware/user.service';
import { ApiService } from './services/api/api.service';
import { AuthGuard } from './guards/auth.guards';

import { AppRoutingModule } from './app-routing.module';
import { AtomsModule } from './components/atoms/atoms.module';
import { MoleculesModule } from './components/molecules/molecules.module';
import { OrganismsModule } from './components/organisms/organisms.module';
import { LoginModule } from './components/pages/login/login.module';
import { HomeModule } from './components/pages/home/home.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
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
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
