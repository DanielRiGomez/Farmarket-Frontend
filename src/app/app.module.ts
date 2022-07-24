import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { UserPerfilComponent } from './user-perfil/user-perfil.component';
import {PetitionsService} from "./petitions.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JwtInterceptorInterceptor} from "./jwt-interceptor.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainMenuComponent,
    UserPerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PetitionsService, {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptorInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
  }
}
