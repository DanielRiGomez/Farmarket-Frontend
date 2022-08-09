import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PetitionsService} from "../petitions.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-perfil',
  templateUrl: './user-perfil.component.html',
  styleUrls: ['./user-perfil.component.css']
})
export class UserPerfilComponent implements OnInit {

  emailUser = localStorage.getItem("UserEmail");

  alterNameForm = new FormGroup({
    newName: new FormControl('', Validators.required)
  })

  alterEmailForm = new FormGroup({
    newEmail: new FormControl('', [Validators.required, Validators.email]),
  })

  alterPassForm = new FormGroup({
    oldPass: new FormControl('', Validators.required),
    newPass: new FormControl('', Validators.required),
    newPass2: new FormControl('', Validators.required)
  })

  alterName(){
    let email = ""+ localStorage.getItem('idUser');
    this.petition.alterUser(email, this.alterNameForm.value.newName).subscribe((data) => {
      if (data.message){
        alert(data.message);
        this.invalidToken(data.message);
      }
    });
  }

  alterEmail(){
    let email = ""+ localStorage.getItem('idUser');
    this.petition.alterEmail(email, this.alterEmailForm.value.newEmail).subscribe((data) => {
      if (data.message){
        alert(data.message);
        this.invalidToken(data.message);
      }
    });
  }

  alterPass(){
    let email = ""+ localStorage.getItem('idUser');
    this.petition.alterPass(email, this.alterPassForm.value.newPass,
      this.alterPassForm.value.oldPass).subscribe((data) => {

      if (data.message){
        alert(data.message);
        this.invalidToken(data.message);
      }
    });
  }

  deleteUser(){
    let email = ""+ localStorage.getItem('idUser');
    this.petition.deleteUser(email).subscribe( data => {
      if (data.message){
        alert(data.message);
        this.invalidToken(data.message);
      }
    })
  }

  invalidToken(message: string){
    if(message == "Invalid Token"){
      this.btnLogOut();
    }
  }

  btnLogOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("UserEmail");
    localStorage.removeItem("idUser");
    localStorage.removeItem("typeUser");
    this.router.navigateByUrl('/');
  }

  btnInit(){
    this.router.navigateByUrl('/inicio');
  }

  btnProducts() {
    this.router.navigateByUrl('/publicaciones');
  }

  constructor(private router: Router, private petition:PetitionsService) { }

  ngOnInit(): void {
  }

}
