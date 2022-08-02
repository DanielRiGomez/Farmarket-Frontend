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
    let email = ""+ localStorage.getItem('UserEmail');
    this.petition.alterUser(email, this.alterNameForm.value.newName).subscribe((data) => console.log(data));
  }

  alterEmail(){
    let email = ""+ localStorage.getItem('UserEmail');
    this.petition.alterEmail(email, this.alterEmailForm.value.newEmail);
  }

  alterPass(){
    let email = ""+ localStorage.getItem('UserEmail');
    this.petition.alterPass(email, this.alterPassForm.value.newPass,
      this.alterPassForm.value.oldPass).subscribe((data) => console.log(data));
  }

  btnInit(){
    this.router.navigateByUrl('/inicio')
  }

  constructor(private router: Router, private petition:PetitionsService) { }

  ngOnInit(): void {
  }

}
