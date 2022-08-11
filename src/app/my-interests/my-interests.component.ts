import { Component, OnInit } from '@angular/core';
import {PetitionsService} from "../petitions.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-my-interests',
  templateUrl: './my-interests.component.html',
  styleUrls: ['./my-interests.component.css']
})
export class MyInterestsComponent implements OnInit {

  pagesInters = 1;

  allInterests: any[] = []
  interests: any[] = []

  askInterests(): void{
    let user = ""+localStorage.getItem("idUser");
    this.petition.myInterests(user).subscribe(data => {
      if (data){
        if(data.message){
          alert(data.message);
          this.invalidToken(data.message);
        }else {
          for (const i of data) {
            let imageAd = "";
            if(i.imageAddress == null){
              imageAd = "./assets/images/iconoPublication.png";
            }else {
              imageAd = i.imageAddress;
            }
            let newP = {
              id: i.idPublication,
              titulo: i.titulo,
              availabe: i.isAvailabe,
              tipo: i.productType,
              image: imageAd
            }
            this.allInterests.push(newP);
            this.interests.push(newP);
          }
        }
      }
    })
  }

  deleteInterest(e: any) {
    this.petition.deleteIntesrest(""+localStorage.getItem("idUser"), e.target.value)
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
    this.interests = [];
    if(type.target.value == "all"){
      for (let i = 0; i < this.allInterests.length; i++) {
        this.interests.push(this.allInterests[i]);
      }
    }else {
      for (let i = 0; i < this.allInterests.length; i++) {
        if(this.allInterests[i].tipo === type.target.value)
          this.interests.push(this.allInterests[i]);
      }
    }
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

  openModal(conten: any){
    this.model.open(conten);
  }

  constructor(private petition: PetitionsService, private router: Router,
              private model: NgbModal) { }

  ngOnInit(): void {
    this.askInterests();
  }
}
