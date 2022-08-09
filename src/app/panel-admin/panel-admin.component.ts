import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PetitionsService} from "../petitions.service";

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {

  pagePublis = 1;

  allUsers: any[] = [];

  askUsers(): void{
    this.petition.getAllUsers().subscribe(data => {
      if (data){
        if(data.message){
          alert(data.message);
          this.invalidToken(data.message);
        }else {
          this.allUsers = [];
          for (const i of data) {
            let newP = {
              id: i.idUser,
              email: i.email,
              name: i.nameUser,
            }
            this.allUsers.push(newP);
          }
        }
      }
    })
  }

  deleteUser (e: any){
    this.petition.deleteUser(e.value).subscribe(data => {
      if (data){
        if(data.message) {
          alert(data.message);
          this.invalidToken(data.message);
        }
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

  constructor(private router: Router, private petition: PetitionsService) { }

  ngOnInit(): void {
  }

}
