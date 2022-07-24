import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PetitionsService} from "../petitions.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required)
  })

  btnLogin(){
    this.router.navigateByUrl('/');
  }

  registerUser(){
    const register = {

    }
    this.petitions.createUser(register).subscribe(() => alert("registro enviado"));
  }

  getTest(){
    this.petitions.getUser().subscribe(data => console.log(data));
  }

  constructor( private router: Router, private petitions: PetitionsService) { }

  ngOnInit(): void {
  }

}
