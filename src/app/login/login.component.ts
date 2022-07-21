import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  btnRegister(){
    this.router.navigateByUrl('/registro');
  }

  btnInit(){
    this.router.navigateByUrl('/inicio')
  }
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
