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
    this.petitions.createUser(this.registerForm.value.email, this.registerForm.value.pass,
      this.registerForm.value.name).subscribe((data) => 
        alert(data.message)
      );
  }

  getTest(){
    this.petitions.getUser().subscribe(data => console.log(data));
  }

  constructor( private router: Router, private petitions: PetitionsService) { }

  ngOnInit(): void {
  }

}
