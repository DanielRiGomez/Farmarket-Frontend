import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PetitionsService} from "../petitions.service";

@Component({
  selector: 'app-my-publications',
  templateUrl: './my-publications.component.html',
  styleUrls: ['./my-publications.component.css']
})
export class MyPublicationsComponent implements OnInit {

  pagePublis = 1;

  myPublications: any[] = [];


  askPublications(): void{
    this.petition.myPublications().subscribe(data => {
      if (data){
        if(data.message){
          alert(data.message);
          this.invalidToken(data.message);
        }else {
          for (const i of data) {
            if(data.emailOwner == localStorage.getItem("emailUser")){
              let newP = {
                id: i.id_publication,
                titulo: i.titulo,
                availabe: i.isAvailabe,
                tipo: i.productType,
                description: i.description,
                image: i.imageAddress
              }
              this.myPublications.push(newP);
            }
          }
        }
      }
    })
  }

  deletePublication(e: any) {
    this.petition.deletePublication(""+localStorage.getItem("idUser"), e.target.value)
      .subscribe(data => {
        if (data){
          alert(data.message);
          if(!data.accepted){
            this.invalidToken(data.message);
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

  constructor(private router:Router, private petition:PetitionsService) { }

  ngOnInit(): void {
    this.askPublications();
  }

}
