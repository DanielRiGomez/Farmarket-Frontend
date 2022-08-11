import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PetitionsService} from "../petitions.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {

  pagePublis = 1;
  pages: number = 1;

  allUsers: any[] = [];
  allPublications: any = [];
  publications: any[] = [];

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

  openModalConfirm(content: any) {
    this.modal.open(content);
  }

  deletePublication(e: any) {
    this.modal.dismissAll();
    this.petition.deletePublication(""+localStorage.getItem("idUser"), e.target.value)
      .subscribe(data => {
        if (data){
          alert(data.message);
          if(!data.accepted){
            this.invalidToken(data.message);
          }else {
            window.location.reload();
          }}
      });
  }

  filterType(type: any){
    this.publications = [];
    if(type.target.value == "all"){
      for (let i = 0; i < this.allPublications.length; i++) {
        this.publications.push(this.allPublications[i]);
      }
    }else {
      for (let i = 0; i < this.allPublications.length; i++) {
        if(this.allPublications[i].tipo === type.target.value)
          this.publications.push(this.allPublications[i]);
      }
    }
  }

  openModal(content: any) {
    this.modal.open(content);
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

  constructor(private router: Router, private petition: PetitionsService,
              private modal: NgbModal) { }

  ngOnInit(): void {
  }

}
