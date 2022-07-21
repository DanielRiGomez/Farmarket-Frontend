import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {MainMenuComponent} from "./main-menu/main-menu.component";
import {UserPerfilComponent} from "./user-perfil/user-perfil.component";

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'registro', component: RegisterComponent},
  {path:'inicio', component: MainMenuComponent},
  {path:'perfil', component: UserPerfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
