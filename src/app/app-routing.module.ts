import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {MainMenuComponent} from "./main-menu/main-menu.component";
import {UserPerfilComponent} from "./user-perfil/user-perfil.component";
import {RouterGuardGuard} from "./router-guard.guard";

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'registro', component: RegisterComponent},
  {path:'inicio', component: MainMenuComponent, canActivate: [RouterGuardGuard]},
  {path:'perfil', component: UserPerfilComponent, canActivate: [RouterGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
