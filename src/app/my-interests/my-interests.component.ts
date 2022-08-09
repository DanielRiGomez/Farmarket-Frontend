import { Component, OnInit } from '@angular/core';
import {PetitionsService} from "../petitions.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-interests',
  templateUrl: './my-interests.component.html',
  styleUrls: ['./my-interests.component.css']
})
export class MyInterestsComponent implements OnInit {

  pagesInters = 1;

  interests: any[] = []

  askInterests(): void{
    let user = ""+localStorage.getItem("idUser");
    this.petition.myInterests(user).subscribe(data => {
      if (data){
        if(data.message){
          alert(data.message);
          this.invalidToken(data.message());
        }else {
          for (const i of data) {
            let newP = {
              id: i.idProduct,
              titulo: i.titulo,
              availabe: i.isAvailabe,
              tipo: i.productType,
              image: i.imageAddress
            }
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

  constructor(private petition: PetitionsService, private router: Router) { }

  ngOnInit(): void {
    this.askInterests();
  }
}
