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
        console.log(data)
        if(data.message){
          alert(data.message);
          this.invalidToken(data.message);
        }else {
          this.allUsers = [];
          for (const i of data) {
            let newP = {
              id: i.user_id,
              email: i.email,
              name: i.name
            }
            this.allUsers.push(newP);
          }
        }
      }
    })
  }

  askPublications(): void{
    this.petition.getAllProductos().subscribe(data => {
      if (data){
        if(data.message){
          alert(data.message);
          this.invalidToken(data.message());
        }else {
          for (const i of data) {
            let imageAd = "";
            if(i.imageAddress == null){
              imageAd = "./assets/images/iconoPublication.png";
            }else {
              imageAd = i.imageAddress;
            }
            let newP = {
              id: i.id_publication,
              titulo: i.titulo,
              emailOwner: i.emailOwner,
              availabe: i.isAvailabe,
              tipo: i.productType,
              description: i.description,
              image: imageAd
            }
            this.allPublications.push(newP);
            this.publications.push(newP);
          }
        }
      }
    })
  }

  deleteUser (e: any){
    console.log(e.target.value);
    this.petition.deleteUserAdmin(e.target.value).subscribe(data => {
      if (data){
        if(data.message) {
          alert(data.message);
          this.invalidToken(data.message);
          window.location.reload();
        }
      }
    })
  }

  openModalConfirm(content: any) {
    this.modal.open(content);
  }

  deletePublication(e: any) {
    this.modal.dismissAll();
    this.petition.deletePublicationAdmin(e.target.value)
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
    this.askUsers();
    this.askPublications();
  }

}
