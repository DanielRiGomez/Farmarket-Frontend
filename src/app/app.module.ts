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
import { AllProductsComponent } from './all-products/all-products.component';
import { MyInterestsComponent } from './my-interests/my-interests.component';
import { UseProductsComponent } from './use-products/use-products.component';
import {NgxPaginationModule} from "ngx-pagination";
import { MyPublicationsComponent } from './my-publications/my-publications.component';
import { PanelAdminComponent } from './panel-admin/panel-admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainMenuComponent,
    UserPerfilComponent,
    AllProductsComponent,
    MyInterestsComponent,
    UseProductsComponent,
    MyPublicationsComponent,
    PanelAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule
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
