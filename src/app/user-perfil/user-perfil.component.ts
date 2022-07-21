import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-perfil',
  templateUrl: './user-perfil.component.html',
  styleUrls: ['./user-perfil.component.css']
})
export class UserPerfilComponent implements OnInit {

  btnInit(){
    this.router.navigateByUrl('/inicio')
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
