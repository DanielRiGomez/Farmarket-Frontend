import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PetitionsService} from "../petitions.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-my-publications',
  templateUrl: './my-publications.component.html',
  styleUrls: ['./my-publications.component.css']
})
export class MyPublicationsComponent implements OnInit {

  pagePublis = 1;

  allmyPublications: any[] = [];
  myPublications: any[] = [];

  publicationInterests: any[] = [];


  askPublications(): void{
    this.petition.myPublications().subscribe(data => {
      if (data){
        if(data.message){
          alert(data.message);
          this.invalidToken(data.message);
        }else {
          for (const i of data) {
            if(data.emailOwner == localStorage.getItem("emailUser")){
              let imageAd = "";
              if(i.imageAddress == null){
                imageAd = "./assets/images/iconoPublication.png";
              }else {
                imageAd = i.imageAddress;
              }
              let newP = {
                id: i.id_publication,
                titulo: i.titulo,
                availabe: i.isAvailabe,
                tipo: i.productType,
                description: i.description,
                image: imageAd
              }
              this.allmyPublications.push(newP);
              this.myPublications.push(newP);
            }
          }
        }
      }
    })
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

  filterType(type: any){
    this.myPublications = [];
    if(type.target.value == "all"){
      for (let i = 0; i < this.allmyPublications.length; i++) {
        this.myPublications.push(this.allmyPublications[i]);
      }
    }else {
      for (let i = 0; i < this.allmyPublications.length; i++) {
        if(this.allmyPublications[i].tipo === type.target.value)
          this.myPublications.push(this.allmyPublications[i]);
      }
    }
  }

  openModal(conten: any) {
    this.modal.open(conten);
  }

  openModalUsersInterested(content: any, e:any){
    this.askPublicatiocInterests(e);
    this.modal.open(content);
  }

  askPublicatiocInterests(e: any){
    this.publicationInterests = [];
    this.petition.publicationInterests(e.target.value).subscribe(data =>{
      if (data){
        if(data.message){
          alert(data.message);
          this.invalidToken(data.message);
        }else {
          for (const i of data) {
            let newP = {
              name: i.name,
              email: i.email
            }
            this.publicationInterests.push(newP)
          }
        }
      }
    })
  }

  constructor(private router:Router, private petition:PetitionsService,
              private modal: NgbModal) { }

  ngOnInit(): void {
    this.askPublications();
  }

}
