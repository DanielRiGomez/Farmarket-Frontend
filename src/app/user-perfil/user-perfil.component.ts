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
    const alter = {

    }
    this.petition.alterUser(alter);
  }

  alterEmail(){
    const alter = {

    }
    this.petition.alterUser(alter);
  }

  alterPass(){
    const alter = {

    }
    this.petition.alterUser(alter);
  }

  btnInit(){
    this.router.navigateByUrl('/inicio')
  }

  constructor(private router: Router, private petition:PetitionsService) { }

  ngOnInit(): void {
  }

}
