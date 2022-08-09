import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { PetitionsService } from '../petitions.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  emailUser = localStorage.getItem("UserEmail");

  btnPerfil(){
    this.router.navigateByUrl('/perfil');
  }

  btnLogOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("UserEmail");
    localStorage.removeItem("idUser");
    localStorage.removeItem("typeUser");
    this.router.navigateByUrl('/');
  }

  btnUserProducts(){
    this.router.navigateByUrl('/publicaciones')
  }

  constructor(private router: Router) { }
  ngOnInit(): void {
  }
}
