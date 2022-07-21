import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PetitionsService} from "../petitions.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  btnLogin(){
    this.router.navigateByUrl('/');
  }

  registerUser(){
    this.petitions.createUser({
      user: "User",
      pass: "Password",
      email: "email@email.co"
    })
  }

  constructor( private router: Router, private petitions: PetitionsService) { }

  ngOnInit(): void {
  }

}
