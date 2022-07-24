import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PetitionsService} from "../petitions.service";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm= new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', Validators.required)
  })

  btnRegister(){
    this.router.navigateByUrl('/registro');
  }

  btnLogin(form: any){
    this.petition.validateUser(form.values).subscribe(data => {
      if(data.token){
        sessionStorage.setItem("token", data.token);
        this.router.navigateByUrl('/inicio');
      }
    });
  }

  constructor(private router: Router, private petition: PetitionsService) { }

  ngOnInit(): void {
  }

}
