import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PetitionsService} from "../petitions.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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

  alterPassForm = new FormGroup({
    oldPass: new FormControl('', Validators.required),
    newPass: new FormControl('', Validators.required),
    newPass2: new FormControl('', Validators.required)
  })

  alterName(){
    let email = ""+ localStorage.getItem('UserEmail');
    this.petition.alterUser(email, this.alterNameForm.value.newName).subscribe((data) => {
      localStorage.setItem("UserEmail", this.alterNameForm.value.newName);
      if (data.message){
        alert(data.message);
        this.invalidToken(data.message);
      }
    });
  }

  alterPass(){
    let email = ""+ localStorage.getItem('UserEmail');
    if(this.alterPassForm.value.newPass2 != this.alterPassForm.value.newPass){
      alert("Las contraseñas no coinciden");
    }else {
      this.petition.alterPass(email, this.alterPassForm.value.newPass,
        this.alterPassForm.value.oldPass).subscribe((data) => {
        if (data.message){
          alert(data.message);
          this.invalidToken(data.message);
        }
      });
    }
  }

  deleteUser(){
    this.modal.dismissAll();
    let email = ""+ localStorage.getItem('idUser');
    this.petition.deleteUser(email).subscribe( data => {
      if (data.message){
        alert(data.message);
        this.invalidToken(data.message);
      }
      if(data.message == "User deleted succesfully")
        this.btnLogOut()
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

  openModal(conten: any){
    this.modal.open(conten);
  }

  constructor(private router: Router, private petition:PetitionsService,
              private modal:NgbModal) { }

  ngOnInit(): void {
  }

}
