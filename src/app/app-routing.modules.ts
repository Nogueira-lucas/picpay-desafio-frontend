import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router"; 

import { HomeComponent } from "./views/home/home.component";
import { LoginComponent } from "./views/login/login.component";
import { ProfileComponent } from "./views/profile/profile.component";

const routes: Routes = [
    {
        path: "",
        component: LoginComponent
    },
    {
        path: "pagamentos",
        component: HomeComponent
    },
    {
        path: "perfil",
        component: ProfileComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
