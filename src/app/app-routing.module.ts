import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {MainMenuComponent} from "./main-menu/main-menu.component";
import {UserPerfilComponent} from "./user-perfil/user-perfil.component";
import {LogOutGuard} from "./guards/log-out.guard";
import {LogInGuard} from "./guards/log-in.guard";

const routes: Routes = [
  {path:'', component: LoginComponent, canActivate: [LogInGuard]},
  {path:'registro', component: RegisterComponent},
  {path:'inicio', component: MainMenuComponent, canActivate: [LogOutGuard]},
  {path:'perfil', component: UserPerfilComponent, canActivate: [LogOutGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
