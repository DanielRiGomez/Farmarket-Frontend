import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PetitionsService} from "../petitions.service";
import {Form, FormControl, FormGroup, Validator, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = "oculto";

  loginForm= new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', Validators.required)
  })

  btnRegister(){
    this.router.navigateByUrl('/registro');
  }

  btnLogin(){

    this.petition.validateUser(this.loginForm.value.email, this.loginForm.value.pass).subscribe(data => {
      if(data.token){
        localStorage.setItem("idUser", data.user_id);
        localStorage.setItem("UserEmail", this.loginForm.value.email);
        localStorage.setItem("typeUser", data.user_type);
        localStorage.setItem("token", data.token);
        if(data.user_type == "U"){
          this.router.navigateByUrl('/inicio');
        }else {
          alert("Bienvenido Admin")
          this.router.navigateByUrl('/admin');
        }

      }else if(data.message){
        this.errorMessage="visible";
        alert(data.message);
      }
    });
  }

  constructor(private router: Router, private petition: PetitionsService) { }

  ngOnInit(): void {
  }

}
