import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PetitionsService} from "../petitions.service";
import * as events from "events";

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  pages: number = 1;

  @ViewChild('products', {static: true}) products!: ElementRef;

   publications: any[] = [];

  constructor(private render: Renderer2, private router: Router, private petition: PetitionsService) { }

  ngOnInit(): void {
    this.askPublications();
  }

  askPublications(): void{
    this.petition.getAllProductos().subscribe(data => {
      if (data){
        if(data.message){
          alert(data.message);
          this.invalidToken(data.message());
        }else {
          for (const i of data) {
            let newP = {
              id: i.idProduct,
              titulo: i.titulo,
              emailOwner: i.emailOwner,
              availabe: i.isAvailabe,
              tipo: i.productType,
              description: i.description,
              image: i.imageAddress
            }
            this.publications.push(newP);
          }
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
    this.router.navigateByUrl('/');
  }

  selectInterest(e: any) {
    this.petition.newInterest(""+localStorage.getItem("idUser"), e.target.value)
      .subscribe(data => {
      if (data){
        alert(data.message);
        if(!data.accepted){
          this.invalidToken(data.message);
        }}
    });
  }

}
